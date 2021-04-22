console.log("Client side js loaded")

// fetch('http://localhost:3000/weather?address=!').then( (response) => {
//     response.json().then( (data) => {
//         if (data.error) {
//             console.log(data.error)
//         }
//         else {
//             console.log(data.Address, data.Current, data.temperature)
//         }
        
//     })
// })



const weatherForm = document.querySelector('form')

const search = document.querySelector('#search')
const message1 = document.querySelector('#msg1')
const message2 = document.querySelector('#msg2')
const input = document.querySelector('input')

// message1.textContent = 'TESTING!'



weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    input.style.borderColor = "#cccccc"
    message1.style.color = 'black'
    message1.textContent = 'Loading...'
    message2.textContent = ''
    const location = search.value

    fetch('http://localhost:3000/weather?address='+location).then( (response) => {
        response.json().then( (data) => {
            if (data.error) {
                message1.textContent = data.error
                input.style.border = '1.5px solid red'
                message1.style.color = 'red'

            }
            else {
                message1.textContent = data.location
                message2.textContent = data.weather
            }
        })
    })
})



