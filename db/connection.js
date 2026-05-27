import sqlite3 from 'sqlite3';

// O .verbose() ajuda a debugar erros no console
const sqlite = sqlite3.verbose();

const db = new sqlite.Database("./database.db", (err) => {
    if (err) {
        console.error("Erro ao conectar no SQLite:", err.message);
    } else {
        console.log("Conectado ao banco de dados SQLite.");
    }
});

// Criar a tabela
// No sqlite3 puro, usamos .serialize para garantir que a tabela 
// seja criada antes de qualquer outra operação
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS numbers(
            number INTEGER PRIMARY KEY,
            calls INTEGER NOT NULL
        )
    `, (err) => {
        if (err) {
            console.error("Erro ao criar tabela:", err.message);
        }
    });
});

export default db;