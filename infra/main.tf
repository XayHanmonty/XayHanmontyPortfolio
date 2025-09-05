#---------------------
#------VARIABLE-------
#---------------------
variable "region" {
  type    = string
  default = "us-west-2"
}

variable "bucket_name" {
  type    = string
  default = "xayhanmontyportfolio"
}

variable "domain_name" {
  type    = string
  default = "xayhanmonty.com"
}

variable "alternate_names" {
  type    = list(string)
  default = ["www.xayhanmonty.com"]
}

#-------------------
#------MODULES------
#-------------------

module "lambda" {
  source     = "./lambda"
  table_name = aws_dynamodb_table.counter.name
  table_arn  = aws_dynamodb_table.counter.arn
}


#-------------------
#------OUTPUT-------
#-------------------