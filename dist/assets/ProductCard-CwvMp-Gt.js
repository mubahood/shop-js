import{e as M,r as u,g as h,s as D,h as F,i as R,k as $,l as T,j as r,L as S,n as U,o as G}from"./index-Ck1B39s_.js";import{c as X,g as B,a as P}from"./index-DhbewBbn.js";const H=`
  .product-card {
    background-color: var(--white, #ffffff);
    border-radius: 4px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    transition: all 0.3s ease;
    cursor: pointer;
    border: 1px solid transparent;
    position: relative;
  }

  .product-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
    border-color: var(--border-color-light, #f1f3f4);
  }

  .product-card-image-container {
    position: relative;
    width: 100%;
    aspect-ratio: 1;
    overflow: hidden;
    background: var(--background-light, #f8f9fa);
  }

  .product-card-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease, opacity 0.3s ease;
  }

  .product-card-image.loading {
    opacity: 0;
  }

  .product-card-image.loaded {
    opacity: 1;
  }

  .product-card:hover .product-card-image {
    transform: scale(1.03);
  }

  .product-card-shimmer {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      var(--background-light, #f8f9fa) 0%,
      var(--border-color-light, #f1f3f4) 50%,
      var(--background-light, #f8f9fa) 100%
    );
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
    z-index: 1;
  }

  @keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }

  .product-card-discount-badge {
    position: absolute;
    top: 8px;
    left: 8px;
    background-color: var(--accent-color, #dc3545);
    color: var(--white, #ffffff);
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 10px;
    font-weight: 600;
    z-index: 3;
    line-height: 1;
  }

  .product-card-wishlist-btn {
    position: absolute;
    top: 8px;
    right: 8px;
    width: 32px;
    height: 32px;
    background-color: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(4px);
    border: none;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    color: var(--text-color-medium, #6c757d);
    cursor: pointer;
    transition: all 0.2s ease;
    z-index: 3;
  }

  .product-card-wishlist-btn:hover {
    background-color: var(--primary-color, #007bff);
    color: var(--white, #ffffff);
    transform: scale(1.1);
  }

  .product-card-wishlist-btn.active {
    background-color: var(--primary-color, #007bff);
    color: var(--white, #ffffff);
  }

  .product-card-wishlist-btn.loading {
    opacity: 0.7;
    cursor: not-allowed;
    animation: pulse 1.5s infinite;
  }

  .product-card-wishlist-btn.loading:hover {
    transform: none;
    background-color: rgba(255, 255, 255, 0.9);
    color: var(--text-color-medium, #6c757d);
  }

  @keyframes pulse {
    0%, 100% { opacity: 0.7; }
    50% { opacity: 1; }
  }

  @keyframes wishlistSuccess {
    0% { transform: scale(1); }
    50% { transform: scale(1.3); }
    100% { transform: scale(1); }
  }

  .product-card-wishlist-btn.success-animation {
    animation: wishlistSuccess 0.4s ease;
  }

  .product-card-info {
    padding: 12px;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .product-card-name {
    font-size: 13px;
    font-weight: 500;
    color: var(--text-color-dark, #212529);
    margin: 0;
    line-height: 1.3;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    height: 2.6em;
    text-decoration: none;
  }

  .product-card-pricing {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .product-card-price-new {
    font-size: 15px;
    font-weight: 600;
    color: var(--primary-color, #007bff);
    margin: 0;
    line-height: 1.2;
  }

  .product-card-price-old {
    font-size: 12px;
    color: var(--text-color-light, #adb5bd);
    text-decoration: line-through;
    margin: 0;
    line-height: 1.2;
  }

  .product-card-reviews {
    display: flex;
    align-items: center;
    gap: 6px;
    margin-top: 4px;
  }

  .product-card-review-stars {
    display: flex;
    gap: 1px;
  }

  .product-card-review-star {
    font-size: 12px;
    color: var(--warning-color, #ffc107);
  }

  .product-card-review-star.empty {
    color: var(--border-color, #dee2e6);
  }

  .product-card-review-count {
    font-size: 11px;
    color: var(--text-color-medium, #6c757d);
  }

  /* Responsive Design */
  @media (max-width: 991px) {
    .product-card-image-container {
      aspect-ratio: 1.1;
    }
    
    .product-card-info {
      padding: 10px;
      gap: 6px;
    }
    
    .product-card-name {
      font-size: 12px;
      height: 2.4em;
    }
    
    .product-card-price-new {
      font-size: 14px;
    }
    
    .product-card-price-old {
      font-size: 11px;
    }
    
    .product-card-discount-badge {
      font-size: 9px;
      padding: 3px 6px;
    }
    
    .product-card-wishlist-btn {
      width: 28px;
      height: 28px;
      font-size: 12px;
    }
  }

  @media (max-width: 767px) {
    .product-card-image-container {
      aspect-ratio: 1;
    }
    
    .product-card-info {
      padding: 8px;
      gap: 5px;
    }
    
    .product-card-name {
      font-size: 11px;
      height: 2.2em;
    }
    
    .product-card-price-new {
      font-size: 13px;
    }
    
    .product-card-price-old {
      font-size: 10px;
    }
    
    .product-card-review-stars {
      gap: 0;
    }
    
    .product-card-review-star {
      font-size: 10px;
    }
    
    .product-card-review-count {
      font-size: 10px;
    }
  }
`;if(typeof document<"u"){const e="product-card-styles";if(!document.getElementById(e)){const o=document.createElement("style");o.id=e,o.textContent=H,document.head.appendChild(o)}}const K=({product:e,className:o="",showStock:Y=!0})=>{const c=M(),[g,x]=u.useState(!1),[n,w]=u.useState(!1),[W,v]=u.useState(!1),d=h(t=>{var I;const p=t.wishlist.items.some(f=>f.product_id===e.id),i=(((I=t.manifest.data)==null?void 0:I.wishlist)||[]).some(f=>f.product_id===e.id||f.id===e.id);return p||i}),l=h(t=>D(t)),s=h(t=>F(t)),b=h(t=>R(t));u.useEffect(()=>{b&&s&&(s.wishlist&&s.wishlist.length>0?c($(s.wishlist)):s.wishlist||c(T()))},[c,b,s]);const y=X(e.price_2,e.price_1),k=parseFloat(e.price_1),j=parseFloat(e.price_2),z=Number(e.rating)||Number(e.average_rating)||0,L=Number(e.reviewsCount)||Number(e.review_count)||0,A=()=>x(!0),C=t=>{t.currentTarget.src="/media/svg/files/blank-image.svg",t.currentTarget.onerror=null,x(!0)},E=async t=>{if(t.preventDefault(),t.stopPropagation(),!(n||l)){w(!0);try{d?await c(U(e.id)).unwrap():await c(G(e.id)).unwrap(),v(!0),setTimeout(()=>v(!1),400)}catch(a){console.error("Wishlist operation failed:",a)}finally{w(!1)}}};let m;e&&"getMainImage"in e&&typeof e.getMainImage=="function"?m=e.getMainImage():m=B(e);const _=t=>{const a=[],p=Math.floor(t),N=t%1!==0;for(let i=1;i<=5;i++)i<=p?a.push(r.jsx("span",{className:"product-card-review-star",children:"★"},i)):i===p+1&&N?a.push(r.jsx("span",{className:"product-card-review-star",children:"★"},i)):a.push(r.jsx("span",{className:"product-card-review-star empty",children:"★"},i));return a};return r.jsxs("div",{className:`product-card ${o}`,children:[r.jsxs(S,{to:P(e.id),className:"product-card-image-container",children:[!g&&r.jsx("div",{className:"product-card-shimmer"}),r.jsx("img",{src:m,alt:e.name,className:`product-card-image ${g?"loaded":"loading"}`,onLoad:A,onError:C}),y>0&&r.jsxs("div",{className:"product-card-discount-badge",children:["-",y,"%"]}),r.jsx("button",{className:`product-card-wishlist-btn ${d?"active":""} ${n||l?"loading":""} ${W?"success-animation":""}`,onClick:E,disabled:n||l,title:n?"Processing...":d?"Remove from wishlist":"Add to wishlist",children:n||l?"⟳":d?"♥":"♡"})]}),r.jsxs("div",{className:"product-card-info",children:[r.jsx(S,{to:P(e.id),style:{textDecoration:"none"},children:r.jsx("h3",{className:"product-card-name",children:e.name})}),r.jsxs("div",{className:"product-card-pricing",children:[r.jsxs("div",{className:"product-card-price-new",children:["UGX ",k.toLocaleString()]}),j>k&&r.jsxs("div",{className:"product-card-price-old",children:["UGX ",j.toLocaleString()]})]}),r.jsx("div",{className:"product-card-reviews",children:z>0&&r.jsxs(r.Fragment,{children:[r.jsx("div",{className:"product-card-review-stars",children:_(z)}),r.jsxs("span",{className:"product-card-review-count",children:["(",L,")"]})]})})]})]})};export{K as P};
