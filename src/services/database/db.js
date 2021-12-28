import knex from "knex";

export const databaseMySql = knex({
  client: "mysql",
  version: "10.4.22",
  connection: {
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "market",
  },
  pool: {
    min: 0,
    max: 10,
  },
});

export const databaseSqlite3 = knex({
  client: "sqlite3",
  connection: {
    filename: "./ecommerce.sqlite3",
  },
  useNullAsDefault: true,
});
