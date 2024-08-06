# Groupo
A full-stack solution implementing React, Node, and PostgreSQL.

## Install depndencies
Run `npm i`

## Setup
1. Create frontend file structure
  - src
    - App.jsx
    - App.css
    - index.html
    - index.jsx
  - webpack.config.js
  - .babelrc

2. Fill frontend files with minimum starter code
  * Note: Ignore the proxy in webpack.config.js for now

3. Add frontend script to package.json
  - "devf": "webpack serve --open --hot"

4. Create backend file structure
  - server
    - server.js
    - controllers
      - user.js
      - post.js
      - views.js
    - routes
      - user.js
      - post.js
      - views.js
    - middleware
      - upload.js

5. Add backend script to package.json
  - "defb": "nodemon server/server"
    
6. Download PostgreSQL, create a server, and connect to a database (usersdb)
   * Note: Once the database is created and server started, run the create commands in the queries folder
     - Using the psql command line tool, you can type \i queries/create-users.sql to run the file that creates the users table
     - Run `psql -p 5445` to connect on port 5445. Then when connected, run `\c usersdb' to connect to database
  
