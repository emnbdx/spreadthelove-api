const db = require("../models");
const Receiver = db.receiver;

exports.create = (req, res) => {
    if (!req.body.name) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    const receiver = {
        email: req.body.email,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        eventId: req.body.eventId
    };
    Receiver.create(receiver)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the receiver."
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;
    Receiver.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find receiver with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving receiver with id=" + id
            });
        });
};

exports.findAllByEvent = (req, res) => {
    const id = req.params.eventId;
    Event.findAll({
        where: {
            eventId: id
        }
    })
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find event with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving event with id=" + id
            });
        });
};

exports.update = (req, res) => {
    const id = req.params.id;
    Receiver.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Receiver was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Receiver with id=${id}. Maybe Receiver was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Receiver with id=" + id
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;
    Receiver.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Receiver was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Receiver with id=${id}. Maybe Receiver was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Receiver with id=" + id
            });
        });
};