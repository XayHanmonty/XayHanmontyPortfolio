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
  region = "us-west-2" # or "us-west-1"
}