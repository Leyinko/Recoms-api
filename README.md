# Recoms-API

![Recoms-API](public/assets/readme/Recoms-API.png)
<br>

Recoms-API is a simple application that enables users to create customizable collections of item recommendations. Users can build personal collections, update or delete items, and store them in a centralized database. These collections can either be used for personal storage or shared with other users on the platform.
<br>

### Features

- Built with the Vite-Express package, integrating both the front-end and server-side.
- Backend implemented with Express.js and database management using MongoDB.
- Centralized database, structured into partitions for users, collections, and recommendations.
- Includes authentication, token-based authorization, role-based access control, and secure session management.
- Advanced bulk data seeding via script commands.
- Advanced Cloudinary image storage and management.
- Both Development and Production modes to explore the application.
  <br>
  <br>

## Setting up

First, clone the repository in a local folder.<Br>
Launch the build command to create the `/dist` folder with the `npm run build`.

Create and configure a `.env` file to match the environment settings.

#### Follow the image below:

![Explore](public/assets/readme/.env.png)

1- Set the MongoDB URL. <br>
2- Define a customized string for token generation.<br>
3- Add your Cloudinary API credentials for images management. <br>
4- Set your base URL.<br>
<br>
Ensure that the `VITE_API_URL` points to your local launch point and API base route.
Correct configuration is essential for proper API fetching.

##### Optional

The application includes an initial signal on the home login page, which retrieves your database name and some others details.
Make sure to name your MongoDB cluster in the URL, as MongoDB will default to `test` if the name is not set.

The database name should be placed between `mongodb.net/` and the `?` in the URL, like so:

```
DB_URL=mongodb+srv://<user>:<password>@recoms-api.quack.mongodb.net/NAME-HERE?
```

### Seeding Data or Register to Start

Run the `npm run seed All` command in the console to populate the database and fully explore the App’s features or create a new account ont the Connect page to get started.

Check the `seeds.js` file for some customize bulk load details.
<br>
<br>

## Launch and Explore

Use Recoms-API officially via [Recoms-API](https://recoms-api.onrender.com/login) on Render or locally with [Node.js](https://nodejs.org/) as Development mode with `npm run dev` or as a Production simulation deployment with `npm run start` commands.

Keep in mind that Render has a policy for free instance that will spin down for inactivity, which can delay requests by 50 seconds or more - Be patient on first loading!
<br>
<br>

<div style="display:flex">
<img src="https://user-images.githubusercontent.com/25181517/192158954-f88b5814-d510-4564-b285-dff7d6400dad.png" alt="HTML" title="HTML" style="width:40px">
<img src="https://user-images.githubusercontent.com/25181517/183898674-75a4a1b1-f960-4ea9-abcb-637170a00a75.png" alt="CSS" title="CSS"" alt="HTML" title="HTML" style="width:40px">
<img src="https://user-images.githubusercontent.com/25181517/117447155-6a868a00-af3d-11eb-9cfe-245df15c9f3f.png" alt="JavaScript" title="JavaScript"" alt="HTML" title="HTML" style="width:40px">
<img src="https://user-images.githubusercontent.com/25181517/182884177-d48a8579-2cd0-447a-b9a6-ffc7cb02560e.png" alt="mongoDB" title="mongoDB"" alt="HTML" title="HTML" style="width:40px">
<img src="https://user-images.githubusercontent.com/25181517/183859966-a3462d8d-1bc7-4880-b353-e2cbed900ed6.png" alt="Express" title="Express"" alt="mongoDB" title="mongoDB"" alt="HTML" title="HTML" style="width:40px">
<img src="https://user-images.githubusercontent.com/25181517/183568594-85e280a7-0d7e-4d1a-9028-c8c2209e073c.png" alt="Node.js" title="Node.js"" alt="Express" title="Express"" alt="mongoDB" title="mongoDB"" alt="HTML" title="HTML" style="width:40px">
<img src="https://github-production-user-asset-6210df.s3.amazonaws.com/62091613/261395532-b40892ef-efb8-4b0e-a6b5-d1cfc2f3fc35.png" alt="Vite" title="Vite"" alt="Node.js" title="Node.js"" alt="Express" title="Express"" alt="mongoDB" title="mongoDB"" alt="HTML" title="HTML" style="width:40px">
</div>
<br>
<br>

## Screenshots

![Profile](public/assets/readme/Profile.png)
![Update](public/assets/readme/Profile-update.png)
![Explore](public/assets/readme/Explore.png)
![Admin](public/assets/readme/Admin.png)
![Admin-access](public/assets/readme/admin-manage.png)
![Responsive](public/assets/readme/responsive.png)
