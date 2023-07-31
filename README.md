# Patient Management
**Patient Management** is a mock web application that allows medical professionals to manage their patient data, including customizable fields. It includes an email/password based authentication system, and is backed by a MongoDB store. This README provides instructions for setting up and running both the frontend and backend components of the application.

## Backend Setup and Running

1. Install the required dependencies:

```shell
cd backend
npm install
```

2. Set up environment variables by creating a `.env` file and populating it with the necessary values. Example file can be found in `backend/.env.example`.

3. Start the backend server:

```shell
npm start
```

The backend server will run at [localhost:8000](http://localhost:8000).

**Note**: Make sure you have MongoDB set up and running.

## Frontend Setup and Running

1. Install the required dependencies:

```shell
cd frontend
npm install
```

2. Set up environment variables by creating a `.env.local` file and populating it with the necessary values. Example file can be found in `frontend/.env.example`.

3. Start the frontend server:

```shell
npm start
```

The frontend server will run at [localhost:3000](http://localhost:3000). You can access the running application by opening this URL in your web browser.
