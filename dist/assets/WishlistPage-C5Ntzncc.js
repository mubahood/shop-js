import{e as V,d as H,r as j,j as r,C as i,S as u,L as g,n as f,T as a,Q as I,V as W}from"./index-BUlTi-RG.js";import{C as N}from"./Container-D2fZxHT4.js";import{R as o}from"./Row-tlb2Tcc9.js";import{H as _}from"./heart-GrKcqomq.js";import{B as l}from"./Button-D1awEB0c.js";import{c as x}from"./createLucideIcon-BszcUjbx.js";import{C as B}from"./Card-BrnskKH5.js";import{B as R}from"./Badge-DrdVs0p9.js";import{E as $}from"./eye-Dw6hP9RE.js";import"./Button-CKTz88uJ.js";import"./CardHeaderContext-BkTFWDBS.js";import"./divWithClassName-BurpA6jg.js";/**
 * @license lucide-react v0.525.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const D=[["path",{d:"M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z",key:"1a0edw"}],["path",{d:"M12 22V12",key:"d0xqtd"}],["polyline",{points:"3.29 7 12 12 20.71 7",key:"ousv84"}],["path",{d:"m7.5 4.27 9 5.15",key:"1c824w"}]],k=x("package",D);/**
 * @license lucide-react v0.525.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const G=[["circle",{cx:"8",cy:"21",r:"1",key:"jimo8o"}],["circle",{cx:"19",cy:"21",r:"1",key:"13723u"}],["path",{d:"M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12",key:"9zh506"}]],z=x("shopping-cart",G);/**
 * @license lucide-react v0.525.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const P=[["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6",key:"4alrt4"}],["path",{d:"M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2",key:"v07s0e"}],["line",{x1:"10",x2:"10",y1:"11",y2:"17",key:"1uufr5"}],["line",{x1:"14",x2:"14",y1:"11",y2:"17",key:"xtxkd"}]],C=x("trash-2",P),S=`
  .wishlist-page-wrapper {
    background: var(--bg-light);
    min-height: 100vh;
    padding: 2rem 0;
  }

  .wishlist-header {
    background: var(--white);
    border-radius: var(--border-radius);
    padding: 2rem;
    margin-bottom: 2rem;
    box-shadow: var(--shadow-sm);
    border: 1px solid var(--border-color-light);
  }

  .wishlist-title {
    color: var(--text-color-dark);
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
  }

  .wishlist-subtitle {
    color: var(--text-color-medium);
    font-size: 1rem;
    margin-bottom: 0;
  }

  .wishlist-card {
    transition: all 0.3s ease;
    border: none !important;
    background: var(--white);
    border-radius: var(--border-radius);
    overflow: hidden;
    height: 100%;
    position: relative;
  }

  .wishlist-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  }

  .wishlist-image-container {
    position: relative;
    overflow: hidden;
    height: 250px;
    background: var(--bg-light);
  }

  .wishlist-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  .wishlist-card:hover .wishlist-image {
    transform: scale(1.05);
  }

  .wishlist-remove-btn {
    position: absolute;
    top: 12px;
    right: 12px;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.9);
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
    z-index: 2;
  }

  .wishlist-remove-btn:hover {
    background: var(--white);
    transform: scale(1.1);
  }

  .wishlist-card-body {
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    flex: 1;
  }

  .wishlist-product-title {
    font-size: 1rem;
    font-weight: 600;
    color: var(--text-color-dark);
    margin-bottom: 0.75rem;
    line-height: 1.4;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .wishlist-price-container {
    margin-bottom: 1rem;
  }

  .wishlist-price-current {
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--primary-color);
    margin-right: 0.5rem;
  }

  .wishlist-price-original {
    font-size: 0.9rem;
    color: var(--text-color-muted);
    text-decoration: line-through;
  }

  .wishlist-discount-badge {
    background: var(--accent-color);
    color: white;
    font-size: 0.75rem;
    font-weight: 600;
    padding: 0.25rem 0.5rem;
    border-radius: 12px;
    margin-left: 0.5rem;
  }

  .wishlist-buttons {
    margin-top: auto;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .wishlist-add-to-cart-btn {
    background: var(--primary-color);
    border: none;
    padding: 0.75rem 1rem;
    border-radius: var(--border-radius);
    font-weight: 600;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
  }

  .wishlist-add-to-cart-btn:hover {
    background: var(--primary-color-dark);
    transform: translateY(-1px);
  }

  .wishlist-view-btn {
    border: 2px solid var(--border-color);
    background: transparent;
    color: var(--text-color-dark);
    padding: 0.75rem 1rem;
    border-radius: var(--border-radius);
    font-weight: 500;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    text-decoration: none;
  }

  .wishlist-view-btn:hover {
    border-color: var(--primary-color);
    color: var(--primary-color);
    background: var(--primary-color-light);
  }

  .wishlist-empty-state {
    background: var(--white);
    border-radius: var(--border-radius);
    padding: 4rem 2rem;
    text-align: center;
    box-shadow: var(--shadow-sm);
    border: 1px solid var(--border-color-light);
  }

  .wishlist-empty-icon {
    width: 80px;
    height: 80px;
    margin: 0 auto 2rem;
    color: var(--text-color-light);
  }

  .wishlist-empty-title {
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--text-color-dark);
    margin-bottom: 1rem;
  }

  .wishlist-empty-text {
    color: var(--text-color-medium);
    margin-bottom: 2rem;
    font-size: 1rem;
  }

  .wishlist-stats {
    background: var(--white);
    border-radius: var(--border-radius);
    padding: 1.5rem;
    margin-bottom: 2rem;
    box-shadow: var(--shadow-sm);
    border: 1px solid var(--border-color-light);
  }

  .wishlist-clear-btn {
    background: transparent;
    border: 2px solid var(--danger-color);
    color: var(--danger-color);
    padding: 0.5rem 1rem;
    border-radius: var(--border-radius);
    font-weight: 500;
    transition: all 0.2s ease;
  }

  .wishlist-clear-btn:hover {
    background: var(--danger-color);
    color: white;
  }

  .wishlist-categories {
    background: var(--white);
    border-radius: var(--border-radius);
    padding: 2rem;
    margin-top: 3rem;
    box-shadow: var(--shadow-sm);
    border: 1px solid var(--border-color-light);
  }

  .wishlist-category-btn {
    background: var(--bg-light);
    border: 1px solid var(--border-color);
    color: var(--text-color-dark);
    padding: 0.5rem 1rem;
    border-radius: 20px;
    font-size: 0.9rem;
    font-weight: 500;
    transition: all 0.2s ease;
    text-decoration: none;
    display: inline-block;
    margin: 0.25rem;
  }

  .wishlist-category-btn:hover {
    background: var(--primary-color);
    color: white;
    border-color: var(--primary-color);
  }

  @media (max-width: 767.98px) {
    .wishlist-page-wrapper {
      padding: 1rem 0;
    }

    .wishlist-header {
      padding: 1.5rem;
      margin-bottom: 1.5rem;
    }

    .wishlist-title {
      font-size: 1.5rem;
    }

    .wishlist-image-container {
      height: 200px;
    }

    .wishlist-card-body {
      padding: 1rem;
    }

    .wishlist-buttons {
      flex-direction: column;
    }
  }
`,ir=()=>{const d=V(),{manifest:m,isLoading:F}=H(),t=(m==null?void 0:m.wishlist)||[],[h,w]=j.useState(null),[c,b]=j.useState(null),v=t.reduce((e,s)=>e+parseFloat(s.product_sale_price||s.product_price),0),A=t.reduce((e,s)=>e+parseFloat(s.product_price),0)-v,M=async e=>{try{w(e),await d(f(e)).unwrap(),a.success("Item removed from wishlist")}catch(s){console.error("Error removing from wishlist:",s),a.error("Failed to remove from wishlist")}finally{w(null)}},y=async e=>{try{b(e.product_id);const s=new I;s.id=e.product_id,s.name=e.product_name,s.price_1=e.product_sale_price||e.product_price,s.price_2=e.product_price,s.feature_photo=e.product_photo||"",d(W({product:s,quantity:1,variant:{}})),a.success(`${e.product_name} added to cart`)}catch(s){console.error("Error adding to cart:",s),a.error("Failed to add to cart")}finally{b(null)}},L=async()=>{if(window.confirm("Are you sure you want to clear your entire wishlist?"))try{const e=t.map(s=>d(f(s.product_id)).unwrap());await Promise.all(e),a.success("Wishlist cleared successfully")}catch(e){console.error("Error clearing wishlist:",e),a.error("Failed to clear wishlist")}},T=async()=>{if(window.confirm("Add all wishlist items to cart?"))try{const e=t.map(s=>y(s));await Promise.all(e),a.success("All items added to cart")}catch(e){console.error("Error adding all to cart:",e),a.error("Failed to add all items to cart")}},E=(e,s)=>{if(!s||s===e)return 0;const n=parseFloat(e),p=parseFloat(s);return Math.round((n-p)/n*100)};return F?r.jsxs(r.Fragment,{children:[r.jsx("style",{dangerouslySetInnerHTML:{__html:S}}),r.jsx("div",{className:"wishlist-page-wrapper",children:r.jsx(N,{children:r.jsx(o,{className:"justify-content-center",children:r.jsx(i,{md:6,className:"text-center",children:r.jsxs("div",{className:"wishlist-empty-state",children:[r.jsx(u,{animation:"border",variant:"primary",className:"mb-3"}),r.jsx("h3",{children:"Loading your wishlist..."}),r.jsx("p",{children:"Please wait while we fetch your saved items."})]})})})})})]}):r.jsxs(r.Fragment,{children:[r.jsx("style",{dangerouslySetInnerHTML:{__html:S}}),r.jsx("div",{className:"wishlist-page-wrapper",children:r.jsxs(N,{children:[r.jsx("div",{className:"wishlist-header",children:r.jsxs(o,{className:"align-items-center",children:[r.jsx(i,{md:8,children:r.jsxs("div",{className:"d-flex align-items-center mb-3 mb-md-0",children:[r.jsx(_,{className:"text-primary me-3",size:32}),r.jsxs("div",{children:[r.jsx("h1",{className:"wishlist-title",children:"My Wishlist"}),r.jsxs("p",{className:"wishlist-subtitle",children:[t.length," ",t.length===1?"item":"items"," saved for later"]})]})]})}),r.jsx(i,{md:4,className:"text-md-end",children:t.length>0&&r.jsxs("div",{className:"d-flex flex-column flex-md-row gap-2 justify-content-md-end",children:[r.jsxs(l,{variant:"outline-primary",size:"sm",onClick:T,disabled:c!==null,children:[r.jsx(z,{size:16,className:"me-2"}),"Add All to Cart"]}),r.jsxs(l,{className:"wishlist-clear-btn",size:"sm",onClick:L,disabled:h!==null,children:[r.jsx(C,{size:16,className:"me-2"}),"Clear All"]})]})})]})}),t.length>0&&r.jsx("div",{className:"wishlist-stats",children:r.jsxs(o,{children:[r.jsxs(i,{md:4,className:"text-center mb-3 mb-md-0",children:[r.jsx("h4",{className:"text-primary mb-1",children:t.length}),r.jsx("p",{className:"mb-0 text-muted",children:"Items in Wishlist"})]}),r.jsxs(i,{md:4,className:"text-center mb-3 mb-md-0",children:[r.jsxs("h4",{className:"text-success mb-1",children:["UGX ",v.toLocaleString()]}),r.jsx("p",{className:"mb-0 text-muted",children:"Total Value"})]}),r.jsxs(i,{md:4,className:"text-center",children:[r.jsxs("h4",{className:"text-warning mb-1",children:["UGX ",A.toLocaleString()]}),r.jsx("p",{className:"mb-0 text-muted",children:"Total Savings"})]})]})}),t.length===0?r.jsx(o,{className:"justify-content-center",children:r.jsx(i,{lg:6,children:r.jsxs("div",{className:"wishlist-empty-state",children:[r.jsx(_,{className:"wishlist-empty-icon"}),r.jsx("h2",{className:"wishlist-empty-title",children:"Your wishlist is empty"}),r.jsx("p",{className:"wishlist-empty-text",children:"Discover amazing products and save your favorites for later! Start browsing our collection to build your perfect wishlist."}),r.jsx(g,{to:"/products",children:r.jsxs(l,{variant:"primary",size:"lg",children:[r.jsx(k,{size:20,className:"me-2"}),"Start Shopping"]})})]})})}):r.jsx(o,{children:t.map(e=>{const s=E(e.product_price,e.product_sale_price);return r.jsx(i,{lg:3,md:4,sm:6,className:"mb-4",children:r.jsxs(B,{className:"wishlist-card",children:[r.jsxs("div",{className:"wishlist-image-container",children:[r.jsx("img",{src:e.product_photo?`http://127.0.0.1:8888/images/${e.product_photo}`:"/media/misc/image.png",alt:e.product_name,className:"wishlist-image",onError:n=>{const p=n.target;p.src="/media/misc/image.png"}}),s>0&&r.jsxs(R,{className:"wishlist-discount-badge position-absolute",style:{top:"12px",left:"12px"},children:["-",s,"%"]}),r.jsx(l,{className:"wishlist-remove-btn",onClick:()=>M(e.product_id),disabled:h===e.product_id,children:h===e.product_id?r.jsx(u,{animation:"border",size:"sm"}):r.jsx(C,{size:16,className:"text-danger"})})]}),r.jsxs("div",{className:"wishlist-card-body",children:[r.jsx("h6",{className:"wishlist-product-title",children:e.product_name}),r.jsxs("div",{className:"wishlist-price-container",children:[r.jsxs("span",{className:"wishlist-price-current",children:["UGX ",parseFloat(e.product_sale_price||e.product_price).toLocaleString()]}),e.product_sale_price&&parseFloat(e.product_sale_price)<parseFloat(e.product_price)&&r.jsxs("span",{className:"wishlist-price-original",children:["UGX ",parseFloat(e.product_price).toLocaleString()]})]}),r.jsxs("div",{className:"wishlist-buttons",children:[r.jsxs(l,{className:"wishlist-add-to-cart-btn",onClick:()=>y(e),disabled:c===e.product_id,children:[c===e.product_id?r.jsx(u,{animation:"border",size:"sm"}):r.jsx(z,{size:16}),c===e.product_id?"Adding...":"Add to Cart"]}),r.jsxs(g,{to:`/product/${e.product_id}`,className:"wishlist-view-btn",children:[r.jsx($,{size:16}),"View Details"]})]})]})]})},e.id)})}),t.length>0&&r.jsxs("div",{className:"wishlist-categories",children:[r.jsxs("h4",{className:"mb-3 d-flex align-items-center",children:[r.jsx(k,{className:"me-2",size:24}),"Continue Shopping"]}),r.jsx("p",{className:"text-muted mb-3",children:"Discover more products in these popular categories"}),r.jsx("div",{className:"d-flex flex-wrap",children:["Electronics","Fashion","Home & Garden","Sports & Fitness","Beauty & Health","Books & Media"].map(e=>r.jsx(g,{to:`/category/${e.toLowerCase().replace(/\s+/g,"-")}`,className:"wishlist-category-btn",children:e},e))})]})]})})]})};export{ir as default};
