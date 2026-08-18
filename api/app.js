import { neon } from '@neondatabase/serverless';
import express from 'express';
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import "dotenv/config";
import { sql } from "./db.js";
// Create an Express application instance
const app = express();
const users = [];
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
});

app.get("/api/v1/products", async (req, res) => {
    try {
        const stock = await sql`SELECT * FROM stock`;
        res.json(stock); 
    } catch (error){
        console.error("che.. anda mal")
        res.status(500).json({error: "Internal Server Error"})
    }
});

// ruta l9ogin :v
app.get("/api/v1/login", async (req, res) => {
    const {dni, passwd} = req.query;
    if (!dni || !passwd){
        return res.status(400).json("No hay dni :v")
    }
    
    const passwordHash = await bcrypt.hash(passwd, SALT_ROUNDS);
    const existente = await sql`SELECT id FROM users WHERE dni1 = ${dni}`;
    if (existente > 0){
        return res.status(409).json({ error: "Usuario ya registrado" });
    }
    await sql`
            INSERT INTO users (dni, password)
            VALUES (${dni}, ${passwordHash})
        `;
    res.status(201).json({ mensaje: "Usuario registrado con éxito", dni, email });
});
app.get("/api/v1/getusers", async (req, res) => {
    try {
        const userss = await sql`SELECT * FROM users`;
        users = userss;
        res.json(userss);
    } catch (error){
        console.error("che.. anda mal")
        res.status(500).json({error: "Internal Server Error"})
    }
     
});
app.get('/', (req, res) => {
  res.send('welcome to the queque');  // Sends 'Welcome to my API' as the response
});
 
const PORT = process.env.PORT || 3000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`API running on port ${PORT}`);
});