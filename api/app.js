import { neon } from '@neondatabase/serverless';
import express from 'express';
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import "dotenv/config";
import { sql } from "./db.js";
// Create an Express application instance
const app = express();
const users = [];
app.use(express.json()); 
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
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

app.post("/api/v1/login", async (req, res) => {
    const { dni, passwd } = req.body;
    if (!dni || !passwd) {
        return res.status(400).json({ error: "Faltan credenciales (dni o contraseña)" });
    }
    try {
        const usuarios = await sql`SELECT userid, password FROM users WHERE dni = ${dni}`;
        
        if (usuarios.length === 0) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }

        const usuario = usuarios[0];

        const passwordValida = await bcrypt.compare(passwd, usuario.password);

        if (!passwordValida) {
            return res.status(401).json({ error: "Contraseña incorrecta" });
        }

        return res.status(200).json({ 
            mensaje: "Login exitoso", 
            userId: usuario.userid 
        });

    } catch (error) {
        console.error("Error en login:", error);
        return res.status(500).json({ error: "Error interno del servidor" });
    }
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
app.get("/api/v1/getcolumns", async (req, res) => {
    try {
        const columns = await sql`SELECT * FROM sections`;
        res.json(columns);
    } catch (error){
        console.error("Something gone wrong:", error)
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