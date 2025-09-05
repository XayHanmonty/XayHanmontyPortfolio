# Create DynamoDB table for visit counters
resource "aws_dynamodb_table" "counter" {
    name = "xayportfolio_visit_counters"
    billing_mode = "PAY_PER_REQUEST"
    hash_key     = "pk"

    attribute {
        name = "pk"
        type = "S"
    }
    
    tags = {
        app = "portfolio-counter"
    }
}


    