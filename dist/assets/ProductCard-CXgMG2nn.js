import{r as p,j as r,c as j,u as B,e as T,g as b,s as U,h as G,i as X,k as H,l as O,L as E,n as Y,o as q}from"./index-BUlTi-RG.js";import{A as J}from"./Anchor-DCpCVXp0.js";import{c as K,g as Q,a as C}from"./index-CYgkVBfu.js";const k=p.forwardRef(({active:e=!1,disabled:s=!1,className:d,style:i,activeLabel:a="(current)",children:o,linkStyle:c,linkClassName:g,as:y=J,...x},f)=>{const u=e||s?"span":y;return r.jsx("li",{ref:f,style:i,className:j(d,"page-item",{active:e,disabled:s}),children:r.jsxs(u,{className:j("page-link",g),style:c,...x,children:[o,e&&a&&r.jsx("span",{className:"visually-hidden",children:a})]})})});k.displayName="PageItem";function h(e,s,d=e){const i=p.forwardRef(({children:a,...o},c)=>r.jsxs(k,{...o,ref:c,children:[r.jsx("span",{"aria-hidden":"true",children:a||s}),r.jsx("span",{className:"visually-hidden",children:d})]}));return i.displayName=e,i}const V=h("First","«"),Z=h("Prev","‹","Previous"),ee=h("Ellipsis","…","More"),re=h("Next","›"),te=h("Last","»"),F=p.forwardRef(({bsPrefix:e,className:s,size:d,...i},a)=>{const o=B(e,"pagination");return r.jsx("ul",{ref:a,...i,className:j(s,o,d&&`${o}-${d}`)})});F.displayName="Pagination";const ce=Object.assign(F,{First:V,Prev:Z,Ellipsis:ee,Item:k,Next:re,Last:te}),se=`
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
`;if(typeof document<"u"){const e="product-card-styles";if(!document.getElementById(e)){const s=document.createElement("style");s.id=e,s.textContent=se,document.head.appendChild(s)}}const ne=({product:e,className:s="",showStock:d=!0})=>{const i=T(),[a,o]=p.useState(!1),[c,g]=p.useState(!1),[y,x]=p.useState(!1),f=b(t=>{var A;const w=t.wishlist.items.some(v=>v.product_id===e.id),n=(((A=t.manifest.data)==null?void 0:A.wishlist)||[]).some(v=>v.product_id===e.id||v.id===e.id);return w||n}),u=b(t=>U(t)),m=b(t=>G(t)),P=b(t=>X(t));p.useEffect(()=>{P&&m&&(m.wishlist&&m.wishlist.length>0?i(H(m.wishlist)):m.wishlist||i(O()))},[i,P,m]);const I=K(e.price_2,e.price_1),z=parseFloat(e.price_1),S=parseFloat(e.price_2),W=Number(e.rating)||Number(e.average_rating)||0,M=Number(e.reviewsCount)||Number(e.review_count)||0,R=()=>o(!0),_=t=>{t.currentTarget.src="/media/svg/files/blank-image.svg",t.currentTarget.onerror=null,o(!0)},$=async t=>{if(t.preventDefault(),t.stopPropagation(),!(c||u)){g(!0);try{f?await i(Y(e.id)).unwrap():await i(q(e.id)).unwrap(),x(!0),setTimeout(()=>x(!1),400)}catch(l){console.error("Wishlist operation failed:",l)}finally{g(!1)}}};let N;e&&"getMainImage"in e&&typeof e.getMainImage=="function"?N=e.getMainImage():N=Q(e);const D=t=>{const l=[],w=Math.floor(t),L=t%1!==0;for(let n=1;n<=5;n++)n<=w?l.push(r.jsx("span",{className:"product-card-review-star",children:"★"},n)):n===w+1&&L?l.push(r.jsx("span",{className:"product-card-review-star",children:"★"},n)):l.push(r.jsx("span",{className:"product-card-review-star empty",children:"★"},n));return l};return r.jsxs("div",{className:`product-card ${s}`,children:[r.jsxs(E,{to:C(e.id),className:"product-card-image-container",children:[!a&&r.jsx("div",{className:"product-card-shimmer"}),r.jsx("img",{src:N,alt:e.name,className:`product-card-image ${a?"loaded":"loading"}`,onLoad:R,onError:_}),I>0&&r.jsxs("div",{className:"product-card-discount-badge",children:["-",I,"%"]}),r.jsx("button",{className:`product-card-wishlist-btn ${f?"active":""} ${c||u?"loading":""} ${y?"success-animation":""}`,onClick:$,disabled:c||u,title:c?"Processing...":f?"Remove from wishlist":"Add to wishlist",children:c||u?"⟳":f?"♥":"♡"})]}),r.jsxs("div",{className:"product-card-info",children:[r.jsx(E,{to:C(e.id),style:{textDecoration:"none"},children:r.jsx("h3",{className:"product-card-name",children:e.name})}),r.jsxs("div",{className:"product-card-pricing",children:[r.jsxs("div",{className:"product-card-price-new",children:["UGX ",z.toLocaleString()]}),S>z&&r.jsxs("div",{className:"product-card-price-old",children:["UGX ",S.toLocaleString()]})]}),r.jsx("div",{className:"product-card-reviews",children:W>0&&r.jsxs(r.Fragment,{children:[r.jsx("div",{className:"product-card-review-stars",children:D(W)}),r.jsxs("span",{className:"product-card-review-count",children:["(",M,")"]})]})})]})]})};export{ne as P,ce as a};
