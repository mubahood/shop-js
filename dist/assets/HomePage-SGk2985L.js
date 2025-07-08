import{r as l,u as ne,j as e,c as A,a as Je,f as Ze,m as ve,b as Te,d as ze,S as K,L as E,e as er,g as V,s as rr,h as tr,i as ir,k as nr,l as ar,n as sr,o as or,p as G,C as ee,P as i,R as we,q as lr,T as cr}from"./index-Ck1B39s_.js";import{A as q}from"./Alert-C-lzSFeO.js";import{U as dr}from"./imageUtils-wi1HUAmV.js";import{u as mr,a as je}from"./useEventCallback-Cs-IbGqe.js";import{u as pr}from"./useWillUnmount-Dc7evMr0.js";import{A as Ne}from"./Anchor-D3rNWf9j.js";import{u as ur}from"./hook-BpSSKWeX.js";import{t as hr,T as gr,a as xr}from"./TransitionWrapper-Ca_Uh9a9.js";import{c as Ie,g as ae,a as Le,f as ke}from"./index-DhbewBbn.js";import{C as Ce}from"./Container-CYOb-KOn.js";import{B as br}from"./Button-NLQyPqyC.js";import{R as fr}from"./Row-DMOtnxeD.js";import"./divWithClassName-Cvv0wCrx.js";import"./Button-BlOqttEG.js";import"./useMergedRefs-NifApYAE.js";function yr(r,t){const s=l.useRef(!0);l.useEffect(()=>{if(s.current){s.current=!1;return}return r()},t)}function vr(){const r=l.useRef(!0),t=l.useRef(()=>r.current);return l.useEffect(()=>(r.current=!0,()=>{r.current=!1}),[]),t.current}const ie=2**31-1;function Ee(r,t,s){const o=s-Date.now();r.current=o<=ie?setTimeout(t,o):setTimeout(()=>Ee(r,t,s),ie)}function wr(){const r=vr(),t=l.useRef();return pr(()=>clearTimeout(t.current)),l.useMemo(()=>{const s=()=>clearTimeout(t.current);function o(a,n=0){r()&&(s(),n<=ie?t.current=setTimeout(a,n):Ee(t,a,Date.now()+n))}return{set:o,clear:s,handleRef:t}},[])}const Me=l.forwardRef(({className:r,bsPrefix:t,as:s="div",...o},a)=>(t=ne(t,"carousel-caption"),e.jsx(s,{ref:a,className:A(r,t),...o})));Me.displayName="CarouselCaption";const Oe=l.forwardRef(({as:r="div",bsPrefix:t,className:s,...o},a)=>{const n=A(s,ne(t,"carousel-item"));return e.jsx(r,{ref:a,...o,className:n})});Oe.displayName="CarouselItem";const jr=40;function Nr(r){if(!r||!r.style||!r.parentNode||!r.parentNode.style)return!1;const t=getComputedStyle(r);return t.display!=="none"&&t.visibility!=="hidden"&&getComputedStyle(r.parentNode).display!=="none"}const $e=l.forwardRef(({defaultActiveIndex:r=0,...t},s)=>{const{as:o="div",bsPrefix:a,slide:n=!0,fade:d=!1,controls:u=!0,indicators:m=!0,indicatorLabels:g=[],activeIndex:x,onSelect:y,onSlide:v,onSlid:w,interval:b=5e3,keyboard:W=!0,onKeyDown:F,pause:T="hover",onMouseOver:I,onMouseOut:h,wrap:z=!0,touch:B=!0,onTouchStart:U,onTouchMove:H,onTouchEnd:M,prevIcon:O=e.jsx("span",{"aria-hidden":"true",className:"carousel-control-prev-icon"}),prevLabel:oe="Previous",nextIcon:Pe=e.jsx("span",{"aria-hidden":"true",className:"carousel-control-next-icon"}),nextLabel:le="Next",variant:ce,className:Re,children:Q,...Fe}=ur({defaultActiveIndex:r,...t},{activeIndex:"onSelect"}),S=ne(a,"carousel"),$=Je(),P=l.useRef(null),[de,me]=l.useState("next"),[He,Y]=l.useState(!1),[R,pe]=l.useState(!1),[f,De]=l.useState(x||0);l.useEffect(()=>{!R&&x!==f&&(P.current?me(P.current):me((x||0)>f?"next":"prev"),n&&pe(!0),De(x||0))},[x,R,f,n]),l.useEffect(()=>{P.current&&(P.current=null)});let L=0,ue;Ze(Q,(c,p)=>{++L,p===x&&(ue=c.props.interval)});const he=mr(ue),j=l.useCallback(c=>{if(R)return;let p=f-1;if(p<0){if(!z)return;p=L-1}P.current="prev",y==null||y(p,c)},[R,f,y,z,L]),N=je(c=>{if(R)return;let p=f+1;if(p>=L){if(!z)return;p=0}P.current="next",y==null||y(p,c)}),J=l.useRef();l.useImperativeHandle(s,()=>({element:J.current,prev:j,next:N}));const ge=je(()=>{!document.hidden&&Nr(J.current)&&($?j():N())}),C=de==="next"?"start":"end";yr(()=>{n||(v==null||v(f,C),w==null||w(f,C))},[f]);const Ae=`${S}-item-${de}`,We=`${S}-item-${C}`,Be=l.useCallback(c=>{hr(c),v==null||v(f,C)},[v,f,C]),Ue=l.useCallback(()=>{pe(!1),w==null||w(f,C)},[w,f,C]),Ye=l.useCallback(c=>{if(W&&!/input|textarea/i.test(c.target.tagName))switch(c.key){case"ArrowLeft":c.preventDefault(),$?N(c):j(c);return;case"ArrowRight":c.preventDefault(),$?j(c):N(c);return}F==null||F(c)},[W,F,j,N,$]),Xe=l.useCallback(c=>{T==="hover"&&Y(!0),I==null||I(c)},[T,I]),Ve=l.useCallback(c=>{Y(!1),h==null||h(c)},[h]),xe=l.useRef(0),X=l.useRef(0),be=wr(),Ge=l.useCallback(c=>{xe.current=c.touches[0].clientX,X.current=0,T==="hover"&&Y(!0),U==null||U(c)},[T,U]),qe=l.useCallback(c=>{c.touches&&c.touches.length>1?X.current=0:X.current=c.touches[0].clientX-xe.current,H==null||H(c)},[H]),Ke=l.useCallback(c=>{if(B){const p=X.current;Math.abs(p)>jr&&(p>0?j(c):N(c))}T==="hover"&&be.set(()=>{Y(!1)},b||void 0),M==null||M(c)},[B,T,j,N,be,b,M]),fe=b!=null&&!He&&!R,Z=l.useRef();l.useEffect(()=>{var c,p;if(!fe)return;const _=$?j:N;return Z.current=window.setInterval(document.visibilityState?ge:_,(c=(p=he.current)!=null?p:b)!=null?c:void 0),()=>{Z.current!==null&&clearInterval(Z.current)}},[fe,j,N,he,b,ge,$]);const ye=l.useMemo(()=>m&&Array.from({length:L},(c,p)=>_=>{y==null||y(p,_)}),[m,L,y]);return e.jsxs(o,{ref:J,...Fe,onKeyDown:Ye,onMouseOver:Xe,onMouseOut:Ve,onTouchStart:Ge,onTouchMove:qe,onTouchEnd:Ke,className:A(Re,S,n&&"slide",d&&`${S}-fade`,ce&&`${S}-${ce}`),children:[m&&e.jsx("div",{className:`${S}-indicators`,children:ve(Q,(c,p)=>e.jsx("button",{type:"button","data-bs-target":"","aria-label":g!=null&&g.length?g[p]:`Slide ${p+1}`,className:p===f?"active":void 0,onClick:ye?ye[p]:void 0,"aria-current":p===f},p))}),e.jsx("div",{className:`${S}-inner`,children:ve(Q,(c,p)=>{const _=p===f;return n?e.jsx(gr,{in:_,onEnter:_?Be:void 0,onEntered:_?Ue:void 0,addEndListener:xr,children:(D,Qe)=>l.cloneElement(c,{...Qe,className:A(c.props.className,_&&D!=="entered"&&Ae,(D==="entered"||D==="exiting")&&"active",(D==="entering"||D==="exiting")&&We)})}):l.cloneElement(c,{className:A(c.props.className,_&&"active")})})}),u&&e.jsxs(e.Fragment,{children:[(z||x!==0)&&e.jsxs(Ne,{className:`${S}-control-prev`,onClick:j,children:[O,oe&&e.jsx("span",{className:"visually-hidden",children:oe})]}),(z||x!==L-1)&&e.jsxs(Ne,{className:`${S}-control-next`,onClick:N,children:[Pe,le&&e.jsx("span",{className:"visually-hidden",children:le})]})]})]})});$e.displayName="Carousel";const Se=Object.assign($e,{Caption:Me,Item:Oe}),re=`
  .category-list-wrapper {
    background-color: var(--white);
    border: 1px solid var(--border-color-light);
    border-radius: var(--border-radius);
    padding: 0;
    height: 100%;
    overflow: hidden;
  }

  .category-list {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .category-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.875rem 1.25rem;
    font-size: 0.9rem;
    font-weight: 500;
    color: var(--text-color-dark);
    text-decoration: none;
    border-bottom: 1px solid var(--border-color-light);
    transition: all 0.2s ease;
    position: relative;
  }

  .category-item:last-child {
    border-bottom: none;
  }

  .category-item:hover {
    background-color: var(--background-light);
    color: var(--primary-color);
    text-decoration: none;
  }

  .category-item:hover::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 3px;
    background-color: var(--primary-color);
  }

  .category-item i {
    font-size: 1rem;
    width: 18px;
    text-align: center;
    color: var(--text-color-medium);
    transition: color 0.2s ease;
  }

  .category-item:hover i {
    color: var(--primary-color);
  }

  .category-loading {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2rem;
    height: 100%;
  }

  .category-error {
    padding: 1rem;
  }

  @media (max-width: 1199.98px) {
    .category-item {
      padding: 0.75rem 1rem;
      font-size: 0.85rem;
    }
    
    .category-item i {
      font-size: 0.9rem;
      width: 16px;
    }
  }

  @media (max-width: 991.98px) {
    .category-list-wrapper {
      display: none;
    }
  }
`,kr=()=>{const r=Te(),{isLoading:t,error:s}=ze(),o={electronics:"bi-phone",fashion:"bi-bag",home:"bi-house",sports:"bi-bicycle",toys:"bi-joystick",beauty:"bi-heart-pulse",automotive:"bi-car-front",books:"bi-book",default:"bi-grid"},a=d=>{const u=d.toLowerCase();for(const[m,g]of Object.entries(o))if(u.includes(m))return g;return o.default};if(t)return e.jsxs(e.Fragment,{children:[e.jsx("style",{dangerouslySetInnerHTML:{__html:re}}),e.jsx("div",{className:"category-list-wrapper",children:e.jsx("div",{className:"category-loading",children:e.jsx(K,{animation:"border",size:"sm"})})})]});if(s)return e.jsxs(e.Fragment,{children:[e.jsx("style",{dangerouslySetInnerHTML:{__html:re}}),e.jsx("div",{className:"category-list-wrapper",children:e.jsx("div",{className:"category-error",children:e.jsx(q,{variant:"warning",className:"small mb-0",children:"Error loading categories"})})})]});const n=r&&r.length>9?r.slice(0,9):r;return e.jsxs(e.Fragment,{children:[e.jsx("style",{dangerouslySetInnerHTML:{__html:re}}),e.jsx("div",{className:"category-list-wrapper",children:e.jsx("ul",{className:"category-list",children:n&&n.map(d=>e.jsx("li",{children:e.jsxs(E,{to:`/products?category=${d.id}`,className:"category-item",children:[e.jsx("i",{className:`bi ${a(d.category)}`}),e.jsx("span",{children:d.category})]})},d.id))})})]})},te=`
  .hero-carousel-wrapper {
    width: 100%;
    height: 400px;
    position: relative;
    background-color: var(--background-light);
    border: 1px solid var(--border-color-light);
    border-radius: var(--border-radius);
    overflow: hidden;
  }

  .hero-carousel-container {
    width: 100%;
    height: 100%;
  }

  .carousel {
    height: 100%;
    border-radius: var(--border-radius);
    overflow: hidden;
  }

  .carousel-inner {
    height: 100%;
    border-radius: var(--border-radius);
  }

  .carousel-item {
    height: 100%;
  }

  .hero-slide {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    border-radius: var(--border-radius);
    overflow: hidden;
    transition: all 0.3s ease;
  }

  .hero-slide-link {
    display: block;
    width: 100%;
    height: 100%;
    text-decoration: none;
    color: inherit;
  }

  .hero-slide-content {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
    padding: 2rem 1.5rem 1.5rem;
    color: var(--white);
  }

  .hero-category-badge {
    background-color: var(--primary-color);
    color: var(--white);
    padding: 0.5rem 1rem;
    border-radius: var(--border-radius);
    font-size: 0.9rem;
    font-weight: 600;
    display: inline-block;
    margin-bottom: 0.5rem;
  }

  .hero-slide-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .hero-slide:hover .hero-slide-overlay {
    opacity: 1;
  }

  .hero-slide-overlay-content {
    text-align: center;
    color: var(--white);
  }

  .hero-slide-title {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 1rem;
  }

  .hero-slide-button {
    background-color: var(--white);
    color: var(--primary-color);
    padding: 0.75rem 1.5rem;
    border-radius: var(--border-radius);
    font-weight: 600;
    text-decoration: none;
    display: inline-block;
    transition: all 0.2s ease;
  }

  .hero-slide-button:hover {
    background-color: var(--primary-color);
    color: var(--white);
    text-decoration: none;
  }

  .carousel-indicators {
    bottom: 1rem;
    margin-bottom: 0;
  }

  .carousel-indicators [data-bs-target] {
    width: 8px;
    height: 8px;
    border-radius: var(--border-radius);
    background-color: rgba(255, 255, 255, 0.5);
    border: none;
    margin: 0 0.25rem;
    transition: all 0.2s ease;
  }

  .carousel-indicators .active {
    background-color: var(--white);
    transform: scale(1.2);
  }

  .hero-loading {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    flex-direction: column;
    gap: 1rem;
    color: var(--text-color-medium);
  }

  .hero-error {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    flex-direction: column;
    text-align: center;
    color: var(--text-color-medium);
  }

  @media (max-width: 767.98px) {
    .hero-carousel-wrapper {
      height: 300px;
    }
    
    .hero-slide-content {
      padding: 1.5rem 1rem 1rem;
    }
    
    .hero-category-badge {
      font-size: 0.8rem;
      padding: 0.4rem 0.8rem;
    }
    
    .hero-slide-title {
      font-size: 1.25rem;
    }
    
    .hero-slide-button {
      padding: 0.6rem 1.2rem;
      font-size: 0.9rem;
    }
  }

  @media (max-width: 480px) {
    .hero-carousel-wrapper {
      height: 250px;
    }
    
    .hero-slide-content {
      padding: 1rem 0.75rem 0.75rem;
    }
    
    .hero-slide-title {
      font-size: 1.1rem;
    }
  }
`,Sr=()=>{const r=Te(),{isLoading:t,error:s}=ze(),o=(r==null?void 0:r.filter(a=>{var d;const n=((d=a.show_in_banner)==null?void 0:d.toString().toLowerCase())==="yes";return a.banner_image&&a.banner_image.trim(),n}))||[];return t?e.jsxs(e.Fragment,{children:[e.jsx("style",{dangerouslySetInnerHTML:{__html:te}}),e.jsx("div",{className:"hero-carousel-wrapper",children:e.jsxs("div",{className:"hero-loading",children:[e.jsx(K,{animation:"border",variant:"primary"}),e.jsx("span",{children:"Loading banners..."})]})})]}):s||o.length===0?e.jsxs(e.Fragment,{children:[e.jsx("style",{dangerouslySetInnerHTML:{__html:te}}),e.jsx("div",{className:"hero-carousel-wrapper",children:e.jsxs("div",{className:"hero-error",children:[e.jsx("h5",{children:"No banners configured"}),e.jsx("p",{children:"Contact admin to set up category banners"})]})})]}):e.jsxs(e.Fragment,{children:[e.jsx("style",{dangerouslySetInnerHTML:{__html:te}}),e.jsx("div",{className:"hero-carousel-wrapper",children:e.jsx("div",{className:"hero-carousel-container",children:e.jsx(Se,{interval:4e3,fade:!0,pause:"hover",controls:!1,indicators:!0,"aria-label":"Product category banners",children:o.map(a=>{const n=a.banner_image?dr.img(a.banner_image):null;return e.jsx(Se.Item,{children:e.jsx(E,{to:`/products?category=${a.id}`,className:"hero-slide-link","aria-label":`Shop ${a.category} products`,children:e.jsxs("div",{className:"hero-slide",style:{background:n?`linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.3)), url(${n})`:"linear-gradient(135deg, var(--primary-color) 0%, var(--primary-color-dark) 100%)",backgroundSize:"cover",backgroundPosition:"center",backgroundRepeat:"no-repeat"},children:[e.jsx("div",{className:"hero-slide-content",children:e.jsx("span",{className:"hero-category-badge",children:a.category})}),e.jsx("div",{className:"hero-slide-overlay",children:e.jsxs("div",{className:"hero-slide-overlay-content",children:[e.jsxs("h3",{className:"hero-slide-title",children:["Shop ",a.category]}),e.jsx("span",{className:"hero-slide-button",children:"Explore Collection →"})]})})]})})},a.id)})})})})]})},_r=`
  .hero-section {
    margin: 2rem 0;
    padding: 0;
  }

  .hero-row {
    display: flex;
    gap: 1rem;
    align-items: stretch;
  }

  .hero-categories-col {
    flex: 0 0 280px;
    min-height: 400px;
  }

  .hero-carousel-col {
    flex: 1;
    min-height: 400px;
  }

  @media (max-width: 991.98px) {
    .hero-categories-col {
      display: none;
    }
    
    .hero-row {
      gap: 0;
    }
  }

  @media (max-width: 767.98px) {
    .hero-section {
      margin: 1rem 0;
    }
  }
`,Tr=()=>e.jsxs(e.Fragment,{children:[e.jsx("style",{dangerouslySetInnerHTML:{__html:_r}}),e.jsx("section",{className:"hero-section",children:e.jsxs("div",{className:"hero-row",children:[e.jsx("div",{className:"hero-categories-col",children:e.jsx(kr,{})}),e.jsx("div",{className:"hero-carousel-col",children:e.jsx(Sr,{})})]})})]}),zr=`
  .countdown-timer {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-weight: 500;
    color: var(--text-color-medium);
    font-size: 0.9rem;
  }

  .countdown-label {
    color: var(--text-color-medium);
  }

  .countdown-time-group {
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }

  .countdown-time-box {
    background-color: var(--primary-color);
    color: var(--white);
    font-weight: 600;
    padding: 0.25rem 0.5rem;
    border-radius: var(--border-radius);
    font-size: 0.85rem;
    line-height: 1;
    min-width: 28px;
    text-align: center;
  }

  .countdown-separator {
    color: var(--text-color-medium);
    font-weight: 600;
    margin: 0 0.125rem;
  }

  @media (max-width: 767.98px) {
    .countdown-timer {
      font-size: 0.8rem;
      gap: 0.375rem;
    }
    
    .countdown-time-box {
      padding: 0.2rem 0.4rem;
      font-size: 0.75rem;
      min-width: 24px;
    }
    
    .countdown-label {
      font-size: 0.8rem;
    }
  }

  @media (max-width: 480px) {
    .countdown-timer {
      font-size: 0.75rem;
      gap: 0.25rem;
    }
    
    .countdown-time-box {
      padding: 0.15rem 0.3rem;
      font-size: 0.7rem;
      min-width: 20px;
    }
  }
`,Ir=({targetDate:r})=>{const t=()=>{const n=+r-+new Date;let d={hours:0,minutes:0,seconds:0};return n>0&&(d={hours:Math.floor(n/36e5%24),minutes:Math.floor(n/1e3/60%60),seconds:Math.floor(n/1e3%60)}),d},[s,o]=l.useState(t());l.useEffect(()=>{const n=setInterval(()=>{o(t())},1e3);return()=>clearInterval(n)},[r]);const a=n=>n.toString().padStart(2,"0");return e.jsxs(e.Fragment,{children:[e.jsx("style",{dangerouslySetInnerHTML:{__html:zr}}),e.jsxs("div",{className:"countdown-timer",children:[e.jsx("span",{className:"countdown-label",children:"Ending in:"}),e.jsxs("div",{className:"countdown-time-group",children:[e.jsx("div",{className:"countdown-time-box",children:a(s.hours)}),e.jsx("span",{className:"countdown-separator",children:":"}),e.jsx("div",{className:"countdown-time-box",children:a(s.minutes)}),e.jsx("span",{className:"countdown-separator",children:":"}),e.jsx("div",{className:"countdown-time-box",children:a(s.seconds)})]})]})]})},Lr=`
  .pc2-card-container {
    background-color: var(--white);
    border-radius: var(--border-radius);
    overflow: hidden;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    transition: all 0.2s ease;
    cursor: pointer;
    border: 1px solid var(--border-color-light);
    position: relative;
  }

  .pc2-card-container:hover {
    border-color: var(--primary-color);
  }

  .pc2-link-wrapper {
    display: block;
    color: inherit;
    text-decoration: none;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
  }

  .pc2-image-wrapper {
    position: relative;
    width: 100%;
    aspect-ratio: 1;
    overflow: hidden;
    background: var(--background-light);
  }

  .pc2-product-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: opacity 0.3s ease;
  }

  .pc2-product-image.pc2-loading {
    opacity: 0;
  }

  .pc2-product-image.pc2-loaded {
    opacity: 1;
  }

  .pc2-shimmer-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      var(--background-light) 0%,
      var(--border-color-light) 50%,
      var(--background-light) 100%
    );
    background-size: 200% 100%;
    animation: pc2-shimmer 1.5s infinite;
    z-index: 1;
  }

  @keyframes pc2-shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }

  .pc2-discount-badge {
    position: absolute;
    top: 6px;
    left: 6px;
    background: var(--accent-color);
    color: var(--white);
    padding: 2px 6px;
    border-radius: var(--border-radius);
    font-size: 10px;
    font-weight: 600;
    z-index: 3;
    line-height: 1;
  }

  .pc2-wishlist-button {
    position: absolute;
    top: 6px;
    right: 6px;
    width: 28px;
    height: 28px;
    background-color: var(--white);
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    color: var(--text-color-medium);
    cursor: pointer;
    transition: all 0.2s ease;
    z-index: 3;
  }

  .pc2-wishlist-button:hover {
    background-color: var(--primary-color);
    color: var(--white);
    border-color: var(--primary-color);
  }

  .pc2-wishlist-button.pc2-active {
    background-color: var(--primary-color);
    color: var(--white);
    border-color: var(--primary-color);
  }

  .pc2-wishlist-button.pc2-loading {
    opacity: 0.7;
    cursor: not-allowed;
    animation: pc2-pulse 1.5s infinite;
  }

  .pc2-wishlist-button.pc2-loading:hover {
    background-color: var(--white);
    color: var(--text-color-medium);
    border-color: var(--border-color);
  }

  @keyframes pc2-pulse {
    0%, 100% { opacity: 0.7; }
    50% { opacity: 1; }
  }

  .pc2-content-area {
    padding: 10px;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .pc2-product-title {
    font-size: 12px;
    font-weight: 500;
    color: var(--text-color-dark);
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

  .pc2-pricing-section {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .pc2-current-price {
    font-size: 13px;
    font-weight: 600;
    color: var(--primary-color);
    margin: 0;
    line-height: 1.2;
  }

  .pc2-original-price {
    font-size: 11px;
    color: var(--text-color-light);
    text-decoration: line-through;
    margin: 0;
    line-height: 1.2;
  }

  .pc2-rating-section {
    display: flex;
    align-items: center;
    gap: 4px;
    margin-top: 4px;
  }

  .pc2-star-rating {
    display: flex;
    gap: 1px;
  }

  .pc2-rating-star {
    font-size: 10px;
    color: var(--warning-color);
  }

  .pc2-rating-star.pc2-empty {
    color: var(--border-color);
  }

  .pc2-review-count {
    font-size: 10px;
    color: var(--text-color-medium);
    font-weight: 500;
  }

  /* Responsive Design */
  @media (max-width: 1199.98px) {
    .pc2-content-area {
      padding: 9px;
      gap: 5px;
    }
    
    .pc2-product-title {
      font-size: 11px;
    }
    
    .pc2-current-price {
      font-size: 12px;
    }
  }

  @media (max-width: 991.98px) {
    .pc2-content-area {
      padding: 8px;
      gap: 4px;
    }
    
    .pc2-product-title {
      font-size: 11px;
      height: 2.4em;
    }
    
    .pc2-current-price {
      font-size: 12px;
    }
    
    .pc2-original-price {
      font-size: 10px;
    }
    
    .pc2-discount-badge {
      font-size: 9px;
      padding: 2px 4px;
    }
    
    .pc2-wishlist-button {
      width: 24px;
      height: 24px;
      font-size: 11px;
    }
  }

  @media (max-width: 767.98px) {
    .pc2-content-area {
      padding: 7px;
      gap: 4px;
    }
    
    .pc2-product-title {
      font-size: 10px;
      height: 2.2em;
    }
    
    .pc2-current-price {
      font-size: 11px;
    }
    
    .pc2-original-price {
      font-size: 9px;
    }
    
    .pc2-star-rating {
      gap: 0;
    }
    
    .pc2-rating-star {
      font-size: 9px;
    }
    
    .pc2-review-count {
      font-size: 9px;
    }
    
    .pc2-discount-badge {
      top: 4px;
      left: 4px;
      font-size: 8px;
      padding: 1px 3px;
    }
    
    .pc2-wishlist-button {
      top: 4px;
      right: 4px;
      width: 22px;
      height: 22px;
      font-size: 10px;
    }
  }

  @media (max-width: 480px) {
    .pc2-content-area {
      padding: 6px;
      gap: 3px;
    }
    
    .pc2-product-title {
      font-size: 9px;
      height: 2em;
    }
    
    .pc2-current-price {
      font-size: 10px;
    }
    
    .pc2-original-price {
      font-size: 8px;
    }
  }
`,Cr=({product:r,className:t="",showStock:s=!1})=>{const o=er(),[a,n]=l.useState(!1),[d,u]=l.useState(!1),m=V(h=>{var M;const B=h.wishlist.items.some(O=>O.product_id===r.id),H=(((M=h.manifest.data)==null?void 0:M.wishlist)||[]).some(O=>O.product_id===r.id||O.id===r.id);return B||H}),g=V(h=>rr(h)),x=V(h=>tr(h)),y=V(h=>ir(h)),v=Ie(r.price_2,r.price_1),w=parseFloat(r.price_1),b=parseFloat(r.price_2);l.useEffect(()=>{y&&x&&(x.wishlist&&x.wishlist.length>0?o(nr(x.wishlist)):x.wishlist||o(ar()))},[o,y,x]);const W=()=>n(!0),F=h=>{h.currentTarget.src="/media/svg/files/blank-image.svg",h.currentTarget.onerror=null},T=async h=>{if(h.preventDefault(),h.stopPropagation(),!g)try{m?await o(sr(r.id)).unwrap():(await o(or(r.id)).unwrap(),u(!0),setTimeout(()=>u(!1),400))}catch(z){console.error("Wishlist action failed:",z)}};let I;return r&&"getMainImage"in r&&typeof r.getMainImage=="function"?I=r.getMainImage():I=ae(r),e.jsxs(e.Fragment,{children:[e.jsx("style",{dangerouslySetInnerHTML:{__html:Lr}}),e.jsx("div",{className:`pc2-card-container ${t}`,children:e.jsxs(E,{to:Le(r.id),className:"pc2-link-wrapper",children:[e.jsxs("div",{className:"pc2-image-wrapper",children:[!a&&e.jsx("div",{className:"pc2-shimmer-overlay"}),e.jsx("img",{src:I,alt:r.name,className:`pc2-product-image ${a?"pc2-loaded":"pc2-loading"}`,onLoad:W,onError:F}),v>0&&e.jsxs("div",{className:"pc2-discount-badge",children:["-",v,"%"]}),e.jsx("button",{className:`pc2-wishlist-button ${m?"pc2-active":""} ${g?"pc2-loading":""} ${d?"pc2-success-animation":""}`,onClick:T,disabled:g,title:m?"Remove from wishlist":"Add to wishlist",children:e.jsx("i",{className:`bi ${m?"bi-heart-fill":"bi-heart"}`})})]}),e.jsxs("div",{className:"pc2-content-area",children:[e.jsx("h3",{className:"pc2-product-title",children:r.name}),e.jsxs("div",{className:"pc2-pricing-section",children:[e.jsxs("div",{className:"pc2-current-price",children:["UGX ",w.toLocaleString()]}),b>w&&e.jsxs("div",{className:"pc2-original-price",children:["UGX ",b.toLocaleString()]})]}),r.rating&&e.jsxs("div",{className:"pc2-rating-section",children:[e.jsx("div",{className:"pc2-star-rating",children:[1,2,3,4,5].map(h=>e.jsx("i",{className:`pc2-rating-star ${h<=(r.rating||0)?"bi-star-fill":"bi-star pc2-empty"}`},h))}),r.reviewCount&&e.jsxs("span",{className:"pc2-review-count",children:["(",r.reviewCount,")"]})]})]})]})})]})},Er=`
  .deals-section-wrapper {
    background: var(--white);
    border-radius: var(--border-radius);
    margin: 2rem 0;
    padding: 1.5rem;
    border: 1px solid var(--border-color-light);
  }

  .deals-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
    flex-wrap: wrap;
    gap: 1rem;
  }

  .deals-title {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .deals-title i {
    font-size: 1.25rem;
    color: var(--accent-color);
  }

  .deals-title h2 {
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--text-color-dark);
    margin: 0;
  }

  .view-all-link {
    color: var(--primary-color);
    text-decoration: none;
    font-weight: 500;
    font-size: 0.9rem;
    transition: color 0.2s;
  }

  .view-all-link:hover {
    color: var(--primary-color-dark);
    text-decoration: none;
  }

  .deals-carousel-controls {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    position: relative;
    width: 100%;
  }

  .carousel-control-btn {
    background: var(--background-light);
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius);
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s;
    z-index: 3;
    flex-shrink: 0;
  }

  .carousel-control-btn:hover:not(:disabled) {
    background: var(--primary-color);
    color: var(--white);
    border-color: var(--primary-color);
  }

  .carousel-control-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    background: var(--background-light);
  }

  .carousel-control-btn i {
    font-size: 0.9rem;
  }

  .deals-container {
    flex: 1;
    display: flex;
    gap: 0.75rem;
    overflow-x: auto;
    scroll-behavior: smooth;
    scrollbar-width: none;
    -ms-overflow-style: none;
    padding: 0.5rem 0;
    margin: 0 0.5rem;
  }

  .deals-container::-webkit-scrollbar {
    display: none;
  }

  .deals-container .pc2-card-container {
    min-width: 180px;
    max-width: 180px;
    flex-shrink: 0;
  }

  .deals-loading-container {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2rem;
    flex: 1;
  }

  .deals-error-container {
    padding: 1rem;
    text-align: center;
    flex: 1;
  }

  .deals-no-products {
    text-align: center;
    padding: 2rem;
    color: var(--text-color-medium);
    flex: 1;
  }

  @media (max-width: 1199.98px) {
    .deals-container .pc2-card-container {
      min-width: 170px;
      max-width: 170px;
    }
  }

  @media (max-width: 991.98px) {
    .deals-container .pc2-card-container {
      min-width: 160px;
      max-width: 160px;
    }
  }

  @media (max-width: 767.98px) {
    .deals-section-wrapper {
      margin: 1rem 0;
      padding: 1rem;
    }
    
    .deals-header {
      flex-direction: column;
      align-items: flex-start;
      gap: 1rem;
      margin-bottom: 1rem;
    }
    
    .deals-title h2 {
      font-size: 1.1rem;
    }
    
    .carousel-control-btn {
      display: none;
    }
    
    .deals-carousel-controls {
      gap: 0;
    }
    
    .deals-container {
      margin: 0;
      gap: 0.5rem;
    }
    
    .deals-container .pc2-card-container {
      min-width: 140px;
      max-width: 140px;
    }
  }

  @media (max-width: 480px) {
    .deals-container .pc2-card-container {
      min-width: 130px;
      max-width: 130px;
    }
  }
`,Mr=()=>{const r=new Date;r.setHours(r.getHours()+24);const t=l.useRef(null),{data:s,isLoading:o,error:a}=G({page:2,limit:12,sort_by:"created_at",sort_order:"desc"}),n=(s==null?void 0:s.data)||[],d=()=>{t.current&&t.current.scrollBy({left:-948,behavior:"smooth"})},u=()=>{t.current&&t.current.scrollBy({left:948,behavior:"smooth"})};return e.jsxs(e.Fragment,{children:[e.jsx("style",{dangerouslySetInnerHTML:{__html:Er}}),e.jsxs("section",{className:"deals-section-wrapper",children:[e.jsxs("div",{className:"deals-header",children:[e.jsxs("div",{className:"deals-title",children:[e.jsx("i",{className:"bi bi-lightning-charge-fill"}),e.jsx("h2",{children:"Flash Deals"})]}),e.jsx(Ir,{targetDate:r}),e.jsx(E,{to:"/products?deals=true",className:"view-all-link",children:"View All →"})]}),e.jsxs("div",{className:"deals-carousel-controls",children:[e.jsx("button",{className:"carousel-control-btn prev",onClick:d,disabled:o||!!a,children:e.jsx("i",{className:"bi bi-chevron-left"})}),e.jsxs("div",{className:"deals-container",ref:t,children:[o&&e.jsx("div",{className:"deals-loading-container",children:e.jsx(K,{animation:"border",variant:"primary"})}),a&&e.jsx("div",{className:"deals-error-container",children:e.jsxs(q,{variant:"danger",className:"mb-0",children:[e.jsx("i",{className:"bi bi-exclamation-triangle me-2"}),"Error loading flash deals. Please try again later."]})}),!o&&!a&&n.length===0&&e.jsxs("div",{className:"deals-no-products",children:[e.jsx("i",{className:"bi bi-box-seam mb-3",style:{fontSize:"3rem",color:"var(--text-color-light)"}}),e.jsx("p",{children:"No flash deals available at the moment."})]}),!o&&!a&&n.length>0&&n.map(m=>e.jsx(Cr,{product:m},m.id))]}),e.jsx("button",{className:"carousel-control-btn next",onClick:u,disabled:o||!!a,children:e.jsx("i",{className:"bi bi-chevron-right"})})]})]})]})},Or=({card:r})=>e.jsxs("div",{className:"superbuyer-feature-card",children:[e.jsx("h3",{className:"superbuyer-card-title",children:r.title}),e.jsx("div",{className:"superbuyer-mini-products",children:r.products.map(t=>e.jsxs("a",{href:`/product/${t.id}`,className:"superbuyer-mini-product-item",children:[e.jsx("div",{className:"mini-product-image-wrapper",children:e.jsx("img",{src:t.image,alt:`Product ${t.id}`,className:"mini-product-image",onError:s=>{s.currentTarget.src="/media/svg/files/blank-image.svg",s.currentTarget.onerror=null}})}),e.jsxs("div",{className:"mini-product-pricing",children:[e.jsxs("span",{className:"mini-product-price-new",children:["UGX ",t.price_new]}),t.price_old&&e.jsxs("span",{className:"mini-product-price-old",children:["UGX ",t.price_old]})]}),t.badge&&e.jsx("span",{className:"mini-product-badge",children:t.badge})]},t.id))})]}),$r=`
  .superbuyer-section-wrapper {
    background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-color-dark) 100%);
    border-radius: var(--border-radius);
    margin: 2rem 0;
    padding: 2rem 0;
    position: relative;
    overflow: hidden;
    background-image: url("https://ae-pic-a1.aliexpress-media.com/kf/Sd4b8b26b77d94bd891e89a8665e4b5e47/2424x917.png");
    background-size: cover;
    background-position: center;
  }

  .superbuyer-background-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.1);
    z-index: 1;
  }

  .superbuyer-content-container {
    position: relative;
    z-index: 2;
  }

  .superbuyer-banner-content-area {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
    flex-wrap: wrap;
    gap: 2rem;
  }

  .superbuyer-banner-left {
    flex: 1;
    min-width: 300px;
  }

  .superbuyer-title {
    font-size: 2.5rem;
    font-weight: 700;
    color: var(--white);
    margin-bottom: 1rem;
  }

  .superbuyer-features {
    display: flex;
    gap: 1.5rem;
    flex-wrap: wrap;
    margin-bottom: 1.5rem;
  }

  .superbuyer-features span {
    color: var(--white);
    font-size: 0.9rem;
    display: flex;
    align-items: center;
    opacity: 0.9;
  }

  .superbuyer-shop-now-btn {
    background: var(--white) !important;
    color: var(--primary-color) !important;
    border: none !important;
    padding: 0.75rem 2rem !important;
    font-weight: 600 !important;
    border-radius: var(--border-radius) !important;
  }

  .superbuyer-shop-now-btn:hover {
    background: var(--background-light) !important;
    color: var(--primary-color) !important;
  }

  .superbuyer-stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 1.5rem;
    flex: 1;
    min-width: 300px;
  }

  .superbuyer-stat-item {
    text-align: center;
    color: var(--white);
  }

  .superbuyer-stat-number {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
    color: var(--white);
  }

  .superbuyer-stat-text {
    font-size: 0.85rem;
    opacity: 0.9;
    margin-bottom: 0;
  }

  .superbuyer-stat-icon {
    font-size: 1.5rem;
    margin-top: 0.5rem;
    opacity: 0.7;
  }

  .superbuyer-feature-cards-grid {
    margin-top: 2rem;
  }

  /* Loading overlay styles */
  .superbuyer-loading-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(243, 61, 2, 0.9);
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 1rem;
  }

  .superbuyer-loading-spinner {
    width: 50px;
    height: 50px;
    border: 3px solid rgba(255, 255, 255, 0.3);
    border-top: 3px solid white;
    border-radius: 50%;
    animation: superbuyer-spin 1s linear infinite;
  }

  @keyframes superbuyer-spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  .superbuyer-loading-text {
    color: white;
    font-size: 1.1rem;
    font-weight: 500;
    text-align: center;
  }

  .superbuyer-section-skeleton {
    opacity: 0.6;
  }

  .superbuyer-skeleton-pulse {
    animation: superbuyer-pulse 1.5s ease-in-out infinite alternate;
  }

  @keyframes superbuyer-pulse {
    from { opacity: 0.6; }
    to { opacity: 1; }
  }

  /* SuperBuyerFeatureCard styles */
  .superbuyer-feature-card {
    background: var(--white);
    border-radius: var(--border-radius);
    padding: 1.5rem;
    height: 100%;
    border: 1px solid rgba(255, 255, 255, 0.2);
    transition: all 0.3s ease;
  }

  .superbuyer-feature-card:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
  }

  .superbuyer-card-title {
    font-size: 1.1rem;
    font-weight: 600;
    color: var(--text-color-dark);
    margin-bottom: 1rem;
    text-align: center;
  }

  .superbuyer-mini-products {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .superbuyer-mini-product-item {
    display: flex;
    align-items: center;
    gap: 1rem;
    text-decoration: none;
    color: inherit;
    padding: 0.75rem;
    border-radius: var(--border-radius);
    transition: background-color 0.2s ease;
  }

  .superbuyer-mini-product-item:hover {
    background-color: var(--background-light);
    color: inherit;
    text-decoration: none;
  }

  .mini-product-image-wrapper {
    width: 60px;
    height: 60px;
    border-radius: var(--border-radius);
    overflow: hidden;
    flex-shrink: 0;
  }

  .mini-product-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .mini-product-pricing {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .mini-product-price-new {
    font-weight: 600;
    color: var(--primary-color);
    font-size: 0.9rem;
  }

  .mini-product-price-old {
    font-size: 0.8rem;
    color: var(--text-color-muted);
    text-decoration: line-through;
  }

  .mini-product-badge {
    font-size: 0.75rem;
    color: var(--accent-color);
    font-weight: 500;
    background: var(--accent-color-light);
    padding: 0.25rem 0.5rem;
    border-radius: var(--border-radius);
    white-space: nowrap;
  }

  /* Hide on mobile devices */
  @media (max-width: 767.98px) {
    .superbuyer-section-wrapper {
      display: none;
    }
  }

  @media (max-width: 991.98px) {
    .superbuyer-banner-content-area {
      flex-direction: column;
      text-align: center;
    }
    
    .superbuyer-title {
      font-size: 2rem;
    }
    
    .superbuyer-stats {
      grid-template-columns: repeat(2, 1fr);
    }
  }
`,Pr=()=>{const[r,t]=l.useState([]),[s,o]=l.useState(!1),{data:a,isLoading:n,error:d}=G({page:1,limit:6,sort_by:"created_at",sort_order:"desc"}),u=(a==null?void 0:a.data)||[];return l.useEffect(()=>{if(u.length>0){const m=[];for(let g=0;g<3&&g*2<u.length;g++){const x=g*2,y=u.slice(x,x+2),v=["Bulk Saver Hub","Fast Delivery","Popular Picks"],w=["Bulk deals","Ships in 2 days","Popular picks"];m.push({id:g+1,title:v[g],products:y.map(b=>({id:b.id,image:ae(b),price_new:`UGX ${parseInt(b.price_1||"0").toLocaleString()}`,price_old:b.price_2&&b.price_2!==b.price_1?`UGX ${parseInt(b.price_2).toLocaleString()}`:void 0,badge:w[g]}))})}t(m),o(!0)}else!n&&d&&o(!0)},[u,n,d]),e.jsxs(e.Fragment,{children:[e.jsx("style",{dangerouslySetInnerHTML:{__html:$r}}),e.jsxs("section",{className:"superbuyer-section-wrapper mt-4 mb-4",children:[e.jsx("div",{className:"superbuyer-background-overlay"}),(n||!s)&&e.jsxs("div",{className:"superbuyer-loading-overlay",children:[e.jsx("div",{className:"superbuyer-loading-spinner"}),e.jsx("div",{className:"superbuyer-loading-text",children:"Loading SuperBuyer deals..."})]}),e.jsxs(Ce,{className:`superbuyer-content-container ${n||!s?"superbuyer-section-skeleton":""}`,children:[e.jsxs("div",{className:`superbuyer-banner-content-area ${n||!s?"superbuyer-skeleton-pulse":""}`,children:[e.jsxs("div",{className:"superbuyer-banner-left",children:[e.jsx("h1",{className:"superbuyer-title mb-0",children:"SuperBuyer"}),e.jsxs("div",{className:"superbuyer-features mt-4",children:[e.jsxs("span",{children:[e.jsx("i",{className:"bi bi-wallet-fill me-2"}),"Tax exemptions"]}),e.jsxs("span",{children:[e.jsx("i",{className:"bi bi-truck me-2"}),"Express payment"]}),e.jsxs("span",{children:[e.jsx("i",{className:"bi bi-currency-dollar me-2"}),"Financial support"]})]}),e.jsx(br,{variant:"light",className:"superbuyer-shop-now-btn mt-5",disabled:n||!s,children:"Shop now"})]}),e.jsxs("div",{className:"superbuyer-stats",children:[e.jsxs("div",{className:"superbuyer-stat-item",children:[e.jsx("h2",{className:"superbuyer-stat-number",children:"5M+"}),e.jsx("p",{className:"superbuyer-stat-text",children:"Factory direct supply"}),e.jsx("i",{className:"bi bi-building superbuyer-stat-icon"})]}),e.jsxs("div",{className:"superbuyer-stat-item",children:[e.jsx("h2",{className:"superbuyer-stat-number",children:"20M+"}),e.jsx("p",{className:"superbuyer-stat-text",children:"Value dropshipping items"}),e.jsx("i",{className:"bi bi-box-seam superbuyer-stat-icon"})]}),e.jsxs("div",{className:"superbuyer-stat-item",children:[e.jsx("h2",{className:"superbuyer-stat-number",children:"10"}),e.jsx("p",{className:"superbuyer-stat-text",children:"Local warehouses worldwide"}),e.jsx("i",{className:"bi bi-globe superbuyer-stat-icon"})]}),e.jsxs("div",{className:"superbuyer-stat-item",children:[e.jsx("h2",{className:"superbuyer-stat-number",children:"24H"}),e.jsx("p",{className:"superbuyer-stat-text",children:"Personalized sourcing service"}),e.jsx("i",{className:"bi bi-clock-history superbuyer-stat-icon"})]})]})]}),e.jsx(fr,{className:`superbuyer-feature-cards-grid gx-3 ${n||!s?"superbuyer-skeleton-pulse":""}`,children:s?r.length>0?r.map(m=>e.jsx(ee,{xs:12,md:4,className:"mb-3 mb-md-0",children:e.jsx(Or,{card:m})},m.id)):e.jsx(ee,{xs:12,children:e.jsxs("div",{className:"superbuyer-feature-card text-center py-4",children:[e.jsx("i",{className:"bi bi-box-seam text-muted mb-3",style:{fontSize:"2rem"}}),e.jsx("p",{className:"text-muted mb-0",children:"No featured products available at the moment."}),e.jsx("small",{className:"text-muted",children:"Check back later for new deals!"})]})}):[1,2,3].map(m=>e.jsx(ee,{xs:12,md:4,className:"mb-3 mb-md-0",children:e.jsx("div",{className:"superbuyer-feature-card",children:e.jsxs("div",{className:"placeholder-glow",children:[e.jsx("div",{className:"placeholder w-75 mb-3",style:{height:"20px"}}),e.jsx("div",{className:"placeholder w-100 mb-2",style:{height:"60px"}}),e.jsx("div",{className:"placeholder w-100 mb-2",style:{height:"60px"}})]})})},m))})]})]})]})};function Rr(r,t){return t={exports:{}},r(t,t.exports),t.exports}var _e=Rr(function(r){/*!
  Copyright (c) 2018 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/(function(){var t={}.hasOwnProperty;function s(){for(var o=[],a=0;a<arguments.length;a++){var n=arguments[a];if(n){var d=typeof n;if(d==="string"||d==="number")o.push(n);else if(Array.isArray(n)){if(n.length){var u=s.apply(null,n);u&&o.push(u)}}else if(d==="object")if(n.toString===Object.prototype.toString)for(var m in n)t.call(n,m)&&n[m]&&o.push(m);else o.push(n.toString())}}return o.join(" ")}r.exports?(s.default=s,r.exports=s):window.classNames=s})()});function k(r,t){t===void 0&&(t={});var s=t.insertAt;if(!(!r||typeof document>"u")){var o=document.head||document.getElementsByTagName("head")[0],a=document.createElement("style");a.type="text/css",s==="top"&&o.firstChild?o.insertBefore(a,o.firstChild):o.appendChild(a),a.styleSheet?a.styleSheet.cssText=r:a.appendChild(document.createTextNode(r))}}var Fr=`.shimmer-button {
  border-radius: 4px;
  height: 38px;
  width: 120px;
  margin-bottom: 20px; }
  .shimmer-button--sm {
    border-radius: 3px;
    height: 31px;
    width: 100px; }
  .shimmer-button--lg {
    height: 48px;
    width: 140px;
    border-radius: 5px; }
`;k(Fr);var Hr=function(r,t,s){return t in r?Object.defineProperty(r,t,{value:s,enumerable:!0,configurable:!0,writable:!0}):r[t]=s,r};i.oneOf(["lg","md","sm"]);i.number,i.bool,i.string;var se=function(t){var s=t.height,o=t.width,a=t.center,n=t.className,d=t.fitOnFrame,u=t.rounded,m={};return s&&(m.height=s+"px"),o&&(m.width=o+"px"),we.createElement("div",{className:_e({"h-100":d,"text-center ":a})},we.createElement("div",{className:_e(Hr({"h-100":d,"shimmer shimmer-thumbnail":!0,"border-rounded":u},n,n)),style:m}))};se.propTypes={height:i.number,width:i.number,center:i.bool,className:i.string,fitOnFrame:i.bool,rounded:i.bool};se.defaultProps={canter:!1,fitOnFrame:!1,rounded:!1,height:250};var Dr=`.shimmer-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-bottom: 20px;
  display: inline-block; }

.shimmer-thumbnail {
  min-width: 80px;
  width: 100%;
  height: 200px;
  margin-bottom: 20px;
  display: inline-block; }
`;k(Dr);var Ar=`.shimmer-title {
  margin-bottom: 20px; }
  .shimmer-title--secondary {
    margin-bottom: 20px; }
    .shimmer-title--secondary .shimmer-title-line {
      height: 16px; }
  .shimmer-title-line {
    width: 100%;
    height: 24px;
    border-radius: 20px; }
    .shimmer-title-line:first-child {
      width: 100% !important; }
    .shimmer-title-line:last-child {
      width: 40%; }
`;k(Ar);i.number,i.oneOf([10,15,20,30]),i.oneOf(["primary","secondary"]),i.string;var Wr=`.shimmer-card {
  border-radius: 8px;
  box-shadow: 0 0px 10px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
  width: 100%; }
  .shimmer-card:not(:first-child) {
    margin-top: 30px; }
  .shimmer-card--content-center {
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center; }
    .shimmer-card--content-center * {
      width: 100%;
      margin: auto; }
`;k(Wr);i.string,i.oneOfType([i.element,i.array]).isRequired,i.oneOf([!1,20,30]);i.number,i.oneOf([2,3,4]),i.oneOf([20,30]),i.bool,i.oneOf(["thumbnail","circular"]),i.number,i.bool,i.bool;var Br=`.shimmer-gallery-puzzle {
  height: 540px; }

.circular-image-caption .shimmer-title-line {
  margin: auto; }
`;k(Br);i.number,i.oneOf([2,3,4]),i.oneOf([20,30]),i.bool,i.number;i.number.isRequired,i.bool;var Ur=`.shimmer-table-row {
  box-shadow: 0 0px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  padding: 25px 0;
  background-color: #ffffff;
  border-radius: 5px;
  margin-bottom: 20px; }
  .shimmer-table-row--header {
    background-color: transparent;
    box-shadow: none;
    margin: 0; }
  .shimmer-table-row > .shimmer {
    margin: 0 30px; }

.shimmer-table-col {
  width: 100%;
  height: 10px;
  border-radius: 10px; }
`;k(Ur);i.number,i.number;var Yr=`.shimmer-badge {
  width: 80px;
  height: 24px;
  border-radius: 20px;
  margin-bottom: 20px; }
`;k(Yr);i.number;var Xr=`.shimmer-text {
  margin-bottom: 30px; }
  .shimmer-text-line {
    width: 100%;
    height: 8px;
    border-radius: 10px; }
    .shimmer-text-line:first-child {
      width: 100% !important; }
    .shimmer-text-line:last-child {
      width: 40%; }
`;k(Xr);i.number,i.oneOf([10,15,20,30]),i.string;var Vr=`.shimmer-separator {
  height: 1px;
  background-color: #dddddd;
  margin: 40px 0; }
`;k(Vr);i.oneOf(["text","image","both"]),i.bool;i.bool.isRequired,i.oneOf(["circular","thumbnail"]),i.number,i.number,i.bool,i.bool,i.bool,i.bool;i.bool,i.number,i.oneOf(["STYLE_ONE","STYLE_TWO","STYLE_THREE","STYLE_FOUR","STYLE_FIVE","STYLE_SIX","STYLE_SEVEN"]);i.oneOf(["SIMPLE","EDITOR"]),i.bool,i.bool;i.bool,i.bool,i.bool,i.oneOf(["circular","thumbnail"]),i.number,i.number;i.number,i.oneOf([2,3,4]),i.oneOf([20,30]),i.oneOf(["STYLE_ONE","STYLE_TWO","STYLE_THREE","STYLE_FOUR","STYLE_FIVE","STYLE_SIX","STYLE_SEVEN","STYLE_EIGHT"]);i.bool,i.bool,i.bool,i.bool,i.number,i.number,i.bool;i.bool,i.bool,i.bool;var Gr=`.shimmer {
  background: linear-gradient(to right, #f6f6f6 8%, #f0f0f0 18%, #f6f6f6 33%);
  background-size: 1000px 100%;
  animation: shimmer 2.2s linear infinite forwards; }

@-webkit-keyframes shimmer {
  0% {
    background-position: -100% 0; }
  100% {
    background-position: 100% 0; } }

@keyframes shimmer {
  0% {
    background-position: -1000px 0; }
  100% {
    background-position: 1000px 0; } }

/*
=====
Padding Styles
=====
*/
.p-30 {
  padding: 30px; }

.p-20 {
  padding: 20px; }

.p-15 {
  padding: 15px; }

/*
=====
Margin Styles
=====
*/
.m-0 {
  margin: 0; }

.m-auto {
  margin: auto; }

.ml-auto {
  margin-left: auto; }

.mr-auto {
  margin-right: auto; }

.m-15 {
  margin: 15px; }

.m-30 {
  margin: 30px; }

.mb-0 {
  margin-bottom: 0px; }

.mb-10 {
  margin-bottom: 10px; }

.mb-15 {
  margin-bottom: 15px; }

.mb-20 {
  margin-bottom: 20px; }

.mt-15 {
  margin-top: 15px; }

.mb-30 {
  margin-bottom: 30px; }

.mb-40 {
  margin-bottom: 40px; }

/*
=======
Content Size Styles
=======
*/
.w-10 {
  width: 10%; }

.w-20 {
  width: 20%; }

.w-30 {
  width: 30%; }

.w-40 {
  width: 40%; }

.w-50 {
  width: 50%; }

.w-60 {
  width: 60%; }

.w-70 {
  width: 70%; }

.w-80 {
  width: 80%; }

/*
========
Flex Styles
========
*/
.flex {
  display: flex; }

.flex-direction-column {
  flex-direction: column; }

.flex-horizontal-center {
  display: flex;
  flex-direction: column;
  align-items: center; }

.flex-vertical-center {
  align-items: center; }

.flex-content-between {
  justify-content: space-between; }

.flex-reverse {
  flex-direction: row-reverse; }

.flex-1 {
  flex-grow: 1; }

/*
=======
Grid Styles
=======
*/
.grid {
  display: grid; }

.grid-gap-10 {
  gap: 10px; }

.grid-gap-15 {
  gap: 15px; }

.grid-gap-20 {
  gap: 20px; }

.grid-gap-30 {
  gap: 30px; }

.grid-column-2 {
  grid-template-columns: auto auto; }

.grid-column-3 {
  grid-template-columns: auto auto auto; }

.grid-column-4 {
  grid-template-columns: auto auto auto auto; }

.text-center {
  text-align: center; }

.border-rounded {
  border-radius: 4px; }

.h-100 {
  height: 100% !important; }

.shimmer-hr {
  border-color: #f6f6f6; }

.shimmer-row {
  display: flex;
  margin: 0 -15px; }
  .shimmer-row .shimmer-col,
  .shimmer-row [class*="shimmer-col-"] {
    padding-left: 15px;
    padding-right: 15px;
    flex-basis: 0;
    flex-grow: 1;
    max-width: 100%; }
`;k(Gr);const qr=({product:r,className:t=""})=>{const[s,o]=l.useState(!1),a=Ie(r.price_2,r.price_1);parseFloat(r.price_1),parseFloat(r.price_2);const n=a>0;let d;r&&"getMainImage"in r&&typeof r.getMainImage=="function"?d=r.getMainImage():d=ae(r);const u=()=>o(!0),m=g=>{g.currentTarget.src="/media/svg/files/blank-image.svg",g.currentTarget.onerror=null,o(!0)};return e.jsxs(E,{to:Le(r.id),className:`product-card-simple ${t}`,children:[e.jsxs("div",{className:"product-image-container",children:[!s&&e.jsx("div",{className:"shimmer-container",children:e.jsx(se,{height:220,className:"shimmer-image"})}),e.jsx("img",{src:d,alt:r.name,className:`product-image ${s?"loaded":"loading"}`,onLoad:u,onError:m,loading:"lazy"}),n&&e.jsxs("div",{className:"discount-badge",children:["-",a,"%"]})]}),e.jsxs("div",{className:"product-info",children:[e.jsx("h3",{className:"product-name",children:r.name}),e.jsxs("div",{className:"price-section",children:[e.jsx("div",{className:"current-price",children:ke(r.price_1)}),n&&e.jsx("div",{className:"original-price",children:ke(r.price_2)})]})]})]})},Kr=`
  .top-products-section-wrapper {
    background: var(--white);
    border-radius: var(--border-radius);
    margin: 2rem 0;
    padding: 2rem;
    box-shadow: var(--shadow-sm);
    border: 1px solid var(--border-color-light);
  }

  .top-products-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
    flex-wrap: wrap;
    gap: 1rem;
  }

  .top-products-title {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--text-color-dark);
    margin: 0;
  }

  .view-all-top-products-link {
    color: var(--primary-color);
    text-decoration: none;
    font-weight: 500;
    font-size: 0.9rem;
    transition: color 0.2s;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .view-all-top-products-link:hover {
    color: var(--primary-color-dark);
    text-decoration: none;
  }

  .top-products-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1rem;
    margin-bottom: 2rem;
  }

  @media (max-width: 767.98px) {
    .top-products-grid {
      grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
      gap: 0.75rem;
    }
    
    .top-products-header {
      flex-direction: column;
      align-items: flex-start;
    }
  }

  @media (max-width: 575.98px) {
    .top-products-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
`,Qr=()=>{const{data:r,isLoading:t}=G({page:1,limit:12,sort_by:"created_at",sort_order:"desc"}),{data:s,isLoading:o}=G({page:2,limit:12,sort_by:"created_at",sort_order:"desc"}),a=t||o,n=(r==null?void 0:r.data)||[],d=(s==null?void 0:s.data)||[],u=[...n,...d].slice(0,40);return e.jsxs(e.Fragment,{children:[e.jsx("style",{dangerouslySetInnerHTML:{__html:Kr}}),e.jsx("section",{className:"top-products-section-wrapper my-0 px-0 pt-0 pt-md-4",children:e.jsxs(Ce,{className:"px-4",children:[e.jsxs("div",{className:"top-products-header mb-1",children:[e.jsx("h2",{className:"top-products-title text-color-dark",children:"Top 24 Products"}),e.jsxs(E,{to:"/products?sort_by=rating&sort_order=desc",className:"view-all-top-products-link text-primary fw-600",children:["View More ",e.jsx("i",{className:"bi bi-arrow-right ms-2"})]})]}),e.jsxs("div",{className:"top-products-grid",children:[a&&e.jsx("div",{className:"d-flex justify-content-center p-4",children:e.jsx(K,{animation:"border"})}),!a&&u.length===0&&e.jsx("div",{className:"text-center py-4",children:e.jsx("p",{className:"text-muted",children:"No top products available at the moment."})}),!a&&u.length>0&&u.map(m=>e.jsx(qr,{product:m},m.id))]}),!a&&u.length>0&&e.jsx("div",{className:"text-center mt-5",children:e.jsx(E,{to:"/products",className:"btn btn-outline-primary btn-lg",children:"View All Products"})})]})})]})},Jr=`
  .homepage-container {
    background: var(--background-body);
    min-height: 100vh;
  }

  .homepage-section {
    padding: 2rem 0;
  }

  .homepage-section:first-child {
    padding-top: 1rem;
  }

  .homepage-section:last-child {
    padding-bottom: 3rem;
  }

  .hero-section-fullwidth {
    width: 100vw;
    margin-left: calc(-50vw + 50%);
    padding: 0;
    margin-bottom: 3rem;
  }

  @media (max-width: 767.98px) {
    .homepage-section {
      padding: 1.5rem 0;
    }
    
    .homepage-section:first-child {
      padding-top: 0.5rem;
    }
    
    .homepage-section:last-child {
      padding-bottom: 2rem;
    }
  }

  @media (max-width: 575.98px) {
    .homepage-section {
      padding: 1rem 0;
    }
  }
`,ht=()=>{const t=lr().state;return l.useEffect(()=>{t!=null&&t.orderSuccess&&(t!=null&&t.orderId)&&(cr.success(`🎉 Order #${t.orderId} placed successfully! Thank you for your purchase.`,{autoClose:6e3}),window.history.replaceState({},document.title))},[t]),e.jsxs(e.Fragment,{children:[e.jsx("style",{dangerouslySetInnerHTML:{__html:Jr}}),e.jsx("div",{className:"homepage-container",children:e.jsxs("div",{className:"container mt-4",children:[(t==null?void 0:t.orderSuccess)&&(t==null?void 0:t.orderId)&&e.jsxs(q,{variant:"success",className:"mb-4",children:[e.jsx(q.Heading,{children:"🎉 Order Placed Successfully!"}),e.jsxs("p",{children:["Your order ",e.jsxs("strong",{children:["#",t.orderId]})," has been confirmed and is being processed. You will receive a confirmation email shortly."]}),e.jsx("hr",{}),e.jsxs("div",{className:"d-flex justify-content-between",children:[e.jsxs("a",{href:"/account/orders",className:"btn btn-outline-success",children:[e.jsx("i",{className:"bi bi-list-ul me-2"}),"View My Orders"]}),t.paymentUrl&&e.jsxs("a",{href:`/payment/${t.orderId}`,className:"btn btn-success",children:[e.jsx("i",{className:"bi bi-credit-card me-2"}),"Complete Payment"]})]})]}),e.jsx(Tr,{}),e.jsx(Mr,{}),e.jsx(Pr,{}),e.jsx(Qr,{})]})})]})};export{ht as default};
