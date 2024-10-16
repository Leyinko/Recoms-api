# Recoms-API

![Recoms-API](public/assets/readme/Recoms-API.png)
<br>

Recoms-API is a simple application that enables users to create customizable collections of item recommendations. Users can build personal collections, update or delete items, and store them in a centralized database. These collections can either be used for personal storage or shared with other users on the platform. The database supports user accounts and multiple collections, with features for categorization and content management.
<br>
<br>

## Features

- Built with the Vite-Express package, integrating both the front-end and server-side.
- Backend implemented with Express.js and database management using MongoDB.
- Centralized database, structured into partitions for users, collections, and recommendations.
- Includes authentication, token-based authorization, role-based access control, and secure session management.
- Advanced bulk data seeding via script commands, or with special Reset admin-only process accessible through the frontend.
- Cloudinary image storage and management with logic and folder organization for updating, deleting images to maintain synchronized storage on every action on the database.
- App accessible throught the deployment link, or run locally by cloning the repository and setting up a custom .env configuration for a detailed experience.
- Log window displays messages for database updates and system notifications.
  <br>
  <br>

## Setting up

First, configure the `.env` file to match your environment settings:

![Explore](public/assets/readme/.env.png)

1- Set the MongoDB URL. <br>
2- Define a JSON Web Token (JWT) key for token generation. <br>
3- Add your Cloudinary API credentials for image management. <br>
4- Set the VITE_API_URL.<br>
<br>
Ensure that the `VITE_API_URL` points to your local launch point and API base route.
Correct configuration is essential for proper API fetching.

The application includes an AppStats signal on the home login page, which retrieves your database name and other details.
Make sure to name your MongoDB cluster in the URL, as MongoDB will default to 'test' if the name is not set.

The database name should be placed between `mongodb.net/` and the `?` in the URL, like so:
`DB_URL=mongodb+srv://<user>:<password>@recoms-api.quack.mongodb.net/NAME?`

![Explore](public/assets/readme/App-stats.png)

## Seeding Data to Start

Run the `npm run seed All` command in the console to populate the database and explore the app’s features.
The Admin dashboard includes a button to trigger the seeding script directly from the interface for easier setup or resets.

You can also customize your seed data to bulk load only Users, Collections, or Recommendations, depending on your needs.
Check the `seeds.js` file for details.
<br>
<br>

## Launch and Explore

You can use Recoms-API officially via [Recoms-API](https://recoms-api.onrender.com/login) on Render or install it locally with [Node.js](https://nodejs.org/) v10+ to run.
Render has a policy for free instance that will spin down for inactivity, which can delay requests by 50 seconds or more - Be patient on first loading!

## Techs

<div style="display:flex">
<img src="https://user-images.githubusercontent.com/25181517/192158954-f88b5814-d510-4564-b285-dff7d6400dad.png" alt="HTML" title="HTML" style="width:40px">
<img src="https://user-images.githubusercontent.com/25181517/183898674-75a4a1b1-f960-4ea9-abcb-637170a00a75.png" alt="CSS" title="CSS"" alt="HTML" title="HTML" style="width:40px">
<img src="https://user-images.githubusercontent.com/25181517/117447155-6a868a00-af3d-11eb-9cfe-245df15c9f3f.png" alt="JavaScript" title="JavaScript"" alt="HTML" title="HTML" style="width:40px">
<img src="https://user-images.githubusercontent.com/25181517/182884177-d48a8579-2cd0-447a-b9a6-ffc7cb02560e.png" alt="mongoDB" title="mongoDB"" alt="HTML" title="HTML" style="width:40px">
<img src="https://user-images.githubusercontent.com/25181517/183859966-a3462d8d-1bc7-4880-b353-e2cbed900ed6.png" alt="Express" title="Express"" alt="mongoDB" title="mongoDB"" alt="HTML" title="HTML" style="width:40px">
<img src="https://user-images.githubusercontent.com/25181517/183568594-85e280a7-0d7e-4d1a-9028-c8c2209e073c.png" alt="Node.js" title="Node.js"" alt="Express" title="Express"" alt="mongoDB" title="mongoDB"" alt="HTML" title="HTML" style="width:40px">
<img src="https://github-production-user-asset-6210df.s3.amazonaws.com/62091613/261395532-b40892ef-efb8-4b0e-a6b5-d1cfc2f3fc35.png" alt="Vite" title="Vite"" alt="Node.js" title="Node.js"" alt="Express" title="Express"" alt="mongoDB" title="mongoDB"" alt="HTML" title="HTML" style="width:40px">
</div>

## Screenshots

![Explore](public/assets/readme/Explore.png)
![Update](public/assets/readme/Profile-update.png)
![Profile](public/assets/readme/Profile.png)
![Admin-access](public/assets/readme/admin-manage.png)
![Admin](public/assets/readme/Admin.png)
