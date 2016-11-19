function shape(canvas,cobj){
    this.canvas=canvas;
    this.cobj=cobj;
    this.width=canvas.width;
    this.height=canvas.height;
    this.type="line";
    this.style="stroke";
    this.strokeStyle="#000";
    this.fillStyle="#000";
    this.lineWidth=1;
    this.history=[];
}
shape.prototype={
    init:function(){
        this.cobj.strokeStyle=this.strokeStyle;
        this.cobj.fillStyle=this.fillStyle;
        this.cobj.lineWidth=this.lineWidth;
    },
    draw:function(){
        var that=this;
        that.canvas.onmousedown=function(e){
            var startX=e.offsetX;
            var startY=e.offsetY;

            that.canvas.onmousemove=function(e){
                var movex=e.offsetX;
                var movey=e.offsetY;
                that.cobj.clearRect(0,0,that.width,that.height);
                if(that.history.length>0){
                    that.cobj.putImageData(that.history[that.history.length-1],0,0);
                }
                that.cobj.beginPath();
                that[that.type](startX,startY,movex,movey);
            }
            that.canvas.onmouseup=function(){
                that.canvas.onmousemove=null;
                that.canvas.onmouseup=null;
                that.history.push(that.cobj.getImageData(0,0,that.width,that.height));
            }
        }
    },
    line:function(x,y,w,h){
        this.cobj.moveTo(x,y);
        this.cobj.lineTo(w,h);
        this.cobj.stroke();
    },
    rect:function(x,y,w,h){
        this.cobj.rect(x,y,w-x,h-y);
        this.cobj[this.style]();
    }
}