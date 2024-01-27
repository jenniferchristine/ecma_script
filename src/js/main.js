"use strict";

window.onload = async () => {
    const url = "https://dahlgren.miun.se/ramschema_ht23.php";
    const response = await fetch(url);

    if (response.ok) {
        let data = await response.json();
    } else {
        console.log("ERROR: " + response.statusText);
    }
}