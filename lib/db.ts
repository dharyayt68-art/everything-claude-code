import Database from 'better-sqlite3'
import path from 'path'

const dbPath = path.join(process.cwd(), 'database.db')
const db = new Database(dbPath)

// Create tables
db.exec(`
  CREATE TABLE IF NOT EXISTS registrations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    mobile TEXT NOT NULL,
    email TEXT NOT NULL,
    age INTEGER NOT NULL,
    clubName TEXT NOT NULL,
    paymentScreenshot TEXT NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`)

export default db