function sign_in() {
    document.querySelector("h1").innerText = "Вход"
    document.querySelector("#password_insurance").style.display = "none"
    document.querySelector("#description").style.display = "none"
    document.querySelector("#cringy-message").innerHTML = "<p>Еще нет аккаунта? <span onclick='sign_up()'>Создать.</span></p>"
    document.querySelector("#jumbo-button").innerText = "Вход"
}

function sign_up() {
    document.querySelector("h1").innerText = "Регистрация"
    document.querySelector("#password_insurance").style.display = "block"
    document.querySelector("#description").style.display = "block"
    document.querySelector("#cringy-message").innerHTML = "<p>Уже есть аккаунт? <span onclick='sign_in()'>Войти.</span></p>"
    document.querySelector("#jumbo-button").innerText = "Регистрация"
}

setTimeout(() => {    
    let action_button = document.getElementById("jumbo-button")
    let username = document.getElementById("username")
    let password = document.getElementById("password")
    let password_insurance = document.getElementById("password_insurance")
    let description = document.getElementById("description")

    console.log(action_button, username, password, password_insurance, description)

    action_button.onclick = () => {
        if (action_button.innerText === "Войти") {
            request_data(`login/${username.value}/${password.value}`, (d) => {
                console.log(d)
                if (d !== false) {
                    sessionStorage.setItem("uuid", String(d))
                    // location.href = "index.html"
                }
            })
        } else {
            request_data(`register/${username.value}/${password.value}/${password_insurance.value}`, (d) => {
                console.log(d)
                if (d !== false) {
                    sessionStorage.setItem("uuid", String(d))
                    // location.href = "index.html"
                }
            })
            load_module('../pages/analysis.html')
        }
    }  
}, 1000)