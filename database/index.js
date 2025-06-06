require("dotenv").config()
const { Pool } = require("pg")
/* ***************
 * Connection Pool with conditional SSL
 * *************** */
const isDevelopment = process.env.NODE_ENV === "development"

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: isDevelopment
    ? false
    : { rejectUnauthorized: false },
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
