# HTTP API (API Gateway v2)
resource "aws_apigatewayv2_api" "http_api" {
  name          = "hello-http-api"
  protocol_type = "HTTP"

  cors_configuration {
    allow_origins = ["*"]                       # tighten to your domain later
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

resource "aws_apigatewayv2_stage" "default" {
  api_id      = aws_apigatewayv2_api.http_api.id
  name        = "$default"
  auto_deploy = true
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
