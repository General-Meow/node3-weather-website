console.log("client side js loaded")

const weatherForm = document.querySelector('form')
const searchText = document.querySelector("input")
const messageOne = document.querySelector("#message-1")
const messageTwo = document.querySelector("#message-2")

weatherForm.addEventListener("submit", (event) => {
    event.preventDefault() //stop browser from refreshing
    
    const location = searchText.value

    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        messageTwo.textContent = 'Loading...'

        response.json().then((data) => {
            if (data.error) {
                messageTwo.textContent = ''
                return messageOne.textContent = data.error
            }
            messageOne.textContent = ''
            messageTwo.textContent = 'The temp at location: ' + location + " is: " + data.forecast
        })
    }).catch((error) => {
        messageOne.textContent = error

    })
})