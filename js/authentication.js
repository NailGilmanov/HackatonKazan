function sign_in() {
    document.querySelector("h1").innerText = "Вход"
    document.querySelector("#password_insurance").style.display = "none"
    document.querySelector("#description").style.display = "none"
    document.querySelector("#jumbo-button-register").style.display = "none"
    document.querySelector("#jumbo-button-login").style.display = 'block'
    document.querySelector("#cringy-message").innerHTML = "<p>Еще нет аккаунта? <span onclick='sign_up()'>Создать.</span></p>"
}

function sign_up() {
    document.querySelector("h1").innerText = "Регистрация"
    document.querySelector("#password_insurance").style.display = "block"
    document.querySelector("#description").style.display = "block"
    document.querySelector("#cringy-message").innerHTML = "<p>Уже есть аккаунт? <span onclick='sign_in()'>Войти.</span></p>"
    document.querySelector("#jumbo-button-register").style.display = "block"
    document.querySelector("#jumbo-button-login").style.display = 'none'
}

setTimeout(() => {
    let action_button_to_login = document.getElementById("jumbo-button-login")
    let action_button_to_register = document.getElementById("jumbo-button-register")
    let username = document.getElementById("username")
    let password = document.getElementById("password")
    let password_insurance = document.getElementById("password_insurance")
    let description = document.getElementById("description")


    action_button_to_login.onclick = () => {
        request_data(`login/${username.value}/${password.value}`, (d) => {
            console.log(d)
            if (d !== "false") {
                sessionStorage.setItem("uuid", String(d))
                load_module('/pages/analysis.html')
                document.getElementById('bottom-bar').style.display = 'grid'
            } else {
                location.href = "index.html"
            }
        })
    }
    action_button_to_register.onclick = () => {
        request_data(`register/${username.value}/${password.value}/${password_insurance.value}/${description.value}`, (d) => {
            console.log(d)
            if (d !== "false") {
                sessionStorage.setItem("uuid", String(d))
                load_module('/pages/analysis.html')
                document.getElementById('bottom-bar').style.display = 'grid'
            } else {
                location.href = "index.html"
            }
        })
    }
}, 1000)