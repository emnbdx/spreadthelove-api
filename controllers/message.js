const db = require("../models");
const Message = db.message;

exports.create = (req, res) => {
    if (!req.body.name) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    const message = {
        from: req.body.from,
        content: req.body.content,
        receiverId: req.body.receiverId
    };
    Message.create(message)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the message."
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;
    Message.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find message with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving message with id=" + id
            });
        });
};

exports.findAllByReceiver = (req, res) => {
    const id = req.params.receiverId;
    Event.findAll({
        where: {
            receiverId: id
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
    Message.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Message was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Message with id=${id}. Maybe Message was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Message with id=" + id
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;
    Message.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Message was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Message with id=${id}. Maybe Message was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Message with id=" + id
            });
        });
};