# 🚀 AdAnalyzer Frontend  

## 📌 Overview  
**AdAnalyzer Frontend** is a **React TypeScript** application built with **Create React App (CRA)**. It allows users to upload **CSV files** containing ad performance data and analyze the results effectively.  

### 🔥 Features  
✅ **Detailed Ad Performance Analysis** – Categorizes keywords into **well-performing** and **underperforming** groups.  
✅ **Data Visualization** – Displays raw data through an **interactive chart**.  
✅ **AI-Powered Chat Assistant** – Ask queries about your ad performance via an **LLM-powered chat**.  
✅ **Dockerized Environment** – Ensures smooth operation across different systems using **Docker**.  

> This application is part of the **AdAnalyzer** system, which includes both a **frontend** and **backend**.  

---

## 🛠 Prerequisites  
Ensure you have the following installed before setting up the project:  

- **[Docker](https://www.docker.com/)** – For containerization  
- **[Docker Compose](https://docs.docker.com/compose/)** – For managing multiple containers  
- **[Node.js](https://nodejs.org/)** – For development and package management  
- **[npm](https://www.npmjs.com/)** – Node Package Manager  
- **[Create React App (CRA)](https://create-react-app.dev/)** – For bootstrapping the frontend  

---

## 🚀 Installation & Setup  

### 1️⃣ Clone the Frontend Repository  
```sh
git clone https://github.com/Kanha-13/adanalyzer-frontend
cd adanalyzer-frontend
```

### 2️⃣ Install Dependencies  
```sh
npm install
```

### 3️⃣ Start the Development Server  
```sh
npm start
```
The application will be available at **[http://localhost:3000](http://localhost:3000)**.  

---

## 🌍 Environment Variables  

Before running the frontend, set up environment variable files inside `adanalyzer-frontend/`.  

#### **Development (`.env`)**  
```env
REACT_APP_API_URL=http://localhost:5000
```

#### **Production (`.env.production`)**  
```env
REACT_APP_API_URL=http://localhost:5000
```

This ensures that the frontend correctly communicates with the backend.  

---

## 🐳 Running with Docker  

If you want to run the frontend inside a **Docker container**, follow these steps:  

### 1️⃣ Create a Root Project Directory  
```sh
mkdir adanalyzer && cd adanalyzer
```

### 2️⃣ Set Up `docker-compose.yml`  
Create a file named `docker-compose.yml` inside `adanalyzer/` and add the following content:  

```yaml
version: '3.8'
services:
  react-app:
    build:
      context: ./adanalyzer-frontend
      dockerfile: Dockerfile
    ports:
      - "3000:80" # Map React app's port 80 to host's port 3000
    depends_on:
      - nodejs-app

  nodejs-app:
    build:
      context: ./adanalyzer-backend
      dockerfile: Dockerfile
    ports:
      - "5000:5000" # Map Node.js app's port 5000 to host's port 5000
    environment:
      - NODE_ENV=production

```

👉 **Note:** The frontend depends on the backend. Refer to the **[backend repository](https://github.com/Kanha-13/adanalyzer-backend)** for backend setup instructions.  

### 3️⃣ Clone the Backend Repository  
```sh
git clone https://github.com/Kanha-13/adanalyzer-backend
```

### 4️⃣ Build and Run the Containers  
#### 🏗 Build Docker Images  
```sh
docker-compose build
```  
#### 🚀 Start the Containers  
```sh
docker-compose up
```  

Once running, the frontend will be available at **[http://localhost:3000](http://localhost:3000)**.  

---

## 🏆 Usage  

1️⃣ **Upload** your CSV file containing ad performance data.  
2️⃣ Click **"Analyze"** to categorize keywords into **well-performing** and **underperforming** groups.  
3️⃣ **Visualize** data with an interactive **chart**.  
4️⃣ Use the **AI-powered chat assistant** to query ad performance insights.  

---

## 🤝 Contributing  

We welcome contributions! 🚀  

💡 **Ways to Contribute:**  
- Fork the repository  
- Submit issues  
- Create pull requests  

🔗 **Fork the repo & start contributing:**  
```sh
git clone https://github.com/Kanha-13/adanalyzer-frontend.git
cd adanalyzer-frontend
npm install
npm start
```

---

## 📜 License  

This project is licensed under the **MIT License**.  

---

🚀 _For backend setup, check out the [AdAnalyzer Backend](https://github.com/Kanha-13/adanalyzer-backend)._ 🚀 
