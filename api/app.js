import { neon } from '@neondatabase/serverless';
import express from 'express';
import "dotenv/config"
// Create an Express application instance
const app = express();
const sql = neon(process.env.DATABASE_URL);

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
app.get("/api/v1/login", (req, res) => {
    res.json("nigga");  
});
app.get("/api/v1/getusers", async (req, res) => {
    try {
        const users = await sql`SELECT * FROM users`;
        res.json(users); 
    } catch (error){
        console.error("che.. anda mal")
        res.status(500).json({error: "Internal Server Error"})
    }
     
});
app.get('/', (req, res) => {
  res.send('welcome to the queque');  // Sends 'Welcome to my API' as the response
});
 
// Start the server on port 3000 and log a message to the consolecc
const PORT = process.env.PORT || 3000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`API running on port ${PORT}`);
});