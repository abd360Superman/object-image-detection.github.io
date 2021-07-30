function loadHome() {
    window.location = 'index.html';
}

let status = "";
let img = "";
let objects = [];

function preload() {
    img = loadImage("images/fruits.jpg");
}

function setup() {
    const canvas = createCanvas(640, 420);
    canvas.center();
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}

function modelLoaded() {
    console.log("Model Loaded!");
    status = true;
    objectDetector.detect(img, gotResults);
}

function gotResults(error, results) {
    if (error) {
        console.error(error);
    }
    console.log(results);
    objects = results;
}

function draw() {
    image(img, 0, 0, 640, 420);
    if (status != "") {
        for (let c = 0; c < objects.length; c++) { 
            document.getElementById("status").innerHTML = "Status: Object Detected"; 
            fill("#FF0000"); 
            let percent = floor(objects[c].confidence * 100); 
            text(objects[c].label + " " + percent + "%", objects[c].x + 15, objects[c].y + 15); 
            noFill(); 
            stroke("#FF0000"); 
            rect(objects[c].x, objects[c].y, objects[c].width, objects[c].height); 
        }
    }
}