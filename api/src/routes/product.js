const server = require("express").Router();
const { Op } = require("sequelize");
const { Product, Category, Review, User } = require("../db.js");

// Obtener todos los productos
server.get("/", (_req, res, next) => {
  Product.findAll({ include: [Category] }) //Busco todos los productos
    .then((products) => {
      res.send(products);
    })
    .catch(next);
});

server.get("/actives", (_req, res, next) => {
  Product.findAll({ where: { active: true }, include: [Category] }) //Busco solo los productos marcados como activos
    .then((products) => {
      res.send(products);
    })
    .catch(next);
});

// Obtener las reviews de un producto
server.get("/:id/review", (req, res, next) => {
  const { id } = req.params;
  Product.findByPk(id)
    .then((product) => {
      if (!product) res.status(400).send("No se encontro el Producto");
      else {
        product
          .getReviews({ include: [Product, User] })
          .then((items) => res.status(200).send(items))
          .catch(next);
      }
    })
    .catch(next);
});

// Modificar un producto
server.put("/:id", (req, res, next) => {
  Product.findByPk(req.params.id, { include: [Category] }) // Busco el producto por clave primaria (id)
    .then((currentProductData) => {
      if (!currentProductData)
        return res.status(400).send("El registro no existe");
      let categories = [];
      if(req.body.categories) {
        req.body.categories.forEach((category) => {
          categories.push(parseInt(category, 10))
        });
      }
      const {
        name = currentProductData.name,
        description = currentProductData.description,
        price = currentProductData.price,
        stock = currentProductData.stock,
        image = currentProductData.image,
        active = currentProductData.active,
      } = req.body;
      currentProductData.categories.forEach((category) => {
        currentProductData
          .removeCategory(category.dataValues.id)
          .catch((err) => console.error(err));
      });
      categories.forEach((category) => {
        currentProductData
          .addCategory(category)
          .catch((err) => console.error(err));
      });
      Product.update(
        { name, description, price, stock, image, active },
        { where: { id: req.params.id } }
      )
        .then(
          () =>
            (prod = Product.findByPk(req.params.id, { include: [Category] }))
        )
        .then((prod) => res.status(200).send(prod))
        .catch((err) => res.status(400).send(err));
    })
    .catch(next);
});

// Editar Review de un producto
server.put("/:id/review/:idRevie", (req, res, next) => {
  const { review, userId, calification } = req.body;
  productId = req.params.id;
  id = req.params.idRevie;
  Product.findByPk(req.params.id)
    .then((product) => {
      if (!product) res.status(400).send("Producto invalido");
      else {
        product
          .getReviews({
            where: { productId },
            where: { userId },
            where: { id },
          })
          .then(([item]) => {
            if (!item) res.status(400).send("Producto invalido");
            else {
              item.review = review;
              item.calification = calification;
              item.save();
              res.status(200).send(item);
            }
          })
          .catch(next);
      }
    })
    .catch(next);
});

// Crear/Agregar un producto
server.post("/", (req, res, next) => {
  const { name, description, price, stock, image, categories } = req.body;
  Product.create({
    name,
    description,
    price,
    stock,
    image,
  })
    .then((product) => {
      categories.forEach((id) =>
        product.addCategory(id).catch((err) => console.error(err))
      );
      Product.findByPk(product.id, { include: [Category] }).then(
        (productCategory) => {
          res.status(201).send(productCategory);
        }
      );
    })
    .catch((error) => {
      console.error(error);
      res.status(400).send(error);
    });
});

// Crear/Agregar review
server.post("/:id/review", (req, res, next) => {
  var idReview;
  const { review, calification, userId } = req.body;
  Product.findByPk(req.params.id)
    .then((product) => {
      if (!product) res.status(400).send("Producto invalido");
      else {
        product
          .createReview({
            review,
            calification,
          })
          .then((newReviewItem) => {
            newReviewItem.setProduct(req.params.id).then(() => {
              newReviewItem.setUser(userId).then(() => {
                idReview = newReviewItem.dataValues.id;
                Review.findByPk(idReview, {
                  include: [Product, User],
                }).then((newC) => {
                  res.status(201).send(newC);
                });
              });
            });
          })
          .catch(next);
      }
    })
    .catch(next);
});

// Obtener los productos ELIMINADOS
server.get("/deleted", (req, res, next) => {
  Product.findAll({ where: { active: false }, include: [Category] })
    .then((products) => {
      res.send(products);
    })
    .catch(next);
});
// Obtener los productos pertenecientes a X categoria
server.get("/category/:id", (req, res, next) => {
  Category.findByPk(req.params.id, { include: [Product] }).then((data) =>
    res.status(200).send(data)
  );
});
// Obtener un producto en base a ID
server.get("/:id", (req, res, next) => {
  Product.findByPk(req.params.id, { include: [Category] })
    .then((product) => {
      if (!product) res.status(400).send("No existe el producto");
      else res.status(200).send(product);
    })
    .catch(next);
});

// Obtener productos segun keyword de busqueda
server.get("/search/:id", (req, res, next) => {
  const query = req.params.id;
  Product.findAll({
    where: {
      [Op.or]: {
        name: {
          [Op.like]: `%${query}%`,
        },
        description: {
          [Op.like]: `%${query}%`,
        },
      },
    },
    include: [Category],
  })
    .then((data) => res.status(200).send(data))
    .catch(next);
});

// Eliminar un producto
server.delete("/:id", (req, res, next) => {
  Product.findByPk(req.params.id)
    .then((product) => {
      if (!product) return res.status(400).send("El registro no existe");
      Product.update({ active: false }, { where: { id: req.params.id } })
        .then(() => (prod = Product.findByPk(req.params.id)))
        .then((prod) => res.status(200).send(prod))
        .catch((err) => res.status(400).send(err));
    })
    .catch(next);
});
module.exports = server;

// Eliminar Review
server.delete("/:id/review/:idReview", (req, res, next) => {
  const { userId } = req.body;
  productId = req.params.id;
  id = req.params.idReview;
  Review.destroy({ where: { productId }, where: { userId }, where: { id } })
    .then(() => res.status(200).send(id))
    .catch(next);
});
