
const button = document.getElementById("button")
const numberInput = document.getElementById("numberInput")

button.addEventListener("click", async () => {
    const numero = numberInput.value
    console.log(numero)
    const  response =  await fetch("/send", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({ number: numero })
    })   
 console.log(response)

    const data =  await response.json()

    const resultado = document.getElementById("resultado")
    resultado.textContent = `O Número de chamadas do número ${numero} é: ${data.calls}`

})

// function soma2(x) {
//     return x + 2
// }