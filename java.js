class Effect{
   constructor(canvas,video){
      this.canvas=canvas;
      this.video=video; 
      this.ctx=canvas.getContext("2d");

      const audioCtx=new AudioContext();
      this.osc=audioCtx.createOscillator();
      this.osc.connect(audioCtx.destination);
      this.osc.frequency.value=0;
      this.osc.start();

      this.#animate();
   }
    stopAudio() {
      //this.Effect = undefined;
      //this.osc.stopAudio();
   }

   #animate(){
      const {ctx,canvas,video}=this;
      ctx.drawImage(video,0,0,
         canvas.width,canvas.height);
      const imgData=ctx.getImageData(
         0,0,canvas.width,canvas.height
      );
      
      const locs=getLocationsWithColor(
         imgData,{r:0,g:0,b:255}
      );
      if(locs.length>0){
         const center=average(locs);
         const p=1-center.y/canvas.height;
         const freq=200+500*p;
         this.osc.frequency.value=freq;

         ctx.beginPath();
         ctx.strokeStyle="blue";
         ctx.lineWidth=5;
         ctx.moveTo(0,center.y);
         ctx.lineTo(canvas.width,center.y);
         ctx.stroke();
      }else{
         this.osc.frequency.value=0;
      }
      
      requestAnimationFrame(this.#animate.bind(this));
   }
}
