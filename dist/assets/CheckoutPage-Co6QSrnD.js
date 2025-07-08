import{G as P,q as I,H as B,r as l,j as e,S as w,K as D,T as u}from"./index-Ck1B39s_.js";import{O as x}from"./OrderModel-DXlMFbRV.js";import{f as b}from"./index-DhbewBbn.js";import{O as h}from"./OrderModelUtils-f2lD5aTU.js";import{D as H}from"./DynamicBreadcrumb-DclKpnDu.js";import{C as N}from"./Container-CYOb-KOn.js";import{A as _}from"./Alert-C-lzSFeO.js";import{B as y}from"./Button-NLQyPqyC.js";import{M as p}from"./Modal-qZ3jDsWs.js";import"./hook-BpSSKWeX.js";import"./useEventCallback-Cs-IbGqe.js";import"./divWithClassName-Cvv0wCrx.js";import"./Anchor-D3rNWf9j.js";import"./Button-BlOqttEG.js";import"./TransitionWrapper-Ca_Uh9a9.js";import"./useMergedRefs-NifApYAE.js";import"./useWillUnmount-Dc7evMr0.js";import"./useWindow-ChGooS_c.js";import"./DataKey-COGXBUcQ.js";import"./useMergedRefs-Doi0DguT.js";const A=`
  .checkout-page {
    min-height: 100vh;
    background: var(--background-body);
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
  }

  .summary-item {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 12px;
    padding: 0;
    background: none;
    border: none;
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
    height: 0;
    margin: 0;
  }

  .summary-total {
    background: none;
    border-radius: 0;
    padding: 0;
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
    min-width: 120px;
    font-weight: 500;
    transition: all 0.2s;
  }

  .btn-back-checkout:hover {
    background: var(--primary-color);
    color: var(--white);
  }

  .btn-submit-order {
    font-size: 1rem;
    font-weight: 600;
    border-radius: var(--border-radius);
    background: var(--primary-color);
    color: var(--white);
    border: none;
    min-width: 140px;
    transition: all 0.2s;
  }

  .btn-submit-order:hover:not(:disabled) {
    background: var(--primary-color-dark);
    color: var(--white);
  }

  .btn-submit-order:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  .modal-order-summary {
    font-size: 1rem;
    color: var(--primary-color);
    margin-top: 12px;
    margin-bottom: 12px;
    text-align: center;
  }

  @media (max-width: 575.98px) {
    .checkout-card, .checkout-content, .checkout-header, .checkout-actions {
      padding: 16px !important;
    }
    .checkout-title {
      font-size: 1.1rem;
    }
    .summary-total-title, .summary-total-amount {
      font-size: 1rem;
    }
  }
`,ie=()=>{const a=P(),S=I(),{order:s}=S.state||{},{cartItems:i,getFormattedTotal:O,clearCart:C}=B();l.useEffect(()=>{(!s||i.length===0)&&a("/cart")},[s,i.length,a]);const[r,F]=l.useState(()=>s&&typeof s=="object"?h.ensureOrderModel(s):new x),[m,v]=l.useState(!1),[j,n]=l.useState(""),[z,g]=l.useState(!1),d=parseFloat(O().replace(/[^0-9.-]+/g,""))||0,f=parseFloat((r==null?void 0:r.delivery_amount)||"0")||0;parseFloat((r==null?void 0:r.payable_amount)||"0");const k=d+f;l.useEffect(()=>{if(!s||i.length===0){a("/cart");return}F(o=>{const t=h.ensureOrderModel(o);return t.order_total=d.toString(),t.payable_amount=(d+f).toString(),t})},[d,f,s,i.length,a]);const M=async()=>{try{if(v(!0),n(""),!r||typeof r!="object"){n("Order information is invalid. Please restart the checkout process."),a("/cart");return}if(!r.customer_name||!r.customer_phone_number_1){n("Order information is incomplete. Please go back and fill all required fields.");return}if(!i||i.length===0){n("Your cart is empty. Please add items before checkout."),a("/cart");return}const o=h.toJson(r);o.phone_number_2=r.customer_phone_number_2||r.customer_phone_number_1,o.phone_number_1=r.customer_phone_number_1,o.phone_number=o.phone_number_1;const t=await D("orders-create",{items:JSON.stringify(i),delivery:JSON.stringify(o)});if(t.code!==1){n(t.message||"Failed to submit order"),u.error(`Failed ${t.message||"to submit order"}`);return}let c;try{t.data&&typeof x.fromJson=="function"?c=x.fromJson(t.data):c=h.ensureOrderModel(t.data)}catch{n("Failed to process order response"),u.error("Failed to process order response");return}if(!c||c.id<1){n(t.message||"Invalid order response"),u.error("Failed to submit order");return}await C(),u.success("Order submitted successfully!",{autoClose:4e3}),a("/",{state:{orderSuccess:!0,orderId:c.id,paymentUrl:h.getPaymentLink(c)}})}catch(o){n(o.message||"Failed to submit order"),u.error("Failed to submit order: "+(o.message||"Unknown error"))}finally{v(!1),g(!1)}},T=()=>{g(!0)};return!s||i.length===0?e.jsx(N,{className:"py-5",children:e.jsx(_,{variant:"warning",children:"Your cart is empty or order information is missing. Please start from the cart."})}):e.jsxs(e.Fragment,{children:[e.jsx("style",{dangerouslySetInnerHTML:{__html:A}}),e.jsx(H,{showBackground:!0,showIcons:!0}),e.jsx("div",{className:"checkout-page",children:e.jsxs(N,{className:"d-flex flex-column justify-content-center align-items-center",style:{minHeight:"100vh"},children:[e.jsxs("div",{className:"checkout-card w-100",style:{minHeight:"60vh",display:"flex",flexDirection:"column",justifyContent:"center"},children:[e.jsxs("div",{className:"checkout-header",children:[e.jsx("h2",{className:"checkout-title",children:"Order Summary"}),e.jsx("p",{className:"checkout-subtitle",children:"Please confirm your order details below before proceeding to payment"})]}),e.jsxs("div",{className:"checkout-content",children:[e.jsxs("div",{className:"summary-item",children:[e.jsxs("div",{className:"summary-item-content",children:[e.jsx("h4",{className:"summary-item-title",children:"Order Items Total"}),e.jsx("p",{className:"summary-item-subtitle",children:"Total amount of all items in your cart"})]}),e.jsx("div",{className:"summary-item-amount",children:b(d.toString())})]}),e.jsx("div",{className:"summary-divider"}),e.jsxs("div",{className:"summary-item",children:[e.jsxs("div",{className:"summary-item-content",children:[e.jsx("h4",{className:"summary-item-title",children:"Delivery Cost"}),e.jsx("p",{className:"summary-item-subtitle",children:`${(r==null?void 0:r.delivery_address_text)||"Delivery address"}, ${(r==null?void 0:r.delivery_address_details)||""}`})]}),e.jsx("div",{className:"summary-item-amount",children:b((r==null?void 0:r.delivery_amount)||"0")})]}),e.jsx("div",{className:"summary-divider-bold"}),e.jsxs("div",{className:"summary-item summary-total",children:[e.jsxs("div",{className:"summary-item-content",children:[e.jsx("h3",{className:"summary-total-title",children:"Total"}),e.jsx("p",{className:"summary-item-subtitle",children:"Final amount including all charges"})]}),e.jsx("div",{className:"summary-total-amount",children:b(k.toString())})]}),j&&e.jsx(_,{variant:"danger",className:"checkout-error",children:j})]}),e.jsxs("div",{className:"checkout-actions",children:[e.jsx(y,{variant:"outline-secondary",onClick:()=>a("/delivery-address",{state:{order:r}}),className:"btn-back-checkout",disabled:m,children:"Back to Delivery Info"}),e.jsx(y,{onClick:T,disabled:m,className:"btn-submit-order",children:m?e.jsxs(e.Fragment,{children:[e.jsx(w,{size:"sm",className:"me-2"}),"Submitting Order..."]}):"Submit Order"})]})]}),e.jsxs(p,{show:z,onHide:()=>g(!1),centered:!0,children:[e.jsx(p.Header,{closeButton:!0,children:e.jsx(p.Title,{children:"Confirm Order Submission"})}),e.jsxs(p.Body,{children:[e.jsx("p",{children:"Are you sure you want to submit this order?"}),e.jsx("div",{className:"modal-order-summary",children:e.jsxs("strong",{children:["Total Amount: ",b(k.toString())]})})]}),e.jsxs(p.Footer,{children:[e.jsx(y,{variant:"outline-secondary",onClick:()=>g(!1),disabled:m,children:"Cancel"}),e.jsx(y,{variant:"primary",onClick:M,disabled:m,children:m?e.jsxs(e.Fragment,{children:[e.jsx(w,{size:"sm",className:"me-2"}),"Submitting..."]}):"Confirm Order"})]})]})]})})]})};export{ie as default};
