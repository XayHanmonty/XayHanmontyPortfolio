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

# package stays the same (data "archive_file" ...)

resource "aws_lambda_function" "hello" {
  function_name    = "hello"
  role             = aws_iam_role.lambda_exec_role.arn
  handler          = "lambda.handler"
  runtime          = "python3.12"
  filename         = data.archive_file.lambda_zip.output_path
  source_code_hash = data.archive_file.lambda_zip.output_base64sha256
  timeout          = 5

  # ← add env so your code sees the table
  environment {
    variables = {
      TABLE_NAME = var.table_name
      COUNTER_PK = "site#global"   # optional default
    }
  }
}

output "lambda_arn"           { value = aws_lambda_function.hello.arn }
output "lambda_function_name" { value = aws_lambda_function.hello.function_name }

