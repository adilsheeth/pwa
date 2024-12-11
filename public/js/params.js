//Form submit event listener
document.getElementById("filterform").addEventListener("submit", (e) => {
    e.preventDefault()

    let search = document.getElementById("search").value 
    if (search == "") {
        search = null
    }

    let gender = document.getElementById("sel1").value
    if (gender == "All") {
        gender = null
    }

    let roll_class = document.getElementById("sel2").value
    if (roll_class == "All") {
        roll_class = null
    } else {
        roll_class = roll_class.split(".").join("_")
    }

    let house = document.getElementById("sel3").value
    if (house == "All"){
        house = null
    }

    let filter = document.getElementById("filter").value

    let sort = document.getElementById("sort").innerHTML == `<i class="bi bi-sort-alpha-down"></i>` ? "ASC" : "DESC"

    console.log(search, gender, roll_class, house)

    let myParam = `${search}.${gender}.${roll_class}.${house}.${filter}.${sort}`
    
    if (window.location.pathname == "/") {
        window.location.assign(window.location.href + myParam)
    } else {
        window.location.assign(window.location.origin + "/" + myParam)
    }
})

document.getElementById("sort").addEventListener("click", (e) => {
    e.preventDefault()

    document.getElementById("sort").innerHTML = document.getElementById("sort").innerHTML == `<i class="bi bi-sort-alpha-down"></i>` ? `<i class="bi bi-sort-alpha-up"></i>`: `<i class="bi bi-sort-alpha-down"></i>`
})

document.getElementById("reset").addEventListener("click", (e) => {
    e.preventDefault()
    window.location.assign(window.location.origin)
})

document.getElementById("help").addEventListener("click", (e) => {
    e.preventDefault()
    window.location.assign(window.location.origin + "/help")
})