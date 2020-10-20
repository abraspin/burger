// *********************************************************************************
// CONNECTION.JS - THIS FILE INITIATES THE CONNECTION TO MYSQL
// *********************************************************************************

// Require mysql
const mysql = require("mysql");

// Set up our connection information
const connection;

if(process.env.JAWSDB_URL){
  
connection = mysql.createConnection(process.env.JAWSDB_URL)
}

else{
  connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "pV2XnNfDhy3jTWEe",
    database: "burgers_db",
  });
}

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error(`Error connecting to DB: ${err.message}`);
    return;
  }
  console.log(`Connected to DB with connection ID ${connection.threadId}`);
});

// Export connection
module.exports = connection;
