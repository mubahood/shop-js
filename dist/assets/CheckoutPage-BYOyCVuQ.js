import{G as B,q as D,H as L,r as l,j as e,S as v,K as H,T as p}from"./index-BUlTi-RG.js";import{O as k}from"./OrderModel-Bz2mqQjx.js";import{f as b}from"./index-CYgkVBfu.js";import{O as h}from"./OrderModelUtils-FQIjtl6X.js";import{D as A}from"./DynamicBreadcrumb-BHe3ZGbJ.js";import{C as O}from"./Container-D2fZxHT4.js";import{A as C}from"./Alert-CEmwcEMu.js";import{B as f}from"./Button-D1awEB0c.js";import{M as x}from"./Modal-Xcd6dAg7.js";import"./hook-CfU9Pidb.js";import"./objectWithoutPropertiesLoose-CAYKN5F1.js";import"./useEventCallback-CUECKx-A.js";import"./divWithClassName-BurpA6jg.js";import"./Anchor-DCpCVXp0.js";import"./useEventCallback-CmmpuWZE.js";import"./Button-CKTz88uJ.js";import"./CloseButton-Vs17wP1E.js";import"./TransitionWrapper-BLmPPUNA.js";import"./useMergedRefs-C3O5QAvR.js";import"./useWillUnmount-Dn5-hY3T.js";import"./useWindow-C31nRb8G.js";import"./DataKey-COGXBUcQ.js";import"./useMergedRefs-DhY38gtg.js";const E=`
  .checkout-page {
    min-height: 100vh;
    background: var(--background-body);
    position: relative;
  }

  .checkout-card {
    width: 100%;
    min-height: 60vh;
    background: var(--white);
    border-radius: var(--border-radius);
    box-shadow: var(--shadow-md);
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0;
    border: none;
    transition: all 0.3s ease;
  }

  .checkout-card.loading {
    pointer-events: none;
    opacity: 0.7;
  }

  .checkout-header {
    padding: 32px 32px 0 32px;
    text-align: center;
    background: none;
    border: none;
  }

  .checkout-title {
    font-size: 1.6rem;
    font-weight: 700;
    color: var(--text-color-dark);
    margin-bottom: 0.25rem;
  }

  .checkout-subtitle {
    font-size: 1rem;
    color: var(--text-color-medium);
    margin-bottom: 0;
  }

  .checkout-content {
    padding: 32px;
    background: none;
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
    gap: 16px;
    justify-content: center;
    position: relative;
  }

  .summary-item {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 12px;
    padding: 0;
    background: none;
    border: none;
    animation: fadeInSlide 0.4s ease;
  }

  @keyframes fadeInSlide {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .summary-item-content {
    flex: 1;
  }

  .summary-item-title {
    font-size: 1rem;
    font-weight: 600;
    color: var(--text-color-dark);
    margin-bottom: 2px;
  }

  .summary-item-subtitle {
    font-size: 0.92rem;
    color: var(--text-color-medium);
    margin-bottom: 0;
  }

  .summary-item-amount {
    font-size: 1rem;
    font-weight: 500;
    color: var(--text-color-dark);
    min-width: 90px;
    text-align: right;
  }

  .summary-divider, .summary-divider-bold {
    border: none;
    height: 1px;
    background: var(--border-color);
    margin: 8px 0;
    opacity: 0.5;
  }

  .summary-divider-bold {
    height: 2px;
    background: var(--primary-color);
    opacity: 0.3;
    margin: 16px 0;
  }

  .summary-total {
    background: var(--background-light);
    border-radius: var(--border-radius);
    padding: 16px;
    border: 2px solid var(--primary-color);
    animation: pulseGlow 2s ease-in-out infinite;
  }

  @keyframes pulseGlow {
    0%, 100% { box-shadow: 0 0 5px rgba(13, 110, 253, 0.2); }
    50% { box-shadow: 0 0 15px rgba(13, 110, 253, 0.4); }
  }

  .summary-total-title {
    font-size: 1.2rem;
    font-weight: 700;
    color: var(--primary-color);
    margin-bottom: 0;
  }

  .summary-total-amount {
    font-size: 1.2rem;
    font-weight: 700;
    color: var(--primary-color);
    min-width: 90px;
    text-align: right;
  }

  .checkout-error {
    margin-top: 12px;
    margin-bottom: 0;
    text-align: center;
    animation: shake 0.5s ease-in-out;
  }

  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    75% { transform: translateX(5px); }
  }

  .checkout-actions {
    display: flex;
    justify-content: center;
    gap: 16px;
    padding: 32px;
    background: none;
    border: none;
    border-radius: 0 0 var(--border-radius) var(--border-radius);
  }

  .btn-back-checkout {
    font-size: 1rem;
    color: var(--primary-color);
    background: var(--white);
    border: 1px solid var(--primary-color);
    border-radius: var(--border-radius);
    min-width: 160px;
    font-weight: 500;
    transition: all 0.2s ease;
    position: relative;
    overflow: hidden;
  }

  .btn-back-checkout:hover:not(:disabled) {
    background: var(--primary-color);
    color: var(--white);
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(13, 110, 253, 0.2);
  }

  .btn-back-checkout:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    pointer-events: none;
  }

  .btn-submit-order {
    font-size: 1rem;
    font-weight: 600;
    border-radius: var(--border-radius);
    background: var(--primary-color);
    color: var(--white);
    border: none;
    min-width: 180px;
    min-height: 42px;
    transition: all 0.2s ease;
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .btn-submit-order:hover:not(:disabled) {
    background: var(--primary-color-dark);
    color: var(--white);
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(13, 110, 253, 0.3);
  }

  .btn-submit-order:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    pointer-events: none;
  }

  .btn-submit-order.loading {
    pointer-events: none;
  }

  .loading-spinner {
    width: 18px;
    height: 18px;
    margin-right: 8px;
  }

  .loading-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(6px);
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: fadeInOverlay 0.3s ease;
  }

  @keyframes fadeInOverlay {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  .loading-content {
    background: white;
    padding: 40px;
    border-radius: 12px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
    text-align: center;
    min-width: 320px;
    animation: slideInUp 0.3s ease;
  }

  @keyframes slideInUp {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .loading-spinner-large {
    width: 50px;
    height: 50px;
    margin-bottom: 20px;
    color: var(--primary-color);
  }

  .loading-text {
    font-size: 1.2rem;
    font-weight: 600;
    color: var(--text-color-dark);
    margin-bottom: 8px;
  }

  .loading-subtext {
    font-size: 1rem;
    color: var(--text-color-medium);
    margin: 0;
  }

  .modal-order-summary {
    font-size: 1rem;
    color: var(--primary-color);
    margin-top: 12px;
    margin-bottom: 12px;
    text-align: center;
    background: var(--background-light);
    padding: 12px;
    border-radius: var(--border-radius);
    border: 1px solid var(--border-color);
  }

  .modal-content {
    border-radius: 12px;
    border: none;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  }

  .modal-header {
    border-bottom: 1px solid var(--border-color);
    padding: 20px 24px;
  }

  .modal-body {
    padding: 24px;
  }

  .modal-footer {
    border-top: 1px solid var(--border-color);
    padding: 20px 24px;
  }

  .modal-title {
    font-weight: 600;
    color: var(--text-color-dark);
  }

  @media (max-width: 575.98px) {
    .checkout-card, .checkout-content, .checkout-header, .checkout-actions {
      padding: 16px !important;
    }
    .checkout-title {
      font-size: 1.3rem;
    }
    .summary-total-title, .summary-total-amount {
      font-size: 1.1rem;
    }
    .checkout-actions {
      flex-direction: column;
    }
    .btn-back-checkout, .btn-submit-order {
      width: 100%;
      min-width: auto;
    }
    .loading-content {
      margin: 20px;
      min-width: auto;
      width: calc(100% - 40px);
    }
  }
`,ce=()=>{const i=B(),z=D(),{order:s}=z.state||{},{cartItems:n,getFormattedTotal:F,clearCart:I}=L();l.useEffect(()=>{(!s||n.length===0)&&i("/cart")},[s,n.length,i]);const[r,M]=l.useState(()=>s&&typeof s=="object"?h.ensureOrderModel(s):new k),[m,j]=l.useState(!1),[a,w]=l.useState(!1),[N,d]=l.useState(""),[T,g]=l.useState(!1),u=parseFloat(F().replace(/[^0-9.-]+/g,""))||0,y=parseFloat((r==null?void 0:r.delivery_amount)||"0")||0;parseFloat((r==null?void 0:r.payable_amount)||"0");const _=u+y;l.useEffect(()=>{if(!s||n.length===0){i("/cart");return}M(o=>{const t=h.ensureOrderModel(o);return t.order_total=u.toString(),t.payable_amount=(u+y).toString(),t})},[u,y,s,n.length,i]);const P=async()=>{try{if(w(!0),j(!0),d(""),await new Promise(S=>setTimeout(S,500)),!r||typeof r!="object"){d("Order information is invalid. Please restart the checkout process."),i("/cart");return}if(!r.customer_name||!r.customer_phone_number_1){d("Order information is incomplete. Please go back and fill all required fields.");return}if(!n||n.length===0){d("Your cart is empty. Please add items before checkout."),i("/cart");return}const o=h.toJson(r);o.phone_number_2=r.customer_phone_number_2||r.customer_phone_number_1,o.phone_number_1=r.customer_phone_number_1,o.phone_number=o.phone_number_1;const t=await H("orders-create",{items:JSON.stringify(n),delivery:JSON.stringify(o)});if(t.code!==1){d(t.message||"Failed to submit order"),p.error(`Failed ${t.message||"to submit order"}`);return}let c;try{t.data&&typeof k.fromJson=="function"?c=k.fromJson(t.data):c=h.ensureOrderModel(t.data)}catch{d("Failed to process order response"),p.error("Failed to process order response");return}if(!c||c.id<1){d(t.message||"Invalid order response"),p.error("Failed to submit order");return}await I(),p.success("Order submitted successfully!",{autoClose:4e3}),i("/",{state:{orderSuccess:!0,orderId:c.id,paymentUrl:h.getPaymentLink(c)}})}catch(o){d(o.message||"Failed to submit order"),p.error("Failed to submit order: "+(o.message||"Unknown error"))}finally{w(!1),j(!1),g(!1)}},Y=()=>{g(!0)};return!s||n.length===0?e.jsx(O,{className:"py-5",children:e.jsx(C,{variant:"warning",children:"Your cart is empty or order information is missing. Please start from the cart."})}):e.jsxs(e.Fragment,{children:[e.jsx("style",{dangerouslySetInnerHTML:{__html:E}}),e.jsx(A,{showBackground:!0,showIcons:!0}),e.jsxs("div",{className:"checkout-page",children:[a&&e.jsx("div",{className:"loading-overlay",children:e.jsxs("div",{className:"loading-content",children:[e.jsx(v,{animation:"border",variant:"primary",className:"loading-spinner"}),e.jsxs("div",{className:"loading-text",children:[e.jsx("h4",{children:"Submitting Your Order"}),e.jsx("p",{children:"Please wait while we process your order..."})]})]})}),e.jsxs(O,{className:"d-flex flex-column justify-content-center align-items-center",style:{minHeight:"100vh"},children:[e.jsxs("div",{className:"checkout-card w-100",style:{minHeight:"60vh",display:"flex",flexDirection:"column",justifyContent:"center"},children:[e.jsxs("div",{className:"checkout-header",children:[e.jsx("h2",{className:"checkout-title",children:"Order Summary"}),e.jsx("p",{className:"checkout-subtitle",children:"Please confirm your order details below before proceeding to payment"})]}),e.jsxs("div",{className:"checkout-content",children:[e.jsxs("div",{className:"summary-item",children:[e.jsxs("div",{className:"summary-item-content",children:[e.jsx("h4",{className:"summary-item-title",children:"Order Items Total"}),e.jsx("p",{className:"summary-item-subtitle",children:"Total amount of all items in your cart"})]}),e.jsx("div",{className:"summary-item-amount",children:b(u.toString())})]}),e.jsx("div",{className:"summary-divider"}),e.jsxs("div",{className:"summary-item",children:[e.jsxs("div",{className:"summary-item-content",children:[e.jsx("h4",{className:"summary-item-title",children:"Delivery Cost"}),e.jsx("p",{className:"summary-item-subtitle",children:`${(r==null?void 0:r.delivery_address_text)||"Delivery address"}, ${(r==null?void 0:r.delivery_address_details)||""}`})]}),e.jsx("div",{className:"summary-item-amount",children:b((r==null?void 0:r.delivery_amount)||"0")})]}),e.jsx("div",{className:"summary-divider-bold"}),e.jsxs("div",{className:"summary-item summary-total",children:[e.jsxs("div",{className:"summary-item-content",children:[e.jsx("h3",{className:"summary-total-title",children:"Total"}),e.jsx("p",{className:"summary-item-subtitle",children:"Final amount including all charges"})]}),e.jsx("div",{className:"summary-total-amount",children:b(_.toString())})]}),N&&e.jsx(C,{variant:"danger",className:"checkout-error",children:N})]}),e.jsxs("div",{className:"checkout-actions",children:[e.jsx(f,{variant:"outline-secondary",onClick:()=>i("/delivery-address",{state:{order:r}}),className:"btn-back-checkout",disabled:a||m,children:"Back to Delivery Info"}),e.jsx(f,{onClick:Y,disabled:a||m,className:"btn-submit-order",children:a||m?e.jsxs(e.Fragment,{children:[e.jsx(v,{size:"sm",className:"me-2"}),a?"Submitting Order...":"Loading..."]}):"Submit Order"})]})]}),e.jsxs(x,{show:T,onHide:()=>g(!1),centered:!0,children:[e.jsx(x.Header,{closeButton:!0,children:e.jsx(x.Title,{children:"Confirm Order Submission"})}),e.jsxs(x.Body,{children:[e.jsx("p",{children:"Are you sure you want to submit this order?"}),e.jsx("div",{className:"modal-order-summary",children:e.jsxs("strong",{children:["Total Amount: ",b(_.toString())]})})]}),e.jsxs(x.Footer,{children:[e.jsx(f,{variant:"outline-secondary",onClick:()=>g(!1),disabled:a||m,children:"Cancel"}),e.jsx(f,{variant:"primary",onClick:P,disabled:a||m,children:a||m?e.jsxs(e.Fragment,{children:[e.jsx(v,{size:"sm",className:"me-2"}),a?"Submitting...":"Loading..."]}):"Confirm Order"})]})]})]})]})]})};export{ce as default};
