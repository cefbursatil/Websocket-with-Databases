import { databaseMySql, databaseSqlite3 } from "../db.js";

const productsList = [
  {
    title: "Escuadra",
    description: "Calculate the best angles",
    code: "001",
    stock: 10,
    price: 100,
    thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
  },
  {
    title: "Calculator",
    description: "Sum and distract numbers",
    code: "002",
    stock: 10,
    price: 200,
    thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png",
  },
  {
    title: "Glob",
    description: "Beatiful Circle",
    code: "003",
    stock: 5,
    price: 500,
    thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png",
  },
];

databaseMySql.schema.hasTable("products").then((exists) => {
  if (!exists) {
    databaseMySql.schema
      .createTable("products", (table) => {
        table.increments();
        table.string("title").notNullable().defaultTo("SIN TITULO");
        table.string("description").notNullable().defaultTo("SIN DESCRIPCION");
        table.string("code").notNullable().defaultTo("AAA123");
        table.integer("stock").notNullable().defaultTo(0);
        table.float("price").notNullable().defaultTo(0);
        table.string("thumbnail");
        table.timestamps(true, true);
      })
      .then(() => {
        console.log("Tabla products creada");
        productsList.forEach((product) => {
          databaseMySql("products")
            .insert(product)
            .then((res) => {
              console.log("Producto ID: " + res + " insertado");
            });
        });
      });
  } else {
    databaseMySql.schema.dropTable("products").then(() => {
      console.log("Tabla products eliminada");
    });
  }
});

databaseSqlite3.schema.hasTable("messages").then((exists) => {
  if (!exists) {
    databaseSqlite3.schema
      .createTable("messages", (table) => {
        table.increments();
        table.string("user").notNullable().defaultTo("DESCONOCIDO");
        table.string("message").notNullable().defaultTo("SIN MENSAJE");
        table.timestamps(true, true);
      })
      .then(() => {
        console.log("Tabla messages creada");
      });
  } else {
    databaseSqlite3.schema.dropTable("messages").then(() => {
      console.log("Tabla messages eliminada");
    });
  }
});
