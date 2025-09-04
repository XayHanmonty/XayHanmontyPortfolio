terraform {
    
    cloud {
        organization = "xayhanmonty"
        workspaces {
            name = "XayPortfolio"
        }
    }

    required_providers {
        aws = {
        source = "hashicorp/aws"
        version = "6.11.0"
        }
    }
}

provider "aws" {
  region = var.region
}

# REQUIRED for CloudFront ACM certs
provider "aws" {
  alias  = "us_east_1"
  region = "us-east-1"
}