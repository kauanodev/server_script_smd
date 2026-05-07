const express = require("express")
const port = 3000
const path = require("path")
const app = express()

app.use(express.static("src/app")) // Servir arquivos estáticos da pasta "src/app"
app.use(express.json()) // Middleware para analisar o corpo da requisição como JSON

app.post("/send", (req, res) => {
    
    const numero = req.body.number
    console.log(numero)
    const resultado = parseInt(numero) + 2
    res.json({ resultado: resultado })
})

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "src/app", "index.html"))

})

app.listen(port, () => {
    console.log(`Rodando na porta ${port}, dê um ctrl+c para parar o servidor`)
})