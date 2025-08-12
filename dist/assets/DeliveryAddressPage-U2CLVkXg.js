var Y=Object.defineProperty;var B=(m,t,l)=>t in m?Y(m,t,{enumerable:!0,configurable:!0,writable:!0,value:l}):m[t]=l;var d=(m,t,l)=>B(m,typeof t!="symbol"?t+"":t,l);import{U as c,M as T,G as U,q as $,r as g,N as H,T as b,j as e,S as f,F as p}from"./index-BUlTi-RG.js";import{O as S}from"./OrderModel-Bz2mqQjx.js";import{f as J}from"./index-CYgkVBfu.js";import{O as M}from"./OrderModelUtils-FQIjtl6X.js";import{D as R}from"./DynamicBreadcrumb-BHe3ZGbJ.js";import{C as I}from"./Container-D2fZxHT4.js";import{A as q}from"./Alert-CEmwcEMu.js";import{B as P}from"./Button-D1awEB0c.js";import"./hook-CfU9Pidb.js";import"./objectWithoutPropertiesLoose-CAYKN5F1.js";import"./useEventCallback-CUECKx-A.js";import"./divWithClassName-BurpA6jg.js";import"./Anchor-DCpCVXp0.js";import"./useEventCallback-CmmpuWZE.js";import"./Button-CKTz88uJ.js";import"./CloseButton-Vs17wP1E.js";import"./TransitionWrapper-BLmPPUNA.js";import"./useMergedRefs-C3O5QAvR.js";const u=class u{constructor(t={}){d(this,"id",0);d(this,"created_at","");d(this,"updated_at","");d(this,"address","");d(this,"latitude","");d(this,"longitude","");d(this,"shipping_cost","");Object.assign(this,t)}static fromJson(t){return t?new u({id:c.int_parse(t.id),created_at:c.to_str(t.created_at,""),updated_at:c.to_str(t.updated_at,""),address:c.to_str(t.address,""),latitude:c.to_str(t.latitude,""),longitude:c.to_str(t.longitude,""),shipping_cost:c.to_str(t.shipping_cost,"")}):new u}toJson(){return{id:this.id,created_at:this.created_at,updated_at:this.updated_at,address:this.address,latitude:this.latitude,longitude:this.longitude,shipping_cost:this.shipping_cost}}static async getItems(){try{const t=await T(u.end_point,{});return t.code!==1?[]:Array.isArray(t.data)?t.data.map(l=>u.fromJson(l)):[]}catch{return[]}}getDisplayText(){return`${this.address} (${c.moneyFormat(this.shipping_cost)})`}};d(u,"end_point","delivery-addresses"),d(u,"tableName","delivery_addresses");let x=u;const G=`
  .delivery-address-page {
    min-height: 100vh;
    background: var(--background-body);
    position: relative;
  }

  .delivery-form-wrapper {
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

  .delivery-form-wrapper.loading {
    pointer-events: none;
    opacity: 0.7;
  }

  .delivery-header {
    padding: 32px 32px 0 32px;
    text-align: center;
    background: none;
    border: none;
  }

  .delivery-title {
    font-size: 1.6rem;
    font-weight: 700;
    color: var(--text-color-dark);
    margin-bottom: 0.25rem;
  }

  .delivery-subtitle {
    font-size: 1rem;
    color: var(--text-color-medium);
    margin-bottom: 0;
  }

  form {
    padding: 32px;
    background: none;
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
    gap: 16px;
    justify-content: center;
    position: relative;
  }

  .form-group-modern {
    margin-bottom: 12px;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .form-label-modern {
    font-size: 1rem;
    font-weight: 600;
    color: var(--text-color-dark);
    margin-bottom: 2px;
    text-transform: none;
    letter-spacing: 0;
  }

  .form-control-modern {
    font-size: 1rem !important;
    border-radius: var(--border-radius) !important;
    border: 1px solid var(--border-color) !important;
    background: var(--white) !important;
    padding: 10px 14px !important;
    box-shadow: none !important;
    font-weight: 400 !important;
    transition: all 0.2s ease;
  }

  .form-control-modern:focus {
    border-color: var(--primary-color) !important;
    background: var(--background-light) !important;
    outline: none !important;
    box-shadow: 0 0 0 3px rgba(13, 110, 253, 0.1) !important;
    transform: translateY(-1px);
  }

  .form-control-modern:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .error-message {
    color: var(--danger-color);
    font-size: 0.9rem;
    margin-top: 4px;
    font-weight: 500;
    background: none;
    border: none;
    padding: 0;
    animation: fadeInError 0.3s ease;
  }

  @keyframes fadeInError {
    from { opacity: 0; transform: translateY(-5px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .delivery-actions {
    display: flex;
    justify-content: center;
    gap: 16px;
    padding: 32px 0 0 0;
    background: none;
    border: none;
  }

  .btn-back {
    font-size: 1rem;
    color: var(--primary-color);
    background: var(--white);
    border: 1px solid var(--primary-color);
    border-radius: var(--border-radius);
    min-width: 120px;
    font-weight: 500;
    transition: all 0.2s ease;
    position: relative;
    overflow: hidden;
  }

  .btn-back:hover:not(:disabled) {
    background: var(--primary-color);
    color: var(--white);
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(13, 110, 253, 0.2);
  }

  .btn-back:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    pointer-events: none;
  }

  .btn-continue {
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

  .btn-continue:hover:not(:disabled) {
    background: var(--primary-color-dark);
    color: var(--white);
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(13, 110, 253, 0.3);
  }

  .btn-continue:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    pointer-events: none;
  }

  .btn-continue.loading {
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
    background: rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(4px);
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
    padding: 32px;
    border-radius: 12px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
    text-align: center;
    min-width: 280px;
    animation: slideInUp 0.3s ease;
  }

  @keyframes slideInUp {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .loading-spinner-large {
    width: 40px;
    height: 40px;
    margin-bottom: 16px;
    color: var(--primary-color);
  }

  .loading-text {
    font-size: 1.1rem;
    font-weight: 600;
    color: var(--text-color-dark);
    margin-bottom: 8px;
  }

  .loading-subtext {
    font-size: 0.95rem;
    color: var(--text-color-medium);
    margin: 0;
  }

  .region-loading {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 16px;
    background: var(--background-light);
    border-radius: var(--border-radius);
    border: 1px solid var(--border-color);
  }

  .region-loading-spinner {
    width: 20px;
    height: 20px;
    margin-right: 12px;
    color: var(--primary-color);
  }

  .region-loading-text {
    font-size: 0.95rem;
    color: var(--text-color-medium);
    font-weight: 500;
  }

  @media (max-width: 575.98px) {
    .delivery-form-wrapper, .delivery-header, form, .delivery-actions {
      padding: 16px !important;
    }
    .delivery-title {
      font-size: 1.3rem;
    }
    .delivery-actions {
      flex-direction: column;
    }
    .btn-back, .btn-continue {
      width: 100%;
      min-width: auto;
    }
    .loading-content {
      margin: 20px;
      min-width: auto;
      width: calc(100% - 40px);
    }
  }
`,ue=()=>{const m=U(),t=$(),{order:l}=t.state||{},[a,y]=g.useState(()=>M.ensureOrderModel(l)),v=H(),[_,j]=g.useState([]),[O,w]=g.useState(!1),[E,N]=g.useState(!0),[i,k]=g.useState(!1),[o,C]=g.useState({});g.useEffect(()=>{z()},[v]);const z=async()=>{try{if(N(!0),v&&v.length>0){const r=v.map(n=>{const s=new x;return s.id=n.id,s.address=n.name,s.shipping_cost=n.shipping_cost.toString(),s});j(r)}else{const r=await x.getItems();j(r)}}catch(r){console.error("Error loading delivery addresses:",r),b.error("Failed to load delivery addresses")}finally{N(!1)}},A=()=>{const r={};return a.delivery_address_id||(r.delivery_address_id="Please select a delivery region"),(!a.delivery_address_details||a.delivery_address_details.length<5)&&(r.delivery_address_details="Please enter a clear address"),(!a.customer_name||a.customer_name.trim().length<2)&&(r.customer_name="Please enter your name"),(!a.mail||!c.isValidMail(a.mail))&&(r.mail="Please enter a valid email address"),(!a.customer_phone_number_1||a.customer_phone_number_1.length<10)&&(r.customer_phone_number_1="Please enter a valid phone number"),a.customer_phone_number_1&&a.customer_phone_number_1.startsWith("+")&&(r.customer_phone_number_1="Phone number should not start with +"),C(r),Object.keys(r).length===0},D=r=>{const n=_.find(s=>s.id.toString()===r);if(n){const s=new S;Object.assign(s,a),s.delivery_address_id=n.id.toString(),s.delivery_address_text=n.address,s.delivery_amount=n.shipping_cost,y(s)}},h=(r,n)=>{const s=new S;Object.assign(s,a),s[r]=n,y(s),o[r]&&C(L=>({...L,[r]:""}))},F=async r=>{if(r.preventDefault(),!A()){b.error("Please fix the errors below");return}try{k(!0),w(!0),await new Promise(n=>setTimeout(n,800)),m("/checkout",{state:{order:a}})}catch(n){console.error("Error proceeding to checkout:",n),b.error("Failed to proceed to checkout")}finally{k(!1),w(!1)}};return l?e.jsxs(e.Fragment,{children:[e.jsx("style",{dangerouslySetInnerHTML:{__html:G}}),e.jsx(R,{showBackground:!0,showIcons:!0}),i&&e.jsx("div",{className:"loading-overlay",children:e.jsxs("div",{className:"loading-content",children:[e.jsx(f,{className:"loading-spinner-large",animation:"border"}),e.jsx("div",{className:"loading-text",children:"Processing Your Information"}),e.jsx("div",{className:"loading-subtext",children:"Preparing your checkout..."})]})}),e.jsx("div",{className:"delivery-address-page",children:e.jsx(I,{className:"d-flex flex-column justify-content-center align-items-center",style:{minHeight:"100vh"},children:e.jsxs("div",{className:`delivery-form-wrapper w-100 ${i?"loading":""}`,style:{minHeight:"60vh",display:"flex",flexDirection:"column",justifyContent:"center"},children:[e.jsxs("div",{className:"delivery-header",children:[e.jsx("h2",{className:"delivery-title",children:"Delivery Information"}),e.jsx("p",{className:"delivery-subtitle",children:"Please provide your delivery details"})]}),e.jsxs(p,{onSubmit:F,children:[e.jsxs("div",{className:"form-group-modern",children:[e.jsx("label",{className:"form-label-modern",children:"Delivery Region *"}),E?e.jsxs("div",{className:"region-loading",children:[e.jsx(f,{className:"region-loading-spinner",animation:"border",size:"sm"}),e.jsx("span",{className:"region-loading-text",children:"Loading delivery regions..."})]}):e.jsxs(p.Select,{value:a.delivery_address_id,onChange:r=>D(r.target.value),isInvalid:!!o.delivery_address_id,disabled:i,className:"form-control-modern",children:[e.jsx("option",{value:"",children:"Select a delivery region"}),_.map(r=>e.jsxs("option",{value:r.id.toString(),children:[r.address," - ",J(r.shipping_cost)]},r.id))]}),o.delivery_address_id&&e.jsx("div",{className:"error-message",children:o.delivery_address_id})]}),e.jsxs("div",{className:"form-group-modern",children:[e.jsx("label",{className:"form-label-modern",children:"Street Address *"}),e.jsx(p.Control,{type:"text",value:a.delivery_address_details,onChange:r=>h("delivery_address_details",r.target.value),placeholder:"Enter your street address",isInvalid:!!o.delivery_address_details,disabled:i,className:"form-control-modern"}),o.delivery_address_details&&e.jsx("div",{className:"error-message",children:o.delivery_address_details})]}),e.jsxs("div",{className:"form-group-modern",children:[e.jsx("label",{className:"form-label-modern",children:"Full Name *"}),e.jsx(p.Control,{type:"text",value:a.customer_name,onChange:r=>h("customer_name",r.target.value),placeholder:"Enter your full name",isInvalid:!!o.customer_name,disabled:i,className:"form-control-modern"}),o.customer_name&&e.jsx("div",{className:"error-message",children:o.customer_name})]}),e.jsxs("div",{className:"form-group-modern",children:[e.jsx("label",{className:"form-label-modern",children:"Email Address *"}),e.jsx(p.Control,{type:"email",value:a.mail,onChange:r=>h("mail",r.target.value),placeholder:"Enter your email address",isInvalid:!!o.mail,disabled:i,className:"form-control-modern"}),o.mail&&e.jsx("div",{className:"error-message",children:o.mail})]}),e.jsxs("div",{className:"form-group-modern",children:[e.jsx("label",{className:"form-label-modern",children:"Phone Number *"}),e.jsx(p.Control,{type:"tel",value:a.customer_phone_number_1,onChange:r=>h("customer_phone_number_1",r.target.value),placeholder:"Enter your phone number",isInvalid:!!o.customer_phone_number_1,disabled:i,className:"form-control-modern"}),o.customer_phone_number_1&&e.jsx("div",{className:"error-message",children:o.customer_phone_number_1})]}),e.jsxs("div",{className:"form-group-modern",children:[e.jsx("label",{className:"form-label-modern",children:"Alternate Phone Number"}),e.jsx(p.Control,{type:"tel",value:a.customer_phone_number_2,onChange:r=>h("customer_phone_number_2",r.target.value),placeholder:"Enter alternate phone number (optional)",disabled:i,className:"form-control-modern"})]}),e.jsxs("div",{className:"form-group-modern",children:[e.jsx("label",{className:"form-label-modern",children:"Order Notes"}),e.jsx(p.Control,{as:"textarea",rows:3,value:a.order_details,onChange:r=>h("order_details",r.target.value),placeholder:"Any special instructions for delivery (optional)",disabled:i,className:"form-control-modern"})]}),e.jsxs("div",{className:"delivery-actions",children:[e.jsx(P,{variant:"outline-secondary",onClick:()=>m("/cart"),disabled:i,className:"btn-back",children:"Back to Cart"}),e.jsx(P,{type:"submit",disabled:O||i,className:`btn-continue ${i?"loading":""}`,children:i?e.jsxs(e.Fragment,{children:[e.jsx(f,{size:"sm",className:"loading-spinner",animation:"border"}),"Processing..."]}):"Continue to Checkout"})]})]})]})})})]}):e.jsx(I,{className:"py-5",children:e.jsx(q,{variant:"warning",children:"No order information found. Please start from the cart."})})};export{ue as default};
