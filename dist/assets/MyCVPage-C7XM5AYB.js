import{r as t,j as r,ac as l,ag as p,K as i,P as m,ah as g}from"./index-D3ojX_Fy.js";import{pageSkeleton as u}from"./JobDetailPage-Bb8nku2I.js";import"./index-C0GkpkSG.js";function y(){const[s,o]=t.useState(!0),[d,c]=t.useState(""),f=async()=>{o(!0);var e=null;try{e=await p("users/me"),e.code!==1&&i.error(e.message||"Failed to fetch cv because : "+e.message)}catch(a){throw o(!1),i.error("Failed to fetch cv because : "+a),console.error("Error fetching job by ID:",a),a}o(!1);var n=m.fromJson(JSON.stringify(e.data));if(n.id==""){i.error("Failed to fetch cv because : "+e.message);return}c(g+"/storage/"+n.school_pay_account_id)};return t.useEffect(()=>{document.title="My CV",f()},[]),s?u():r.jsx(l,{children:r.jsxs("main",{className:"",children:[r.jsx("section",{className:"pdf-viewer-container",children:r.jsx("iframe",{title:"My CV PDF Viewer",src:d,className:"pdf-iframe",allowFullScreen:!0,"aria-label":"PDF viewer"})}),r.jsx("style",{children:`
        .pdf-page-container {
          max-width: 900px;
          margin: 20px auto;
          padding: 20px;
          background-color: #f9f9f9;
          border-radius: 8px;
          box-shadow: 0 2px 6px rgba(0,0,0,0.1);
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
        }
        header h2 {
          text-align: center;
          margin-bottom: 1rem;
          color: #333;
        }
        .pdf-viewer-container {
          border: 1px solid #ddd;
          border-radius: 5px;
          overflow: hidden;
          background-color: #fff;
          height: 95vh;
        }
        .pdf-iframe {
          width: 100%;
          height: 100%;
          border: none;
          display: block;
        }
        .pdf-footer {
          text-align: center;
          margin-top: 15px;
        }
        .pdf-footer a {
          color: #0078d7;
          text-decoration: none;
          font-weight: bold;
        }
        .pdf-footer a:hover {
          text-decoration: underline;
        }
        @media print {
          .pdf-page-container {
            margin: 0;
            padding: 0;
            box-shadow: none;
          }
        }
      `})]})})}export{y as default};
