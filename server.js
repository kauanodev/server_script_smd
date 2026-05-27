import express from "express";
import db from "./db/connection.js"; // Lembre-se da extensão .js
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const port = 3000;

// Configuração para emular o __dirname em ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static("src/app"));
app.use(express.json());

// --- Rotas ---

app.post("/send", async (req, res) => {
    const numero = req.body.number;

    try {
        const exists = await verifyIfNumberExists(numero);
        
        if (exists) {
            await updateCalls(numero);
        } else {
            await addNumber(numero);
        }

        const numeroChamadas = await getCalls(numero);
        
        console.log(`Número: ${numero} | Chamadas: ${numeroChamadas}`);
        const resultado = parseInt(numero) + 2;
        
        res.json({ resultado: resultado, calls: numeroChamadas });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Erro no banco de dados" });
    }
});

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "src/app", "index.html"));
});

app.listen(port, () => {
    console.log(`🚀 Rodando em http://localhost:${port}`);
    console.log(`Watch mode ativo. Dê um CTRL+C para parar.`);
});

// --- Funções de Banco de Dados (Adaptadas para sqlite3 assíncrono) ---

function verifyIfNumberExists(number) {
    return new Promise((resolve, reject) => {
        db.get("SELECT * FROM numbers WHERE number = ?", [number], (err, row) => {
            if (err) reject(err);
            resolve(!!row);
        });
    });
}

function updateCalls(number) {
    return new Promise((resolve, reject) => {
        db.run("UPDATE numbers SET calls = calls + 1 WHERE number = ?", [number], (err) => {
            if (err) reject(err);
            resolve();
        });
    });
}

function addNumber(number) {
    return new Promise((resolve, reject) => {
        db.run("INSERT INTO numbers (number, calls) VALUES (?, ?)", [number, 1], (err) => {
            if (err) reject(err);
            resolve();
        });
    });
}

function getCalls(number) {
    return new Promise((resolve, reject) => {
        db.get("SELECT calls FROM numbers WHERE number = ?", [number], (err, row) => {
            if (err) reject(err);
            resolve(row ? row.calls : 0);
        });
    });
}