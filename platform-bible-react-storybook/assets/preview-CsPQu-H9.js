const{STORY_CHANGED:a}=__STORYBOOK_MODULE_CORE_EVENTS__,{addons:s}=__STORYBOOK_MODULE_PREVIEW_API__,{global:c}=__STORYBOOK_MODULE_GLOBAL__;var h="storybook/highlight",r="storybookHighlight",O=`${h}/add`,E=`${h}/reset`,{document:n}=c,g=(e="#FF4785",t="dashed")=>`
  outline: 2px ${t} ${e};
  outline-offset: 2px;
  box-shadow: 0 0 0 6px rgba(255,255,255,0.6);
`,d=s.getChannel(),p=e=>{let t=r;i();let o=Array.from(new Set(e.elements)),l=n.createElement("style");l.setAttribute("id",t),l.innerHTML=o.map(_=>`${_}{
          ${g(e.color,e.style)}
         }`).join(" "),n.head.appendChild(l)},i=()=>{var o;let e=r,t=n.getElementById(e);t&&((o=t.parentNode)==null||o.removeChild(t))};d.on(a,i);d.on(E,i);d.on(O,p);
