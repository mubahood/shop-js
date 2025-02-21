import{bb as x,r as t,P as d,j as e,ac as b,ad as i,ab as g,ag as w,K as o,ah as v,L as y}from"./index-D3ojX_Fy.js";import{pageSkeleton as j}from"./JobDetailPage-Bb8nku2I.js";import"./index-C0GkpkSG.js";function P(){const{id:c}=x(),[n,a]=t.useState(!0),[l,m]=t.useState(""),[f,p]=t.useState(new d),u=async()=>{a(!0);try{const r=await w(`cvs/${c}`);if(r.code!==1){o.error(r.message||"Failed to fetch CV"),a(!1);return}const s=d.fromJson(JSON.stringify(r.data));if(!s.id){o.error("Failed to fetch CV"),a(!1);return}p(s),m(v+"/storage/"+s.school_pay_account_id),await h()}catch(r){console.error("Error fetching CV:",r),o.error("Failed to fetch CV: "+r.message)}finally{a(!1)}},h=async()=>{try{(await y("/view-record-create",{type:"CV",item_id:c})).code===1&&o.success("View recorded successfully.")}catch{}};return t.useEffect(()=>{document.title="My CV",u()},[c]),n?j():e.jsxs(b,{children:[e.jsxs("ol",{className:"breadcrumb breadcrumb-item text-muted fs-6 fw-bold mb-5 mx-3",children:[e.jsx("li",{className:"breadcrumb-item pe-3",children:e.jsx(i,{to:"/",className:"active text-decoration-none",children:"Home"})}),e.jsx("li",{className:"breadcrumb-item pe-3 ",children:e.jsx(i,{to:"/cv-bank",className:"active text-decoration-none",children:"CVs"})}),e.jsx("li",{className:"breadcrumb-item px-3 text-muted ",children:f.name})]}),e.jsxs("div",{className:"  shadow-sm my-4",children:[e.jsx(g,{}),e.jsxs("div",{className:"card-body",children:[e.jsx("section",{className:"pdf-viewer-container mb-4",children:e.jsx("iframe",{title:"My CV PDF Viewer",src:l,className:"pdf-iframe",allowFullScreen:!0,"aria-label":"PDF viewer"})}),e.jsx("div",{className:"pdf-footer text-center",children:e.jsx(i,{to:"/cv-bank",className:"btn btn-outline-primary",children:"Back to CV Bank"})})]})]}),e.jsx("style",{children:`
        .cv-page-container {
          max-width: 900px;
          margin: auto;
          background-color: #fff;
          border-radius: 8px;
          overflow: hidden;
        }
        .pdf-viewer-container {
          border: 1px solid #ddd;
          border-radius: 5px;
          overflow: hidden;
          background-color: #fdfdfd;
          height: 95vh;
        }
        .pdf-iframe {
          width: 100%;
          height: 100%;
          border: none;
        }
        .pdf-footer {
          padding: 1rem;
        }
        @media print {
          .cv-page-container {
            margin: 0;
            box-shadow: none;
          }
        }
      `})]})}export{P as default};
