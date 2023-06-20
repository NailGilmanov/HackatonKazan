request_data("get_user/" + sessionStorage.getItem("uuid"), (d) => {
    document.querySelector(".profile-wrapper .brief-channel img").src = "/loc-images/ava.png"
    document.querySelector(".profile-wrapper .brief-channel h3").innerText = d["name"]
    document.querySelector(".profile-wrapper .description").innerText = d["about"]
})

// document.getElementById("jumbo-button").onclick = () => {
//     request_data(`new_event/${document.getElementById("event_name").innerText}/${document.getElementById("description").innerText}/${document.getElementById("date").innerText.split(", ").join("/")}/${document.getElementById("location").innerText}/${categories[document.querySelector(".select-selected").innerText]}/${user_id}`, (d) => {
//         close_sliding_overlay(document.getElementById("new-event"))
//     })
// }

// request_data("get_user_events/" + user_id, (d) => {
//     render_cards(d, "cards", "event-info")
// })

// init_selects()