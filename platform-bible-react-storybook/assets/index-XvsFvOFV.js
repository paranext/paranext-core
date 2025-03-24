function p(i){for(var l=[],o=1;o<arguments.length;o++)l[o-1]=arguments[o];var n=Array.from(typeof i=="string"?[i]:i);n[n.length-1]=n[n.length-1].replace(/\r?\n([\t ]*)$/,"");var f=n.reduce(function(e,d){var a=d.match(/\n([\t ]+|(?!\s).)/g);return a?e.concat(a.map(function(u){var t,r;return(r=(t=u.match(/[\t ]/g))===null||t===void 0?void 0:t.length)!==null&&r!==void 0?r:0})):e},[]);if(f.length){var s=new RegExp(`
[	 ]{`+Math.min.apply(Math,f)+"}","g");n=n.map(function(e){return e.replace(s,`
`)})}n[0]=n[0].replace(/^\r?\n/,"");var c=n[0];return l.forEach(function(e,d){var a=c.match(/(?:^|\n)( *)$/),u=a?a[1]:"",t=e;typeof e=="string"&&e.includes(`
`)&&(t=String(e).split(`
`).map(function(r,h){return h===0?r:""+u+r}).join(`
`)),c+=t+n[d+1]}),c}export{p as d};
