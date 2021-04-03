const server = require("express").Router();

const { User, CartItem, Product } = require("../db.js");

// Añade un producto al carrito
server.post("/:userId/add", (req, res, next) => {
  var idReview;
  const { productId, quantity } = req.body;
  User.findByPk(req.params.userId)
    .then((user) => {
      if (!user) res.status(400).send("Usuario invalido");
      else {
        user
          .getCartItems({ include: [Product] })
          .then((cartItems) => {
            let yaEstaAgregado = false;
            cartItems.forEach((item) => {
              if (item.productId == productId) yaEstaAgregado = true;
            });
            if (yaEstaAgregado)
              res.status(200).send("El producto ya esta en el carrito");
            else {
              Product.findByPk(productId)
                .then((product) => {
                  if (!product) res.status(400).send("Producto invalido");
                  else if (product.stock < quantity)
                    res.status(400).send("Stock insuficiente");
                  else {
                    user
                      .createCartItem({
                        quantity,
                        subtotal: product.price * quantity,
                      })
                      .then((newCartItem) => {
                        newCartItem.setProduct(productId).then(() => {
                          idReview = newCartItem.dataValues.id;
                          CartItem.findByPk(idReview, {
                            include: [Product],
                          }).then((newC) => {
                            res.status(201).send(newC);
                          });
                        });
                        //res.status(201).send(newCartItem);
                      })
                      .catch(next);
                  }
                })
                .catch(next);
            }
          })
          .catch(next);
      }
    })
    .catch(next);
});

// Elimina un producto del carrito
server.delete("/:userId/remove/:productId", (req, res, next) => {
  const { userId, productId } = req.params;
  User.findByPk(userId)
    .then((user) => {
      if (!user) res.status(400).send("Usuario invalido");
      else {
        CartItem.destroy({
          where: {
            userId,
            productId,
          },
        })
          .then(() => res.status(200).send(productId))
          .catch(next);
      }
    })
    .catch(next);
});

// Editar la cantidad de un producto
server.put("/:userId", (req, res, next) => {
  const { productId, quantity } = req.body;
  User.findByPk(req.params.userId)
    .then((user) => {
      if (!user) res.status(400).send("Usuario invalido");
      else {
        user
          .getCartItems({ where: { productId }, include: [Product] })
          .then(([item]) => {
            if (!item) res.status(400).send("Producto invalido");
            else if (item.product.stock < quantity)
              res.status(400).send("Stock insuficiente");
            else {
              item.quantity = quantity;
              item.subtotal = item.product.price * quantity;
              item.save();
              res.status(200).send(item);
            }
          })
          .catch(next);
      }
    })
    .catch(next);
});

// Obtiene todos los objetos del carrito del usuario correspondiente
server.get("/:userId", (req, res, next) => {
  User.findByPk(req.params.userId)
    .then((user) => {
      if (!user) res.status(400).send("No se encontro el usuario");
      else {
        user
          .getCartItems({ include: [Product] })
          .then((items) => res.status(200).send(items))
          .catch(next);
      }
    })
    .catch(next);
});

// Vaciar el carrito
server.delete("/:userId/empty", (req, res, next) => {
  const { userId } = req.params;
  CartItem.destroy({ where: { userId } })
    .then(() => res.status(200).send("Carrito vaciado"))
    .catch(next);
});

module.exports = server;
