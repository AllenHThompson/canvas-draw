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

// if the mouse is down and you are moving the mouse than draw dots

$('#canvas').mousedown(function(event){
     mouseDown = true;
     Draw(event.pageX - $(this).offset().left, event.pageY - $(this).offset().top);
});

$('#canvas').mousemove(function(event){
     console.log((event.pageX + ', ' + event.pageY));

     // function call to draw dots on the canvas
     Draw(event.pageX - $(this).offset().left, event.pageY - $(this).offset().top);

});
// if the mouse is up dont draw dots
$("#canvas").mouseup(function(){
     mouseDown = false;
     Draw(event.pageX, event.pageY);
});

$('#color button').click(function(){
     // var color = $(this).text
     color = $(this).data('color');
     console.log(color);
});

function Draw(x,y){
     if(mouseDown){
          ctx.strokeStyle = color;
          ctx.lineWidth = $('#width').val();
          ctx.lineJoin = 'round';
          ctx.moveTo(prevX, prevY);
          ctx.lineTo(event.pageX, event.pageY);
          ctx.closePath();
          ctx.stroke();
     }

     prevX = event.pageX;
     prevY = event.pageY;
}
