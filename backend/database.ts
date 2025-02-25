//rode postgres em um container docker
//docker run --name postgres-container -e POSTGRES_USER=admin -e POSTGRES_PASSWORD=admin -e POSTGRES_DB=observability -p 5432:5432 -d postgres


import { Pool } from "pg";

const pool = new Pool({
  user: "admin",
  host: "localhost", // O container está rodando localmente
  database: "observability",
  password: "admin",
  port: 5432,
});

export default pool;
