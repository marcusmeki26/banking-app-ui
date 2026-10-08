### **Personal Project — Full-Stack Web Banking Application**

A full-stack personal project website to showcase my knowledge about how two application communicate with each other.
This full-stack personal project showcases my technical skills, professional experienc, and background with modern technology

The application consits of frontend and a dedicated backend using Java SpringBoot.
The application performs **CRUD operations**, inspired by day-to-day task of a **banking system**.

🌐 Live Demo: 
💻 Frontend: https://github.com/marcusmeki26/banking-app-ui
⚙️ Backend: https://github.com/marcusmeki26/banking-app

## **Overview**
This project is the frontend application of my personal project

It was designed and developed from stracth with a focus on:
- Clean and modern UI
- Reusable components
- Accessibility
- Smooth user interactions
- Shows a user friendly error handling message
- Integration with a custom backend API
The frontend communicates with the backend through the use of REST APIs to retreive and manage user interactions.

## **Features**
- Create new accounts
- View created accounts
- Deposit
- Withdrawal
- Transfer of funds
- View transaction history

## **Tech Stack**
The frotend is built using a lightweight web stack and follows a **Single Page Application (SPA)** architecture.
## **Core Technologies**
- **HTML** -- Used to structure the application's pages and UI elements
- **CCS3** -- Used for custom styling and layout
- **Javascript** -- Handles application logic, DOM creations and interactions, and communicates with the backend API
- **Vite** -- Used as the frontend development server and build tool
- **Axios** -- Used as the HTTP client for communicating with the dedicated backend API
- **Tailwind CSS v4** -- Used for utility-based styling

## **Architecture**
The frontend follows a Single Page Application (SPA) architecture. Instead of loading a separate HTML page for every application view, the frontend loads the application once and dynamically updates the UI as the user interacts with it.

The frontend communicates with the dedicated backend through HTTP requests using Axios:

┌──────────────────────────────────┐
│          Frontend SPA             │
│                                  │
│  HTML + CSS + JavaScript         │
│  Tailwind CSS v4                 │
│                                  │
│          Axios                   │
└───────────────┬──────────────────┘
                │
                │ HTTP / REST API
                ▼
┌──────────────────────────────────┐
│          Java Spring Boot        │
│                                  │
│       API / Business Logic       │
└───────────────┬──────────────────┘
                │
                ▼
┌──────────────────────────────────┐
│             MySQL                │
└──────────────────────────────────┘

## **Why These Technologies?**
The project intentionally uses **plain HTML, CSS, and JavaScript** rather than a frontend framework. This keeps the application lightweight while demonstrating the fundamental concepts behind API communication, and CRUD operations.

**Vite** provides the development and build environment, while **Axios** simplifies communication with the backend API. **Tailwind CSS v4** provides utility classes for building a responsive and consistent interface without requiring a large custom CSS codebase.

## **API Configuration**
The frontend communicates with the backend using an environment variable.
Example:
VITE_BE_BASE_PATH_V1 = http://localhost:8080

## **Installation**
1. Clone the repository
git clone marcusmeki26/banking-app-ui
2. Navigate to the frontend directory
cd frontend
3. Install dependencies
npm install
4. Configure environment variables
Create a .env file in the project root:

VITE_API_URL=http://localhost:5000/api
Make sure the URL points to the running backend API.

5. Start the development server
npm run dev
The frontend should now be available at the development URL provided by your frontend framework.

--- 
### **Author**
## **Your Name**

GitHub: [Github Profile](https://github.com/marcusmeki26)
Email: felixmenamarcus@gmail.com
Portfolio: [Personal Portfolio Website](https://marcusmeki26.github.io/)