resource "aws_iam_role" "lambda_exec_role" {
  name = "lambda-exec-role"

  assume_role_policy = jsonencode({
    Version   = "2012-10-17",
    Statement = [{
      Action    = "sts:AssumeRole",
      Effect    = "Allow",
      Principal = {
        Service = "lambda.amazonaws.com"
      }
    }]
  })

}

resource "aws_iam_role_policy_attachment" "lambda_basic_execution" {
  role       = aws_iam_role.lambda_exec_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

data "archive_file" "lambda_zip" {
  type = "zip"
  source {
    content  = file("${path.module}/lambda.py")
    filename = "lambda.py"
  }
  output_path = "${path.root}/lambda.zip"
}


# Allow Lambda to read/increment only this table
data "aws_iam_policy_document" "lambda_ddb_policy" {
  statement {
    actions   = ["dynamodb:UpdateItem", "dynamodb:GetItem"]
    resources = [var.table_arn]
  }
}

resource "aws_iam_policy" "lambda_ddb_policy" {
  name   = "lambda-ddb-counter"
  policy = data.aws_iam_policy_document.lambda_ddb_policy.json
}

resource "aws_iam_role_policy_attachment" "lambda_ddb_attach" {
  role       = aws_iam_role.lambda_exec_role.name
  policy_arn = aws_iam_policy.lambda_ddb_policy.arn
}

resource "aws_cloudwatch_log_group" "lambda_lg" {
  name              = "/aws/lambda/visitor"
  retention_in_days = 7

  tags = {
    ManagedBy = "Terraform"
    Project   = "XayHanmontyPortfolio"
  }
}

# package stays the same (data "archive_file" ...)
resource "aws_lambda_function" "hello" {
  depends_on       = [aws_cloudwatch_log_group.lambda_lg]
  function_name    = "visitor"
  role             = aws_iam_role.lambda_exec_role.arn
  handler          = "lambda.handler"
  runtime          = "python3.12"
  filename         = data.archive_file.lambda_zip.output_path # Automate zip
  source_code_hash = data.archive_file.lambda_zip.output_base64sha256 # Automate zip
  timeout          = 5

  environment {
    variables = {
      TABLE_NAME = var.table_name
      COUNTER_PK = "visitor#site"   # default
    }
  }
}

output "lambda_arn"           { value = aws_lambda_function.hello.arn }
output "lambda_function_name" { value = aws_lambda_function.hello.function_name }

