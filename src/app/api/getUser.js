

// pages/api/test-db.js
import sql from 'mssql';

export default async function handler(req, res) {
  try {
    // Use the DATABASE_URL environment variable
    const pool = await sql.connect(process.env.DATABASE_URL);
    
    // Run a sample query to check connection
    const result = await pool.request().query('SELECT  * FROM User');
    res.status(200).json(result.recordset);
  } catch (error) {
    console.error('Database connection error:', error);
    res.status(500).json({ error: 'Failed to connect to the database' });
  }
}
