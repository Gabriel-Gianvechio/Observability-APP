// import express, {Request, Response} from "express";
// import cors from "cors";
// import pool from "./database";

// const app = express();
// app.use(express.json());
// app.use(cors({
//     origin: "http://localhost:3000", // Especifica a URL do frontend
//   }));
  

// app.post("/cadastrar", (req: Request, res: Response) => {
//     const { nome, telefone, email, senha } = req.body;
//     console.log("Dados recebidos:", {nome, telefone, email, senha});
//     res.json({ mensagem: "Cadastro realizado com sucesso!"});
// });

// app.listen(5000, () => console.log ("Servidor rodando na porta 5000"));

import express, { Request, Response } from "express";
import cors from "cors";
import pool from "./database";

const app = express();
app.use(express.json());
app.use(cors({
  origin: "http://localhost:3000", // Especifica a URL do frontend
}));

app.post("/cadastrar", async (req: Request, res: Response) => {
  const { nome, telefone, email, senha } = req.body;
  console.log("Dados recebidos:", { nome, telefone, email, senha });

  // Inserir no banco de dados
  try {
    const query = `INSERT INTO usuarios (nome, telefone, email, senha) 
                   VALUES ($1, $2, $3, $4)`;
    const values = [nome, telefone, email, senha];
    await pool.query(query, values);
    res.json({ mensagem: "Cadastro realizado com sucesso!" });
  } catch (error) {
    console.error("Erro ao inserir dados:", error);
    res.status(500).json({ mensagem: "Erro ao cadastrar usuário." });
  }
});

app.listen(5000, () => console.log("Servidor rodando na porta 5000"));

