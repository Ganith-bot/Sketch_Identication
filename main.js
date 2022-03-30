function preload(){
   classifier = ml5.imageClassifier('DoodleNet');
}

function setup(){
    canvas = createCanvas(300, 300);
    canvas.mouseReleased(classifyCanvas);
    synth = window.speechSynthesis;

}

function draw(){
    strokeWeight(13);
    stroke(0);
    if (mouseIsPressed) {
        line(pmouseX, pmouseY, mouseX, mouseY);
    }
    
}

function clearCanvas() {
    background("white");
}

function classifyCanvas(){
    classifier.classify(canvas, gotResult);
}

function gotResult(error, results){
    if (error){
        console.log("An Error Has Occured.");
        console.error(error);
    }
    console.log(results);
    document.getElementById("label_name").innerHTML = "Label : " + results[0].label;
    document.getElementById("accuracy1").innerHTML = "Accuracy : " + Math.round(results[0].confidence * 100) + '%';
    utterThis = new SpeechSynthesisUtterance(results[0].label);
    synth.speak(utterThis);
}