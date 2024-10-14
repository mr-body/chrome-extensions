const input = document.querySelector('#input')
const button = document.querySelector('#button')
const ul = document.querySelector('#ul')
const btn_delete = document.querySelector('#btn_delete')
const button_get = document.querySelector('#button_get')

let links = JSON.parse(localStorage.getItem('links')) || []

button.addEventListener('click', () => {
    links.push(input.value)
    localStorage.setItem('links', JSON.stringify(links))
    list()
    input.value = ''
})

button_get.addEventListener('click', () => {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        links.push(tabs[0].url)
        localStorage.setItem('links', JSON.stringify(links))
        list()
    })
})

btn_delete.addEventListener('click', () => {
    localStorage.clear()
    links = []
    list()
})

const list = () => {
    ul.innerHTML = ''
    links.forEach(link => {
        const li = document.createElement('li')
        li.innerHTML = link
        ul.appendChild(li)
    })
}

list()
