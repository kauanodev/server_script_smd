const Database = require("better-sqlite3")

const db = new Database("database.db")

// Cria tabela automaticamente se não existir
db.prepare(`
    CREATE TABLE IF NOT EXISTS users (
        number INTEGER PRIMARY KEY,
        calls INTEGER NOT NULL
    )
`).run()

module.exports = db