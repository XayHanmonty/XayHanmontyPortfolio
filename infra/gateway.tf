# HTTP API (API Gateway v2)
resource "aws_apigatewayv2_api" "http_api" {
  name          = "visitor-count-api"
  protocol_type = "HTTP"

  cors_configuration {
    allow_origins = ["www.xayhanmonty.com", "xayhanmonty.com"]  # tighten to your domain later
    allow_methods = ["GET", "POST", "OPTIONS"]  # ← add POST
    allow_headers = ["*"]
  }
}

resource "aws_apigatewayv2_integration" "lambda_integration" {
  api_id                 = aws_apigatewayv2_api.http_api.id
  integration_type       = "AWS_PROXY"
  integration_uri        = module.lambda.lambda_arn
  payload_format_version = "2.0"
}

# Existing hello route
resource "aws_apigatewayv2_route" "hello_get" {
  api_id    = aws_apigatewayv2_api.http_api.id
  route_key = "GET /hello"
  target    = "integrations/${aws_apigatewayv2_integration.lambda_integration.id}"
}

# NEW: GET /counter (read)
resource "aws_apigatewayv2_route" "counter_get" {
  api_id    = aws_apigatewayv2_api.http_api.id
  route_key = "GET /counter"
  target    = "integrations/${aws_apigatewayv2_integration.lambda_integration.id}"
}

# NEW: POST /counter (increment)
resource "aws_apigatewayv2_route" "counter_post" {
  api_id    = aws_apigatewayv2_api.http_api.id
  route_key = "POST /counter"
  target    = "integrations/${aws_apigatewayv2_integration.lambda_integration.id}"
}


resource "aws_cloudwatch_log_group" "api_gateway_logs" {
  name              = "/aws/api_gateway/${aws_apigatewayv2_api.http_api.name}"
  retention_in_days = 7
}

resource "aws_apigatewayv2_stage" "default" {
  api_id      = aws_apigatewayv2_api.http_api.id
  name        = "$default"
  auto_deploy = true

  access_log_settings {
    destination_arn = aws_cloudwatch_log_group.api_gateway_logs.arn
    format = jsonencode({
      requestId               = "$context.requestId"
      sourceIp                = "$context.identity.sourceIp"
      requestTime             = "$context.requestTime"
      protocol                = "$context.protocol"
      httpMethod              = "$context.httpMethod"
      resourcePath            = "$context.resourcePath"
      status                  = "$context.status"
      responseLength          = "$context.responseLength"
      integrationErrorMessage = "$context.integrationErrorMessage"
      }
    )
  }
}

# Allow API Gateway to invoke Lambda
resource "aws_lambda_permission" "apigw_invoke" {
  statement_id  = "AllowInvokeFromHttpApi"
  action        = "lambda:InvokeFunction"
  function_name = module.lambda.lambda_function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.http_api.execution_arn}/*/*"
}

output "api_base_url" { value = aws_apigatewayv2_api.http_api.api_endpoint }
output "hello_url"    { value = "${aws_apigatewayv2_api.http_api.api_endpoint}/hello" }
output "counter_url"  { value = "${aws_apigatewayv2_api.http_api.api_endpoint}/counter" }
