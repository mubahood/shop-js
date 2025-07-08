import{q as y,J as g,j as c,L as v}from"./index-Ck1B39s_.js";import{C as x}from"./Container-CYOb-KOn.js";const A=`
  .dynamic-breadcrumb {

    padding: 12px 0;
    margin-bottom: 0;
    position: relative;
    z-index: 10;
  }

  .dynamic-breadcrumb.no-background {
    background: transparent;
    border-bottom: none;
    padding: 8px 0;
  }

  .dynamic-breadcrumb .breadcrumb-nav {
    margin: 0;
  }

  .dynamic-breadcrumb .breadcrumb-list {
    display: flex !important;
    flex-wrap: wrap;
    align-items: center;
    margin: 0 !important;
    padding: 0 !important;
    list-style: none !important;
    font-size: 14px;
    background: none !important;
  }

  .dynamic-breadcrumb .breadcrumb-item {
    display: flex !important;
    align-items: center;
    position: relative;
  }

  /* Override Bootstrap's breadcrumb separators completely */
  .dynamic-breadcrumb .breadcrumb-item::before,
  .dynamic-breadcrumb .breadcrumb-item::after {
    display: none !important;
    content: none !important;
  }

  .dynamic-breadcrumb .breadcrumb-item + .breadcrumb-item::before {
    display: none !important;
    content: none !important;
  }

  /* Add our own custom separator */
  .dynamic-breadcrumb .breadcrumb-item:not(:last-child)::after {
    content: "/" !important;
    margin: 0 8px !important;
    color: #6c757d !important;
    font-weight: normal !important;
    display: inline !important;
  }

  .dynamic-breadcrumb .breadcrumb-link {
    color: #6c757d !important;
    text-decoration: none !important;
    transition: color 0.2s ease;
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .dynamic-breadcrumb .breadcrumb-link:hover {
    color: #495057 !important;
    text-decoration: none !important;
  }

  .dynamic-breadcrumb .breadcrumb-active {
    color: #495057 !important;
    font-weight: 500 !important;
  }

  .dynamic-breadcrumb .breadcrumb-icon {
    font-size: 14px;
  }

  /* Responsive Design */
  @media (max-width: 768px) {
    .dynamic-breadcrumb {
      padding: 8px 0;
    }
    
    .dynamic-breadcrumb .breadcrumb-list {
      font-size: 13px;
    }
    
    .dynamic-breadcrumb .breadcrumb-item:not(:last-child)::after {
      margin: 0 6px !important;
    }
  }

  @media (max-width: 576px) {
    .dynamic-breadcrumb .breadcrumb-list {
      font-size: 12px;
    }
    
    .dynamic-breadcrumb .breadcrumb-item:not(:last-child)::after {
      margin: 0 4px !important;
    }
  }
`;if(typeof document<"u"){const i="dynamic-breadcrumb-styles";if(!document.getElementById(i)){const a=document.createElement("style");a.id=i,a.textContent=A,document.head.appendChild(a)}}const C=({items:i,context:a={},className:m="",showBackground:b=!0,showIcons:l=!0})=>{const u=y(),[o]=g(),p=i||(()=>{const r=u.pathname.split("/").filter(Boolean),e=[];e.push({label:"Home",href:"/",icon:l?"bi bi-house-door":void 0});for(let t=0;t<r.length;t++){const d=r[t],s=t===r.length-1;switch(d){case"products":if(a.searchTerm)e.push({label:"Products",href:"/products"}),e.push({label:`Search: "${a.searchTerm}"`,isActive:!0});else if(a.selectedCategory&&a.categories){const n=a.categories.find(f=>f.id===a.selectedCategory);n?(e.push({label:"Products",href:"/products"}),e.push({label:n.category,isActive:s})):e.push({label:"Products",isActive:!0})}else e.push({label:"Products",isActive:!0});break;case"product":e.push({label:"Products",href:"/products"}),a.productName?e.push({label:a.productName,isActive:!0}):e.push({label:"Product Details",isActive:!0});break;case"cart":e.push({label:"Shopping Cart",isActive:!0});break;case"checkout":e.push({label:"Cart",href:"/cart"}),e.push({label:"Checkout",isActive:!0});break;case"account":e.push({label:"My Account",href:s?void 0:"/account",isActive:s});break;case"orders":r.includes("account")&&(e.push({label:"My Account",href:"/account"}),e.push({label:"Orders",isActive:!0}));break;case"auth":break;case"search":e.push({label:"Search Results",isActive:!0});break;default:const h=d.replace(/[-_]/g," ").replace(/\b\w/g,n=>n.toUpperCase());e.push({label:h,isActive:s})}}if(o.get("search")&&!a.searchTerm){const t=o.get("search");e.push({label:`Search: "${t}"`,isActive:!0})}return e.filter(t=>t.label&&t.label.trim()!=="")})();return c.jsx("div",{className:`dynamic-breadcrumb  ${b?"":"no-background"} ${m}`,children:c.jsx(x,{className:"",children:c.jsx("nav",{className:"breadcrumb-nav","aria-label":"breadcrumb",children:c.jsx("div",{className:"breadcrumb-list",children:p.map((r,e)=>c.jsx("div",{className:"breadcrumb-item",children:r.href&&!r.isActive?c.jsxs(v,{to:r.href,className:"breadcrumb-link","aria-current":r.isActive?"page":void 0,children:[r.icon&&c.jsx("i",{className:`${r.icon} breadcrumb-icon`,"aria-hidden":"true"}),r.label]}):c.jsxs("span",{className:r.isActive?"breadcrumb-active":"breadcrumb-link","aria-current":r.isActive?"page":void 0,children:[r.icon&&c.jsx("i",{className:`${r.icon} breadcrumb-icon`,"aria-hidden":"true"}),r.label]})},e))})})})})};export{C as D};
