import{J as Z,r as p,p as q,b as G,j as e,C as y,F as j,S as J}from"./index-BUlTi-RG.js";import{P as Q,a as f}from"./ProductCard-CXgMG2nn.js";import{D as K}from"./DynamicBreadcrumb-BHe3ZGbJ.js";import{C as X}from"./Container-D2fZxHT4.js";import{R as I}from"./Row-tlb2Tcc9.js";import{C as w}from"./Card-BrnskKH5.js";import{B as F}from"./Button-D1awEB0c.js";import{B as R}from"./Badge-DrdVs0p9.js";import{A as Y}from"./Alert-CEmwcEMu.js";import"./Anchor-DCpCVXp0.js";import"./useEventCallback-CmmpuWZE.js";import"./Button-CKTz88uJ.js";import"./index-CYgkVBfu.js";import"./CardHeaderContext-BkTFWDBS.js";import"./divWithClassName-BurpA6jg.js";import"./hook-CfU9Pidb.js";import"./objectWithoutPropertiesLoose-CAYKN5F1.js";import"./useEventCallback-CUECKx-A.js";import"./CloseButton-Vs17wP1E.js";import"./TransitionWrapper-BLmPPUNA.js";import"./useMergedRefs-C3O5QAvR.js";const D=`
  .products-page {
    background: var(--background-light, #ffffff);
  }

  .products-header {
    padding: 0;
    margin-bottom: 12px;
  }

  .page-title {
    font-size: 20px;
    font-weight: 600;
    margin: 0;
    color: var(--text-color-dark, #212529);
    height: 20px;
  }

  .products-count {
    font-size: 13px;
    color: var(--text-color-medium, #6c757d);
    margin: 0;
  }

  .sort-dropdown {
    min-width: 180px;
    font-size: 13px;
    border: 1px solid var(--border-color, #dee2e6);
    border-radius: var(--border-radius, 4px);
    color: var(--text-color-dark, #212529);
  }

  .sort-dropdown:focus {
    border-color: var(--primary-color, #007bff);
    box-shadow: 0 0 0 0.2rem rgba(var(--primary-color-rgb, 0, 123, 255), 0.25);
  }

  .filters-sidebar {
    padding: 0;
  }

  .filters-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
    padding: 16px;
    border-bottom: 1px solid var(--border-color-light, #f1f3f4);
  }

  .filters-title {
    font-size: 16px;
    font-weight: 600;
    margin: 0;
    color: var(--text-color-dark, #212529);
  }

  .filters-toggle-btn {
    background: var(--white, #ffffff);
    border: 1px solid var(--border-color, #dee2e6);
    border-radius: var(--border-radius, 4px);
    color: var(--text-color-dark, #212529);
    padding: 8px 12px;
    font-size: 12px;
    font-weight: 500;
    transition: all 0.2s ease;
    display: none;
    align-items: center;
    gap: 6px;
    cursor: pointer;
    white-space: nowrap;
  }

  .filters-toggle-btn:hover {
    background: var(--primary-color, #007bff);
    border-color: var(--primary-color, #007bff);
    color: var(--white, #ffffff);
  }

  .filters-toggle-btn:focus {
    outline: none;
    box-shadow: 0 0 0 0.2rem rgba(var(--primary-color-rgb, 0, 123, 255), 0.25);
  }

  .filters-content {
    padding: 0 16px 16px 16px;
    transition: max-height 0.3s ease, opacity 0.3s ease;
    overflow: hidden;
  }

  .filters-content.collapsed {
    max-height: 0;
    opacity: 0;
    padding: 0 16px;
  }

  .filter-group {
    margin-bottom: 16px;
  }

  .filter-label {
    font-size: 13px;
    font-weight: 500;
    margin: 0 0 6px 0;
    color: var(--text-color-dark, #212529);
    display: block;
  }

  .filter-select {
    border: 1px solid var(--border-color, #dee2e6);
    border-radius: var(--border-radius, 4px);
    font-size: 13px;
    padding: 8px;
    color: var(--text-color-dark, #212529);
  }

  .filter-select:focus {
    border-color: var(--primary-color, #007bff);
    box-shadow: 0 0 0 0.2rem rgba(var(--primary-color-rgb, 0, 123, 255), 0.25);
  }

  .price-inputs {
    display: flex;
    gap: 8px;
    margin: 0 0 8px 0;
  }

  .price-input {
    border: 1px solid var(--border-color, #dee2e6);
    border-radius: var(--border-radius, 4px);
    font-size: 13px;
    padding: 8px;
    color: var(--text-color-dark, #212529);
  }

  .price-input:focus {
    border-color: var(--primary-color, #007bff);
    box-shadow: 0 0 0 0.2rem rgba(var(--primary-color-rgb, 0, 123, 255), 0.25);
  }

  .price-separator {
    align-self: center;
    color: var(--text-color-medium, #6c757d);
    font-size: 13px;
  }

  .apply-price-btn {
    border: 1px solid var(--primary-color, #007bff);
    border-radius: var(--border-radius, 4px);
    background: var(--white, #ffffff);
    color: var(--primary-color, #007bff);
    font-size: 12px;
    padding: 12px;
    width: 100%;
    font-weight: 500;
    transition: all 0.2s ease;
  }

  .apply-price-btn:hover {
    background: var(--primary-color, #007bff);
    color: var(--white, #ffffff);
    border-color: var(--primary-color, #007bff);
  }

  .clear-filters-btn {
    font-size: 12px;
    color: var(--text-color-medium, #6c757d);
    padding: 0;
    text-decoration: none;
    border: none;
    background: none;
  }

  .clear-filters-btn:hover {
    color: var(--primary-color, #007bff);
    text-decoration: underline;
  }

  .active-filters {
    margin-top: 16px;
    padding-top: 16px;
    border-top: 1px solid var(--border-color-light, #f1f3f4);
  }

  .filter-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }

  .filter-tag {
    cursor: pointer;
    font-size: 11px;
    background: var(--primary-color, #007bff);
    color: var(--white, #ffffff);
    border: none;
    border-radius: var(--border-radius-sm, 2px);
    padding: 4px 8px;
    transition: all 0.2s ease;
  }

  .filter-tag:hover {
    background: var(--primary-color-dark, #0056b3);
  }

  .filter-tag-remove {
    margin-left: 4px;
    font-weight: normal;
  }

  .products-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
    margin: 0;
  }

  .loading-state, .empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 40px 16px;
    text-align: center;
    background: var(--white, #ffffff);
  }

  .empty-icon {
    font-size: 48px;
    color: var(--text-color-light, #adb5bd);
    margin-bottom: 16px;
  }

  .empty-title {
    font-size: 18px;
    font-weight: 500;
    margin: 0 0 8px 0;
    color: var(--text-color-dark, #212529);
  }

  .empty-description {
    font-size: 14px;
    color: var(--text-color-medium, #6c757d);
    margin: 0 0 16px 0;
  }

  .empty-action-btn {
    border: 1px solid var(--primary-color, #007bff);
    border-radius: var(--border-radius, 4px);
    background: var(--primary-color, #007bff);
    color: var(--white, #ffffff);
    font-size: 13px;
    padding: 8px 16px;
    transition: all 0.2s ease;
  }

  .empty-action-btn:hover {
    background: var(--primary-color-dark, #0056b3);
    border-color: var(--primary-color-dark, #0056b3);
  }

  .pagination-section {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 24px;
    padding: 20px 0;
    background: var(--white, #ffffff);
    border-top: 1px solid var(--border-color-light, #f1f3f4);
  }

  .pagination-text {
    font-size: 13px;
    color: var(--text-color-medium, #6c757d);
    font-weight: 500;
  }

  .custom-pagination {
    margin: 0;
  }

  .custom-pagination .page-link {
    border: 1px solid var(--border-color, #dee2e6);
    border-radius: var(--border-radius, 4px);
    color: var(--text-color-dark, #212529);
    background: var(--white, #ffffff);
    font-size: 13px;
    padding: 8px 12px;
    margin: 0 2px;
    font-weight: 500;
    transition: all 0.2s ease;
    text-decoration: none;
  }

  .custom-pagination .page-link:hover {
    background: var(--primary-color, #007bff);
    border-color: var(--primary-color, #007bff);
    color: var(--white, #ffffff);
  }

  .custom-pagination .page-item.active .page-link {
    background: var(--primary-color, #007bff);
    border-color: var(--primary-color, #007bff);
    color: var(--white, #ffffff);
  }

  .custom-pagination .page-item.disabled .page-link {
    color: var(--text-color-light, #adb5bd);
    background: var(--background-light, #f8f9fa);
    border-color: var(--border-color-light, #f1f3f4);
    cursor: not-allowed;
  }

  .custom-pagination .page-item.disabled .page-link:hover {
    background: var(--background-light, #f8f9fa);
    border-color: var(--border-color-light, #f1f3f4);
    color: var(--text-color-light, #adb5bd);
  }

  /* Enhanced pagination styles */
  .pagination-controls {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .pagination-info {
    display: flex;
    align-items: center;
  }

  @media (max-width: 991px) {
    .products-grid {
      grid-template-columns: repeat(3, 1fr);
      gap: 14px;
    }

    .pagination-section {
      flex-direction: column;
      gap: 16px;
      text-align: center;
    }
  }

  @media (max-width: 767px) {
    .products-grid {
      grid-template-columns: repeat(2, 1fr);
      gap: 12px;
    }
    
    .page-title {
      font-size: 18px;
    }

    .sort-dropdown {
      min-width: 140px;
    }

    .custom-pagination .page-link {
      padding: 6px 8px;
      font-size: 12px;
    }

    .filters-toggle-btn {
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }

    .filters-header {
      margin-bottom: 0;
      padding-bottom: 16px;
    }

    .filters-content {
      padding-top: 0;
    }

    .filters-content.collapsed {
      padding-top: 0;
      padding-bottom: 0;
    }
  }
`;if(typeof document<"u"){const t="products-page-styles";if(!document.getElementById(t)){const g=document.createElement("style");g.id=t,g.textContent=D,document.head.appendChild(g)}}const je=()=>{var M;const[t,g]=Z(),[n,x]=p.useState(1),[E,k]=p.useState("created_at"),[B,N]=p.useState("desc"),[c,C]=p.useState(),[o,h]=p.useState({min:"",max:""}),[v,A]=p.useState(!1),[O,H]=p.useState(!1);p.useEffect(()=>{const r=()=>{H(window.innerWidth<=767),A(window.innerWidth>767)};return r(),window.addEventListener("resize",r),()=>window.removeEventListener("resize",r)},[]),p.useEffect(()=>{const r=parseInt(t.get("page")||"1"),a=t.get("category"),l=t.get("sort_by")||"created_at",s=t.get("sort_order")||"desc",S=t.get("min_price")||"",V=t.get("max_price")||"";x(r),k(l),N(s),C(a?parseInt(a):void 0),h({min:S,max:V})},[t]);const{data:i,isLoading:_,error:P}=q({page:n,limit:24,category:c,sort_by:E,sort_order:B,min_price:o.min?parseFloat(o.min):void 0,max_price:o.max?parseFloat(o.max):void 0,search:t.get("search")||void 0}),m=G(),z=(i==null?void 0:i.data)||[],d=(i==null?void 0:i.last_page)||1,b=r=>{const a=new URLSearchParams(t);Object.entries(r).forEach(([l,s])=>{s!==void 0&&s!==""?a.set(l,s.toString()):a.delete(l)}),g(a)},u=r=>{var a;x(r),b({page:r}),(a=document.querySelector(".products-header"))==null||a.scrollIntoView({behavior:"smooth",block:"start"})},T=(r,a)=>{k(r),N(a),x(1),b({sort_by:r,sort_order:a,page:1})},L=r=>{const a=r?parseInt(r):void 0;C(a),x(1),b({category:a,page:1})},W=()=>{x(1),b({min_price:o.min,max_price:o.max,page:1})},$=()=>{C(void 0),h({min:"",max:""}),k("created_at"),N("desc"),x(1),g({})},U=()=>{if(t.get("deals"))return"Flash Deals";if(t.get("search"))return`Search Results for "${t.get("search")}"`;if(c&&m){const r=m.find(a=>a.id===c);return r?`${r.category} Products`:"Products"}return"All Products"};return e.jsxs(e.Fragment,{children:[e.jsx(K,{context:{categories:m,selectedCategory:c,searchTerm:t.get("search")||void 0},showBackground:!0,showIcons:!0}),e.jsx(X,{children:e.jsxs(I,{children:[e.jsx(y,{md:3,className:"my-0",children:e.jsx(w,{className:"shadow-sm border-0",children:e.jsx(w.Body,{children:e.jsxs("div",{className:"filters-sidebar",children:[e.jsxs("div",{className:"filters-header",children:[e.jsx("h6",{className:"filters-title",children:"Product Filters"}),e.jsxs("div",{className:"d-flex align-items-center gap-2",children:[(c||o.min||o.max)&&e.jsx(F,{variant:"link",size:"sm",className:"clear-filters-btn p-0",onClick:$,children:"Clear All"}),O&&e.jsxs("button",{className:"filters-toggle-btn",onClick:()=>A(!v),children:[e.jsx("span",{children:v?"Hide":"Show"}),e.jsx("span",{style:{fontSize:"10px",marginLeft:"2px"},children:v?"▲":"▼"})]})]})]}),e.jsxs("div",{className:`filters-content ${v?"":"collapsed"}`,children:[e.jsxs("div",{className:"filter-group",children:[e.jsx("label",{className:"filter-label",children:"Category"}),e.jsxs(j.Select,{size:"sm",className:"filter-select",value:c||"",onChange:r=>L(r.target.value),children:[e.jsx("option",{value:"",children:"All Categories"}),m==null?void 0:m.map(r=>e.jsx("option",{value:r.id,children:r.category},r.id))]})]}),e.jsxs("div",{className:"filter-group",children:[e.jsx("label",{className:"filter-label",children:"Price Range"}),e.jsxs("div",{className:"price-inputs",children:[e.jsx(j.Control,{type:"number",size:"sm",placeholder:"Min",className:"price-input",value:o.min,onChange:r=>h(a=>({...a,min:r.target.value}))}),e.jsx("span",{className:"price-separator",children:"-"}),e.jsx(j.Control,{type:"number",size:"sm",placeholder:"Max",className:"price-input",value:o.max,onChange:r=>h(a=>({...a,max:r.target.value}))})]}),e.jsx(F,{className:"apply-price-btn mt-2",onClick:W,children:"Apply Filters"})]}),(c||o.min||o.max)&&e.jsxs("div",{className:"active-filters",children:[e.jsx("label",{className:"filter-label",children:"Active Filters"}),e.jsxs("div",{className:"filter-tags",children:[c&&m&&e.jsxs(R,{bg:"primary",className:"filter-tag",onClick:()=>L(""),role:"button",children:[(M=m.find(r=>r.id===c))==null?void 0:M.category,e.jsx("span",{className:"filter-tag-remove",children:"×"})]}),(o.min||o.max)&&e.jsxs(R,{bg:"primary",className:"filter-tag",onClick:()=>{h({min:"",max:""}),b({min_price:void 0,max_price:void 0})},role:"button",children:[o.min&&o.max?`${o.min} - ${o.max}`:o.min?`From ${o.min}`:`Up to ${o.max}`,e.jsx("span",{className:"filter-tag-remove",children:"×"})]})]})]})]})]})})})}),e.jsx(y,{md:9,className:"my-0",children:e.jsx(w,{className:"border-0 shadow-sm",children:e.jsxs(w.Body,{children:[e.jsx("div",{className:"products-header mb-3",children:e.jsxs(I,{className:"align-items-center",children:[e.jsx(y,{md:8,children:e.jsxs("div",{className:"page-title-section text-start",children:[e.jsx("h1",{className:"page-title",children:U()}),i&&e.jsxs("p",{className:"products-count",children:[i.total.toLocaleString()," product",i.total!==1?"s":""," found"]})]})}),e.jsx(y,{md:4,children:e.jsx("div",{className:"sort-controls text-end",children:e.jsxs(j.Select,{size:"sm",className:"sort-dropdown",value:`${E}_${B}`,onChange:r=>{const[a,l]=r.target.value.split("_");T(a,l)},children:[e.jsx("option",{value:"created_at_desc",children:"Newest First"}),e.jsx("option",{value:"created_at_asc",children:"Oldest First"}),e.jsx("option",{value:"price_1_asc",children:"Price: Low to High"}),e.jsx("option",{value:"price_1_desc",children:"Price: High to Low"}),e.jsx("option",{value:"name_asc",children:"Name: A to Z"}),e.jsx("option",{value:"name_desc",children:"Name: Z to A"})]})})})]})}),_&&e.jsxs("div",{className:"loading-state",children:[e.jsx(J,{animation:"border",variant:"primary"}),e.jsx("p",{children:"Loading products..."})]}),P&&e.jsx("div",{className:"error-state",children:e.jsxs(Y,{variant:"danger",className:"error-alert",children:[e.jsx("i",{className:"bi bi-exclamation-triangle-fill me-2"}),"Error loading products. Please try again."]})}),!_&&!P&&z.length===0&&e.jsxs("div",{className:"empty-state",children:[e.jsx("i",{className:"bi bi-box-seam empty-icon"}),e.jsx("h4",{className:"empty-title",children:"No products found"}),e.jsx("p",{className:"empty-description",children:"Try adjusting your filters or search terms to find what you're looking for."}),e.jsxs(F,{variant:"primary",onClick:$,className:"empty-action-btn",children:[e.jsx("i",{className:"bi bi-arrow-clockwise me-2"}),"View All Products"]})]}),!_&&!P&&z.length>0&&e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"products-grid",children:z.map(r=>e.jsx("div",{className:"product-item",children:e.jsx(Q,{product:r})},r.id))}),d>1&&e.jsxs("div",{className:"pagination-section",children:[e.jsx("div",{className:"pagination-info",children:e.jsxs("span",{className:"pagination-text",children:["Showing ",(n-1)*24+1," to"," ",Math.min(n*24,(i==null?void 0:i.total)||0)," ","of ",(i==null?void 0:i.total)||0," products"]})}),e.jsx("div",{className:"pagination-controls",children:e.jsxs(f,{className:"custom-pagination",children:[e.jsx(f.First,{disabled:n===1,onClick:()=>u(1)}),e.jsx(f.Prev,{disabled:n===1,onClick:()=>u(n-1)}),(()=>{const a=[],l=[];for(let s=Math.max(2,n-2);s<=Math.min(d-1,n+2);s++)a.push(s);return n-2>2?l.push(1,"..."):l.push(1),l.push(...a),n+2<d-1?l.push("...",d):d>1&&l.push(d),l.map((s,S)=>s==="..."?e.jsx(f.Ellipsis,{disabled:!0},`ellipsis-${S}`):e.jsx(f.Item,{active:s===n,onClick:()=>u(s),children:s},s))})(),e.jsx(f.Next,{disabled:n===d,onClick:()=>u(n+1)}),e.jsx(f.Last,{disabled:n===d,onClick:()=>u(d)})]})})]})]})]})})})]})})]})};export{je as default};
