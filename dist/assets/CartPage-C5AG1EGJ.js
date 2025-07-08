import{P as n,r as b,u as R,j as r,c as D,G as O,H as T,g as E,L as u,C as d,T as j}from"./index-Ck1B39s_.js";import{O as N}from"./OrderModel-DXlMFbRV.js";import{f as g}from"./index-DhbewBbn.js";import{D as w}from"./DynamicBreadcrumb-DclKpnDu.js";import{C as k}from"./Container-CYOb-KOn.js";import{C as o}from"./Card-BHoHBxu5.js";import{R as C}from"./Row-DMOtnxeD.js";import{B as z}from"./Button-NLQyPqyC.js";import"./CardHeaderContext-BNHv2GZa.js";import"./divWithClassName-Cvv0wCrx.js";import"./Button-BlOqttEG.js";n.string,n.bool,n.bool,n.bool,n.bool;const S=b.forwardRef(({bsPrefix:a,className:m,fluid:s=!1,rounded:c=!1,roundedCircle:i=!1,thumbnail:p=!1,...x},h)=>(a=R(a,"img"),r.jsx("img",{ref:h,...x,className:D(m,s&&`${a}-fluid`,c&&"rounded",i&&"rounded-circle",p&&`${a}-thumbnail`)})));S.displayName="Image";const _=`
  .cart-page {
    background: var(--background-light, #ffffff);
  }

  .cart-header {
    padding: 0;
    margin-bottom: 12px;
  }

  .cart-page-title {
    font-size: 20px;
    font-weight: 600;
    margin: 0;
    color: var(--text-color-dark, #212529);
    height: 20px;
  }

  .cart-items-count {
    font-size: 13px;
    color: var(--text-color-medium, #6c757d);
    margin: 0;
  }

  .clear-cart-btn {
    font-size: 12px;
    color: var(--text-color-medium, #6c757d);
    padding: 0;
    text-decoration: none;
    border: none;
    background: none;
  }

  .clear-cart-btn:hover {
    color: var(--accent-color, #dc3545);
    text-decoration: underline;
  }

  .clear-cart-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  /* Empty Cart State */
  .empty-cart-container {
    min-height: 50vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: var(--white, #ffffff);
    border: 1px solid var(--border-color, #dee2e6);
    border-radius: var(--border-radius, 4px);
    box-shadow: var(--shadow-sm);
    padding: var(--spacing-3xl, 3rem);
    text-align: center;
  }

  .empty-cart-icon {
    width: 80px;
    height: 80px;
    background: var(--background-light, #f8f9fa);
    border: 1px solid var(--border-color, #dee2e6);
    border-radius: var(--border-radius, 4px);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: var(--spacing-lg, 1.5rem);
  }

  .empty-cart-icon i {
    font-size: 2rem;
    color: var(--text-color-light, #6c757d);
  }

  .empty-cart-title {
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--text-color-dark, #212529);
    margin-bottom: var(--spacing-md, 1rem);
  }

  .empty-cart-subtitle {
    font-size: 14px;
    color: var(--text-color-medium, #6c757d);
    margin-bottom: var(--spacing-lg, 1.5rem);
  }

  .btn-start-shopping {
    border: 1px solid var(--primary-color, #007bff);
    border-radius: var(--border-radius, 4px);
    background: var(--primary-color, #007bff);
    color: var(--white, #ffffff);
    font-size: 14px;
    padding: 12px 24px;
    font-weight: 500;
    text-decoration: none;
    transition: all 0.2s ease;
    display: inline-flex;
    align-items: center;
    gap: 8px;
  }

  .btn-start-shopping:hover {
    background: var(--primary-color-dark, #0056b3);
    border-color: var(--primary-color-dark, #0056b3);
    color: var(--white, #ffffff);
    text-decoration: none;
    transform: translateY(-1px);
  }

  /* Cart Items */
  .cart-item {
    display: flex;
    align-items: center;
    padding: 16px;
    border-bottom: 1px solid var(--border-color-light, #f1f3f4);
    transition: background-color 0.2s ease;
  }

  .cart-item:last-child {
    border-bottom: none;
  }

  .cart-item:hover {
    background: var(--background-light, #f8f9fa);
  }

  .cart-item-image {
    width: 80px;
    height: 80px;
    border: 1px solid var(--border-color, #dee2e6);
    border-radius: var(--border-radius, 4px);
    object-fit: contain;
    margin-right: 16px;
    background: var(--white, #ffffff);
  }

  .cart-item-details {
    flex: 1;
    margin-right: 16px;
  }

  .cart-item-name {
    font-size: 14px;
    font-weight: 500;
    color: var(--text-color-dark, #212529);
    text-decoration: none;
    display: block;
    margin-bottom: 4px;
    line-height: 1.4;
  }

  .cart-item-name:hover {
    color: var(--primary-color, #007bff);
    text-decoration: none;
  }

  .cart-item-variant {
    font-size: 12px;
    color: var(--text-color-medium, #6c757d);
    margin-bottom: 4px;
  }

  .cart-item-price {
    font-size: 13px;
    font-weight: 500;
    color: var(--text-color-dark, #212529);
  }

  /* Quantity Control */
  .quantity-control {
    display: flex;
    align-items: center;
    border: 1px solid var(--border-color, #dee2e6);
    border-radius: var(--border-radius, 4px);
    margin-right: 16px;
  }

  .quantity-btn {
    background: none;
    border: none;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--text-color-medium, #6c757d);
    font-size: 14px;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .quantity-btn:hover:not(:disabled) {
    background: var(--background-light, #f8f9fa);
    color: var(--primary-color, #007bff);
  }

  .quantity-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .quantity-display {
    min-width: 40px;
    text-align: center;
    font-size: 13px;
    font-weight: 500;
    color: var(--text-color-dark, #212529);
    border-left: 1px solid var(--border-color, #dee2e6);
    border-right: 1px solid var(--border-color, #dee2e6);
    padding: 0 8px;
    line-height: 30px;
  }

  /* Item Total and Remove */
  .cart-item-actions {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 8px;
  }

  .cart-item-total {
    font-size: 14px;
    font-weight: 600;
    color: var(--text-color-dark, #212529);
  }

  .remove-item-btn {
    background: none;
    border: none;
    color: var(--text-color-light, #6c757d);
    font-size: 16px;
    cursor: pointer;
    padding: 4px;
    border-radius: var(--border-radius, 4px);
    transition: all 0.2s ease;
  }

  .remove-item-btn:hover:not(:disabled) {
    color: var(--accent-color, #dc3545);
    background: var(--background-light, #f8f9fa);
  }

  .remove-item-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* Continue Shopping */
  .continue-shopping {
    margin-top: 16px;
    padding-top: 16px;
    border-top: 1px solid var(--border-color-light, #f1f3f4);
  }

  .btn-continue-shopping {
    border: 1px solid var(--border-color, #dee2e6);
    border-radius: var(--border-radius, 4px);
    background: var(--white, #ffffff);
    color: var(--text-color-dark, #212529);
    font-size: 13px;
    padding: 10px 16px;
    font-weight: 500;
    text-decoration: none;
    transition: all 0.2s ease;
    display: inline-flex;
    align-items: center;
    gap: 8px;
  }

  .btn-continue-shopping:hover {
    background: var(--background-light, #f8f9fa);
    border-color: var(--primary-color, #007bff);
    color: var(--primary-color, #007bff);
    text-decoration: none;
  }

  /* Order Summary */
  .order-summary {
    position: sticky;
    top: 20px;
  }

  .summary-title {
    font-size: 16px;
    font-weight: 600;
    margin: 0 0 16px 0;
    color: var(--text-color-dark, #212529);
  }

  .summary-line {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 0;
    font-size: 13px;
  }

  .summary-line:not(:last-child) {
    border-bottom: 1px solid var(--border-color-light, #f1f3f4);
  }

  .summary-line span:first-child {
    color: var(--text-color-medium, #6c757d);
  }

  .summary-line span:last-child {
    color: var(--text-color-dark, #212529);
    font-weight: 500;
  }

  .summary-total {
    padding: 12px 0;
    margin-top: 8px;
    border-top: 2px solid var(--border-color, #dee2e6) !important;
    font-size: 14px !important;
    font-weight: 600 !important;
  }

  .summary-total span {
    color: var(--text-color-dark, #212529) !important;
    font-weight: 600 !important;
  }

  .summary-free {
    color: var(--success-color, #28a745) !important;
    font-weight: 500 !important;
  }

  /* Delivery Info */
  .delivery-info {
    margin: 16px 0;
    padding: 12px;
    background: var(--background-light, #f8f9fa);
    border: 1px solid var(--border-color, #dee2e6);
    border-radius: var(--border-radius, 4px);
    display: flex;
    align-items: center;
    gap: 12px;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .delivery-info:hover {
    border-color: var(--primary-color, #007bff);
    background: var(--white, #ffffff);
  }

  .delivery-info-icon {
    color: var(--primary-color, #007bff);
    font-size: 16px;
  }

  .delivery-info-content {
    flex: 1;
  }

  .delivery-info-title {
    font-size: 13px;
    font-weight: 500;
    margin: 0 0 2px 0;
    color: var(--text-color-dark, #212529);
  }

  .delivery-info-subtitle {
    font-size: 12px;
    color: var(--text-color-medium, #6c757d);
    margin: 0;
  }

  .delivery-info-arrow {
    color: var(--text-color-light, #6c757d);
    font-size: 12px;
  }

  /* Checkout Button */
  .btn-checkout {
    width: 100%;
    border: 1px solid var(--primary-color, #007bff);
    border-radius: var(--border-radius, 4px);
    background: var(--primary-color, #007bff);
    color: var(--white, #ffffff);
    font-size: 14px;
    padding: 14px;
    font-weight: 600;
    text-decoration: none;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    margin-bottom: 16px;
  }

  .btn-checkout:hover:not(:disabled) {
    background: var(--primary-color-dark, #0056b3);
    border-color: var(--primary-color-dark, #0056b3);
    color: var(--white, #ffffff);
    text-decoration: none;
    transform: translateY(-1px);
  }

  .btn-checkout:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }

  /* Trust Indicators */
  .trust-indicators {
    display: grid;
    grid-template-columns: 1fr;
    gap: 8px;
  }

  .trust-item {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 12px;
    color: var(--text-color-medium, #6c757d);
  }

  .trust-item i {
    color: var(--success-color, #28a745);
    font-size: 14px;
  }

  /* Responsive Design */
  @media (max-width: 767px) {
    .cart-page-title {
      font-size: 18px;
    }

    .cart-item {
      padding: 12px;
    }

    .cart-item-image {
      width: 60px;
      height: 60px;
      margin-right: 12px;
    }

    .cart-item-name {
      font-size: 13px;
    }

    .quantity-control {
      margin-right: 8px;
    }

    .quantity-btn {
      width: 28px;
      height: 28px;
    }

    .quantity-display {
      min-width: 32px;
      line-height: 26px;
    }

    .order-summary {
      position: static;
      margin-top: 20px;
    }

    .trust-indicators {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 575px) {
    .cart-item {
      flex-direction: column;
      align-items: flex-start;
      gap: 12px;
    }

    .cart-item-image {
      align-self: center;
      margin-right: 0;
    }

    .cart-item-details {
      margin-right: 0;
      text-align: center;
      width: 100%;
    }

    .cart-item-actions {
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      width: 100%;
    }

    .quantity-control {
      margin-right: 0;
    }
  }
`,J=()=>{const a=O(),{cartItems:m,cartCount:s,isEmpty:c,isLoading:i,updateQuantity:p,removeFromCart:x,clearCart:h,getFormattedTotal:v}=T(),{user:t}=E(e=>e.auth),[l,q]=b.useState(()=>{const e=new N;return e.delivery_method="delivery",e});b.useEffect(()=>{if(t){const e=new N;Object.assign(e,l),e.mail=t.email||"",e.customer_name=`${t.first_name||""} ${t.last_name||""}`.trim(),e.customer_phone_number_1=t.phone_number_1||"",e.customer_phone_number_2=t.phone_number_2||"",e.delivery_method="delivery",q(e)}},[t]);const y=async(e,f)=>{await p(e.product_id,f,e.variant)},I=async e=>{await x(e.product_id,e.variant)},B=async()=>{window.confirm("Are you sure you want to clear your cart?")&&await h()},P=()=>{if(!t||!t.id){j.error("Please login to continue"),a("/auth/login");return}if(c){j.error("Your cart is empty, Please add items to your cart");return}a("/delivery-address",{state:{order:l}})};return c?r.jsxs(r.Fragment,{children:[r.jsx("style",{children:_}),r.jsx(w,{context:{currentPage:"Shopping Cart"},showBackground:!0,showIcons:!0}),r.jsx(k,{children:r.jsx("div",{className:"cart-page",children:r.jsx(o,{className:"border-0 shadow-sm",children:r.jsx(o.Body,{children:r.jsxs("div",{className:"empty-cart-container",children:[r.jsx("div",{className:"empty-cart-icon",children:r.jsx("i",{className:"bi bi-cart-x"})}),r.jsx("h2",{className:"empty-cart-title",children:"Your cart is empty"}),r.jsx("p",{className:"empty-cart-subtitle",children:"Discover amazing products and add them to your cart"}),r.jsxs(u,{to:"/products",className:"btn-start-shopping",children:[r.jsx("i",{className:"bi bi-shop"}),"Start Shopping"]})]})})})})})]}):r.jsxs(r.Fragment,{children:[r.jsx("style",{children:_}),r.jsx(w,{context:{currentPage:"Shopping Cart"},showBackground:!0,showIcons:!0}),r.jsx(k,{children:r.jsx("div",{className:"cart-page",children:r.jsxs(C,{children:[r.jsx(d,{lg:8,className:"my-0",children:r.jsx(o,{className:"border-0 shadow-sm",children:r.jsxs(o.Body,{children:[r.jsx("div",{className:"cart-header mb-3",children:r.jsxs(C,{className:"align-items-center",children:[r.jsx(d,{md:8,children:r.jsxs("div",{className:"text-start",children:[r.jsx("h1",{className:"cart-page-title",children:"Shopping Cart"}),r.jsxs("p",{className:"cart-items-count",children:[s," ",s===1?"item":"items"]})]})}),r.jsx(d,{md:4,children:r.jsx("div",{className:"text-end",children:r.jsxs(z,{variant:"link",className:"clear-cart-btn",onClick:B,disabled:i,children:[r.jsx("i",{className:"bi bi-trash3 me-1"}),"Clear All"]})})})]})}),r.jsx("div",{className:"cart-items",children:m.map(e=>r.jsxs("div",{className:"cart-item",children:[r.jsx(S,{src:e.getImageUrl(),alt:e.product_name,className:"cart-item-image",onError:f=>{f.currentTarget.src="/media/svg/files/blank-image.svg"}}),r.jsxs("div",{className:"cart-item-details",children:[r.jsx(u,{to:`/product/${e.product_id}`,className:"cart-item-name",children:e.product_name}),e.hasVariant()&&r.jsx("div",{className:"cart-item-variant",children:e.getVariantDisplay()}),r.jsx("div",{className:"cart-item-price",children:g(e.product_price_1)})]}),r.jsxs("div",{className:"quantity-control",children:[r.jsx("button",{className:"quantity-btn",onClick:()=>y(e,Math.max(1,e.product_quantity-1)),disabled:i||e.product_quantity<=1,children:r.jsx("i",{className:"bi bi-dash"})}),r.jsx("span",{className:"quantity-display",children:e.product_quantity}),r.jsx("button",{className:"quantity-btn",onClick:()=>y(e,e.product_quantity+1),disabled:i,children:r.jsx("i",{className:"bi bi-plus"})})]}),r.jsxs("div",{className:"cart-item-actions",children:[r.jsx("div",{className:"cart-item-total",children:g(e.getSubtotal().toString())}),r.jsx("button",{className:"remove-item-btn",onClick:()=>I(e),disabled:i,title:"Remove item",children:r.jsx("i",{className:"bi bi-x-lg"})})]})]},e.id))}),r.jsx("div",{className:"continue-shopping",children:r.jsxs(u,{to:"/products",className:"btn-continue-shopping",children:[r.jsx("i",{className:"bi bi-arrow-left"}),"Continue Shopping"]})})]})})}),r.jsx(d,{lg:4,className:"my-0",children:r.jsx(o,{className:"border-0 shadow-sm",children:r.jsx(o.Body,{children:r.jsxs("div",{className:"order-summary",children:[r.jsx("h3",{className:"summary-title",children:"Order Summary"}),r.jsxs("div",{className:"summary-details",children:[r.jsxs("div",{className:"summary-line",children:[r.jsxs("span",{children:["Subtotal (",s," items)"]}),r.jsx("span",{children:v()})]}),r.jsxs("div",{className:"summary-line",children:[r.jsx("span",{children:"Shipping"}),r.jsx("span",{className:"summary-free",children:"Calculated at checkout"})]}),r.jsxs("div",{className:"summary-line summary-total",children:[r.jsx("span",{children:"Total"}),r.jsx("span",{children:v()})]})]}),r.jsxs("div",{className:"delivery-info",children:[r.jsx("div",{className:"delivery-info-icon",children:r.jsx("i",{className:"bi bi-geo-alt-fill"})}),r.jsxs("div",{className:"delivery-info-content",children:[r.jsx("h6",{className:"delivery-info-title",children:"Delivery Information"}),r.jsx("p",{className:"delivery-info-subtitle",children:l.delivery_amount?`${g(l.delivery_amount)}`:"Select delivery address"})]}),r.jsx("div",{className:"delivery-info-arrow",children:r.jsx("i",{className:"bi bi-chevron-right"})})]}),r.jsxs(z,{className:"btn-checkout",onClick:P,disabled:i,children:[r.jsx("i",{className:"bi bi-shield-check"}),"Checkout"]}),r.jsxs("div",{className:"trust-indicators",children:[r.jsxs("div",{className:"trust-item",children:[r.jsx("i",{className:"bi bi-shield-fill-check"}),r.jsx("span",{children:"Secure Payment"})]}),r.jsxs("div",{className:"trust-item",children:[r.jsx("i",{className:"bi bi-truck"}),r.jsx("span",{children:"Fast Delivery"})]}),r.jsxs("div",{className:"trust-item",children:[r.jsx("i",{className:"bi bi-arrow-clockwise"}),r.jsx("span",{children:"Easy Returns"})]})]})]})})})})]})})})]})};export{J as default};
