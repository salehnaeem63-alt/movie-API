# Movie API

Movie API is a backend RESTful API for a movie rating website.

The system allows users to register, login, search for movies by name or year, rate movies, comment on movies, and view the highest-rated movies.

The API also includes admin management features, where admins can add, update, delete movies, upload movie images, and manage creators such as actors, directors, and writers.

---

## Features

### Authentication & Users

- User registration
- User login
- Password hashing using bcrypt
- JWT-based authentication
- Delete user
- Protected routes for logged-in users

### Admin Features

- Admin authorization
- Add new movies
- Update movie information
- Delete movies
- Upload movie images using Multer
- Manage movie creators

### Movie Features

- Get all movies
- Get movie by ID
- Search movies by name
- Search movies by year
- Rate movies
- Comment on movies
- View highest-rated movies

### Creator Features

- Add creator
- Get all creators
- Get creator by ID
- Search creator by name and work type
- Update creator
- Delete creator

---

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt
- Multer
- Joi
- Postman

---

## Project Structure

```bash
movie-api/
│
├── controllers/
│   ├── authController.js
│   ├── movieController.js
│   ├── creatorController.js
│   └── imageController.js
│
├── models/
│   ├── User.js
│   ├── Movie.js
│   └── Creator.js
│
├── routes/
│   ├── authRoutes.js
│   ├── movieRoutes.js
│   ├── creatorRoutes.js
│   └── imageRoutes.js
│
├── middleware/
│   ├── authMiddleware.js
│   └── adminMiddleware.js
│
├── uploads/
│
├── app.js
├── package.json
└── README.md
```

---

##  Installation and Setup

###  Clone the repository

```bash
git clone https://github.com/saleh-naeem/movie-API.git
cd movie-api
```

###  Install dependencies

```bash
npm install
```



### Run the project

```bash
node app
```

The server will run on:

```bash
http://localhost:3000
```

---

## 🔐 Authentication

Some routes are protected and require a JWT token.

After login, copy the token and send it in the request headers:

```http
Authorization: Bearer token
```

---

## API Endpoints

### Auth Routes

| Method | Endpoint | Description | Access |
|---|---|---|---|
| POST | `/api/aoth/regester` | Register new user | Public |
| POST | `/api/aoth/login` | Login user | Public |

Examples:

```http
POST http://localhost:3000/api/aoth/regester
POST http://localhost:3000/api/aoth/login
```


---

### Movie Routes

| Method | Endpoint | Description | Access |
|---|---|---|---|
| GET | `/api/movie` | Get all movies | Public |
| POST | `/api/movie` | Create new movie | Admin |
| GET | `/api/movie/:id` | Get movie by ID | Public |
| GET | `/api/movie?year=2020` | Search movies by year | Public |
| GET | `/api/movie?name=movieName` | Search movies by name | Public |
| POST / PUT | `/api/movie/rate/:id` | Rate a movie | Logged-in User |
| PUT | `/api/movie/:id` | Update movie | Admin |
| DELETE | `/api/movie/:id` | Delete movie | Admin |

Examples:

```http
GET http://localhost:3000/api/movie
GET http://localhost:3000/api/movie?year=2020
GET http://localhost:3000/api/movie/68f39ef64801b4603ffb1b69
POST http://localhost:3000/api/movie
POST http://localhost:3000/api/movie/rate/68f39ef64801b4603ffb1b69
```

---

### Creator Routes

| Method | Endpoint | Description | Access |
|---|---|---|---|
| GET | `/api/creator` | Get all creators | Public |
| POST | `/api/creator` | Create new creator | Admin |
| GET | `/api/creator/:id` | Get creator by ID | Public |
| GET | `/api/creator?workAS=actor&name=name` | Search creator by name and work type | Public |
| PUT | `/api/creator/:id` | Update creator | Admin |
| DELETE | `/api/creator/:id` | Delete creator | Admin |

Examples:

```http
GET http://localhost:3000/api/creator
POST http://localhost:3000/api/creator
GET http://localhost:3000/api/creator?workAS=actor&name=hasham%20maged
GET http://localhost:3000/api/creator/68ea3dec0587caa99e4075c7
```

---

### Image Upload Routes

| Method | Endpoint | Description | Access |
|---|---|---|---|
| POST | `/api/image/uplode` | Upload movie image | Admin |

Example:

```http
POST http://localhost:3000/api/image/uplode
```

---

## Testing

The API was tested using Postman.

You can test the API by sending requests to:

```bash
http://localhost:3000
```

For protected routes, include the JWT token in the request headers:

```http
Authorization: Bearer token
```

---

##  Main Dependencies

```json
{
  "express": "Backend framework",
  "mongoose": "MongoDB object modeling",
  "jsonwebtoken": "JWT authentication",
  "bcrypt": "Password hashing",
  "multer": "Image upload handling",
  "joi": "Input validation"
}
```

---

## User Roles

### User

Users can:

- Register
- Login
- View movies
- Search movies
- Rate movies
- Comment on movies

### Admin

Admins can:

- Add movies
- Update movies
- Delete movies
- Upload movie images
- Manage creators
- Manage users

---

##  what i do

I built the full backend API for this project, including:

- Designing and developing REST API endpoints
- Implementing user authentication and login system
- Adding JWT authorization
- Creating admin authorization
- Building movie CRUD operations
- Building creator CRUD operations
- Implementing movie rating and comments
- Adding image upload using Multer
- Connecting the API with MongoDB using Mongoose
- Testing the API using Postman
- Validating inputs using Joi

---

## Links

- GitHub Repository: `https://github.com/saleh-naeem/movie-API`

---

## 📄 License

This project is for learning and portfolio purposes.
