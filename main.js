img="";
status="";
objects=[];
name="";

function preload()
{
}

function setup()
{
    canvas=createCanvas(380,320);
    canvas.position(470,220);
    video=createCapture(VIDEO);
    video.hide();
    video.size(380,320);

    objectDetector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function draw()
{
    image(video,0,0,380,320);

    if (status !="")
    {
        r=random(255);
        g=random(255);
        b=random(255);

        objectDetector.detect(video,gotResult);
        for(i=0; i <objects.length; i++)
        {
        document.getElementById("status").innerHTML="Status : Objects Detected";
        document.getElementById("num_of_objects").innerHTML="Number of objects detected are : "+objects.length;

        fill(r,g,b);
        percent=floor(objects[i].confidence*100);
        text(objects[i].label+" "+percent+"%",objects[i].x,objects[i].y);
        noFill();
        stroke(r,g,b);
        rect(objects[i].x -15,objects[i].y,objects[i].width,objects[i].height);
        }

        if (objects[i].label==name)
        {
            song.stop();
            document.getElementById("num_of_objects").innerHTML=name+" Found";
        }
        else
        {
            document.getElementById("num_of_objects").innerHTML=name+" Not Found";
            song.play();
        }
    }
}

function modelLoaded()
{
    console.log("Model Loaded!");
    status = true;
    objectDetector.detect(video,gotResult);
}

function gotResult(error,results)
{
    if (error)
    {
        console.log(error);
    }
    console.log(results);
    objects=results;
}

function start()
{
    name=document.getElementById("objects_nme").value;
}