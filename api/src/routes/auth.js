const passport = require("passport");
const jsonwebtoken = require("jsonwebtoken");
const server = require("express").Router();

function isLogged(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).send("El usuario no esta logueado");
  }
}

server.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

server.get('/google/callback', passport.authenticate('google', { failureRedirect: '/me' }), (req, res, next) => {
  res.redirect('http://localhost:3000/me');
});

server.get("/me", isLogged, (req, res, next) => {
  res.status(200).send(req.user);
});

server.post(
  "/login",
  passport.authenticate("local", { failureRedirect: "/me" }),
  (req, res, next) => {
    const user = req.user;
    jsonwebtoken.sign({ user }, "secretkey", { expiresIn: "7d" }, (err, token) => {
      res.json({
        user,
        token
      });
    });
  }
);

// *************************************************************** 

server.post(
  "/api/login",
  passport.authenticate("local", { failureRedirect: "/me" }),
  (req, res) => {
    const user = req.user;
    jsonwebtoken.sign({ user }, "secretkey", { expiresIn: "320000000s" }, (err, token) => {
      res.json({
        token,
      });
    });
  }
);

server.post("/api/posts", verifyToken, (req, res) => {
  jsonwebtoken.verify(req.token, "secretkey", (error, authData) => {
    if (error) {
      console.log('Acceso Denegado: ',error)
      // res.json({authData:{
      //   user:"Acceso denegadooooooooo"
      // }});
    } else {
      res.json({
        mensaje: "Post fue creado",
        authData,
      });
    }
  });
});

// Authorization: Bearer <token>
function verifyToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];

  if (typeof bearerHeader !== "undefined") {
    const bearerToken = bearerHeader.split(" ")[1];
    req.token = bearerToken;
    next();
  } else {
    res.sendStatus(403);
  }
}

server.post("/logout", (req, res, next) => {
  req.logout();
  res.status(200).send("Sesion cerrada");
});

module.exports = server;
