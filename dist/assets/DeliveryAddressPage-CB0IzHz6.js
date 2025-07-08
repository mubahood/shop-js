var F=Object.defineProperty;var L=(c,s,d)=>s in c?F(c,s,{enumerable:!0,configurable:!0,writable:!0,value:d}):c[s]=d;var i=(c,s,d)=>L(c,typeof s!="symbol"?s+"":s,d);import{U as l,N as B,G as T,q as H,r as h,O as J,T as _,j as e,F as m,S as k}from"./index-Ck1B39s_.js";import{O as C}from"./OrderModel-DXlMFbRV.js";import{f as U}from"./index-DhbewBbn.js";import{O as M}from"./OrderModelUtils-f2lD5aTU.js";import{D as R}from"./DynamicBreadcrumb-DclKpnDu.js";import{C as S}from"./Container-CYOb-KOn.js";import{A as $}from"./Alert-C-lzSFeO.js";import{B as O}from"./Button-NLQyPqyC.js";import"./hook-BpSSKWeX.js";import"./useEventCallback-Cs-IbGqe.js";import"./divWithClassName-Cvv0wCrx.js";import"./Anchor-D3rNWf9j.js";import"./Button-BlOqttEG.js";import"./TransitionWrapper-Ca_Uh9a9.js";import"./useMergedRefs-NifApYAE.js";const u=class u{constructor(s={}){i(this,"id",0);i(this,"created_at","");i(this,"updated_at","");i(this,"address","");i(this,"latitude","");i(this,"longitude","");i(this,"shipping_cost","");Object.assign(this,s)}static fromJson(s){return s?new u({id:l.int_parse(s.id),created_at:l.to_str(s.created_at,""),updated_at:l.to_str(s.updated_at,""),address:l.to_str(s.address,""),latitude:l.to_str(s.latitude,""),longitude:l.to_str(s.longitude,""),shipping_cost:l.to_str(s.shipping_cost,"")}):new u}toJson(){return{id:this.id,created_at:this.created_at,updated_at:this.updated_at,address:this.address,latitude:this.latitude,longitude:this.longitude,shipping_cost:this.shipping_cost}}static async getItems(){try{const s=await B(u.end_point,{});return s.code!==1?[]:Array.isArray(s.data)?s.data.map(d=>u.fromJson(d)):[]}catch{return[]}}getDisplayText(){return`${this.address} (${l.moneyFormat(this.shipping_cost)})`}};i(u,"end_point","delivery-addresses"),i(u,"tableName","delivery_addresses");let v=u;const q=`
  .delivery-address-page {
    min-height: 100vh;
    background: var(--background-body);
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
    transition: border-color 0.2s;
  }

  .form-control-modern:focus {
    border-color: var(--primary-color) !important;
    background: var(--background-light) !important;
    outline: none !important;
    box-shadow: none !important;
  }

  .error-message {
    color: var(--danger-color);
    font-size: 0.95rem;
    margin-top: 2px;
    font-weight: 500;
    background: none;
    border: none;
    padding: 0;
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
    transition: all 0.2s;
  }

  .btn-back:hover {
    background: var(--primary-color);
    color: var(--white);
  }

  .btn-continue {
    font-size: 1rem;
    font-weight: 600;
    border-radius: var(--border-radius);
    background: var(--primary-color);
    color: var(--white);
    border: none;
    min-width: 140px;
    transition: all 0.2s;
  }

  .btn-continue:hover:not(:disabled) {
    background: var(--primary-color-dark);
    color: var(--white);
  }

  .btn-continue:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  @media (max-width: 575.98px) {
    .delivery-form-wrapper, .delivery-header, form, .delivery-actions {
      padding: 16px !important;
    }
    .delivery-title {
      font-size: 1.1rem;
    }
  }
`,de=()=>{const c=T(),s=H(),{order:d}=s.state||{},[t,f]=h.useState(()=>M.ensureOrderModel(d)),g=J(),[y,b]=h.useState([]),[x,j]=h.useState(!1),[P,N]=h.useState(!0),[o,w]=h.useState({});h.useEffect(()=>{A()},[g]);const A=async()=>{try{if(N(!0),g&&g.length>0){const r=g.map(n=>{const a=new v;return a.id=n.id,a.address=n.name,a.shipping_cost=n.shipping_cost.toString(),a});b(r)}else{const r=await v.getItems();b(r)}}catch(r){console.error("Error loading delivery addresses:",r),_.error("Failed to load delivery addresses")}finally{N(!1)}},E=()=>{const r={};return t.delivery_address_id||(r.delivery_address_id="Please select a delivery region"),(!t.delivery_address_details||t.delivery_address_details.length<5)&&(r.delivery_address_details="Please enter a clear address"),(!t.customer_name||t.customer_name.trim().length<2)&&(r.customer_name="Please enter your name"),(!t.mail||!l.isValidMail(t.mail))&&(r.mail="Please enter a valid email address"),(!t.customer_phone_number_1||t.customer_phone_number_1.length<10)&&(r.customer_phone_number_1="Please enter a valid phone number"),t.customer_phone_number_1&&t.customer_phone_number_1.startsWith("+")&&(r.customer_phone_number_1="Phone number should not start with +"),w(r),Object.keys(r).length===0},I=r=>{const n=y.find(a=>a.id.toString()===r);if(n){const a=new C;Object.assign(a,t),a.delivery_address_id=n.id.toString(),a.delivery_address_text=n.address,a.delivery_amount=n.shipping_cost,f(a)}},p=(r,n)=>{const a=new C;Object.assign(a,t),a[r]=n,f(a),o[r]&&w(D=>({...D,[r]:""}))},z=async r=>{if(r.preventDefault(),!E()){_.error("Please fix the errors below");return}try{j(!0),c("/checkout",{state:{order:t}})}catch(n){console.error("Error proceeding to checkout:",n),_.error("Failed to proceed to checkout")}finally{j(!1)}};return d?e.jsxs(e.Fragment,{children:[e.jsx("style",{dangerouslySetInnerHTML:{__html:q}}),e.jsx(R,{showBackground:!0,showIcons:!0}),e.jsx("div",{className:"delivery-address-page",children:e.jsx(S,{className:"d-flex flex-column justify-content-center align-items-center",style:{minHeight:"100vh"},children:e.jsxs("div",{className:"delivery-form-wrapper w-100",style:{minHeight:"60vh",display:"flex",flexDirection:"column",justifyContent:"center"},children:[e.jsxs("div",{className:"delivery-header",children:[e.jsx("h2",{className:"delivery-title",children:"Delivery Information"}),e.jsx("p",{className:"delivery-subtitle",children:"Please provide your delivery details"})]}),e.jsxs(m,{onSubmit:z,children:[e.jsxs("div",{className:"form-group-modern",children:[e.jsx("label",{className:"form-label-modern",children:"Delivery Region *"}),P?e.jsxs("div",{className:"text-center py-3",children:[e.jsx(k,{animation:"border",size:"sm"}),e.jsx("span",{className:"ms-2",children:"Loading regions..."})]}):e.jsxs(m.Select,{value:t.delivery_address_id,onChange:r=>I(r.target.value),isInvalid:!!o.delivery_address_id,className:"form-control-modern",children:[e.jsx("option",{value:"",children:"Select a delivery region"}),y.map(r=>e.jsxs("option",{value:r.id.toString(),children:[r.address," - ",U(r.shipping_cost)]},r.id))]}),o.delivery_address_id&&e.jsx("div",{className:"error-message",children:o.delivery_address_id})]}),e.jsxs("div",{className:"form-group-modern",children:[e.jsx("label",{className:"form-label-modern",children:"Street Address *"}),e.jsx(m.Control,{type:"text",value:t.delivery_address_details,onChange:r=>p("delivery_address_details",r.target.value),placeholder:"Enter your street address",isInvalid:!!o.delivery_address_details,className:"form-control-modern"}),o.delivery_address_details&&e.jsx("div",{className:"error-message",children:o.delivery_address_details})]}),e.jsxs("div",{className:"form-group-modern",children:[e.jsx("label",{className:"form-label-modern",children:"Full Name *"}),e.jsx(m.Control,{type:"text",value:t.customer_name,onChange:r=>p("customer_name",r.target.value),placeholder:"Enter your full name",isInvalid:!!o.customer_name,className:"form-control-modern"}),o.customer_name&&e.jsx("div",{className:"error-message",children:o.customer_name})]}),e.jsxs("div",{className:"form-group-modern",children:[e.jsx("label",{className:"form-label-modern",children:"Email Address *"}),e.jsx(m.Control,{type:"email",value:t.mail,onChange:r=>p("mail",r.target.value),placeholder:"Enter your email address",isInvalid:!!o.mail,className:"form-control-modern"}),o.mail&&e.jsx("div",{className:"error-message",children:o.mail})]}),e.jsxs("div",{className:"form-group-modern",children:[e.jsx("label",{className:"form-label-modern",children:"Phone Number *"}),e.jsx(m.Control,{type:"tel",value:t.customer_phone_number_1,onChange:r=>p("customer_phone_number_1",r.target.value),placeholder:"Enter your phone number",isInvalid:!!o.customer_phone_number_1,className:"form-control-modern"}),o.customer_phone_number_1&&e.jsx("div",{className:"error-message",children:o.customer_phone_number_1})]}),e.jsxs("div",{className:"form-group-modern",children:[e.jsx("label",{className:"form-label-modern",children:"Alternate Phone Number"}),e.jsx(m.Control,{type:"tel",value:t.customer_phone_number_2,onChange:r=>p("customer_phone_number_2",r.target.value),placeholder:"Enter alternate phone number (optional)",className:"form-control-modern"})]}),e.jsxs("div",{className:"form-group-modern",children:[e.jsx("label",{className:"form-label-modern",children:"Order Notes"}),e.jsx(m.Control,{as:"textarea",rows:3,value:t.order_details,onChange:r=>p("order_details",r.target.value),placeholder:"Any special instructions for delivery (optional)",className:"form-control-modern"})]}),e.jsxs("div",{className:"delivery-actions",children:[e.jsx(O,{variant:"outline-secondary",onClick:()=>c("/cart"),className:"btn-back",children:"Back to Cart"}),e.jsx(O,{type:"submit",disabled:x,className:"btn-continue",children:x?e.jsxs(e.Fragment,{children:[e.jsx(k,{size:"sm",className:"me-2"}),"Processing..."]}):"Continue to Checkout"})]})]})]})})})]}):e.jsx(S,{className:"py-5",children:e.jsx($,{variant:"warning",children:"No order information found. Please start from the cart."})})};export{de as default};
