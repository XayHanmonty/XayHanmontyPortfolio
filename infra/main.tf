# S3 bucket for the root/apex domain
resource "aws_s3_bucket" "primary" {
  bucket = "xayhanmonty.com"
  force_destroy = true
  tags = { Project = "portfolio" }
}

# Website config (index / SPA fallback)
resource "aws_s3_bucket_website_configuration" "primary" {
  bucket = aws_s3_bucket.primary.id

  index_document { suffix = "index.html" }
  error_document { key    = "index.html" } # SPA fallback
}

# Public access (allow a public bucket policy)
resource "aws_s3_bucket_public_access_block" "primary" {
  bucket = aws_s3_bucket.primary.id
  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}

# Public read for site content
resource "aws_s3_bucket_policy" "primary" {
  bucket = aws_s3_bucket.primary.id
  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [{
      Sid       = "PublicReadGetObject",
      Effect    = "Allow",
      Principal = "*",
      Action    = "s3:GetObject",
      Resource  = "${aws_s3_bucket.primary.arn}/*"
    }]
  })
  depends_on = [aws_s3_bucket_public_access_block.primary]
}

# S3 bucket for www that redirects to apex
resource "aws_s3_bucket" "www" {
  bucket = "www.xayhanmonty.com"
  force_destroy = true
}

resource "aws_s3_bucket_website_configuration" "www" {
  bucket = aws_s3_bucket.www.id
  redirect_all_requests_to {
    host_name = aws_s3_bucket.primary.bucket  # "xayhanmonty.com"
    # protocol = "http" # or leave unset; use "https" once behind CloudFront
  }
}

# Hosted zone (public)
data "aws_route53_zone" "primary" {
  name         = "xayhanmonty.com"
  private_zone = false
}

# A alias for apex -> S3 website (HTTP-only)
resource "aws_route53_record" "apex" {
  zone_id = data.aws_route53_zone.primary.zone_id
  name    = "xayhanmonty.com"
  type    = "A"
  alias {
    name                   = aws_s3_bucket.primary.website_domain   # e.g. xayhanmonty.com.s3-website-us-west-2.amazonaws.com
    zone_id                = aws_s3_bucket.primary.hosted_zone_id   # S3 website hosted zone id for your region
    evaluate_target_health = false
  }
}

# A alias for www -> www bucket website (which redirects to apex)
resource "aws_route53_record" "www" {
  zone_id = data.aws_route53_zone.primary.zone_id
  name    = "www.xayhanmonty.com"
  type    = "A"
  alias {
    name                   = aws_s3_bucket.www.website_domain
    zone_id                = aws_s3_bucket.www.hosted_zone_id
    evaluate_target_health = false
  }
}
