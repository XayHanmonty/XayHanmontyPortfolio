# Usage Instructions

This document provides instructions on how to set up and run this project for local development.

## Prerequisites

Before you begin, ensure you have the following installed on your system:
- [Node.js](https://nodejs.org/) (v20 or later recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)

## Local Development

Follow these steps to get the development environment running:

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/<your-username>/XayHanmontyPortfolio.git
    cd XayHanmontyPortfolio
    ```

2.  **Navigate to the website directory:**
    ```sh
    cd website
    ```

3.  **Install dependencies:**
    This command will install all the necessary packages defined in `package.json`.
    ```sh
    npm install
    ```

4.  **Run the development server:**
    This command starts the Vite development server.
    ```sh
    npm run dev
    ```

5.  **View the website:**
    Once the server is running, you will see output in your terminal indicating the local address. Open your web browser and navigate to the URL provided, which is typically:
    [http://localhost:5173](http://localhost:5173)

The website will automatically reload if you make any changes to the source files.

## Manual Deployment to AWS S3

If you are using the AWS hosting setup, the deployment process is currently manual. Since automation is not yet in place, you must build the project and sync the output to your S3 bucket after every change.

**Prerequisites:**
- You must have the [AWS CLI](https://aws.amazon.com/cli/) installed and configured with the necessary permissions to write to the S3 bucket.

**Steps:**

1.  **Navigate to the website directory:**
    If you are not already there:
    ```sh
    cd website
    ```

2.  **Build the website:**
    This command compiles the project and places the final static files into the `dist` directory.
    ```sh
    npm run build
    ```

3.  **Sync to S3:**
    This command uploads the contents of the `dist` directory to your S3 bucket. The `--delete` flag removes any files from the bucket that are not present in the `dist` directory.
    ```sh
    aws s3 sync ./dist s3://xayhanmontyportfolio --delete
    ```