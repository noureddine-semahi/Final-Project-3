module.exports = app => {
  const resolutions = require("../controllers/resolution.controller.js");

  var router = require("express").Router();

  // Create a new Resolution
  router.post("/", resolutions.create);

  // Retrieve all Resolutions
  router.get("/", resolutions.findAll);

  // Retrieve all achieved Resolutions
  router.get("/achieved", resolutions.findAllAchieved);

  // Retrieve a single Resolution with id
  router.get("/:id", resolutions.findOne);

  // Update a Resolution with id
  router.put("/:id", resolutions.update);

  // Delete a Resolution with id
  router.delete("/:id", resolutions.delete);

  // Create a new Resolution
  router.delete("/", resolutions.deleteAll);

  app.use("/api/resolutions", router);
};
