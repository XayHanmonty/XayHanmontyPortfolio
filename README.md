# XayHanmonty's Portfolio

This repository contains the source code for my personal portfolio website.

## About The Project

This is a modern, single-page application designed to showcase my projects, professional experience, and interests. It features a clean user interface with 3D animations and scroll-triggered events to create an engaging user experience.

![Alt text](website/src/assets/infra.png "Optional title text")

### Tech Stack

*   **Frontend:** [React](https://react.dev/), [Vite](https://vitejs.dev/), [TypeScript](https://www.typescriptlang.org/)
*   **3D Graphics:** [Three.js](https://threejs.org/) via [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber) and [@react-three/drei](https://github.com/pmndrs/drei)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
*   **Animations:** [Framer Motion](https://www.framer.com/motion/)

## Usage

For detailed instructions on how to set up and run this project locally, please see the [USAGE.md](USAGE.md) file.

## Deployment

This project has two potential deployment configurations:

### 1. GitHub Pages (Currently Active)

The portfolio is automatically built and deployed to GitHub Pages upon every push to the `main` branch. The workflow is defined in `.github/workflows/deploy.yml` and handles everything from dependency installation to final deployment.

### 2. AWS Infrastructure (Available)

The `infra/` directory contains a complete Infrastructure as Code (IaC) setup using [Terraform](https://www.terraform.io/). This configuration will provision a production-grade environment on AWS, including:

*   **Amazon S3:** To host the static website files.
*   **Amazon CloudFront:** To act as a global CDN for low-latency delivery.
*   **Amazon Route 53 & ACM:** To manage a custom domain and SSL certificate.

This setup is not currently active in the CI/CD pipeline but is available for a more robust, scalable deployment.
