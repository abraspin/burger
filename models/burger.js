// Import the ORM to create functions that will interact with the database.
const orm = require("../config/orm.js");

const burger = {
  selectAll: (cb) => {
    orm.selectAll("burgers", (res) => {
      cb(res);
    });
  },
  // The variables cols and vals are arrays.
  insertOne: (cols, vals, cb) => {
    orm.insertOne("burgers", cols, vals, (res) => {
      cb(res);
    });
  },
  updateOne: (objColVals, condition, cb) => {
    orm.updateOne("burgers", objColVals, condition, (res) => {
      cb(res);
    });
  },
  deleteOne(condition, cb) {
    orm.deleteOne("burgers", condition, (result) => {
      cb(result);
    });
  },
};

// Export the database functions for the controller (burgers_Controller.js).
module.exports = burger;
