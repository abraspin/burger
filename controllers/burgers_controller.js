const express = require("express");

const router = express.Router();

// Import the model (burger.js) to use its database functions.
const burger = require("../models/burger.js");

// Create all our routes and set up logic within those routes where required.

//GET ALL BURGERS
router.get("/", (req, res) => {
  burger.selectAll((data) => {
    const viewData = {
      burgers: data,
    };
    res.render("index", viewData);
  });
});

router.post("/api/burgers", (req, res) => {
  burger.insertOne(["burger_name"], [req.body.burger_name], (result) => {
    // Send back the ID of the new burger
    res.json({ id: result.insertId });
  });
});

router.put("/api/burgers/:id", (request, response) => {
  const condition = `id = "${request.params.id}" `;

  burger.updateOne({ devoured: request.body.devoured }, condition, (result) => {
    if (result.changedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return response.status(404).end();
    }
    response.status(200).end();
  });
});

router.delete("/api/burgers/:id", (request, response) => {
  const condition = `id = '${request.params.id}' `;

  burger.deleteOne(condition, (result) => {
    if (result.affectedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return response.status(404).end();
    }
    response.status(200).end();
  });
});

// Export routes for server.js to use.
module.exports = router;
