const server = require("express").Router();
const { User } = require("../db.js");
const bodyparser = require("body-parser");
const encrypt = require('../encrypt.js');

server.use(bodyparser.json({ extended: true }));

server.get("/", (req, res, next) => {
  User.findAll()
    .then((users) => {
      res.send(users);
    })
    .catch(next);
});

server.post("/", (req, res, next) => {
  User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: encrypt(req.body.password),
    email: req.body.email,
    admin: req.body.admin,
    active: req.body.active,
  })
    .then((user) => {
      res.status(201).send(user);
    })
    .catch(next);
});

server.put("/:id", (req, res, next) => {
  User.findByPk(req.params.id)
    .then((currentUser) => {
      if (!currentUser) res.status(400).send("No existe el usuario");
      let encryptedPassword = "";
      if(req.body.password) encryptedPassword = encrypt(req.body.password);
      else encryptedPassword = currentUser.password;
      const {
        firstName = currentUser.firstname,
        lastName = currentUser.lastName,
        email = currentUser.email,
        admin = currentUser.admin,
        active = currentUser.active,
      } = req.body;
      User.update(
        { firstName, lastName, password: encryptedPassword, email, admin, active },
        { where: { id: req.params.id } }
      )
        .then(() => (us = User.findByPk(req.params.id)))
        .then((us) => res.status(200).send(us))
        .catch((err) => res.status(400).send(err));
    })
    .catch(next);
});

server.delete("/:id", (req, res, next) => {
  User.findByPk(req.params.id)
    .then((user) => {
      if (!user) return res.status(400).send("El usuario no existe");
      User.update({ active: false }, { where: { id: req.params.id } })
        .then(() => (us = User.findByPk(req.params.id)))
        .then((us) => res.status(200).send(us))
        .catch((err) => res.status(400).send(err));
    })
    .catch(next);
});

module.exports = server;
