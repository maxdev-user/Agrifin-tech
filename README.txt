INFO: 2025/12/07 (日) - Setup

npm i
  express: full stack
  pg: postgre database
  bcryptjs: hash/compare passwords securely
  jsonwebtoken: generate/verify gvt tokens
  cookie-parser: read gvt cookies
  dotenv: manage env variables

dependencies
nmp i 
  nodemon -D

To use ES6 syntax, change the "type" in package.json from "commonjs" to "module".

To start server, change the "test" of "scripts" in package.json from "test" to
"start" and set the value as "node server.js", and change the "main" value
from "index.js" to "server.js" as well.

For development phase, change the package.json and add a key "dev" with value
"nodemon server.js" in "scripts" to restart the server automatically when
changes in code are detected.

To start the server execute: "npm run dev"

DB

  • install postgresql
  • setup postgis extention
    • enable the spatial component
    • select all packages
    • set the name of spatial database (gis)

  • enable posgis:
    CREATE EXTENSION IF NOT EXISTS postgis;

