# Project Overview

This project is designed to facilitate user management by providing functionalities to display, add, and manage users in a database. It includes features such as checking if users already exist to display their associated posts and enabling users to save their posts. Additionally, the system supports the generation of an Excel file that compiles all posts for a specific user, enhancing data organization and accessibility.

## Deployed Links 
- Backend : https://cointab-1.onrender.com
- Frontend : https://tangerine-choux-32bba1.netlify.app/

## Technologies used:
- Nodejs 
- Expressjs
- HTML
- CSS
- Javascript


## npm packages used:
- express
- cors
- dotenv
- exceljs
- sequelize
- mysql2
- axios

## Directory Structure
|-- README.md
|-- backend
|   |-- db.js
|   |-- index.js
|   |-- models
|   |   |-- posts.model.js
|   |   |-- users.model.js
|   |-- package-lock.json
|   |-- package.json
|   |-- routes
|       |-- posts.routes.js
|       |-- users.routes.js
|-- frontend
    |-- index.html
    |-- post.html
    |-- scripts
    |   |-- post.js
    |   `-- script.js
    |-- styles
        |-- post.css
        |-- styles.css


## Features
- Add users to database
- Add user's posts to database
- Generate excel sheet with user's posts
![image](https://drive.google.com/uc?export=view&id=1Y0O-EvWvkxa2I6gcylc7WCnqo6ilF0Gx)
![image](https://drive.google.com/uc?export=view&id=1Tjk4EGfeOkHKxkgWH9aRhB99D3cBShXU)
![image](https://drive.google.com/uc?export=view&id=1YRzPBdeKJGacyZ1SiKQtACALu4mhacnP)




## API Endpoints:
- GET /users/
  - This endpoint will list out all the users data
- POST /users/
  - This endpoint is used to add new user in database
- GET /posts/
  - This endpoint gives the list of posts for a particular user . We send the userId in query as userId={id}
- POST /posts/
   - This endpoint is used to store all the posts of a user
 - GET /posts/download/:userId
    - This endpoint is used to download all the posts of a user in an excel sheet
   
# Video
[Video walkthrough](https://drive.google.com/uc?export=view&id=1XGxaDIIigwCiIL5YfwRhpXJsLxLw0Ymo)


