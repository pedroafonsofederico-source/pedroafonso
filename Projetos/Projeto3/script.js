var lamp = document.getElementById("lamp");
var element = document.body; 

lamp.addEventListener("click", function() {
    if (lamp.src.includes("lamp_off.png")) {    
        lamp.src = "assets/lamp_on.png";
        lamp.alt = "Lâmpada acesa";
        element.style.background = "radial-gradient(circle, white 8%, yellow 100%)";
    } else {
        lamp.src = "assets/lamp_off.png";
        lamp.alt = "Lâmpada apagada";
        element.style.background = "radial-gradient(circle, white 8%, black 100%)";

    }
});
