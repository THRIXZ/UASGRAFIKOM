const rig = document.querySelector("#rig");

const trees = document.querySelector("#trees");

const leftHandle =
document.querySelector("#leftHandle");

const rightHandle =
document.querySelector("#rightHandle");

const centerBar =
document.querySelector("#centerBar");

const startBtn =
document.querySelector("#startBtn");

startBtn.addEventListener("click", () => {

    alert(
        "Motor Simulator\n\n" +
        "W = Gas\n" +
        "S = Mundur\n" +
        "A = Belok Kiri\n" +
        "D = Belok Kanan"
    );

});

let rotationY = 0;
let speed = 0;
let steering = 0;

const keys = {};

/* ==========================
   KEYBOARD
========================== */

document.addEventListener("keydown",(e)=>{

    keys[e.key.toLowerCase()] = true;

});

document.addEventListener("keyup",(e)=>{

    keys[e.key.toLowerCase()] = false;

});

/* ==========================
   GENERATE TREES
========================== */

for(let z=-20; z>-1000; z-=20){

    createTree(-15,z);

    createTree(15,z);

}

function createTree(x,z){

    const trunk =
    document.createElement("a-cylinder");

    trunk.setAttribute(
        "position",
        `${x} 2 ${z}`
    );

    trunk.setAttribute(
        "radius",
        "0.3"
    );

    trunk.setAttribute(
        "height",
        "4"
    );

    trunk.setAttribute(
        "color",
        "#795548"
    );

    trees.appendChild(trunk);

    const leaves =
    document.createElement("a-cone");

    leaves.setAttribute(
        "position",
        `${x} 5 ${z}`
    );

    leaves.setAttribute(
        "radius-bottom",
        "2"
    );

    leaves.setAttribute(
        "height",
        "4"
    );

    leaves.setAttribute(
        "color",
        "green"
    );

    trees.appendChild(leaves);

}

/* ==========================
   GAME LOOP
========================== */

function update(){

    if(keys["w"]){

        speed = 0.25;

    }
    else if(keys["s"]){

        speed = -0.12;

    }
    else{

        speed = 0;

    }

    if(keys["a"]){

        steering += 1;

    }

    if(keys["d"]){

        steering -= 1;

    }

    if(steering > 25)
        steering = 25;

    if(steering < -25)
        steering = -25;

    if(!keys["a"] && !keys["d"]){

        steering *= 0.9;

    }

    leftHandle.setAttribute(
        "rotation",
        `0 0 ${55 + steering}`
    );

    rightHandle.setAttribute(
        "rotation",
        `0 0 ${-55 + steering}`
    );

    centerBar.setAttribute(
        "rotation",
        `0 0 ${90 + steering}`
    );

    rotationY += steering * speed * 0.08;

    const pos =
    rig.getAttribute("position");

    const rad =
    rotationY * Math.PI / 180;

    pos.x += Math.sin(rad) * speed;

    pos.z -= Math.cos(rad) * speed;

    rig.setAttribute(
        "position",
        pos
    );

    rig.setAttribute(
        "rotation",
        `0 ${rotationY} 0`
    );

    requestAnimationFrame(update);

}

update();