var selected_car = null;

var result = document.getElementById("result");
var car_red = document.getElementById("red");
var car_white = document.getElementById("white");
var btn_circle_red = document.getElementById("vermelho");
var btn_circle_white = document.getElementById("branco");
var btns_ctrl = document.getElementsByClassName("btn");

car_red.addEventListener("click", sel_car_red);
car_white.addEventListener("click", sel_car_white);
btn_circle_red.addEventListener("click", sel_car_red);
btn_circle_white.addEventListener("click", sel_car_white);
btns_ctrl[0].addEventListener("click", reset)
btns_ctrl[1].addEventListener("click", acel)
btns_ctrl[2].addEventListener("click", desacel)

function sel_car_red(){
    document.body.style.backgroundColor = "red";
    document.body.style.color = "black";

    result.textContent = "Vermelho";

    btns_ctrl_block_fun();
    selected_car = car_red;
}
function sel_car_white(){
    document.body.style.backgroundColor = "white";
    document.body.style.color = "black";

    result.textContent = "Branco";

    btns_ctrl_block_fun();
    selected_car = car_white;
}

function btns_ctrl_block_fun(){
    for(i=0; i<= 2; i++){
        btns_ctrl[i].style.display = "block";
    }
}

function btns_ctrl_none_fun(){
    for(i=0; i<= 2; i++){
        btns_ctrl[i].style.display = "none";
    }
}

var car_position = 60; 

function apply_car_position() {
    if (selected_car) {
        selected_car.style.top = car_position + "px";
    }
}

function reset(){
    document.body.style.backgroundColor = "black";
    document.body.style.color = "white";

    result.textContent = "?";

    btns_ctrl_none_fun();
    selected_car = null; 
    car_position = 60; 
    car_red.style.top = "60px"; 
    car_white.style.top = "60px";
}

function acel(){
    if (!selected_car) {
        alert("Selecione primeiro um dos carros.");
        return;
    }

    if (car_position > 0) {
        car_position -= 5; 
        if (car_position < 0) {
            car_position = 0;
        }
        apply_car_position();
    }
}

function desacel(){
    if (!selected_car) {
        alert("Selecione primeiro um dos carros.");
        return;
    }

    if (car_position < 60) {
        car_position += 5;
        if (car_position > 60) {
            car_position = 60;
        }
        apply_car_position();
    }
}

document.addEventListener("keydown", function(event){
    var tecla = event.key;
    console.log(tecla);
    if(tecla == "ArrowUp"){
        acel()
    }
    if(tecla == "ArrowDown"){
        desacel()
    }
    if(tecla == "r" || tecla == "R"){ 
        reset();
    }
})
