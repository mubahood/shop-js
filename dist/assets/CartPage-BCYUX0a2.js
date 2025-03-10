import{J as o,j as e,z as a,ad as c}from"./index-B8pH7eeg.js";const i=[],x=()=>{const{cartItems:r,increase:n,decrease:l,removeFromCart:d,totalCartAmount:t}=o();return r.length===0?e.jsxs(a.div,{className:"container py-5 text-center",initial:{opacity:0},animate:{opacity:1},children:[e.jsx("h1",{className:"mb-4",children:"Cart"}),e.jsx("p",{className:"lead text-muted",children:"Your cart is currently empty."}),e.jsx(c,{to:"/shop",className:"btn btn-lg btn-outline-primary",children:"Shop Now"})]}):e.jsxs(a.div,{className:"container py-5",initial:{opacity:0},animate:{opacity:1},children:[e.jsx("style",{children:`
        .cart-card {
          border: 1px solid #ddd;
          border-radius: 0;
          overflow: hidden;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .cart-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }
        .cart-card-body {
          padding: 1rem;
        }
        .cart-item-img {
          width: 80px;
          height: 80px;
          object-fit: cover;
          border-radius: 0;
        }
        .remove-link {
          color: #f33d02;
          font-size: 0.9rem;
          cursor: pointer;
          border: none;
          background: none;
          margin-left: 1rem;
        }
        .remove-link:hover {
          text-decoration: underline;
        }
        .cart-summary-card {
          border: 1px solid #e0e0e0;
          border-radius: 0;
          overflow: hidden;
          background-color: #fff;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .cart-summary-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }
        .cart-summary-card-body {
          padding: 1rem;
        }
        .checkout-btn {
          background-color: #f33d02;
          border-color: #f33d02;
          color: #fff;
          width: 100%;
          font-weight: 600;
          margin-top: 1rem;
        }
        .checkout-btn:hover {
          background-color: #d12e00;
          border-color: #d12e00;
        }
      `}),e.jsxs("div",{className:"row",children:[e.jsxs("div",{className:"col-lg-8 mb-4",children:[e.jsxs("h1",{className:"mb-4",children:["Cart (",r.length,")"]}),e.jsx("div",{className:"row g-3",children:r.map(s=>e.jsx("div",{className:"col-12",children:e.jsx("div",{className:"cart-card",children:e.jsx("div",{className:"cart-card-body",children:e.jsxs("div",{className:"d-flex",children:[e.jsx("div",{style:{width:"80px",marginRight:"1rem"},children:e.jsx("img",{src:s.product_feature_photo,alt:s.product_name,className:"cart-item-img"})}),e.jsxs("div",{className:"flex-grow-1 d-flex flex-column justify-content-between",children:[e.jsxs("div",{className:"d-flex justify-content-between align-items-start",children:[e.jsxs("div",{children:[e.jsx("h5",{style:{fontSize:"1rem",fontWeight:600},children:s.product_name}),s.color&&e.jsxs("div",{className:"text-muted",style:{fontSize:"0.85rem"},children:["Variant: ",s.color]}),s.size&&e.jsxs("div",{className:"text-muted",style:{fontSize:"0.85rem"},children:["Size: ",s.size]}),e.jsx("div",{className:"text-muted",style:{fontSize:"0.85rem"},children:"In stock"})]}),e.jsx("div",{className:"text-end",children:e.jsxs("strong",{style:{color:"#114786"},children:["UGX"," ",parseFloat(s.product_price_1).toLocaleString()]})})]}),e.jsxs("div",{className:"d-flex align-items-center mt-2",children:[e.jsx("button",{className:"btn btn-sm btn-outline-secondary",onClick:()=>l(s.product_id),children:e.jsx("i",{className:"bi bi-dash"})}),e.jsx("span",{style:{minWidth:"40px",textAlign:"center",margin:"0 0.5rem"},children:s.product_quantity}),e.jsx("button",{className:"btn btn-sm btn-outline-secondary",onClick:()=>n(s.product_id),children:e.jsx("i",{className:"bi bi-plus"})}),e.jsx("button",{className:"remove-link",onClick:()=>d(s.product_id),children:"Remove"})]})]}),e.jsx("div",{className:"text-end ms-3",style:{minWidth:"100px"},children:e.jsxs("strong",{children:["UGX ",s.totalPrice().toLocaleString()]})})]})})})},s.product_id))})]}),e.jsx("div",{className:"col-lg-4",children:e.jsx("div",{className:"cart-summary-card",children:e.jsxs("div",{className:"cart-summary-card-body",children:[e.jsx("h4",{style:{fontWeight:600},children:"Cart Summary"}),e.jsx("hr",{}),e.jsxs("div",{className:"d-flex justify-content-between mb-2",children:[e.jsx("span",{children:"Subtotal:"}),e.jsxs("span",{children:["UGX ",t.toLocaleString()]})]}),e.jsx("hr",{}),e.jsxs("div",{className:"d-flex justify-content-between fw-bold",style:{fontSize:"1.1rem"},children:[e.jsx("span",{children:"Total:"}),e.jsxs("span",{children:["UGX ",t.toLocaleString()]})]}),e.jsxs(c,{to:"/checkout",className:"btn checkout-btn",children:["Checkout (UGX ",t.toLocaleString(),")"]})]})})})]}),e.jsxs("div",{className:"mt-5",children:[e.jsxs("h3",{className:"mb-3",children:["Wishlist (",i.length,")"]}),e.jsx("div",{className:"wishlist-grid",children:i.map(s=>e.jsxs("div",{className:"wishlist-item",children:[e.jsx("img",{src:s.imageUrl,alt:s.name}),e.jsx("h6",{children:s.name}),e.jsxs("div",{className:"price",children:["UGX ",s.price.toLocaleString()]}),s.inStock?e.jsx("div",{className:"stock-status in-stock",children:"In Stock"}):e.jsx("div",{className:"stock-status out-stock",children:"Sold Out"})]},s.id))})]})]})};export{x as default};
