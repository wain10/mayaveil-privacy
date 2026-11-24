(() => {
  const canvas = document.querySelector(".mist canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  let frame;
  function paint() {
    const w = canvas.clientWidth, h = canvas.clientHeight;
    if (!w || !h) return;
    const density = Math.min(window.devicePixelRatio || 1, 4, Math.sqrt(10000000 / (w*h)));
    canvas.width = Math.round(w*density);
    canvas.height = Math.round(h*density);
    ctx.setTransform(canvas.width/w, 0, 0, canvas.height/h, 0, 0);
    const light = document.documentElement.dataset.theme === "true";
    const tones = light
      ? ["#acb8b8","#97a6a4","#879992","#72887e","#657a71","#61756c","#50655d","#40564f"]
      : ["#414e57","#3a4952","#31434a","#283c40","#24373b","#26393b","#1d3033","#192b2d"];
    const narrow = w < 816;
    const horizon = narrow ? Math.min(h*.10, 87) : h*.48;
    const relief = narrow ? 32 : Math.min(h*.125, 118);
    const waves = (x,k) => .48*Math.sin(x*6.28+k)+.29*Math.sin(x*11.7-k*.8)+.20*Math.cos(x*21+k*.7);
    function ridge(x,layer) {
      return horizon + relief*(.27*layer+.49*waves(x,layer*.84)+.045*Math.sin(x*63+layer));
    }
    function fillRidge(layer) {
      ctx.fillStyle=tones[layer];ctx.beginPath();ctx.moveTo(0,h);
      for(let x=0;x<w+4;x+=3) ctx.lineTo(x,ridge(x/w,layer));
      ctx.lineTo(w,h);ctx.closePath();ctx.fill();
    }
    let seed=431;
    function random(){seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;}
    function tree(x,y,height,color) {
      ctx.fillStyle=color;
      ctx.beginPath();ctx.moveTo(x,y);ctx.quadraticCurveTo(x-height*.22,y-height*.37,x,y-height);
      ctx.quadraticCurveTo(x+height*.18,y-height*.44,x+height*.035,y);ctx.fill();
    }
    for(let layer=0;layer<5;layer++){
      fillRidge(layer);
      if(layer===2 || layer===3) {
        for(let x=0;x<w;x+=1+random()*3){
          if(Math.sin(x/w*28+layer)+Math.sin(x/w*57)>.1)
            tree(x,ridge(x/w,layer)+1,(2+random()*4)*relief/70,tones[layer]);
        }
      }
    }
    // Long curved furrows follow the nearest rolling pasture.
    for(let i=0;i<19;i++){
      const x=(i-2)*w/15, y=ridge(x/w,4);
      ctx.strokeStyle=tones[3];ctx.globalAlpha=.48;ctx.lineWidth=.55+relief/195;
      ctx.beginPath();ctx.moveTo(x,y+3);
      ctx.bezierCurveTo(x+w*.025,y+relief*.28,x-w*.09,y+relief*.72,x-w*.17,h);ctx.stroke();
    }
    ctx.globalAlpha=1;
    function farm(x,scale) {
      const y=ridge(x/w,4)+scale*.7;
      function house(dx,dy,width,height) {
        ctx.fillStyle=light?"#b8b6a4":"#68716f";ctx.fillRect(x+dx,y+dy-height,width,height);
        ctx.fillStyle=tones[7];ctx.beginPath();ctx.moveTo(x+dx-scale,y+dy-height);
        ctx.lineTo(x+dx+width*.22,y+dy-height-scale*2);ctx.lineTo(x+dx+width*.82,y+dy-height-scale*2);
        ctx.lineTo(x+dx+width+scale,y+dy-height);ctx.fill();
      }
      house(0,0,9*scale,3.8*scale);house(11*scale,scale,6*scale,3*scale);
      for(let i=0;i<7;i++)tree(x-(3+i*2.7)*scale,y+Math.sin(i)*scale,(4+random()*4)*scale,tones[7]);
    }
    farm(w*.12,Math.max(.7,relief/68));farm(w*.85,Math.max(.6,relief/91));
    // Atmospheric perspective softens the transition into the near foreground.
    const haze=ctx.createLinearGradient(0,horizon+relief,0,h);
    haze.addColorStop(0,"transparent");haze.addColorStop(1,light?"#a8b4af":"#19292f");
    ctx.fillStyle=haze;ctx.fillRect(0,horizon+relief,w,h);
  }
  function queuePaint(){cancelAnimationFrame(frame);frame=requestAnimationFrame(paint);}
  new ResizeObserver(queuePaint).observe(canvas);
  new MutationObserver(queuePaint).observe(document.documentElement,{attributes:true,attributeFilter:["data-theme"]});
  window.addEventListener("resize",queuePaint);
  paint();
})();
