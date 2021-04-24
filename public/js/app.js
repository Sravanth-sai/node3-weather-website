console.log("Client side js loaded")

const weatherForm = document.querySelector('form')

const search = document.querySelector('#search')
const message1 = document.querySelector('#msg1')
const message2 = document.querySelector('#msg2')
const input = document.querySelector('input')
const icon = document.querySelector('#icon')

// message1.textContent = 'TESTING!'



weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    input.style.borderColor = "#cccccc"
    message1.style.color = 'black'
    message1.textContent = 'Loading...'
    message2.textContent = ''
    const location = search.value



    fetch('/weather?address='+ location).then( (response) => {
        icon.style.display = "none"
        response.json().then( (data) => {
            if (data.error) {
                message1.textContent = data.error
                input.style.border = '1.5px solid red'
                message1.style.color = 'red'

            } else {
                icon.src = data.icon
                icon.style.display ="block"
                message1.textContent = data.location
                message2.textContent = data.weather
            }
        })
    })
})



