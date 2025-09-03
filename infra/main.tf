#---------------------
#------VARIABLE-------
#---------------------
variable "region" {
  type    = string
  default = "us-west-2"
}

# Bucket name must be globally unique & lowercase (no caps/underscores)
variable "bucket_name" {
  type    = string
  default = "xaytestwebsite"
}

#-------------------
#------OUTPUT-------
#-------------------
output "s3_website_url" {
  value       = "http://${aws_s3_bucket_website_configuration.site.website_endpoint}"
  description = "Open this in your browser (HTTP only)."
}