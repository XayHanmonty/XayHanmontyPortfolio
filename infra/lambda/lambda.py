import json, os, boto3
from botocore.exceptions import ClientError

ddb = boto3.client("dynamodb")
TABLE_NAME = os.environ["TABLE_NAME"]
DEFAULT_PK = os.environ.get("COUNTER_PK", "visitor#site")
ALLOWED_ORIGINS = {
    "https://xayhanmonty.com",
    "https://www.xayhanmonty.com",
    # Add localhost for development if needed, e.g.:
    # "http://localhost:5173",
}

def _resp(code, body, *, cors_origin, cache_no_store=True):
    headers = {
        "Content-Type": "application/json",
        "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
    }
    if cors_origin:
        headers["Access-Control-Allow-Origin"] = cors_origin

    if cache_no_store:
        headers["Cache-Control"] = "no-store"
    return {"statusCode": code, "headers": headers, "body": json.dumps(body)}

def handler(event, context):
    http = (event.get("requestContext") or {}).get("http") or {}
    method = http.get("method", "GET")
    path   = http.get("path", "/")  # e.g. "/hello" or "/counter"
    qs     = event.get("queryStringParameters") or {}
    pk     = qs.get("pk", DEFAULT_PK)

    origin = event.get("headers", {}).get("origin")
    cors_origin = origin if origin in ALLOWED_ORIGINS else None

    # CORS preflight
    if method == "OPTIONS":
        headers = {
            "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
        }
        if cors_origin:
            headers["Access-Control-Allow-Origin"] = cors_origin
        
        return {
            "statusCode": 204,
            "headers": headers,
            "body": "",
        }

    try:
        # Handle /hello route
        if path == "/hello":
            return _resp(200, {"message": "Hello from Lambda!"}, cors_origin=cors_origin, cache_no_store=False)

        # Handle /counter routes
        if path == "/counter":
            if method == "POST":
                res = ddb.update_item(
                    TableName=TABLE_NAME,
                    Key={"pk": {"S": pk}},
                    UpdateExpression="ADD #c :one",
                    ExpressionAttributeNames={"#c": "count"},
                    ExpressionAttributeValues={":one": {"N": "1"}},
                    ReturnValues="UPDATED_NEW",
                )
                count = int(res["Attributes"]["count"]["N"])
                return _resp(200, {"pk": pk, "count": count}, cors_origin=cors_origin)

            if method == "GET":
                item = ddb.get_item(TableName=TABLE_NAME, Key={"pk": {"S": pk}}).get("Item")
                count = int(item["count"]["N"]) if item and "count" in item else 0
                return _resp(200, {"pk": pk, "count": count}, cors_origin=cors_origin)

        return _resp(404, {"error": "Not found"}, cors_origin=cors_origin)

    except KeyError as e:
        return _resp(500, {"error": f"Missing env var: {e}"}, cors_origin=cors_origin)
    except ClientError as e:
        return _resp(500, {"error": "DynamoDB error", "detail": str(e)}, cors_origin=cors_origin)
    except Exception as e:
        return _resp(500, {"error": "Unexpected error", "detail": str(e)}, cors_origin=cors_origin)
