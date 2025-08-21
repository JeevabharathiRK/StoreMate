# StoreMate

[![Website](https://img.shields.io/badge/Live%20Site-StoreMate-blue?logo=netlify)](https://store-mate.netlify.app/)

<img width="1869" height="915" alt="StoreMate Screenshot" src="https://github.com/user-attachments/assets/c2c0c7cc-3e01-4692-9eeb-3268f5e7341f" />

## Overview

**StoreMate** is an open-source, small-scale retail + CRM web application designed for local retailers and small businesses. It combines robust product/inventory management with customer relationship features.

Visit the live site: [store-mate.netlify.app](https://store-mate.netlify.app/)

## Features

- 🛒 Product and inventory management
- 👥 Customer relationship management (CRM)
- 🧾 Sales/order tracking
- 🔍 Advanced search and filtering
- ⭐ Wishlist and product reviews
- 📊 Basic analytics and reporting
- 📱 Responsive design (mobile & desktop)

## Tech Stack

- **Frontend:** React + Vite, Tailwind CSS
- **Backend:** Java Spring Boot (Gradle)
- **Database:** MySQL

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher)
- [Java JDK](https://adoptopenjdk.net/) (v11 or higher)
- [Gradle](https://gradle.org/) (v8.14 or higher with Java 24)
- [MySQL](https://www.mysql.com/) (v8.x recommended)

### Installation

#### 1. Clone the repository

```bash
git clone https://github.com/JeevabharathiRK/StoreMate.git
cd StoreMate
```
```bash
git clone https://github.com/JeevabharathiRK/StoreMateAPI.git
cd StoreMateAPI
```

#### 2. Start the Backend

- Go to the backend directory:
  ```bash
  cd StoreMateAPI
  ```
- Set up your SQL database and configure the database connection properties in `src/main/resources/application.properties`.
- Build and start the Spring Boot server:
  ```bash
  gradle bootRun
  ```

#### 3. Start the Frontend

- Open a new terminal and go to the frontend directory:
  ```bash
  cd StoreMate
  ```
- Install dependencies:
  ```bash
  npm install
  ```
- Start the Vite development server:
  ```bash
  npm run dev
  ```
- Visit [http://localhost:5173](http://localhost:5173) in your browser (default Vite port).

## Contributing

StoreMate is open to contributions! If you have suggestions, bug fixes, or new features, please open an issue or submit a pull request.

## Contributors

Thanks to these amazing people for their contributions!

<a href="https://github.com/JeevabharathiRK/StoreMate/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=JeevabharathiRK/StoreMate" />
</a>

## License

This project is licensed under the [MIT License](LICENSE).

## Contact

If you have any questions or feedback, please don't hesitate to open an issue or reach out.

---

> Made with ❤️ by JeevabharathiRK
