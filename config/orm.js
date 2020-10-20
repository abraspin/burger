const connection = require("./connection.js");

// Object Relational Mapper (ORM)

// The ?? signs are for swapping out table or column names
// The ? signs are for swapping out other values
// These help avoid SQL injection
// https://en.wikipedia.org/wiki/SQL_injection

// Helper function for SQL syntax.
// Let's say we want to pass 3 values into the mySQL query.
// In order to write the query, we need 3 question marks.
// The above helper function loops through and creates an array of question marks - ["?", "?", "?"] - and turns it into a string.
// ["?", "?", "?"].toString() => "?,?,?";
function printQuestionMarks(num) {
  let arr = [];

  for (let i = 0; i < num; i++) {
    arr.push("?");
  }

  return arr.toString();
}

// Helper function to convert object key/value pairs to SQL syntax
function objToSql(obj) {
  const arr = [];

  // loop through the keys and push the key/value as a string int arr
  for (let key in obj) {
    let value = obj[key];
    // check to skip hidden properties
    if (Object.hasOwnProperty.call(obj, key)) {
      // if string with spaces, add quotations
      if (typeof value === "string" && value.indexOf(" ") >= 0) {
        value = `'${value}'`;
      }
      // e.g. {devoured: true} => ["devoured=true"]
      arr.push(`${key}=${value}`);
    }
  }

  // translate array of strings to a single comma-separated string
  return arr.toString();
}

const orm = {
  //////SELECT ALL /////
  selectAll: (table, cb) => {
    const queryString = `SELECT * FROM ${table}`;

    connection.query(queryString, (err, result) => {
      if (err) {
        throw err;
      }
      // console.log(`Compiled SQL: ${query.sql}`);
      // console.log(result);
      cb(result);
    });
  },

  //////INSERT ONE /////
  insertOne: (table, cols, vals, cb) => {
    let queryString = `INSERT INTO ${table}`;

    queryString += " (";
    queryString += cols.toString();
    queryString += ") ";
    queryString += "VALUES (";
    queryString += printQuestionMarks(vals.length);
    queryString += ") ";

    console.log("Insert One query string:", queryString);

    connection.query(queryString, vals, (err, result) => {
      if (err) {
        throw err;
      }

      cb(result);
    });
  },

  //////UPDATE ONE /////

  // An example of objColVals would be {name: cheeseburger, devoured: true}
  updateOne: (table, objColVals, condition, cb) => {
    let queryString = `UPDATE ${table}`;

    queryString += " SET ";
    queryString += objToSql(objColVals);
    queryString += " WHERE ";
    queryString += condition;

    console.log("update one query string:", queryString);
    connection.query(queryString, (err, result) => {
      if (err) {
        throw err;
      }

      cb(result);
    });
  },
};
//
//
// Examples below

/*
  selectWhere: (table, colToSearch, valOfCol) => {
    const queryString = "SELECT * FROM ?? WHERE ?? = ?";
    console.log(queryString);
    const query = connection.query(queryString, [table, colToSearch, valOfCol], (err, result) => {
      if (err) {
        throw err;
      }
      console.log(`Compiled SQL: ${query.sql}`);
      console.log("Result(s): ", result);
    });
  },

  selectAndOrder: (whatToSelect, table, orderCol) => {
    const queryString = "SELECT ?? FROM ?? ORDER BY ?? DESC";
    console.log(queryString);
    connection.query(queryString, [whatToSelect, table, orderCol], (err, result) => {
      if (err) {
        throw err;
      }
      console.log(result);
    });
  },
  findWhoHasMost: (tableOneCol, tableTwoForeignKey, tableOne, tableTwo) => {
    const queryString =
      "SELECT ??, COUNT(??) AS count FROM ?? LEFT JOIN ?? ON ??.??= ??.id GROUP BY ?? ORDER BY count DESC LIMIT 1";
    console.log(`Unpopulated SQL: ${queryString}`);
    const query = connection.query(
      queryString,
      [tableOneCol, tableOneCol, tableOne, tableTwo, tableTwo, tableTwoForeignKey, tableOne, tableOneCol],
      (err, result) => {
        if (err) {
          throw err;
        }
        console.log(`Compiled SQL: ${query.sql}`);
        console.log("Result(s): ", result);
      }
    );
  },
};
*/

module.exports = orm;
