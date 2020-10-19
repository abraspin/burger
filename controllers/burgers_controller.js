const express = require("express");

const router = express.Router();

// Import the model (burger.js) to use its database functions.
const burger = require("../models/burger.js");

// Create all our routes and set up logic within those routes where required.
router.get("/", (req, res) => {
  burger.selectAll((data) => {
    const viewData = {
      burgers: data,
    };
    console.log("router.get view data ------------.", viewData);
    res.render("index", viewData);
  });
});

router.post("/", (req, res) => {
  burger.insertOne(["burger_name", "devoured"], [req.body.burger_name, req.body.devoured], (result) => {
    // Send back the ID of the new quote
    //TODO: what's this?
    res.json({ id: result.insertId });
  });
});

router.put("/", (request, response) => {
  const condition = { devoured: request.body.devoured };

  console.log("condition", condition);

  burger.update({ devoured: request.body.devoured }, condition, (result) => {
    if (result.changedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return response.status(404).end();
    }
    response.status(200).end();
  });
});

// Export routes for server.js to use.
module.exports = router;
