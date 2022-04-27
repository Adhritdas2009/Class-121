pr='';

function preload(){

}

function setup() {
  canvas = createCanvas(300, 300);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();
  classifier=ml5.imageClassifier('MobileNet', modelLoaded)
 
}

function draw(){
  image(video, 0, 0, 300, 300);
  classifier.classify(video, gotResult)
}

function modelLoaded(){
  console.log("The model has been loaded");
}

function gotResult(error, results){
  if(error){
    console.error(error)
  }

  else{
    if((results[0].confidence > 0.2) && (pr != results[0].label)){
    console.log(results)
    pr=results[0].label;
    sname=document.getElementById('name').innerHTML=pr;
    p=results[0].confidence*100;
    document.getElementById('confidence').innerHTML=p.toFixed(2) + " % ";
    synth=window.speechSynthesis;
    utter=new SpeechSynthesisUtterance("The object detected is "+ sname);
    synth.speak(utter)
    }
  }
}