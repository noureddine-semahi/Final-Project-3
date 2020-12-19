const db = require("../models");
const Resolution = db.resolutions;

// Create and Save a new Resolution
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Resolution
  const resolution = new Resolution({
    title: req.body.title,
    goals: req.body.goals,
    achieved: req.body.achieved ? req.body.achieved : false
  });

  // Save Resolution in the database
  resolution
    .save(resolution)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Resolution."
      });
    });
};

// Retrieve all Resolutions from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

  Resolution.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving resolutions."
      });
    });
};

// Find a single Resolution with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Resolution.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Resolution with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Resolution with id=" + id });
    });
};

// Update a Resolution by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Resolution.findByIdAndUpdate(id, req.body, { useFindAndModify: false, new: true })
    .then(data => {
      console.log(data);
      if (!data) {
        res.status(404).send({
          message: `Cannot update Resolution with id=${id}. Maybe Resolution was not found!`
        });
      } else res.send({ message: "Resolution was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Resolution with id=" + id
      });
    });
};

// Delete a Resolution with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Resolution.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Resolution with id=${id}. Maybe Resolution was not found!`
        });
      } else {
        res.send({
          message: "Resolution was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Resolution with id=" + id
      });
    });
};

// Delete all Resolutions from the database.
exports.deleteAll = (req, res) => {
  Resolution.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Resolutions were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Resolutions."
      });
    });
};

// Find all achieved Resolutions
exports.findAllAchieved = (req, res) => {
  Resolution.findAll({ where: {achieved: true }})
    .then(data => {
      console,log(data);
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Resolutions."
      });
    });
};
