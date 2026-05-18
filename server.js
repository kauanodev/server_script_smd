const express = require("express")
const db = require("./db/connection")
const port = 3000
const path = require("path")
const { get } = require("http")
const app = express()


app.use(express.static("src/app")) // Servir arquivos estáticos da pasta "src/app"
app.use(express.json()) // Middleware para analisar o corpo da requisição como JSON

app.post("/send", (req, res) => {
    
    const numero = req.body.number
    if (verifyIfNumberExists(numero)) {
        updateCalls(numero)
    } else {
        addUser(numero)
    }
   const numeroChamadas = getCalls(numero)
    console.log(numero)
    const resultado = parseInt(numero) + 2
    res.json({ resultado: resultado, calls: numeroChamadas })
})

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "src/app", "index.html"))

})

app.listen(port, () => {
    console.log(`Rodando na porta ${port}, dê um ctrl+c para parar o servidor`)
})


function updateCalls(number) {
    const user = db.prepare("SELECT * FROM users WHERE number = ?").get(number) 
    db.prepare("UPDATE users SET calls = ? WHERE number = ?").run(user.calls + 1, number)
}   

function addUser(number) {
    db.prepare("INSERT INTO users (number, calls) VALUES (?, ?)").run(number, 1)
}

function verifyIfNumberExists(number) {
    const user = db.prepare("SELECT * FROM users WHERE number = ?").get(number)     
    return user !== undefined
}
function getCalls(number) {
    const user = db.prepare("SELECT * FROM users WHERE number = ?").get(number) 
    return user ? user.calls : 0
}