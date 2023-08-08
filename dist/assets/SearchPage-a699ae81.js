import{r as o,j as e,u as y,f as G,d as N,e as D,b as r,L as I,h as C,G as q}from"./index-c475f854.js";import{c as M,d as L}from"./api-32c7f2a8.js";const b="_Form_cm9pi_1",B="_Input_cm9pi_17",k="_SubmitBtn_cm9pi_47",j={Form:b,Input:B,SubmitBtn:k},E=({onSubmit:m})=>{const[l,c]=o.useState(""),i=t=>{c(t.target.value.trim().toLowerCase())},h=t=>{t.preventDefault(),m(l)};return e.jsxs("form",{onSubmit:h,className:j.Form,children:[e.jsx("input",{className:j.Input,type:"text",autoFocus:!0,onChange:i}),e.jsx("button",{type:"submit",className:j.SubmitBtn,children:"Search"})]})},$="_GenresContainer_1y3cq_1",F="_GenresList_1y3cq_53",P="_Genre_1y3cq_1",O="_GenreSelected_1y3cq_77",A="_DropdownInput_1y3cq_101",Q="_DropdownMenu_1y3cq_131",V="_DropdownItem_1y3cq_157",H="_DropdownItemSelected_1y3cq_177",a={GenresContainer:$,GenresList:F,Genre:P,GenreSelected:O,DropdownInput:A,DropdownMenu:Q,DropdownItem:V,DropdownItemSelected:H},R=({placeHolder:m,getFilteredValue:l})=>{const[c,i]=o.useState(null),[h,t]=o.useState(!1),{data:S}=y(),p=(S==null?void 0:S.genres)??[],d=p.map(s=>s.name),u=d.slice(0,G());u.push("All");const f=d.slice(G(),d.length);o.useEffect(()=>{const s=()=>t(!1);return window.addEventListener("click",s),()=>{window.removeEventListener("click",s)}});const _=s=>{s.stopPropagation(),t(!h)},v=()=>f.find(s=>s===c)?c:m,x=s=>{if(i(s),s==="All")return l("all");const g=p.find(w=>{if(w.name===s)return w.id});l(g.id)},n=s=>s===c;return e.jsxs("div",{className:a.GenresContainer,children:[e.jsx("div",{className:a.GenresList,children:u.map(s=>e.jsx("div",{className:n(s)?`${a.GenreSelected}`:`${a.Genre}`,onClick:()=>x(s),children:s},s))}),e.jsxs("div",{className:a.DropdownContainer,children:[e.jsxs("div",{className:a.DropdownInput,onClick:_,children:[e.jsx("div",{className:"dropdown-selected-value",children:v()}),e.jsx("div",{className:"dropdown-tools",children:e.jsx("div",{className:"dropdown-tool",children:"▼"})})]}),h&&e.jsx("div",{className:a.DropdownMenu,children:f.map(s=>e.jsx("div",{className:n(s)?`${a.DropdownItemSelected}`:`${a.DropdownItem}`,onClick:()=>x(s),children:s},s))})]})]})},J=()=>{const[m,l]=o.useState([]),[c,i]=o.useState([]),[h,t]=o.useState(!1),S=N(),[p,d]=D({query:"",genre:""}),u=p.get("query")??"",f=p.get("genre")??"";let _=1;o.useEffect(()=>{if(u===""){t(!1);return}M(u,_).then(n=>{t(!1),n.length===0&&t(!0),l(n)}).catch(n=>{console.log(n)})},[_,u]),o.useEffect(()=>{f!==""&&L(f).then(n=>{t(!1),n.length===0&&t(!0),i(n.results)}).catch(n=>{console.log(n)})},[f]);const v=n=>{d({query:"",genre:n}),l([])},x=n=>{if(n!==u){if(n===""){i([]),d({query:"",genre:p});return}l([]),i([]),d({query:n,genre:""})}};return e.jsxs("div",{children:[e.jsx("div",{className:r.SearchGanresContainer,children:e.jsx(E,{onSubmit:x})}),e.jsx("ul",{className:r.List,children:m.map(n=>e.jsx("li",{className:r.ListItem,children:e.jsx(I,{to:`/movies/${n.id}`,state:{from:S},className:r.Link,children:e.jsxs("div",{className:r.ItemInfo,children:[e.jsx("p",{className:r.Title,children:n.title}),e.jsxs("p",{className:r.Date,children:[e.jsx("span",{children:"|"}),C(n.release_date)]})]})})},n.id))}),e.jsx("div",{className:r.SerchedContainer,children:c&&e.jsx(q,{movies:c})}),c.length===0&&m.length===0&&e.jsx("div",{className:r.Plug}),e.jsx(R,{placeHolder:"Others",getFilteredValue:v}),h&&e.jsx("p",{className:r.FailMessage,children:"No matching results"})]})};export{J as default};