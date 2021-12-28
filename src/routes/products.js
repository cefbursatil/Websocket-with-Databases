import express from "../services/express.js";
import upload from "../services/upload.js";
import productsService from "../services/entities/Products.js";
import io from "../services/io.js";
import { __dirname } from "../utils.js";
import { databaseMySql } from "../services/database/db.js";

const router = express.Router();
const products = new productsService(databaseMySql, "products");

const filePath = (protocol, hostname, filename) => {
  return `/images/${filename}`;
};

//GET
router.get("/", (_, res) => {
  products.getAll().then((products) => {
    res.send(products);
  });
});

//GET ONE
router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  products.getById(id).then((product) => {
    res.send(product);
  });
});

//POST
router.post("/", upload.single("thumbnail"), (req, res) => {
  const product = req.body;
  if (req.file) {
    const thumbnail = filePath(req.protocol, req.hostname, req.file.filename);
    product.thumbnail = thumbnail;
    products.save(product).then((product) => {
      res.send(product);
      if (product.status === "success") {
        products.getAll().then((products) => {
          io.emit("deliverProducts", products.payload);
        });
      }
    });
  } else {
    res.send(
      JSON.stringify({
        status: "error",
        message: "No se ha podido subir la imagen",
        payload: null,
      })
    );
  }
});

//UPDATE
router.put("/:id", upload.single("thumbnail"), (req, res) => {
  const id = parseInt(req.params.id);
  const product = req.body;
  product.thumbnail = null;
  if (req.file) {
    const thumbnail = filePath(req.protocol, req.hostname, req.file.filename);
    product.thumbnail = thumbnail;
  }

  products.updateById(id, product).then((product) => {
    res.send(product);
  });
});

//DELETE
router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  products.deleteById(id).then((product) => {
    res.send(product);
  });
});

export default router;
