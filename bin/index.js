

const socket = io()

const form = document.getElementById('form')
const input = document.getElementById('input')
const messages = document.getElementById('message')



const logo = document.getElementById('logo')

logo.addEventListener('click', e =>{
    location.reload()
})


const aside = document.getElementById('aside')
const menu = document.getElementById('menu')
const closeAside = document.getElementById('close')



const account_box = document.getElementById('account_box')
const profile_container = document.getElementById('profile_container')
const profile_options = document.getElementById('profile_options')


const home_button = document.getElementById('home')
const about_button = document.getElementById('about')
const blank = document.getElementById('blank')


const name_profile = document.getElementById('name_profile')
const form_profile = document.getElementById('form_profile')
const input_profile = document.getElementById('input_profile')



function toggleAccountClass() {
    if (account_box.className == 'account_box'){
        account_box.classList.remove('account_box')
        account_box.classList.toggle('account_box_opened')
    }else {
        account_box.className = 'account_box'
    }
    
    if (profile_container.className == 'profile_container'){
        profile_container.classList.remove('profile_container')
        profile_container.classList.toggle('profile_container_opened')
    }else {
        profile_container.className = 'profile_container'
    }
    
}



function toggleMenuClass() {
    if (menu.className == "menu") {
        menu.classList.remove("menu")
        menu.classList.toggle('open')
    }else {
        menu.classList.remove("open")
        menu.classList.add("menu")
    }
    
    if (menu.className == "open") {
        aside.classList.remove('aside')
        aside.classList.add('aside_opened')
    }else {
        aside.className = 'aside'
    }

}


menu.addEventListener('click', e =>{
    if(profile_container.className == 'profile_container_opened'){
        toggleAccountClass()
        toggleMenuClass()
    }else {
        toggleMenuClass()   
    }
    
})

closeAside.addEventListener('click', e =>{
    toggleMenuClass()
})

account_box.addEventListener('click', e =>{
    if (menu.className == 'open'){
        toggleMenuClass()
        toggleAccountClass()
    }else {
        toggleAccountClass()
    }
})

profile_options.addEventListener('click', e =>{
    toggleAccountClass()
})


home_button.addEventListener('click', e =>{
    if (home_button.className == 'active'){
        home_button.className = 'active'
    }else {
        home_button.className = 'home'
    }
})

about_button.addEventListener('click', e =>{
    about_button.classList.remove('about')
    about_button.classList.toggle('active')
    document.getElementById('blank').style.display = 'block'
    if (home_button.className == 'active'){
        home_button.className = 'home'
    }else {
        home_button.classname = 'active'
    }
})

blank.addEventListener('click', e =>{
    if (about_button.className == 'active'){
        about_button.className = 'about'
        home_button.className = 'active'
        document.getElementById('blank').style.display = 'none'
    }else {
        about_button.className = 'active'
    }
})

form_profile.addEventListener('submit', e =>{
    e.preventDefault()
    if (input_profile.value){
        name_profile.innerHTML = input_profile.value
        input_profile.value = ''
    }else {
        name_profile.innerHTML = 'NAME'
    } 
})

// connected socket.io


form.addEventListener('submit', (e) =>{
    e.preventDefault()
    if (input.value){
        if (name_profile.value != 'NAME'){
            socket.emit('new-user', name_profile.textContent, input.value)
            input.value = ''
        }
        // socket.emit('chat message', input.value)
        // input.value = ''
    }
})

socket.on('chat message', (message) =>{
    const item = document.createElement('li')
    const h2Name = document.createElement('h2')
    const spanMessage = document.createElement('span')

    h2Name.textContent = message.user

    spanMessage.textContent = message.text

    item.appendChild(h2Name)

    item.appendChild(spanMessage)

    messages.appendChild(item)
    window.scrollTo(0, document.body.scrollHeight)
})