

const canvas = document.querySelector("canvas");

toolbtns = document.querySelectorAll(".tool"); 
ctx = canvas.getContext("2d");//ctx: It refers to the canvas context object. The canvas context represents the drawing area of the canvas and provides methods and properties for drawing shapes and images on it.

let isDrawing = false;
brushWidth =5;

console.log(toolbtns);


window.addEventListener("load" , ()=>{    //this block code ensures that when the "load" event is triggered, the canvas element is resized to match its offset dimensions, allowing for accurate rendering and positioning of graphics within the canvas.
    canvas.width = canvas.offsetWidth;
    canvas.height= canvas.offsetHeight;
})




const drawing = (e)=>{

    if(!isDrawing) return; // if isDrawing is false return from here
    ctx.lineTo(e.offsetX, e.offsetY);  // lineTo(): This is a method of the canvas context object (ctx). It is used to create a straight line path from the current drawing position to the specified coordinates.
                                      // e.offsetX and e.offsetY: These are the X and Y coordinates of the mouse pointer relative to the target element, in this case, the canvas element. It is assumed that the code is being executed within an event handler, and e represents the event object.
    ctx.stroke(); //stroke(): This is a method of the canvas context object (ctx). It is used to stroke or draw the outline of the current path.                      
}






toolbtns.forEach(btn => {
    btn.addEventListener("click" , ()=>{     //adding click event to all tool option


            console.log(btn.id)

    })

    
});


canvas.addEventListener("mousedown",()=> {
    isDrawing = true;
    ctx.beginPath(); // creating new path to draw
    ctx.lineWidth = brushWidth; // passing brushsize as line width

});
canvas.addEventListener("mousemove",drawing);
canvas.addEventListener("mouseup" , ()=> isDrawing = false);


