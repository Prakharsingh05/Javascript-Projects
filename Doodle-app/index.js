

const canvas = document.querySelector("canvas");

toolbtns = document.querySelectorAll(".tool"); 
fillcolor = document.querySelector("#fill-color"); 
sizeSlider = document.querySelector("size-slider"); 
colorBtns = documen.querySelectorAll(".colors .option");
ctx = canvas.getContext("2d");//ctx: It refers to the canvas context object. The canvas context represents the drawing area of the canvas and provides methods and properties for drawing shapes and images on it.

// global variables with default value
let prevMouseX , prevMouseY, snapshot,
isDrawing = false;
selectedTool = "brush",
brushWidth =5;
selectedColor = "#000";




window.addEventListener("load" , ()=>{    //this block code ensures that when the "load" event is triggered, the canvas element is resized to match its offset dimensions, allowing for accurate rendering and positioning of graphics within the canvas.
    canvas.width = canvas.offsetWidth;
    canvas.height= canvas.offsetHeight;
});



const drawRect = (e) =>{

    if(!fillcolor.checked){
    return ctx.strokeRect(e.offsetX , e.offsetY , prevMouseX - e.offsetX, prevMouseY - e.offsetY);
}
 ctx.fillRect(e.offsetX , e.offsetY , prevMouseX - e.offsetX, prevMouseY - e.offsetY);

}

const drawCircle = (e)=>{
        ctx.beginPath(); // creating new path to draw circle
        // getting radius  for circle according to the mouse pointer
    let radius = Math.sqrt(Math.pow((prevMouseX- e.offsetX), 2) + Math.pow((prevMouseY - e.offsetY), 2));
    ctx.arc(prevMouseX , prevMouseY , radius , 0 , 2 * Math.PI); // creating cricle according to the mouse pointer
    fillcolor.checked ? ctx.fill() :ctx.stroke(); // if fillColor is checked fill circle else draw border circle
}

const drawTraingle = (e) => {

    ctx.beginPath(); // creating new path to draw circle
 
    ctx.moveTo(prevMouseX , prevMouseY); // moving traingle to the mouse pointer 
    ctx.lineTo(e.offsetX , e.offsetY);  // creating first line ac0cording to the mouse pointer
    ctx.lineTo(prevMouseX * 2 - e.offsetX , e.offsetY);
    ctx.closePath(); // closing path of a traingle so the third line draw automatically
    fillcolor.checked ? ctx.fill() : ctx.stroke(); // if fillColor is checked fill rectangle else draw border rectangle

}

const startDraw = (e) =>{
    isDrawing = true;
    prevMouseX = e.offsetX; // passing current mouseX positon as prevMouseX value 
    prevMouseY = e.offsetY; // passing current mouseY positon as prevMouseY value
    ctx.beginPath();// craeting new path to draw
    ctx.lineWidth = brushWidth; // pasaing  brushsize as line width4

    // copying canvas data & passing as snapshot value... this avoids dragging the image
    snapshot = ctx.getImageData(0 , 0 , canvas.width , canvas.height);

}

const drawing = (e)=>{

    if(!isDrawing) return; // if isDrawing is false return from here
    ctx.putImageData(snapshot , 0 , 0); // adding copies canvas data to this canvas
        if(selectedTool === "brush"){

            ctx.lineTo(e.offsetX, e.offsetY);  // lineTo(): This is a method of the canvas context object (ctx). It is used to create a straight line path from the current drawing position to the specified coordinates.
                                              // e.offsetX and e.offsetY: These are the X and Y coordinates of the mouse pointer relative to the target element, in this case, the canvas element. It is assumed that the code is being executed within an event handler, and e represents the event object.
            ctx.stroke(); //stroke(): This is a method of the canvas context object (ctx). It is used to stroke or draw the outline of the current path.                      

        }else if(selectedTool === "rectangle"){
            drawRect(e);
        }else if(selectedTool === "circle"){
            drawCircle(e);
        }else {
            drawTraingle(e);
        }
    }
    









toolbtns.forEach(btn => {
    btn.addEventListener("click" , ()=>{     //adding click event to all tool option

            document.querySelector(".options .active").classList.remove("active"); // removing active class  from the previos option and adding on current clicked option
            btn.classList.add('active');
            selectedTool= btn.id;
            console.log(selectedTool);

    });

    
});


sizeSlider.addEventListener("change"  , ()=> brushWidth = sizeslider.value); // passing slider value as brushSize

colorBtns.forEach(btn =>{
    btn.addEventListener("click", ()=> { // adding click event to all color button
        document.querySelector(".options .selected").classList.remove("selected"); // removing active class  from the previos option and adding on current clicked option
        btn.classList.add("selected");
        selectedColor = window.getComputedStyle(btn).getPropertyValue("background-color");
    })
})

canvas.addEventListener("mousedown",startDraw);
canvas.addEventListener("mousemove",drawing);
canvas.addEventListener("mouseup" , ()=> isDrawing = false); //


