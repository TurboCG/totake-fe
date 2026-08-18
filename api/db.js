const { neon } = require("@neondatabase/serverless");

// La connection string te la da Neon en su dashboard
const sql = neon(process.env.DATABASE_URL);

exports = { sql };