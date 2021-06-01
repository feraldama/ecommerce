const server = require("express").Router();
const nodemailer = require("nodemailer");
const { Order, OrderItem, Product, User } = require("../db.js");
// Obtener todas las ordenes
server.get("/", (req, res, next) => {
  Order.findAll({ include: [OrderItem, User] })
    .then((orders) => {
      res.status(200).send(orders);
    })
    .catch(next);
});
//Envio de E-mail
server.post("/send-email", (req, res) => {
  console.log("ACA");
  console.log(req.body.checkout);
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: "mustafa.christiansen@ethereal.email",
      pass: "CWunY82vRWbpXkv6ND",
    },
  });
  var mailOptions = {
    from: "Remitente",
    to: "fer.ald87@gmail.com",
    subject: "Enviado desde nodemailer",
    html: `
    <table>
    <tr>
      <th>Provincia</th>
      <th>Dirección</th> 
      <th>Titular</th>
    </tr>
    <tr>
      <td>${req.body.checkout.provincia}</td>
      <td>${req.body.checkout.direccion}</td>
      <td>${req.body.checkout.nombre}</td>
    </tr>
  </table>
`, //Hola Mundo!!! ${req.body.checkout.nombre}
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      res.status(500).send(error.message);
    } else {
      console.log("ALLA");
      res.status(200).jsonp(req.body);
    }
  });
});
// Crear una orden a partir del carrito del usuario
server.post("/:userId/checkout", (req, res, next) => {
  const { userId } = req.params;
  User.findByPk(userId)
    .then((user) => {
      if (!user) res.status(400).send("Usuario invalido");
      else {
        user
          .getCartItems()
          .then((cartItems) => {
            if (!cartItems) res.status(400).send("El carrito esta vacio");
            else {
              user
                .createOrder()
                .then((order) => {
                  let total = 0;
                  cartItems.forEach((item) => {
                    total = total + parseInt(item.subtotal);
                    order
                      .createOrderItem({
                        quantity: item.quantity,
                        subtotal: item.subtotal,
                      })
                      .then((orderItem) => {
                        orderItem.setProduct(item.productId);
                        Product.findByPk(item.productId)
                          .then((product) => {
                            product.stock = product.stock - item.quantity;
                            product.save();
                          })
                          .catch(next);
                      })
                      .catch(next);
                  });
                  order.total = total;
                  order.save();
                  user.removeCartItems();
                  res.status(200).send(order);
                })
                .catch(next);
            }
          })
          .catch(next);
      }
    })
    .catch(next);
});
server.get("/:userId", (req, res, next) => {
  const { userId } = req.params;
  User.findByPk(userId)
    .then((user) => {
      if (!user) res.status(400).send("Usuario invalido");
      else {
        user
          .getOrders({ include: [OrderItem, User] })
          .then((orders) => res.status(200).send(orders))
          .catch(next);
      }
    })
    .catch(next);
});
// Obtener el detalle de una orden
server.get("/details/:orderId", (req, res, next) => {
  const { orderId } = req.params;
  Order.findByPk(orderId, { include: [User] })
    .then((order) => {
      if (!order) res.status(400).send("La orden no existe");
      else {
        order
          .getOrderItems({ include: [Product] })
          .then((orderItems) => {
            const orderDetail = {
              order: [order],
              orderItems,
            };
            res.status(200).send(orderDetail);
          })
          .catch(next);
      }
    })
    .catch(next);
});
// Cambia el estado de la orden
server.put("/status/:orderId", (req, res, next) => {
  const { orderId } = req.params;
  const { status } = req.body;
  Order.findByPk(orderId)
    .then((order) => {
      if (!order) res.status(400).send("Orden invalida");
      else {
        order.status = status;
        order.save();
        res.status(200).send(`Status cambiada a ${status}`);
      }
    })
    .catch(next);
});
module.exports = server;
