# Shikshagrah

The Elevate Portal is developed using the Next.js framework. This document provides instructions on setting up the development environment and deploying the application.

## Table of Contents
1. [Dependencies and Framework](#dependencies-and-framework)
2. [Setting up the CLI and Prerequisites](#setting-up-the-cli-and-prerequisites)
3. [Setup and Configuration](#setup-and-configuration)
4. [Setting up the Project](#setting-up-the-project)
5. [Environment Files Configuration](#environment-files-configuration)
6. [Serving the Application](#serving-the-application)
7. [Deployment](#deployment)
   - [Native Deployment](#native-deployment)
   - [Docker Deployment](#docker-deployment)
8. [Host App](#host-app)
9. [Micro Frontend List](#micro-frontend-list)

## Dependencies and Framework

| Framework/Library | Version | Purpose |
|------------------|---------|---------|
| System | Node.js: v18.20.3, npm: 10.7.0 | Runtime environment and package manager |
| Next.js | ^14.2.16 | React framework for production |
| React | ^18.3.1 | Frontend library |
| NX | ^20.3.2 | Monorepo build system |

## Setting up the CLI and Prerequisites

### Prerequisites Installation

1. **Install Node.js** (v18 or later)
   - Download from [https://nodejs.org/](https://nodejs.org/)
   - Verify installation:
   ```sh
   node -v
   npm -v
   ```

2. **Install NX CLI globally**
   ```sh
   npm install -g nx
   ```

3. **Install PM2 globally** (for production deployment)
   ```sh
   npm install -g pm2
   ```

### Check Development Dependencies
Review the development dependencies in your local package.json file.

## Setup and Configuration

### Repository Setup
1. **Fork the repository** from [https://github.com/ELEVATE-Project/elevate-portal](https://github.com/ELEVATE-Project/elevate-portal)
2. **Clone your forked repository**
   ```sh
   git clone <your-forked-repo-url>
   ```
3. **Change to project directory**
   ```sh
   cd elevate-portal
   ```
4. **Checkout to the specific branch and pull latest changes** (if applicable)
   ```sh
   git checkout <branch-name>
   git pull origin <branch-name>
   ```

## Setting up the Project

### Project Installation
1. **Navigate to the project directory**
   ```sh
   cd elevate-portal
   ```

2. **Install dependencies**
   ```sh
   npm install
   ```

3. **Create environment file**
   - Refer to the [Environment Files Configuration](#environment-files-configuration) section for detailed setup

## Environment Files Configuration

### Create `.env` file at root directory
```sh
touch .env
```

For detailed environment variable configuration including sample values and descriptions, refer to the [Environment Configuration Documentation](./environment-config.md).

## Serving the Application

### Development Mode

#### Host App (shikshagraha-app)
```sh
nx dev shikshagraha-app --port=3000 --verbose
```
- Port: `3000`

#### Content Micro Frontend
```sh
nx dev content --port=4301 --verbose
```
- basePath: `http://localhost:4301/mfe_content/`
- Port: `4301`

### Additional NX Commands

#### View Nx Graph
```sh
nx graph
```

#### Build All Projects
```sh
npx nx run-many --target=build --all
```

## Using Shared Library
Import shared library in any project:
```sh
import { SharedLib } from '@shared-lib';
```

## Deployment

### Native Deployment

#### Step 1: Setup and Configuration
Follow the setup and configuration steps mentioned above in the "Setup and Configuration" section.

#### Step 2: Change to Directory Path
```sh
cd /path/to/your/elevate-portal
```

#### Step 3: Install Development Dependencies
```sh
npm install
```

#### Step 4: Build the Application
```sh
npx nx run-many --target=build --all
```

#### Step 5: Start with PM2
```sh
pm2 start ecosystem.config.js
```

### Docker Deployment

#### Step 1: Setup and Configuration
Follow the setup and configuration steps mentioned above in the "Setup and Configuration" section.

#### Step 2: Download and Install Docker
Download and install Docker from [https://www.docker.com/get-started/](https://www.docker.com/get-started/)

#### Step 3: Change to Directory Path
```sh
cd /path/to/your/elevate-portal
```

#### Step 4: Docker Login
```sh
docker login
```

#### Step 5: Build Docker Image
```sh
sudo docker build -f Dockerfile -t shikshagraha-app .
```

#### Step 6: Run Docker Container
```sh
sudo docker run -p 3000:3000 -p 4301:4301 shikshagraha-app
```

## Host App

### shikshagraha-app
Next JS, run:
```sh
nx dev shikshagraha-app --port=3000 --verbose
```
Port: `3000`

## Micro Frontend List

### content
Next JS, run:
```sh
nx dev content --port=4301 --verbose
```
basePath: `http://localhost:4301/mfe_content/`
Port: `4301`