let current_tab = ""
let modular_content = document.getElementById("modular-content")

let server_ip = "https://f3a2-178-213-240-41.ngrok-free.app/"
let user_id = sessionStorage.getItem("uuid")

function request_data(method, success, fail = () => {}) {
    const request = new XMLHttpRequest();
    request.onload = function() {
        if (request.status === 200) {
            let d = String(JSON.parse(request.response)).replaceAll("False", "false").replaceAll("True", "true").replaceAll("'", "\"")
            success(JSON.parse(d))
        } else {
            fail()
        }
    }
    request.open("GET", server_ip+method, true);
    request.send();
}

let video = document.getElementById('preview')
setTimeout(() => {
    video.style.marginLeft = "-150vw"
}, 3000)

function animate_css(el, props, trans, callback = () => {}) {
    el.animate(props, trans).onfinish = (e) => {
        for (const prop of props) {
            el.style[Object.getOwnPropertyNames(prop)[0]] = prop[Object.getOwnPropertyNames(prop)[0]]
        }
        callback()
    }
}

function set_root_var(name, value) {
    document.documentElement.style.setProperty(name, value)
}

function load_module(url) {
    setTimeout(() => { 
        var ctx = document.getElementById('myChart').getContext('2d');
        var myChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Развлечения', 'Фастфуд', 'Торговые центры', 'Спорт', 'Путишествия'],
                datasets: [{
                    data: [27.92, 17.53, 14.94, 26.62, 12.99],
                    backgroundColor: ['#e91e63', '#00e676', '#ff5722', '#1e88e5', '#ffd600'],
                    borderWidth: 0.1 ,
                    borderColor: '#ddd'
                }]
            },
            options: {
                legend: {
                    display: true,
                    position: 'bottom',
                    labels: {
                        boxWidth: 20,
                        fontColor: '#fff',
                        padding: 15
                    }
                },
                tooltips: {
                    enabled: false
                },
                plugins: {
                    datalabels: {
                        color: '#fff',
                        textAlign: 'center',
                        font: {
                            lineHeight: 1.6
                        },
                        formatter: function(value, ctx) {
                            return ctx.chart.data.labels[ctx.dataIndex] + '\n' + value + '%';
                        }
                    }
                }
            }
        });
    }, 700);

    if (url !== current_tab) {
        for (let i = 0; i < document.querySelectorAll(".modular").length; i++) {
            document.querySelectorAll(".modular")[i].remove()
        }
        for (let i = 0; i < document.head.querySelectorAll(".modular").length; i++) {
            document.head.querySelectorAll(".modular")[i].remove()
        }
        animate_css(modular_content, [{opacity: "0"}], {duration: 150, easing: "cubic-bezier(0.22, 1, 0.36, 1)"}, () => {
            fetch(url).then((response) => response.text().then((data) => {
                let data_without_scripts = data.split("\n")
                let contents = data_without_scripts.pop()
                let scripts = contents.split("&")
                for (const i in scripts) {
                    let lol = document.querySelectorAll(`script[src="${scripts[i]}"]`)
                    if (lol.length === 0) {
                        let se = document.createElement("script")
                        se.src = scripts[i]
                        se.classList.add("modular")
                        console.log(scripts[i])
                        document.body.append(se)
                    }
                }
                current_tab = url
                modular_content.innerHTML = data_without_scripts.join("")
                animate_css(modular_content, [{opacity: "1"}], {duration: 150, delay: 150, easing: "cubic-bezier(0.22, 1, 0.36, 1)"})
            }))
        })
    }
}