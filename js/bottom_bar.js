
window.bottom_bar = document.getElementById("bottom-bar")

for (let i = 0; i < bottom_bar.children.length; i++) {
    bottom_bar.children[i].onclick = () => {
        let address = document.querySelector(".chosen").children[0].src.split('/')[0] + "/" + document.querySelector(".chosen").children[0].src.split('/')[1] + "/" + document.querySelector(".chosen").children[0].src.split('/')[2] + "/" + document.querySelector(".chosen").children[0].src.split('/')[3] + '/'
        document.querySelector(".chosen").children[0].src = address + document.querySelector(".chosen").children[0].src.split('/')[4].split('.')[0].split('_')[0] + '.svg'
        document.querySelector(".chosen").classList.remove("chosen")
        bottom_bar.children[i].classList.add("chosen")
        bottom_bar.children[i].children[0].src = address + bottom_bar.children[i].children[0].src.split('/')[4].split('.')[0] + '_active.svg'
        console.log(bottom_bar.children[i].id)
        load_module(`../pages/${bottom_bar.children[i].id}.html`)
    }
}