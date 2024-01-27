"use strict";

window.onload = async () => {
    const url = "https://dahlgren.miun.se/ramschema_ht23.php";
    const response = await fetch(url);

    if (response.ok) {
        let data = await response.json();

        const thEl = Array.from(document.getElementsByTagName("th"));
        thEl.forEach((title) => {
            title.addEventListener("click", () => sortTable(data, title.id));
        });

        const searchEl = document.getElementById("search");
        searchEl.addEventListener("keyup", () => searchTable(data, searchEl.value.toLowerCase()));

        printTable(data);

    } else {
        console.log("ERROR: " + response.statusText);
    }
}

function searchTable(courses, userInput) {

    const searchResult = courses.filter((course) => {
        if (course.code.includes(userInput)) {
            return true;
        } else if (course.coursename.toLowerCase().includes(userInput)) {
            return true;
        } else {
            return false;
        }
    });

    printTable(searchResult);
}

function sortTable(courses, choice) {

    switch (choice) {
        case "course-code":
            courses.sort((a, b) => (a.code > b.code) ? 1 : -1);
            break;
        case "course-name":
            courses.sort((a, b) => (a.coursename > b.coursename) ? 1 : -1);
            break;
        case "course-prog":
            courses.sort((a, b) => (a.progression > b.progression) ? 1 : -1);
            break;
        default:
            console.log("Not a valid choice");
    }

    printTable(courses);
}

function printTable(courses) {
    const tbodyEl = document.getElementById("table");
    tbodyEl.innerHTML = "";

    courses.forEach((course) => {
        const trEl = document.createElement("tr");
        const codeEl = document.createElement("td");
        const codeText = document.createTextNode(course.code);
        codeEl.appendChild(codeText);

        const nameEl = document.createElement("td");
        const nameText = document.createTextNode(course.coursename);
        nameEl.appendChild(nameText);

        const progEl = document.createElement("td");
        const progText = document.createTextNode(course.progression);
        progEl.appendChild(progText);

        trEl.appendChild(codeEl);
        trEl.appendChild(nameEl);
        trEl.appendChild(progEl);

        tbodyEl.appendChild(trEl);
    });
}