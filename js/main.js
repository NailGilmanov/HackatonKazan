let current_tab = ""
let modular_content = document.getElementById("modular-content")

let server_ip = "https://d436-178-20-45-18.ngrok-free.app/"
let user_id = sessionStorage.getItem("uuid")

function request_data(method, success, fail = () => {}) {
    const request = new XMLHttpRequest();
    request.onload = function() {
        if (request.status === 200) {
            let d = String(request.response)
            console.log(d)
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
        if (url.includes('add.html')) {
            console.log( document.getElementById("addExpend"))
            document.getElementById("addExpend").onclick = () => {
                let name = document.getElementById('expendName').value
                let price = document.getElementById('expendPrice').value
                let category = document.getElementById('expendCategory').value
                request_data('new_expend/' + name + '/' + category + '/' + price + '/' + sessionStorage.getItem("uuid"))
                document.querySelector('#sucExpend').style.display = 'block'
                document.getElementById('expendName').value = ''
                document.getElementById('expendPrice').value = ''
                document.getElementById('expendCategory').value = ''
            }

            document.getElementById("addArr").onclick = () => {
                let name = document.getElementById('arrName').value
                let price = document.getElementById('arrPrice').value
                request_data('new_arrival/' + name + '/' + price + '/' + sessionStorage.getItem("uuid"))
                document.querySelector('#sucArr').style.display = 'block'
                document.getElementById('arrName').value = ''
                document.getElementById('arrPrice').value = ''
            }
        }

        if (url.includes('profile.html')) {
            request_data("get_user/" + sessionStorage.getItem("uuid"), (d) => {
                document.getElementById('nameProfile').innerHTML = d["name"]
                document.getElementById('descriptionProfile').innerHTML = d["about"]
            })
        }

        if (url.includes('analysis.html')) {
            request_data('get_expend_some/' + sessionStorage.getItem("uuid"), (d) => {
                document.getElementById('wasteOfAllTime').innerHTML = String(d) + " ₽" 
            })

            request_data('get_analitics/' + sessionStorage.getItem("uuid"), (d) => {
                console.log(d)
                let labels = []
                let data = []
                for (let key in d) {
                    labels.push(key)
                    data.push(d[key])
                }
                if (labels.length == 0) {
                    var ctx = document.getElementById('myChart').getContext('2d');
                    var myChart = new Chart(ctx, {
                        type: 'doughnut',
                        data: {
                            labels: ['Данные о затратах отсутствуют'],
                            datasets: [{
                                data: [100],
                                backgroundColor: ['#7d7f7d'],
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
                } else {
                    var ctx = document.getElementById('myChart').getContext('2d');
                    var myChart = new Chart(ctx, {
                        type: 'doughnut',
                        data: {
                            labels: labels,
                            datasets: [{
                                data: data,
                                backgroundColor: ['#e91e63', '#00e676', '#ff5722', '#1e88e5', '#ffd600', '#e91e63', '#00e676', '#ff5722', '#1e88e5', '#ffd600', '#e91e63', '#00e676', '#ff5722', '#1e88e5', '#ffd600', '#e91e63', '#00e676', '#ff5722', '#1e88e5', '#ffd600'],
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
                }
            })

            request_data('get_history/' + sessionStorage.getItem("uuid"), (d) => {
                let wrap = document.querySelector('.analysis-history')
                d.forEach(element => {
                    if (element["price"][0] === "-") {
                        wrap.innerHTML += '<div class="waste"><div class="left-part"><div class="waste--title">' + element['title'] + '</div><div class="waste--category">' + element['category'] + '</div></div><div class="right-part"><div class="waste--price removed">' + element["price"] + ' ₽</div><div class="waste--added-waste">Добавленная трата</div></div></div>'
                    } else {
                        wrap.innerHTML += '<div class="waste"><div class="left-part"><div class="waste--title">' + element['title'] + '</div><div class="waste--category">' + element['category'] + '</div></div><div class="right-part"><div class="waste--price added">' + element["price"] + ' ₽</div><div class="waste--added-waste">Добавленная сумма</div></div></div>'
                    }
                });
            })
        }
    }, 400);

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