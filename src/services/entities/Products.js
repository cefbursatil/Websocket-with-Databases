import fs from "fs";
import Product from "../../classes/Product.js";
import { __dirname, returnMessage } from "../../utils.js";

export default class Products {
  constructor(db, table) {
    this.db = db;
    this.table = table;
  }

  async deleteImage(image) {
    await fs.promises.unlink(__dirname + "/public" + image);
  }

  async save(product) {
    if (!product.title) {
      await this.deleteImage(product.thumbnail);
      return returnMessage(true, "El titulo es obligatorio", null);
    }

    if (!product.description) {
      await this.deleteImage(product.thumbnail);
      return returnMessage(true, "La descripcion es obligatoria", null);
    }

    if (!product.code) {
      await this.deleteImage(product.thumbnail);
      return returnMessage(true, "El codigo es obligatorio", null);
    }

    if (!product.stock) {
      await this.deleteImage(product.thumbnail);
      return returnMessage(true, "El stock es obligatorio", null);
    }

    if (!product.price) {
      await this.deleteImage(product.thumbnail);
      return returnMessage(true, "El precio es obligatorio", null);
    }

    if (!product.thumbnail) {
      await this.deleteImage(product.thumbnail);
      return returnMessage(true, "La imagen es obligatoria", null);
    }

    try {
      const newProduct = new Product(
        product.title,
        product.description,
        product.code,
        product.stock,
        product.price,
        product.thumbnail
      );

      const insertedId = await this.db.insert(newProduct).into(this.table);
      newProduct.id = insertedId[0];
      return returnMessage(false, "Producto guardado", newProduct);
    } catch (error) {
      return returnMessage(
        true,
        "Error al guardar el producto: " + error,
        null
      );
    }
  }

  async getById(id) {
    try {
      const product = JSON.parse(
        JSON.stringify(
          await this.db.select().from(this.table).where({ id }).first()
        )
      );

      if (product) {
        return returnMessage(false, "Producto encontrado", product);
      } else {
        return returnMessage(true, "Producto no encontrado", null);
      }
    } catch (error) {
      return returnMessage(true, "Error al obtener el producto", null);
    }
  }

  async getAll() {
    try {
      const products = JSON.parse(
        JSON.stringify(await this.db.select().from(this.table))
      );

      return returnMessage(false, "Productos encontrados", products);
    } catch (error) {
      return returnMessage(true, "Error al obtener los productos", null);
    }
  }

  async deleteById(id) {
    try {
      const productToBeDeleted = (await this.getById(id)).payload;
      if (!productToBeDeleted) {
        return returnMessage(true, "Producto no encontrado", null);
      }
      await this.db.where({ id }).delete().from(this.table);
      await this.deleteImage(productToBeDeleted.thumbnail);

      return returnMessage(false, "Producto eliminado", productToBeDeleted);
    } catch (error) {
      return returnMessage(
        true,
        "Error al eliminar el producto: " + error,
        null
      );
    }
  }

  async updateById(id, newProduct) {
    try {
      const productToBeUpdated = (await this.getById(id)).payload;
      if (!productToBeUpdated) {
        await this.deleteImage(newProduct.thumbnail);
        return returnMessage(true, "Producto no encontrado", null);
      }

      if (newProduct.title) {
        productToBeUpdated.title = newProduct.title;
      }
      if (newProduct.description) {
        productToBeUpdated.description = newProduct.description;
      }
      if (newProduct.code) {
        productToBeUpdated.code = newProduct.code;
      }
      if (newProduct.stock) {
        productToBeUpdated.stock = parseInt(newProduct.stock);
      }
      if (newProduct.price) {
        productToBeUpdated.price = parseFloat(newProduct.price);
      }
      if (newProduct.thumbnail) {
        await this.deleteImage(productToBeUpdated.thumbnail);
        productToBeUpdated.thumbnail = newProduct.thumbnail;
      }

      productToBeUpdated.id = id;
      productToBeUpdated.updated_at = new Date()
        .toISOString()
        .slice(0, 19)
        .replace("T", " ");
      await this.db.where({ id }).update(productToBeUpdated).into(this.table);
      return returnMessage(false, "Producto actualizado", productToBeUpdated);
    } catch (error) {
      return returnMessage(true, "Error al actualizar el producto", null);
    }
  }
}
