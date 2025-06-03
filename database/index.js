const { Pool } = require("pg")
require("dotenv").config()

/* ***************
 * Connection Pool with conditional SSL
 * *************** */
const isDevelopment = process.env.NODE_ENV === "development"

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: isDevelopment
    ? { rejectUnauthorized: false } // needed for local SSL
    : false, // no SSL in production
})

// Optional: log queries in development
async function query(text, params) {
  try {
    if (isDevelopment) {
      console.log("Executing query:", text)
    }
    const res = await pool.query(text, params)
    return res
  } catch (error) {
    console.error("Query error", { text, error })
    throw error
  }
}

module.exports = {
  query,
  pool,
}
