import { neon } from '@neondatabase/serverless';
import express from 'express';
import "dotenv/config"
// Create an Express application instance
const app = express();
const sql = neon(process.env.DATABASE_URL);

// Define an array of product objects
const products = [
    { id: 1, name: "Laptop", price: 9000 }, 
    { id: 2, name: "Phone", price: 900000 }  
];

// ruta productos dispobivles
app.get("/api/v1/products", (req, res) => {
    res.json(products);  
})
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