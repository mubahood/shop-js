import{e as $,g as j,r as h,l as N,j as s,L as d,n as Y,T as n,Q as V,V as U,U as u}from"./index-BUlTi-RG.js";import{f as m}from"./index-CYgkVBfu.js";const _=`
  .account-wishlist-container {
    max-width: 1200px;
    margin: 0 auto;
  }

  .wishlist-header-enhanced {
    background: var(--white);
    border-radius: var(--border-radius);
    padding: 2rem;
    margin-bottom: 2rem;
    box-shadow: var(--shadow-sm);
    border: 1px solid var(--border-color-light);
  }

  .wishlist-stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;
  }

  .wishlist-stat-card {
    background: var(--white);
    border-radius: var(--border-radius);
    padding: 1.5rem;
    text-align: center;
    box-shadow: var(--shadow-sm);
    border: 1px solid var(--border-color-light);
    transition: transform 0.2s ease;
  }

  .wishlist-stat-card:hover {
    transform: translateY(-2px);
  }

  .wishlist-stat-number {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
    color: var(--primary-color);
  }

  .wishlist-stat-label {
    color: var(--text-color-medium);
    font-size: 0.9rem;
    margin: 0;
  }

  .wishlist-item-card {
    background: var(--white);
    border-radius: var(--border-radius);
    padding: 1.5rem;
    margin-bottom: 1.5rem;
    box-shadow: var(--shadow-sm);
    border: 1px solid var(--border-color-light);
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
  }

  .wishlist-item-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  }

  .wishlist-item-content {
    display: flex;
    gap: 1.5rem;
    align-items: flex-start;
  }

  .wishlist-item-image {
    width: 120px;
    height: 120px;
    flex-shrink: 0;
    border-radius: var(--border-radius);
    overflow: hidden;
    background: var(--bg-light);
    border: 1px solid var(--border-color);
    position: relative;
  }

  .wishlist-item-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  .wishlist-item-card:hover .wishlist-item-image img {
    transform: scale(1.05);
  }

  .wishlist-item-details {
    flex: 1;
    min-width: 0;
  }

  .wishlist-item-title {
    font-size: 1.1rem;
    font-weight: 600;
    color: var(--text-color-dark);
    margin-bottom: 0.5rem;
    line-height: 1.4;
    text-decoration: none;
    display: block;
    transition: color 0.2s ease;
  }

  .wishlist-item-title:hover {
    color: var(--primary-color);
  }

  .wishlist-item-meta {
    font-size: 0.85rem;
    color: var(--text-color-medium);
    margin-bottom: 1rem;
  }

  .wishlist-item-price {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 1rem;
  }

  .wishlist-price-current {
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--primary-color);
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
  }

  .wishlist-item-actions {
    display: flex;
    gap: 0.75rem;
    flex-wrap: wrap;
  }

  .wishlist-btn {
    padding: 0.5rem 1rem;
    border-radius: var(--border-radius);
    font-weight: 500;
    font-size: 0.9rem;
    transition: all 0.2s ease;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    text-decoration: none;
  }

  .wishlist-btn-primary {
    background: var(--primary-color);
    color: white;
  }

  .wishlist-btn-primary:hover {
    background: var(--primary-color-dark);
    transform: translateY(-1px);
  }

  .wishlist-btn-outline {
    background: transparent;
    color: var(--text-color-dark);
    border: 2px solid var(--border-color);
  }

  .wishlist-btn-outline:hover {
    border-color: var(--primary-color);
    color: var(--primary-color);
    background: var(--primary-color-light);
  }

  .wishlist-remove-btn {
    position: absolute;
    top: 1rem;
    right: 1rem;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.9);
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--danger-color);
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .wishlist-remove-btn:hover {
    background: var(--danger-color);
    color: white;
    transform: scale(1.1);
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
    font-size: 4rem;
    color: var(--text-color-light);
    margin-bottom: 1.5rem;
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
    max-width: 400px;
    margin-left: auto;
    margin-right: auto;
  }

  .wishlist-loading {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 300px;
    flex-direction: column;
    gap: 1rem;
  }

  .wishlist-spinner {
    width: 40px;
    height: 40px;
    border: 4px solid var(--border-color);
    border-top: 4px solid var(--primary-color);
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  @media (max-width: 767.98px) {
    .wishlist-item-content {
      flex-direction: column;
      gap: 1rem;
    }

    .wishlist-item-image {
      width: 100%;
      height: 200px;
    }

    .wishlist-item-actions {
      justify-content: center;
    }

    .wishlist-header-enhanced {
      padding: 1.5rem;
    }

    .wishlist-stats-grid {
      grid-template-columns: 1fr;
    }
  }
`,O=()=>{const c=$(),{user:o}=j(t=>t.auth),{items:r,isLoading:w}=j(t=>t.wishlist),[k,g]=h.useState(new Set),[x,b]=h.useState(new Set),[B,v]=h.useState(new Map);h.useEffect(()=>{o&&o.id&&c(N())},[o,c]);const S=r.length,F=r.reduce((t,e)=>{const i=parseFloat(e.product_sale_price||e.product_price||"0");return t+i},0),A=r.reduce((t,e)=>{const i=parseFloat(e.product_price||"0"),a=parseFloat(e.product_sale_price||"0");return a>0&&a<i?t+(i-a):t},0),I=async(t,e)=>{g(i=>new Set(i).add(t));try{await c(Y(t)),n.success(`${e} removed from wishlist`)}catch(i){console.error("Error removing from wishlist:",i),n.error("Failed to remove item from wishlist")}finally{g(i=>{const a=new Set(i);return a.delete(t),a})}},f=async t=>{b(e=>new Set(e).add(t.product_id));try{const e=new V;e.id=t.product_id,e.name=t.product_name,e.price_1=t.product_sale_price||t.product_price,e.price_2=t.product_price,e.feature_photo=t.product_photo||"",c(U({product:e,quantity:1,variant:{}})),n.success(`${t.product_name} added to cart`)}catch(e){console.error("Error adding to cart:",e),n.error("Failed to add to cart")}finally{b(e=>{const i=new Set(e);return i.delete(t.product_id),i})}},T=async()=>{if(r.length!==0)try{const t=r.map(e=>f(e));await Promise.all(t),n.success("All items added to cart")}catch(t){console.error("Error adding all to cart:",t),n.error("Failed to add all items to cart")}},C=t=>t?u.img(t):u.img(""),W=t=>t?new Date(t).toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric"}):"N/A",L=()=>{o&&o.id&&c(N())},z=t=>{v(e=>new Map(e).set(t,!0))},P=(t,e)=>{v(a=>new Map(a).set(t,!1));const i=e.currentTarget;i.src=u.img("")},M=(t,e)=>{if(!e)return 0;const i=parseFloat(t),a=parseFloat(e);return a>=i?0:Math.round((i-a)/i*100)};return!o||!o.id?s.jsxs(s.Fragment,{children:[s.jsx("style",{dangerouslySetInnerHTML:{__html:_}}),s.jsx("div",{className:"account-wishlist-container",children:s.jsxs("div",{className:"wishlist-empty-state",children:[s.jsx("i",{className:"bi bi-exclamation-triangle wishlist-empty-icon"}),s.jsx("h2",{className:"wishlist-empty-title",children:"Please Log In"}),s.jsx("p",{className:"wishlist-empty-text",children:"You need to be logged in to view your wishlist."}),s.jsxs(d,{to:"/auth/login",className:"wishlist-btn wishlist-btn-primary",children:[s.jsx("i",{className:"bi bi-box-arrow-in-right"}),"Log In"]})]})})]}):s.jsxs(s.Fragment,{children:[s.jsx("style",{dangerouslySetInnerHTML:{__html:_}}),s.jsxs("div",{className:"account-wishlist-container",children:[s.jsx("div",{className:"wishlist-header-enhanced",children:s.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:"1rem"},children:[s.jsxs("div",{children:[s.jsx("h1",{style:{fontSize:"2rem",fontWeight:"700",color:"var(--text-color-dark)",marginBottom:"0.5rem"},children:"My Wishlist"}),s.jsx("p",{style:{color:"var(--text-color-medium)",margin:0},children:r.length>0?`${r.length} item${r.length!==1?"s":""} saved for later`:"Save your favorite products here"})]}),s.jsxs("div",{style:{display:"flex",gap:"0.75rem",flexWrap:"wrap"},children:[r.length>0&&s.jsxs("button",{className:"wishlist-btn wishlist-btn-primary",onClick:T,disabled:x.size>0,children:[s.jsx("i",{className:"bi bi-cart-plus"}),"Add All to Cart"]}),s.jsxs("button",{className:"wishlist-btn wishlist-btn-outline",onClick:L,disabled:w,children:[s.jsx("i",{className:"bi bi-arrow-clockwise"}),"Refresh"]})]})]})}),r.length>0&&s.jsxs("div",{className:"wishlist-stats-grid",children:[s.jsxs("div",{className:"wishlist-stat-card",children:[s.jsx("div",{className:"wishlist-stat-number",children:S}),s.jsx("p",{className:"wishlist-stat-label",children:"Items in Wishlist"})]}),s.jsxs("div",{className:"wishlist-stat-card",children:[s.jsx("div",{className:"wishlist-stat-number",children:m(F)}),s.jsx("p",{className:"wishlist-stat-label",children:"Total Value"})]}),s.jsxs("div",{className:"wishlist-stat-card",children:[s.jsx("div",{className:"wishlist-stat-number",children:m(A)}),s.jsx("p",{className:"wishlist-stat-label",children:"Total Savings"})]})]}),w?s.jsxs("div",{className:"wishlist-loading",children:[s.jsx("div",{className:"wishlist-spinner"}),s.jsx("p",{style:{color:"var(--text-color-medium)"},children:"Loading your wishlist..."})]}):r.length===0?s.jsxs("div",{className:"wishlist-empty-state",children:[s.jsx("i",{className:"bi bi-heart wishlist-empty-icon"}),s.jsx("h2",{className:"wishlist-empty-title",children:"Your Wishlist is Empty"}),s.jsx("p",{className:"wishlist-empty-text",children:"Start adding products to your wishlist by clicking the heart icon on any product you like."}),s.jsxs(d,{to:"/products",className:"wishlist-btn wishlist-btn-primary",children:[s.jsx("i",{className:"bi bi-search"}),"Browse Products"]})]}):s.jsx("div",{children:r.map(t=>{const e=k.has(t.product_id),i=x.has(t.product_id),a=C(t.product_photo),l=t.product_sale_price?parseFloat(t.product_sale_price):null,p=parseFloat(t.product_price||"0"),E=l&&l>0?l:p,D=l&&l>0&&l<p,y=M(t.product_price,t.product_sale_price);return s.jsxs("div",{className:"wishlist-item-card",style:{opacity:e?.6:1},children:[s.jsx("button",{className:"wishlist-remove-btn",onClick:()=>I(t.product_id,t.product_name),disabled:e,title:"Remove from wishlist",children:e?s.jsx("div",{className:"wishlist-spinner",style:{width:"16px",height:"16px"}}):s.jsx("i",{className:"bi bi-heart-fill"})}),s.jsxs("div",{className:"wishlist-item-content",children:[s.jsx("div",{className:"wishlist-item-image",children:s.jsx("img",{src:a,alt:t.product_name,onLoad:()=>z(t.product_id),onError:R=>P(t.product_id,R)})}),s.jsxs("div",{className:"wishlist-item-details",children:[s.jsx(d,{to:`/product/${t.product_id}`,className:"wishlist-item-title",children:t.product_name}),s.jsxs("div",{className:"wishlist-item-meta",children:["Added on ",W(t.created_at)]}),s.jsxs("div",{className:"wishlist-item-price",children:[s.jsx("span",{className:"wishlist-price-current",children:m(E)}),D&&s.jsxs(s.Fragment,{children:[s.jsx("span",{className:"wishlist-price-original",children:m(p)}),y>0&&s.jsxs("span",{className:"wishlist-discount-badge",children:["-",y,"% OFF"]})]})]}),s.jsxs("div",{className:"wishlist-item-actions",children:[s.jsx("button",{className:"wishlist-btn wishlist-btn-primary",onClick:()=>f(t),disabled:i||e,children:i?s.jsxs(s.Fragment,{children:[s.jsx("div",{className:"wishlist-spinner",style:{width:"16px",height:"16px"}}),"Adding..."]}):s.jsxs(s.Fragment,{children:[s.jsx("i",{className:"bi bi-cart-plus"}),"Add to Cart"]})}),s.jsxs(d,{to:`/product/${t.product_id}`,className:"wishlist-btn wishlist-btn-outline",children:[s.jsx("i",{className:"bi bi-eye"}),"View Details"]})]})]})]})]},t.id)})}),r.length>0&&s.jsxs("div",{style:{marginTop:"2rem",display:"flex",gap:"1rem",justifyContent:"center",flexWrap:"wrap"},children:[s.jsxs(d,{to:"/products",className:"wishlist-btn wishlist-btn-primary",children:[s.jsx("i",{className:"bi bi-plus-circle"}),"Add More Items"]}),s.jsxs("button",{className:"wishlist-btn wishlist-btn-outline",children:[s.jsx("i",{className:"bi bi-share"}),"Share Wishlist"]})]})]})]})};export{O as default};
