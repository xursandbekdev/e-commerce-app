# 🛍️ E-Commerce App

![Logo](https://user-images.githubusercontent.com/your-user-id/logo.png)  
**Live Demo:** [https://e-commerce-app-theta-snowy.vercel.app](https://e-commerce-app-theta-snowy.vercel.app)  
**GitHub Repository:** [https://github.com/xursandbekdev/e-commerce-app](https://github.com/xursandbekdev/e-commerce-app)  

---

## 📌 Project Overview

This project is a modern, fully functional online shopping platform built with React and TypeScript.  
Users can browse products, search, add to cart, and perform secure online checkout.  

**Technologies Used:** React, TypeScript, TailwindCSS, Vite, React Router, Context API, Stripe.

---

## ⚙️ Key Features

- **Product Listing & Search:** Filter products by category or search by name
- **Product Details:** Image, price, description, and reviews
- **Shopping Cart:** Add/remove items, update quantity, view total
- **Checkout & Payment:** Stripe integration for secure payments
- **User Authentication:** Login and registration system
- **Responsive Design:** Mobile, tablet, and desktop friendly
- **Light/Dark Mode Toggle**
- **Admin Panel:**  
  - Add, update, delete products  
  - Manage categories  
  - View all orders and order details  
  - Manage users

---

## 🎨 Screenshots

**Home Page:**  
![Home Page](https://user-images.githubusercontent.com/your-user-id/homepage.png)

**Product Detail:**  
![Product Detail](https://user-images.githubusercontent.com/your-user-id/product-detail.png)

**Cart & Checkout:**  
![Cart & Checkout](https://user-images.githubusercontent.com/your-user-id/cart-checkout.png)

**Admin Panel:**  
![Admin Panel](https://user-images.githubusercontent.com/your-user-id/admin-panel.png)

**GIF Demo:**  
![Demo](https://user-images.githubusercontent.com/your-user-id/demo.gif)

---

## 🛠️ Tech Stack

| Frontend | Backend | State Management | Styling | Testing |
|----------|---------|-----------------|---------|---------|
| React    | -       | Context API     | TailwindCSS | Jest, React Testing Library |
| TypeScript | -     | -               | -       | -       |
| Vite     | -       | -               | -       | -       |

---

## 📁 Folder Structure

```bash
src/
├── assets/           # Images and icons
├── components/       # Reusable UI components
├── context/          # Global state management
├── pages/            # Page components
├── services/         # API calls
├── styles/           # TailwindCSS configurations
├── utils/            # Helper functions
└── App.tsx           # Application entry point
🧪 Testing
The project uses Jest and React Testing Library.
Run tests with:

bash
Копировать код
npm run test
Test coverage:

makefile
Копировать код
Statements: 78%
Branches: 76%
Functions: 57%
Lines: 78%
🚀 Local Development
Clone the repository:

bash
Копировать код
git clone https://github.com/xursandbekdev/e-commerce-app.git
cd e-commerce-app
Install dependencies:

bash
Копировать код
npm install
Start the development server:

bash
Копировать код
npm run dev
Visit: http://localhost:5173

🌐 CI/CD with Vercel
GitHub main branch is integrated with Vercel.

Each push to main triggers automatic deployment.

Vercel pipeline:

Push trigger

npm install and npm run build

Successful build is deployed automatically

## 🛠️ Environment Variables

Create a `.env` file in the root of the project with the following variables:

```env
VITE_API_URL=VITE_API_URL

🤝 Contributing
Fork the project

Create a new branch

Make your changes

Submit a Pull Request

📄 License
MIT License. See LICENSE