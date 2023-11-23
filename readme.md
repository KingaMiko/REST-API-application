# REST API for Contact Management

This project is a RESTful API developed for managing a contact list. It allows users to create, read, update, and delete contact information. Additionally, it includes user authentication and avatar management features.

## Introduction

This API was created as a part of a learning project to understand the fundamentals of Node.js, Express, MongoDB, and implementing user authentication. It demonstrates the ability to set up a secure RESTful API service with a focus on good practices for authentication and file handling.

## Technologies

<ul> 
<li>Node.js</li>
<li>Express.js</li>
<li>MongoDB</li>
<li>Mongoose</li>
<li>JWT (JSON Web Tokens) for authentication</li>
<li>Passport.js for authentication strategies</li>
<li>Multer for file upload</li>
<li>Jimp for image processing</li>
<li>SendGrid for email verification</li>
<li>Jest for testing</li>
<li>Swagger for API documentation</li>
</ul>

## Instalation

To run this project locally, follow these steps:

```bash
git clone https://github.com/kingamiko/REST-API-application.git
cd your-repo-name
npm install
npm start
```

## Usage

Once the server is running, you can access the API endpoints. The Swagger documentation is available at http://localhost:3000/api-docs for detailed information about each endpoint.

## Features

<ul>
<li>CRUD operations for contact management</li>
<li>User registration, login, and email verification</li>
<li>Password encryption</li>
<li>JWT based authentication with Passport</li>
<li>Avatar upload with image resizing</li>
<li>Email notifications for account verification (SendGrid)</li>
<li>Swagger documentation for easy API testing and interaction</li>
</ul>

## License

This project is open-sourced under the [MIT License](LICENSE).

## Author

[Kinga Mikołajczyk](https://github.com/kingamiko)
