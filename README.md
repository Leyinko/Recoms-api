# Recoms-API

![Recoms-API](public/assets/readme/Recoms-API.png)

## Table of Contents

1. [Features](#features)
2. [Getting Started](#getting-started)
3. [Usage](#usage)
4. [Screenshots](#screenshots)

# Recoms-API Documentation

Recoms-API is a versatile application that enables users to create and manage customizable collections of item recommendations. Users can build personal collections, update or delete items, and store them in a centralized database. These collections can be used for personal storage or shared with other users on the platform.

## Features

- Vite-Express integration for seamless front-end and server-side development
- Express.js backend with MongoDB database management
- Centralized database structured into partitions for users, collections, and recommendations
- Authentication, token-based authorization, role-based access control, and secure session management
- Advanced bulk data seeding via script commands
- Cloudinary integration for image storage and management
- Development and Production modes for flexible exploration and deployment

## Getting Started

1. Clone the repository to a local folder
2. Navigate to the project directory
3. Run the build command to create the `/dist` folder:

```
npm run build
```

### Environment Setup

Create and configure a `.env` file in the project root with the following structure:

![Environment Setup](public/assets/readme/.env.png)

1. Set the MongoDB URL
2. Define a custom string for token generation
3. Add your Cloudinary API credentials
4. Set your base URL

Ensure that `VITE_API_URL` points to your local launch point and API base route for proper API fetching.

#### Optional: Database Naming

Name your MongoDB cluster in the URL to avoid the default 'test' name:

```
DB_URL=mongodb+srv://`<user>`:`<password>`@recoms-api.quack.mongodb.net/YOUR-DB-NAME?
```

## Usage

### Seeding Data

To populate the database and explore all features:

```
npm run seed All
```

Alternatively, create a new account on the Connect page to get started.

For customized bulk loading, check the `seeds.js` file.

### Running the Application

- Official deployment: [Recoms-API on Render](https://recoms-api.onrender.com/login)
- Local development: `npm run dev`
- Production simulation: `npm run start`

Note: Free Render instances may have a 50+ second delay on first load due to inactivity spin-down.

## Tech Stack

<div style="display:flex; gap: 10px;">
<img src="https://user-images.githubusercontent.com/25181517/192158954-f88b5814-d510-4564-b285-dff7d6400dad.png" alt="HTML" title="HTML" width="40">
<img src="https://user-images.githubusercontent.com/25181517/183898674-75a4a1b1-f960-4ea9-abcb-637170a00a75.png" alt="CSS" title="CSS" width="40">
<img src="https://user-images.githubusercontent.com/25181517/117447155-6a868a00-af3d-11eb-9cfe-245df15c9f3f.png" alt="JavaScript" title="JavaScript" width="40">
<img src="https://user-images.githubusercontent.com/25181517/182884177-d48a8579-2cd0-447a-b9a6-ffc7cb02560e.png" alt="mongoDB" title="mongoDB" width="40">
<img src="https://user-images.githubusercontent.com/25181517/183859966-a3462d8d-1bc7-4880-b353-e2cbed900ed6.png" alt="Express" title="Express" width="40">
<img src="https://user-images.githubusercontent.com/25181517/183568594-85e280a7-0d7e-4d1a-9028-c8c2209e073c.png" alt="Node.js" title="Node.js" width="40">
<img src="https://github-production-user-asset-6210df.s3.amazonaws.com/62091613/261395532-b40892ef-efb8-4b0e-a6b5-d1cfc2f3fc35.png" alt="Vite" title="Vite" width="40">
</div>

## Screenshots

![Profile](public/assets/readme/Profile.png)
![Update](public/assets/readme/Profile-update.png)
![Explore](public/assets/readme/Explore.png)
![Admin](public/assets/readme/Admin.png)
![Admin Access](public/assets/readme/admin-manage.png)
![Responsive](public/assets/readme/responsive.png)
