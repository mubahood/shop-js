import{bp as $,r as t,j as e,z as I,ad as J,bq as K}from"./index-B8pH7eeg.js";const F={hidden:{opacity:0,x:-20},visible:{opacity:1,x:0,transition:{duration:.4}}},Q=({product:a})=>{const[p,l]=t.useState(!1),o=a.getMainImage(),c=a.getHoverImage();return e.jsx("div",{className:"col-6 col-md-3 mb-4 d-flex",children:e.jsx(J,{to:`/product/${a.id}`,className:"d-flex flex-column w-100 text-decoration-none",onMouseEnter:()=>l(!0),onMouseLeave:()=>l(!1),children:e.jsxs("div",{className:"product-card d-flex flex-column h-100",children:[e.jsx("div",{className:"product-card__top-wrapper",children:e.jsx("div",{className:"product-card__img-container",style:{backgroundColor:"#f8f9fa"},children:e.jsxs("div",{className:"crop-image-container",children:[e.jsx("img",{className:"crop-image-container__img img-fluid",src:p&&c?c:o,alt:a.name}),e.jsx("div",{className:"crop-image-container__mask"})]})})}),e.jsxs("div",{className:"product-card__bottom-wrapper px-2 py-2 mt-auto",children:[e.jsx("div",{className:"product-card__goods-title-container mb-1",children:e.jsx("span",{className:"goods-title-link",children:a.name})}),e.jsxs("div",{className:"bottom-wrapper__price-wrapper d-flex align-items-center justify-content-between",children:[e.jsx("div",{className:"product-card__price",children:e.jsx("span",{className:"price-text",children:a.getFormattedPrice()})}),e.jsx("span",{className:"product-card__add-btn btn btn-sm",role:"button",children:e.jsx("i",{className:"bi bi-cart-plus"})})]})]})]})})})},ee=()=>{const[a,p]=$(),[l,o]=t.useState(Number(a.get("page"))||1),[c,k]=t.useState(a.get("category")||""),[n,w]=t.useState(a.get("brand")||""),[i,P]=t.useState(a.get("color")||""),[d,_]=t.useState(a.get("size")||""),[m,C]=t.useState(a.get("rating")||""),[f,O]=t.useState(a.get("inStock")==="1"),[j,L]=t.useState(a.get("sort")||"Newest"),[h,M]=t.useState(a.get("minPrice")||""),[u,z]=t.useState(a.get("maxPrice")||""),[v,H]=t.useState([]),[x,A]=t.useState(!1),[g,B]=t.useState(""),[N,R]=t.useState(1),[E,G]=t.useState(0),T=["Phones","Laptops","Headphones","Cameras"],U=["Apple","Samsung","Dell","HP","Canon","Sony"],W=["Black","White","Blue","Red","Green","Yellow"],X=["Small","Medium","Large","XL"],Y=["1","2","3","4","5"],q=["Newest","Oldest","Price Low","Price High"],b=async s=>{A(!0),B("");try{const r={};c&&(r.category=c),n&&(r.brand=n),i&&(r.color=i),d&&(r.size=d),m&&(r.rating=m),f&&(r.in_stock=1),r.sort=j,h&&(r.min_price=h),u&&(r.max_price=u);const S=await K.fetchProducts(s,r);H(S.data),R(S.last_page),G(S.total)}catch(r){console.error("Error fetching products:",r),B("Failed to load products.")}finally{A(!1)}};t.useEffect(()=>{b(l)},[c,n,i,d,m,f,j,h,u,l]);const D=()=>{o(1);const s={};c&&(s.category=c),n&&(s.brand=n),i&&(s.color=i),d&&(s.size=d),m&&(s.rating=m),f&&(s.inStock="1"),s.sort=j,h&&(s.minPrice=h),u&&(s.maxPrice=u),s.page="1",p(s,{replace:!0}),b(1)},V=()=>{k(""),w(""),P(""),_(""),C(""),O(!1),L("Newest"),M(""),z(""),o(1),p({},{replace:!0}),b(1)},y=s=>{if(s<1||s>N)return;o(s);const r=Object.fromEntries([...a]);r.page=String(s),p(r,{replace:!0}),b(s)};return e.jsxs("div",{className:"container py-4 px-2 px-lg-10",children:[e.jsxs("div",{className:"row gx-3",children:[e.jsx(I.div,{className:"col-12 col-md-3 mb-3",variants:F,initial:"hidden",animate:"visible",children:e.jsxs("div",{className:"bg-white rounded shadow-sm p-3",children:[e.jsxs("h6",{className:"fw-bold mb-3 d-flex align-items-center",children:[e.jsx("i",{className:"bi bi-funnel-fill me-2 text-primary"}),"Filter Products"]}),e.jsxs("div",{className:"mb-3",children:[e.jsx("label",{className:"form-label mb-1",children:"Category"}),e.jsxs("select",{className:"form-select form-select-sm",value:c,onChange:s=>k(s.target.value),children:[e.jsx("option",{value:"",children:"All"}),T.map(s=>e.jsx("option",{value:s,children:s},s))]})]}),e.jsxs("div",{className:"mb-3",children:[e.jsx("label",{className:"form-label mb-1",children:"Brand"}),e.jsxs("select",{className:"form-select form-select-sm",value:n,onChange:s=>w(s.target.value),children:[e.jsx("option",{value:"",children:"All"}),U.map(s=>e.jsx("option",{value:s,children:s},s))]})]}),e.jsxs("div",{className:"mb-3",children:[e.jsx("label",{className:"form-label mb-1",children:"Color"}),e.jsxs("select",{className:"form-select form-select-sm",value:i,onChange:s=>P(s.target.value),children:[e.jsx("option",{value:"",children:"Any"}),W.map(s=>e.jsx("option",{value:s,children:s},s))]})]}),e.jsxs("div",{className:"mb-3",children:[e.jsx("label",{className:"form-label mb-1",children:"Size"}),e.jsxs("select",{className:"form-select form-select-sm",value:d,onChange:s=>_(s.target.value),children:[e.jsx("option",{value:"",children:"Any"}),X.map(s=>e.jsx("option",{value:s,children:s},s))]})]}),e.jsxs("div",{className:"mb-3",children:[e.jsx("label",{className:"form-label mb-1",children:"Minimum Rating"}),e.jsxs("select",{className:"form-select form-select-sm",value:m,onChange:s=>C(s.target.value),children:[e.jsx("option",{value:"",children:"Any"}),Y.map(s=>e.jsxs("option",{value:s,children:[s," ★ & Up"]},s))]})]}),e.jsxs("div",{className:"form-check mb-3",children:[e.jsx("input",{type:"checkbox",className:"form-check-input",id:"inStockOnly",checked:f,onChange:s=>O(s.target.checked)}),e.jsx("label",{htmlFor:"inStockOnly",className:"form-check-label",children:"In Stock Only"})]}),e.jsxs("div",{className:"mb-3",children:[e.jsx("label",{className:"form-label mb-1",children:"Price Range (UGX)"}),e.jsxs("div",{className:"d-flex align-items-center",children:[e.jsx("input",{type:"number",className:"form-control form-control-sm me-2",placeholder:"Min",value:h,onChange:s=>M(s.target.value),style:{width:"90px"}}),e.jsx("input",{type:"number",className:"form-control form-control-sm",placeholder:"Max",value:u,onChange:s=>z(s.target.value),style:{width:"90px"}})]})]}),e.jsxs("div",{className:"mb-3 d-flex gap-2",children:[e.jsxs("button",{className:"btn btn-sm btn-primary flex-grow-1",onClick:()=>{D(),y(1)},children:[e.jsx("i",{className:"bi bi-search me-1"}),"Apply"]}),e.jsx("button",{className:"btn btn-sm btn-secondary",onClick:V,children:"Clear"})]})]})}),e.jsxs("div",{className:"col-12 col-md-9",children:[e.jsxs(I.div,{className:"bg-white shadow-sm rounded p-3 d-flex align-items-center justify-content-between mb-3",variants:F,initial:"hidden",animate:"visible",children:[e.jsx("h1",{className:"h4 mb-0",children:"Shop"}),e.jsxs("div",{className:"ms-auto",children:[e.jsx("label",{className:"me-2 text-muted",children:"Sort By:"}),e.jsx("select",{className:"form-select form-select-sm d-inline-block w-auto",style:{minWidth:"120px"},value:j,onChange:s=>{L(s.target.value),o(1),b(1)},children:q.map(s=>e.jsx("option",{value:s,children:s},s))})]})]}),x&&e.jsxs("div",{className:"py-4 text-center",children:[e.jsx("div",{className:"spinner-border text-primary",role:"status"}),e.jsx("p",{className:"mt-2",children:"Loading products..."})]}),!x&&g&&e.jsx("div",{className:"alert alert-danger",role:"alert",children:g}),!x&&!g&&v.length===0&&e.jsx("div",{className:"text-center py-4",children:e.jsx("p",{className:"text-muted",children:"No products found."})}),!x&&!g&&v.length>0&&e.jsx("div",{className:"row gy-4 row-cols-2 row-cols-md-3 row-cols-lg-4",children:v.map(s=>e.jsx(Q,{product:s},s.id))}),!x&&!g&&E>0&&e.jsxs("div",{className:"d-flex justify-content-between align-items-center mt-4",children:[e.jsxs("small",{className:"text-muted",children:["Page ",e.jsx("strong",{children:l})," of"," ",e.jsx("strong",{children:N})," | Total:"," ",e.jsx("strong",{children:E})]}),e.jsxs("div",{children:[e.jsxs("button",{className:"btn btn-outline-secondary btn-sm me-1",onClick:()=>y(l-1),disabled:l<=1,children:[e.jsx("i",{className:"bi bi-chevron-left"})," Prev"]}),e.jsxs("button",{className:"btn btn-outline-secondary btn-sm",onClick:()=>y(l+1),disabled:l>=N,children:["Next ",e.jsx("i",{className:"bi bi-chevron-right"})]})]})]})]})]}),e.jsx("style",{children:`
        .btn-primary {
          background-color: #f33d02;
          border-color: #114786;
        }
        .btn-primary:hover {
          background-color: #0f3a6d;
          border-color: #0f3a6d;
        }
        .product-card {
          background-color: #fff;
          transition: transform 0.2s;
        }
        .product-card:hover {
          transform: translateY(-3px);
        }
        .crop-image-container {
          position: relative;
          width: 100%;
          padding-bottom: 100%;
          overflow: hidden;
          background-color: #f8f9fa;
        }
        .crop-image-container__img {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .crop-image-container__mask {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0,0,0,0.1);
          opacity: 0;
          transition: opacity 0.2s ease-in-out;
        }
        .product-card:hover .crop-image-container__mask {
          opacity: 1;
        }
        .goods-title-link {
          font-size: 1rem;
          font-weight: 500;
          color: black;
          transition: color 0.2s;
        }
        .product-card:hover .goods-title-link {
          color: #f33d02;
        }
        .price-text {
          font-size: 1rem;
          font-weight: 600;
          color: #114786;
          margin-right: 0.5rem;
        }
      `})]})};export{ee as default};
