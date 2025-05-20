var h={PERFORMANCE:70,BALANCE:30,SMOOTH:10},d={smoothness:"BALANCE",shineSize:"5%",shineSpread:"50%",shineColor:"hsl(0deg 0% 100%/ 4%)",shineBorder:"transparent"},c={mouseX:"--shine-x",mouseY:"--shine-y",shineFrom:"--shine-from",shineTo:"--shine-to",shineColor:"--shine-color",shineBorder:"--shine-border"};var l=`
.shine-effect {
  --shine-x: 0%;
  --shine-y: 0%;
  --shine-from: 0%;
  --shine-to: 0%;
  --shine-border: transparent;

  isolation: isolate;
  position: relative;
  overflow: hidden;

  &::before {
    pointer-events: none;
    content: '';

    position: absolute;
    z-index: 1;
    inset: 1px;
    border-radius: inherit; 

    opacity: 0;
    background: radial-gradient(
      circle at var(--shine-x) var(--shine-y),
      var(--shine-color) var(--shine-from),
      transparent var(--shine-to)
    );

    outline: 1px solid var(--shine-border);
    outline-offset: -1px;
    box-shadow: 
      inset 0 0 10px calc(8px * (1 - (var(--shine-x) + var(--shine-y)) / 200)) var(--shine-border),
      0 0 20px calc(12px * (1 - (var(--shine-x) + var(--shine-y)) / 200)) var(--shine-border);

    transition: 
      opacity 150ms cubic-bezier(0, 0, 0.2, 1),
      box-shadow 150ms cubic-bezier(0, 0, 0.2, 1);
  }

  &::after {
    pointer-events: none;
    content: '';

    position: absolute;
    z-index: 0;
    inset: 0;
    border-radius: inherit;

    opacity: 0;
    transition: opacity 150ms cubic-bezier(0, 0, 0.2, 1);
  }

  &:hover::before,
  &:hover::after {
    opacity: 1;
  }
}
`;function p(e){if(typeof document==="undefined")return;let t="shine-effect-styles";if(document.getElementById(t))return;let n=document.createElement("style");n.id=t,n.textContent=e,document.head.appendChild(n)}function u(){if(typeof document==="undefined")return;let e=document.getElementById("shine-effect-styles");if(e)e.remove()}var s=new WeakMap,E=(e,t,n)=>({xPercent:(t-e.left)/e.width*100,yPercent:(n-e.top)/e.height*100}),v=(e,t,n,o)=>{let{xPercent:r,yPercent:i}=E(e,t,n);return{mouseX:`${r}%`,mouseY:`${i}%`,shineFrom:o.shineSize,shineTo:o.shineSpread,shineColor:o.shineColor,shineBorder:o.shineBorder}},S=(e,t)=>{requestAnimationFrame(()=>{Object.entries(c).forEach(([o,r])=>{e.style.setProperty(r,t[o])})})},a=(e)=>{requestAnimationFrame(()=>{Object.values(c).forEach((n)=>{e.style.removeProperty(n)})})},m=(e)=>{document.querySelectorAll(".shine-effect").forEach((n)=>{let o=s.get(n);if(!o)return;let r=Date.now(),i=h[o.config.smoothness];if(r-o.lastCall<i)return;o.lastCall=r;let y=n.getBoundingClientRect(),x=v(y,e.clientX,e.clientY,o.config);S(n,x)})},f=(e)=>{if(!e.relatedTarget?.closest(".shine-effect"))document.querySelectorAll(".shine-effect").forEach((o)=>a(o))};if(typeof document!=="undefined")document.addEventListener("mousemove",m),document.addEventListener("mouseleave",f);var B=(e,t)=>{p(l);let n=typeof e==="string"?document.querySelectorAll(e):[e];if(n.length===0)return console.warn(`[shine-on-hover]: No elements found matching selector: "${e}"`),()=>{};let o={...d,...t};return n.forEach((r)=>{r.classList.add("shine-effect"),s.set(r,{config:o,lastCall:0})}),()=>{if(n.forEach((r)=>{r.classList.remove("shine-effect"),s.delete(r),a(r)}),!document.querySelector(".shine-effect"))u()}};export{B as shine};
