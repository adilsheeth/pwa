if (window.location.pathname != "/") {
    let result = ""
    fetch("../data.json")
        .then(response => response.json())
        .then(data => {
            let count = 1
            let temp = `<div class="row">`
            data.forEach(student => {
                temp += `
                    <div class="px-2 py-2 col-md-4">
                        <div class="card px-1 py-1">
                            
                            <div class="row mt-1 align-items-center">
                                <div class="col-3">
                                    <img src="./images/default.jpg" alt="student image" width="100px" height="100px">
                                </div>
                                <div class="col">
                                    <h3 class="card-name">${student.first_name} ${student.last_name}</h3>
                                </div>
                            </div>
                            <div class="row mx-1">
                                <h6>
                                    <i class="bi bi-at"></i>
                                    ${student.srn}
                                </h6>
                            </div>
                            <div class="row mx-1">
                                <div class="col">
                                    <p class="">
                                        <i class="bi bi-gender-ambiguous"></i>
                                        ${student.gender == "M" ? "Male" : "Female"}
                                    </p>
                                </div>
                                <div class="col">
                                    <p class="">
                                        <i class="bi bi-person-lines-fill"></i>
                                        ${student.roll_class}
                                    </p>
                                </div>
                            </div>
                            <div class="row mx-1">
                                <div class="col">
                                    <p>
                                    <i class="bi bi-calendar"></i>
                                    ${student.dob}
                                    </p>
                                </div>
                                <div class="col">
                                    <p>
                                    <i class="bi bi-house"></i>
                                    ${student.house}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                `
                if((count % 3 == 0) || (count == data.length)) {
                    temp += `</div>`
                    result += temp
                    temp = `<div class="row">`
                }
                count++
            })
            document.getElementById("main").innerHTML = result
        })
        .then(() => {
            let sel1 = document.getElementById("sel1")
            let param1 = window.location.pathname.split(".")[1]
            sel1.value = param1 == "null" ? "All" : param1 == "Male" ? "Male" : "Female"

            let sel2 = document.getElementById("sel2")
            let param2 = window.location.pathname.split(".")[2]
            sel2.value = param2 == "null" ? "All" : param2.split("_").join(".")

            let sel3 = document.getElementById("sel3")
            let param3 = window.location.pathname.split(".")[3]
            sel3.value = param3 == "null" ? "All" : param3

            let search = document.getElementById("search")
            let paramSearch = window.location.pathname.split(".")[0].split("/")[1]
            search.value = paramSearch == "null" ? "" : paramSearch

            let filter = document.getElementById("filter")
            let paramFilter = window.location.pathname.split(".")[4]
            filter.value = paramFilter

            let sort = document.getElementById("sort")
            let paramSort = window.location.pathname.split(".")[5]
            sort.innerHTML = paramSort == "ASC" ? `<i class="bi bi-sort-alpha-down"></i>` : `<i class="bi bi-sort-alpha-up"></i>`
        })
}