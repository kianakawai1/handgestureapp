Webcam.set({
    width:350,
    height:290,
    image_format:'png',
    png_quality:90,
});
camera=document.getElementById("camera");
Webcam.attach('#camera');
function captureImg(){
    Webcam.snap(function (data_uri){
        document.getElementById("result").innerHTML="<img id='capturedImg' src='"+data_uri+"'/>";
    });
}
function speak(){
    var synth=window.speechSynthesis;
    data1="The first prediction is"+prediction1;
    var utterThis = new SpeechSynthesisUtterance(data1);
    synth.speak(utterThis);
}

classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/9BrjcADqo/model.json', modelLoaded);
function modelLoaded(){
    console.log("yellow");
}

function predictGesture(){
    img = document.getElementById("capturedImg");
    classifier.classify(img, gotResult);
}

function gotResult(error, results){

    if(error){
        console.log(error);
    }
    else{
        console.log(results);
        document.getElementById("result_gesture_name").innerHTML=results[0].label;
        prediction1=results[0].label;
        speak();
    }
    if(results[0].label=="Thumbs Up"){
        document.getElementById("update_emoji").innerHTML="&#128077;";
    }
    if(results[0].label=="Thumbs Down"){
        document.getElementById("update_emoji").innerHTML="&#128078;";
    }
    if(results[0].label=="Rock On"){
        document.getElementById("update_emoji").innerHTML="&#129304;"; 
    }
    if(results[0].label=="Okay"){
        document.getElementById("update_emoji").innerHTML="&#129304;"; 
    }
    if(results[0].label=="Peace"){
        document.getElementById("update_emoji").innerHTML="&#128078;"; 
    }
}