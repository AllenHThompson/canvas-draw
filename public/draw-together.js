// var canvas = document.getElementsById("canvas");
// var canvas = $('#canvas');
// var ctx = canvas.getContext('2d');

// get the canvas element
var canvas = document.getElementById('canvas');
// get the drawing context
var ctx = canvas.getContext('2d');
var prevX, prevY;
var mouseDown = false;
var color;
var lineWidth;

var serverSocket = io();



// recieves a msg from the server
serverSocket.on('draw', function(twoPoints){
     Draw(twoPoints.x, twoPoints.y, twoPoints.prevX, twoPoints.prevY, twoPoints.color, twoPoints.lineWidth);
     console.log(twoPoints);
});

$('#canvas').mousedown(function(event){
     mouseDown = true;
});

$('#canvas').mousemove(function(event){
     var x = event.pageX - $(this).offset().left;
     var y = event.pageY - $(this).offset().top;

     if(mouseDown){
          // sends information to the server
          serverSocket.emit('draw', {x: x, y: y, prevX: prevX, prevY: prevY, color: color, lineWidth: lineWidth});
          // function call to draw dots on the canvas
          Draw(x, y, prevX, prevY, color, lineWidth);
     }
     prevX = x;
     prevY = y;
});

// if the mouse is up dont draw dots
$("#canvas").mouseup(function(){
     mouseDown = false;
     // Draw(event.pageX, event.pageY);
});

// gets the data-color from the color btn that was clicked -> saves it to the color variable
$('#color button').click(function(){
     // var color = $(this).text
     color = $(this).data('color');
});

//gets the data-width from the width button that was clicked -> saves it to the lineWidth variable
$('#width button').click(function(){
     // var color = $(this).text
     lineWidth = $(this).data('width');
});

// function that takes in the starting and ending points, color and width of the line and draws the line
function Draw(x,y,prevX, prevY, color, lineWidth){
     ctx.strokeStyle = color;
     ctx.lineWidth = lineWidth;
     ctx.lineJoin = 'round';
     ctx.beginPath();
     ctx.moveTo(prevX, prevY);
     ctx.lineTo(x,y);
     ctx.closePath();
     ctx.stroke();
}
