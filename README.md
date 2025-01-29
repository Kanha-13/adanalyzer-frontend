AdAnalyzer Frontend
Overview
AdAnalyzer Frontend is a React TypeScript application built with Create React App (CRA). It allows users to upload CSV files containing ad performance data and analyze the results. The application provides:

Detailed analysis of ad performance, categorizing keywords into well-performing and underperforming groups.
A simple chart to visualize raw data.
A chat-powered AI assistant that lets users query an LLM (Large Language Model) regarding their ad performance.
Dockerized environment to ensure smooth operation across different systems.
This application is part of the AdAnalyzer system, which includes both a frontend and a backend. Docker Compose is used to orchestrate both applications, making it easy to build images and manage containers.

Prerequisites
Ensure the following dependencies are installed before setting up the project:

Docker (For containerization)
Docker Compose (For managing multiple containers)
Node.js (For development and package management)
npm (Node Package Manager)
Create React App (CRA) (For bootstrapping the frontend)
Installation & Setup
Step 1: Create a Root Project Directory
sh
Copy
Edit
mkdir adanalyzer
cd adanalyzer
Step 2: Create docker-compose.yml
Inside the adanalyzer folder, create a file named docker-compose.yml and copy-paste the following content into it:

yaml
Copy
Edit
version: '3.8'

services:
  frontend:
    build: ./adanalyzer-frontend
    ports:
      - "3000:3000"
    depends_on:
      - backend
    volumes:
      - ./adanalyzer-frontend:/app
      - /app/node_modules
    environment:
      - REACT_APP_BACKEND_URL=http://localhost:5000

  backend:
    build: ./adanalyzer-backend
    ports:
      - "5000:5000"
    volumes:
      - ./adanalyzer-backend:/app
      - /app/node_modules
    environment:
      - PORT=5000
Step 3: Clone the Frontend and Backend Repositories
Inside the adanalyzer folder, clone both repositories:

sh
Copy
Edit
git clone https://github.com/Kanha-13/adanalyzer-frontend
git clone https://github.com/Kanha-13/adanalyzer-backend
Step 4: Build and Run the Containers
1. Build the Docker images

sh
Copy
Edit
docker-compose build
2. Start the containers

sh
Copy
Edit
docker-compose up
The application will be available at http://localhost:3000.

Step 5: Configure Environment Variables
Before running the frontend, create environment variable files inside the frontend directory (adanalyzer-frontend/).

For Development (.env file)
Inside adanalyzer-frontend/, create a file named .env and add:

env
Copy
Edit
REACT_APP_API_URL=http://localhost:5000
For Production (.env.production file)
Inside adanalyzer-frontend/, create a file named .env.production and add:

env
Copy
Edit
REACT_APP_API_URL=http://localhost:5000
This ensures that the frontend correctly communicates with the backend.

Usage
Upload your CSV file with ad performance data.
Click "Analyze" to get insights into well-performing and underperforming keywords.
View charts mapping raw data.
Use the AI-powered chat tab to ask queries about your ad performance.
Contributing
Feel free to fork the repository, submit issues, or make pull requests. Contributions are welcome!

License
This project is licensed under the MIT License.

This README covers the frontend setup. Do you want me to write a separate README for the backend as well? 🚀