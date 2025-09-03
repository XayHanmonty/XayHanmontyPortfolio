# 1) Bucket
resource "aws_s3_bucket" "site" {
  bucket = var.bucket_name
}

# 2) Static website hosting (S3 website endpoint; HTTP-only)
resource "aws_s3_bucket_website_configuration" "site" {
  bucket = aws_s3_bucket.site.id

  index_document { suffix = "index.html" }
  # SPA-friendly: serve index.html on errors too
  error_document { key = "index.html" }
}

# 3) Public access *policy* (TESTING ONLY)
#    Keep ACLs blocked, but allow a public *bucket policy* so the site is viewable.
resource "aws_s3_bucket_public_access_block" "site" {
  bucket = aws_s3_bucket.site.id

  block_public_acls       = true
  ignore_public_acls      = true
  block_public_policy     = false   # allow a public policy for testing
  restrict_public_buckets = false   # allow a public policy for testing
}

data "aws_iam_policy_document" "public_read" {
  statement {
    sid     = "PublicReadGetObject"
    effect  = "Allow"
    actions = ["s3:GetObject"]

    principals {
      type        = "*"
      identifiers = ["*"]
    }

    resources = ["${aws_s3_bucket.site.arn}/*"]
  }
}

resource "aws_s3_bucket_policy" "public_read" {
  bucket = aws_s3_bucket.site.id
  policy = data.aws_iam_policy_document.public_read.json
}
