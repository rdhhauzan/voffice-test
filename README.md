# voffice-test

## Presequites
- PHP Ver. 8.2.0
- phpMyAdmin Ver. 5.2.0

## Tech Stack Uses
- Backend : NodeJs
- Frontend : ReactJs

## Installations

1. Clone the Repo 
```git
https://github.com/rdhhauzan/voffice-test.git
```

2. Install Requirement for Backend
```cmd
cd backend/
```
```npm
npm install
```

3. Change the config file according to your database on backend/config/config.json
```json
"development": {
    "username": "your database username",
    "password": "your database password (set to null without quotation mark if your database dont have a password)",
    "database": "voffice-test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
```

4. Create DB and Migrate
```npm
npx sequelize-cli db:create
```

```npm
npx sequelize-cli db:migrate
```

5. Move to Frontend Folder
```cmd
cd frontend/
```

6. Install Requirement for Frontend
```npm
npm install
```

## How To Run
1. Run Backend Server
```cmd
cd backend/
```
```npm
npx nodemon app.js
```

2. In new terminal, Run Frontend
```cmd
cd frontend/
```
```npm
npm start
```

## Notes
1. If you run the app, make sure you have 2 terminals open because you are running 2 servers at the same time  
2. Make sure you run the backend server on port 3000
