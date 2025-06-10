# InstaRent Backend

### Overview
InstaRent is a comprehensive property rental platform that enables users to list, search, and manage rental properties with real-time communication capabilities. This repository contains the backend system built with Node.js, providing RESTful APIs and WebSocket connections for web and mobile clients.

### Project Structure
```
instarent-backend/
├── src/                    # Source code
│   ├── config/            # Configuration files
│   ├── controllers/       # Route controllers
│   ├── drizzle/          # Drizzle ORM configurations
│   ├── lib/              # Utility functions and libraries
│   ├── middlewares/      # Express middlewares
│   ├── models/           # Database models
│   ├── routes/           # API routes
│   ├── schemas/          # Validation schemas
│   ├── sequelize/        # Sequelize ORM configurations
│   ├── app.js            # Express application setup
│   └── server.js         # Server entry point
├── instarent/            # Bruno API collections
├── public/               # Static files
├── data/                 # Data files
├── better-auth_migrations/ # Authentication migrations
├── package.json          # Project dependencies
└── README.md            # Project documentation
```

### API Documentation
The API documentation is available at `/api-docs` when running the server locally.

### Bruno API Collections
API requests and collections for testing are available in the `/instarent` directory. These collections can be imported into Bruno for testing the API endpoints.

### Technology Stack

| Component                   | Technology    | Version | Purpose                             |
| --------------------------- | ------------- | ------- | ----------------------------------- |
| **Runtime**                 | Node.js       | Latest  | JavaScript runtime environment      |
| **Web Framework**           | Express.js    | ^4.21.2 | HTTP server and REST API framework  |
| **Real-time Communication** | Socket.IO     | ^4.8.1  | WebSocket-based real-time messaging |
| **Database ORM**            | Sequelize     | ^6.37.6 | Primary PostgreSQL ORM              |
| **Alternative ORM**         | Drizzle ORM   | ^0.41.0 | Serverless database operations      |
| **Database**                | PostgreSQL    | ^8.14.1 | Primary relational database         |
| **Serverless DB**           | Neon Database | ^0.10.4 | Serverless PostgreSQL hosting       |
| **Authentication**          | better-auth   | ^1.2.5  | Authentication framework            |
| **Token Management**        | jsonwebtoken  | ^9.0.2  | JWT token handling                  |
| **Password Hashing**        | bcrypt        | ^5.1.1  | Secure password encryption          |
| **Validation**              | Zod           | ^3.24.2 | Schema validation and type safety   |
| **File Upload**             | Multer        | ^2.0.1  | Multipart form data handling        |
| **Image Storage**           | Cloudinary    | ^2.6.0  | Cloud-based image management        |
| **CORS**                    | cors          | ^2.8.5  | Cross-origin resource sharing       |

### Core System Components

The backend consists of five primary functional systems:

1. **Property Management System**
   - Property listings
   - Search and filtering
   - Property details management

2. **Chat System**
   - Real-time messaging
   - Message history
   - User notifications

3. **User Management System**
   - Authentication
   - User profiles
   - Role-based access control

4. **Image Management System**
   - Property image upload
   - Image optimization
   - Cloud storage integration

5. **Feature Management System**
   - System features configuration
   - Feature flags
   - System settings

### Development Setup

1. **Prerequisites**
   - Node.js (Latest LTS version)
   - PostgreSQL
   - npm or yarn

2. **Installation**
   ```bash
   # Clone the repository
   git clone [repository-url]

   # Install dependencies
   npm install

   # Set up environment variables
   cp .env.example .env
   ```

3. **Configuration**
   - Configure your `.env` file with necessary credentials
   - Set up database connections
   - Configure Cloudinary credentials for image management

4. **Running the Application**
   ```bash
   # Development mode
   npm run dev

   # Production mode
   npm start
   ```

### Contributing
Please read our contributing guidelines before submitting pull requests.

### License
This project is licensed under the GNU General Public License v3.0 - see the [LICENSE](LICENSE) file for details.

