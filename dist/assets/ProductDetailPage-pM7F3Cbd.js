import{e as ie,r as o,j as e,S as J,A as Me,n as Re,T as K,o as Fe,U as Z,D as xe,t as ve,v as Ee,F as L,w as Le,x as Ae,C as P,y as Te,z as Be,B as $,E as $e,G as Pe,H as De,I as Ye,p as He,L as be}from"./index-BUlTi-RG.js";import{B as y}from"./Button-D1awEB0c.js";import{H as ge}from"./heart-GrKcqomq.js";import{D as We}from"./DynamicBreadcrumb-BHe3ZGbJ.js";import{M as A}from"./Modal-Xcd6dAg7.js";import{A as W}from"./Alert-CEmwcEMu.js";import{C as T}from"./Card-BrnskKH5.js";import{R as O}from"./Row-tlb2Tcc9.js";import{C as U}from"./Container-D2fZxHT4.js";import"./Button-CKTz88uJ.js";import"./createLucideIcon-BszcUjbx.js";import"./useMergedRefs-C3O5QAvR.js";import"./useEventCallback-CUECKx-A.js";import"./useWillUnmount-Dn5-hY3T.js";import"./TransitionWrapper-BLmPPUNA.js";import"./objectWithoutPropertiesLoose-CAYKN5F1.js";import"./useWindow-C31nRb8G.js";import"./useEventCallback-CmmpuWZE.js";import"./DataKey-COGXBUcQ.js";import"./useMergedRefs-DhY38gtg.js";import"./CloseButton-Vs17wP1E.js";import"./divWithClassName-BurpA6jg.js";import"./hook-CfU9Pidb.js";import"./Anchor-DCpCVXp0.js";import"./CardHeaderContext-BkTFWDBS.js";const qe=({productId:s,productName:C="Product",variant:x="icon",size:g="md",className:v="",showToast:n=!0})=>{const t=ie(),[m,N]=o.useState(!1),[f,l]=o.useState(!1),[j,_]=o.useState(!0);o.useEffect(()=>{s&&(async()=>{try{_(!0);const h=await Me.checkWishlist(s);N(h)}catch(h){console.error("Error checking wishlist status:",h)}finally{_(!1)}})()},[s]);const p=async z=>{if(z.preventDefault(),z.stopPropagation(),!(f||j)){l(!0);try{if(m)await t(Re(s)).unwrap(),N(!1),n&&K.success(`${C} removed from wishlist`);else try{await t(Fe(s)).unwrap(),N(!0),n&&K.success(`${C} added to wishlist`)}catch(h){if(h.message&&h.message.includes("already in wishlist"))N(!0),n&&K.info(`${C} is already in your wishlist`);else throw h}}catch(h){console.error("Wishlist error:",h);const M=h.message||"Failed to update wishlist";n&&K.error(`Failed to update wishlist: ${M}`)}finally{l(!1)}}},k=()=>{switch(g){case"sm":return 24;case"lg":return 40;default:return 32}},c=()=>{switch(g){case"sm":return 14;case"lg":return 20;default:return 16}};return x==="button"?e.jsxs(y,{variant:m?"primary":"outline-primary",size:g==="lg"?"lg":g==="sm"?"sm":void 0,onClick:p,disabled:f||j,className:v,children:[f||j?e.jsx(J,{size:"sm",className:"me-2"}):e.jsx(ge,{size:c(),className:"me-2",fill:m?"currentColor":"none"}),m?"Remove from Wishlist":"Add to Wishlist"]}):e.jsx(y,{variant:m?"primary":"outline-primary",size:"sm",className:`p-0 ${v}`,onClick:p,disabled:f||j,title:m?"Remove from Wishlist":"Add to Wishlist",style:{width:k(),height:k(),display:"flex",alignItems:"center",justifyContent:"center",borderRadius:"50%",border:m?"none":"1px solid currentColor"},children:f||j?e.jsx(J,{size:"sm"}):e.jsx(ge,{size:c(),fill:m?"currentColor":"none"})})},oe=({src:s,alt:C="",className:x,style:g={},width:v="100%",height:n="auto",loaderWidth:t=400,loaderHeight:m=300,loaderBackgroundColor:N="#e0e0e0",loaderForegroundColor:f="#c0c0c0",loaderSpeed:l=1.5,objectFit:j="cover",onError:_})=>{const[p,k]=o.useState(!1),[c,z]=o.useState(!1),[h,M]=o.useState(!0);o.useEffect(()=>{if(k(!1),z(!1),M(!0),s){const F=new Image;F.onload=()=>{M(!1)},F.onerror=()=>{z(!0),M(!1)},F.src=s}else z(!0),M(!1)},[s]);const w=()=>{k(!0),z(!1),M(!1)},b=F=>{z(!0),k(!1),M(!1),_&&_(F),console.error("Image failed to load:",s)},i=typeof v=="number"?`${v}px`:v,u=typeof n=="number"?`${n}px`:n;return e.jsxs(e.Fragment,{children:[e.jsx("style",{dangerouslySetInnerHTML:{__html:`
    @keyframes shimmer {
      0% {
        background-position: -200px 0;
      }
      100% {
        background-position: calc(200px + 100%) 0;
      }
    }
    
    @keyframes shimmerGlow {
      0% {
        opacity: 0.5;
      }
      50% {
        opacity: 1;
      }
      100% {
        opacity: 0.5;
      }
    }
  `}}),e.jsxs("div",{className:x,style:{position:"relative",display:"flex",alignItems:"center",justifyContent:"center",width:i,height:u,minHeight:typeof n=="string"&&n.includes("%")?"300px":u,overflow:"hidden",backgroundColor:!p&&!c?N:"transparent",...g},children:[!p&&!c&&h&&e.jsxs(e.Fragment,{children:[e.jsx("div",{style:{position:"absolute",top:0,left:0,width:"100%",height:"100%",background:`linear-gradient(90deg, ${N} 0%, ${f} 50%, ${N} 100%)`,backgroundSize:"200px 100%",animation:`shimmer ${l}s ease-in-out infinite`,minHeight:"200px"}}),e.jsx("div",{style:{position:"absolute",top:0,left:0,width:"100%",height:"100%",background:`radial-gradient(circle, ${f} 0%, transparent 70%)`,animation:`shimmerGlow ${l*1.5}s ease-in-out infinite`,minHeight:"200px"}})]}),c&&e.jsx("div",{style:{position:"absolute",top:0,left:0,width:"100%",height:"100%",display:"flex",alignItems:"center",justifyContent:"center",backgroundColor:"#f0f0f0",color:"#888"},children:e.jsx("span",{children:"Error"})}),s&&!c&&e.jsx("img",{src:s,alt:C,onLoad:w,onError:b,style:{display:"block",maxWidth:"100%",maxHeight:"100%",width:"auto",height:"auto",objectFit:j,opacity:p?1:0,transition:"opacity 0.4s ease-in-out",visibility:p?"visible":"hidden",zIndex:1,margin:"auto"}})]})]})},ee=({rating:s,maxRating:C=5,size:x="md",interactive:g=!1,onRatingChange:v,disabled:n=!1})=>{const t=()=>{switch(x){case"sm":return"star-rating-sm";case"lg":return"star-rating-lg";default:return"star-rating-md"}},m=f=>{g&&!n&&v&&v(f)},N=()=>{const f=[];for(let l=1;l<=C;l++){const j=l<=s,_=s>l-1&&s<l;f.push(e.jsx("span",{className:`star ${g?"star-interactive":""} ${n?"star-disabled":""}`,onClick:()=>m(l),role:g?"button":void 0,tabIndex:g&&!n?0:void 0,onKeyDown:p=>{g&&!n&&(p.key==="Enter"||p.key===" ")&&(p.preventDefault(),m(l))},children:j?e.jsx("i",{className:"bi bi-star-fill"}):_?e.jsx("i",{className:"bi bi-star-half"}):e.jsx("i",{className:"bi bi-star"})},l))}return f};return e.jsxs("div",{className:`star-rating ${t()}`,children:[N(),e.jsx("style",{children:`
        .star-rating {
          display: inline-flex;
          gap: 2px;
          align-items: center;
        }

        .star {
          color: #ffd700;
          transition: all 0.2s ease;
        }

        .star-interactive {
          cursor: pointer;
        }

        .star-interactive:hover {
          transform: scale(1.1);
        }

        .star-disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .star-rating-sm .star {
          font-size: 0.875rem;
        }

        .star-rating-md .star {
          font-size: 1rem;
        }

        .star-rating-lg .star {
          font-size: 1.25rem;
        }

        .star i {
          color: inherit;
        }
      `})]})},Ge=({review:s,isLast:C=!1,onReviewUpdated:x})=>{const[g,v]=o.useState(!1),[n,t]=o.useState(!1),[m,N]=o.useState(s.rating),[f,l]=o.useState(s.comment),j=Z.loadFromDatabase(xe),_=j&&j.id===s.user_id,[p,{isLoading:k}]=ve(),[c,{isLoading:z}]=Ee(),h=async()=>{try{await p({reviewId:s.id,rating:m,comment:f,productId:s.product_id}).unwrap(),v(!1),x==null||x()}catch(i){console.error("Failed to update review:",i)}},M=async()=>{try{await c({reviewId:s.id,productId:s.product_id}).unwrap(),t(!1),x==null||x()}catch(i){console.error("Failed to delete review:",i)}},w=i=>new Date(i).toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"}),b=i=>{const u=new Date(i),F=new Date().getTime()-u.getTime(),I=Math.floor(F/(1e3*60*60*24));return I===0?"Today":I===1?"Yesterday":I<7?`${I} days ago`:I<30?`${Math.floor(I/7)} weeks ago`:I<365?`${Math.floor(I/30)} months ago`:`${Math.floor(I/365)} years ago`};return e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:`review-item ${C?"":"mb-4"}`,children:[e.jsxs("div",{className:"d-flex justify-content-between align-items-start mb-3",children:[e.jsx("div",{className:"review-header",children:e.jsxs("div",{className:"d-flex align-items-center mb-2",children:[e.jsx("div",{className:"reviewer-avatar me-3",children:e.jsx("i",{className:"bi bi-person-circle fs-4 text-muted"})}),e.jsxs("div",{children:[e.jsx("h6",{className:"reviewer-name mb-1",children:s.user.name}),e.jsx(ee,{rating:s.rating,size:"sm"})]})]})}),_&&e.jsxs("div",{className:"review-actions",children:[e.jsx(y,{variant:"outline-secondary",size:"sm",onClick:()=>v(!0),className:"me-2",children:e.jsx("i",{className:"bi bi-pencil"})}),e.jsx(y,{variant:"outline-danger",size:"sm",onClick:()=>t(!0),children:e.jsx("i",{className:"bi bi-trash"})})]})]}),e.jsx("div",{className:"review-content mb-3",children:e.jsx("p",{className:"review-comment mb-2",children:s.comment})}),e.jsx("div",{className:"review-meta",children:e.jsxs("small",{className:"text-muted",children:[e.jsx("i",{className:"bi bi-clock me-1"}),b(s.created_at)," • ",w(s.created_at),s.updated_at!==s.created_at&&e.jsxs("span",{className:"ms-2",children:[e.jsx("i",{className:"bi bi-pencil-square me-1"}),"Edited"]})]})})]}),e.jsxs(A,{show:g,onHide:()=>v(!1),centered:!0,children:[e.jsx(A.Header,{closeButton:!0,children:e.jsx(A.Title,{children:"Edit Your Review"})}),e.jsx(A.Body,{children:e.jsxs(L,{children:[e.jsxs(L.Group,{className:"mb-3",children:[e.jsx(L.Label,{className:"fw-semibold",children:"Rating"}),e.jsx("div",{className:"mt-2",children:e.jsx(ee,{rating:m,interactive:!0,onRatingChange:N,size:"lg"})})]}),e.jsxs(L.Group,{className:"mb-3",children:[e.jsx(L.Label,{className:"fw-semibold",children:"Your Review"}),e.jsx(L.Control,{as:"textarea",rows:4,value:f,onChange:i=>l(i.target.value),placeholder:"Share your thoughts about this product...",maxLength:1e3}),e.jsxs(L.Text,{className:"text-muted",children:[f.length,"/1000 characters"]})]})]})}),e.jsxs(A.Footer,{children:[e.jsx(y,{variant:"secondary",onClick:()=>v(!1),disabled:k,children:"Cancel"}),e.jsx(y,{variant:"primary",onClick:h,disabled:k||!f.trim(),children:k?e.jsxs(e.Fragment,{children:[e.jsx("span",{className:"spinner-border spinner-border-sm me-2"}),"Updating..."]}):"Update Review"})]})]}),e.jsxs(A,{show:n,onHide:()=>t(!1),centered:!0,children:[e.jsx(A.Header,{closeButton:!0,children:e.jsx(A.Title,{children:"Delete Review"})}),e.jsx(A.Body,{children:e.jsxs(W,{variant:"warning",children:[e.jsx(W.Heading,{children:"Are you sure?"}),e.jsx("p",{className:"mb-0",children:"This action cannot be undone. Your review will be permanently deleted."})]})}),e.jsxs(A.Footer,{children:[e.jsx(y,{variant:"secondary",onClick:()=>t(!1),disabled:z,children:"Cancel"}),e.jsx(y,{variant:"danger",onClick:M,disabled:z,children:z?e.jsxs(e.Fragment,{children:[e.jsx("span",{className:"spinner-border spinner-border-sm me-2"}),"Deleting..."]}):"Delete Review"})]})]}),e.jsx("style",{children:`
        .review-item {
          position: relative;
        }

        .review-header {
          flex: 1;
        }

        .reviewer-name {
          font-weight: 600;
          color: var(--text-color-dark);
          margin-bottom: 0;
        }

        .review-actions {
          opacity: 0.7;
          transition: opacity 0.3s ease;
        }

        .review-item:hover .review-actions {
          opacity: 1;
        }

        .review-comment {
          line-height: 1.6;
          color: var(--text-color);
          margin-bottom: 0;
          white-space: pre-wrap;
          word-wrap: break-word;
        }

        .review-meta {
          font-size: 0.875rem;
        }

        .reviewer-avatar {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        @media (max-width: 576px) {
          .review-actions {
            opacity: 1;
          }
          
          .review-actions .btn {
            padding: 0.25rem 0.5rem;
            font-size: 0.875rem;
          }
        }
      `})]})},Ue=({productId:s,onWriteReviewClick:C,showWriteReviewButton:x=!0})=>{const[g,v]=o.useState(1),[n,t]=o.useState("newest"),{data:m,isLoading:N,error:f,refetch:l}=Le({productId:s,page:g,perPage:10,sortBy:n}),{data:j,isLoading:_}=Ae({productId:s}),p=(m==null?void 0:m.reviews)||[],k=(m==null?void 0:m.pagination)||{},c=j||{total_reviews:0,average_rating:0,rating_breakdown:{}},z=b=>{t(b),v(1)},h=b=>{v(b)},M=()=>{if(!k.last_page||k.last_page<=1)return null;const b=[],i=k.current_page,u=k.last_page;i>1&&b.push(e.jsx(y,{variant:"outline-primary",size:"sm",onClick:()=>h(i-1),className:"me-2",children:"Previous"},"prev"));const S=Math.max(1,i-2),F=Math.min(u,i+2);S>1&&(b.push(e.jsx(y,{variant:i===1?"primary":"outline-primary",size:"sm",onClick:()=>h(1),className:"me-2",children:"1"},1)),S>2&&b.push(e.jsx("span",{className:"me-2",children:"..."},"ellipsis1")));for(let I=S;I<=F;I++)b.push(e.jsx(y,{variant:I===i?"primary":"outline-primary",size:"sm",onClick:()=>h(I),className:"me-2",children:I},I));return F<u&&(F<u-1&&b.push(e.jsx("span",{className:"me-2",children:"..."},"ellipsis2")),b.push(e.jsx(y,{variant:u===i?"primary":"outline-primary",size:"sm",onClick:()=>h(u),className:"me-2",children:u},u))),i<u&&b.push(e.jsx(y,{variant:"outline-primary",size:"sm",onClick:()=>h(i+1),children:"Next"},"next")),e.jsx("div",{className:"d-flex justify-content-center mt-4",children:b})},w=()=>{if(!c.rating_breakdown)return null;const b=c.rating_breakdown,i=c.total_reviews;return e.jsx("div",{className:"rating-breakdown mb-4",children:[5,4,3,2,1].map(u=>{const S=b[`${u}_star${u===1?"":"s"}`]||0,F=i>0?S/i*100:0;return e.jsxs("div",{className:"d-flex align-items-center mb-2",children:[e.jsxs("div",{className:"rating-label",style:{minWidth:"60px"},children:[u," ",e.jsx("i",{className:"bi bi-star-fill text-warning"})]}),e.jsx("div",{className:"progress flex-grow-1 mx-3",style:{height:"8px"},children:e.jsx("div",{className:"progress-bar bg-warning",style:{width:`${F}%`}})}),e.jsx("div",{className:"rating-count",style:{minWidth:"40px",textAlign:"right"},children:S})]},u)})})};return N&&g===1?e.jsx(T,{className:"border-0 shadow-sm",children:e.jsxs(T.Body,{className:"p-4 text-center",children:[e.jsx(J,{animation:"border",variant:"primary",className:"mb-3"}),e.jsx("p",{className:"text-muted mb-0",children:"Loading reviews..."})]})}):f?e.jsx(T,{className:"border-0 shadow-sm",children:e.jsx(T.Body,{className:"p-4",children:e.jsxs(W,{variant:"danger",children:[e.jsx(W.Heading,{children:"Error Loading Reviews"}),e.jsx("p",{className:"mb-0",children:"Failed to load reviews. Please try again later."}),e.jsxs(y,{variant:"outline-danger",size:"sm",onClick:()=>l(),className:"mt-2",children:[e.jsx("i",{className:"bi bi-arrow-clockwise me-2"}),"Retry"]})]})})}):e.jsx(T,{className:"border-0 shadow-sm",children:e.jsxs(T.Body,{className:"p-4",children:[e.jsxs("div",{className:"d-flex align-items-center justify-content-between mb-4",children:[e.jsxs("h5",{className:"section-title mb-0",children:[e.jsx("i",{className:"bi bi-star me-2"}),"Customer Reviews (",c.total_reviews,")"]}),x&&e.jsxs(y,{variant:"primary",size:"sm",onClick:C,className:"write-review-btn",children:[e.jsx("i",{className:"bi bi-pencil me-2"}),"Write Review"]})]}),c.total_reviews>0&&e.jsxs(O,{className:"mb-4",children:[e.jsx(P,{md:4,children:e.jsxs("div",{className:"text-center p-3 bg-light rounded",children:[e.jsx("div",{className:"display-6 fw-bold text-primary mb-2",children:c.average_rating.toFixed(1)}),e.jsx(ee,{rating:c.average_rating,size:"lg"}),e.jsxs("div",{className:"text-muted mt-2",children:["Based on ",c.total_reviews," review",c.total_reviews!==1?"s":""]})]})}),e.jsx(P,{md:8,children:w()})]}),p.length>0&&e.jsx(O,{className:"mb-4",children:e.jsx(P,{md:6,children:e.jsxs(L.Group,{children:[e.jsx(L.Label,{className:"fw-semibold",children:"Sort by:"}),e.jsxs(L.Select,{value:n,onChange:b=>z(b.target.value),size:"sm",children:[e.jsx("option",{value:"newest",children:"Newest First"}),e.jsx("option",{value:"oldest",children:"Oldest First"}),e.jsx("option",{value:"highest_rating",children:"Highest Rating"}),e.jsx("option",{value:"lowest_rating",children:"Lowest Rating"})]})]})})}),p.length===0?e.jsxs("div",{className:"text-center py-5",children:[e.jsx("i",{className:"bi bi-star fs-1 text-muted mb-3 d-block"}),e.jsx("h6",{children:"No Reviews Yet"}),e.jsx("p",{className:"text-muted mb-3",children:"Be the first to review this product!"}),x&&e.jsxs(y,{variant:"primary",onClick:C,children:[e.jsx("i",{className:"bi bi-pencil me-2"}),"Write the First Review"]})]}):e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"reviews-list",children:p.map((b,i)=>e.jsx(Ge,{review:b,isLast:i===p.length-1,onReviewUpdated:()=>l()},b.id))}),M()]}),e.jsx("style",{children:`
          .section-title {
            color: var(--primary-color);
            font-weight: 600;
            border-bottom: 2px solid var(--primary-color);
            padding-bottom: 0.5rem;
            margin-bottom: 1rem;
          }

          .write-review-btn {
            border-radius: 0.375rem;
            font-weight: 500;
            transition: all 0.3s ease;
          }

          .write-review-btn:hover {
            transform: translateY(-1px);
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          }

          .rating-breakdown {
            font-size: 0.875rem;
          }

          .rating-label {
            font-weight: 500;
            color: var(--text-color-dark);
          }

          .rating-count {
            font-weight: 500;
            color: var(--text-color-muted);
          }

          .reviews-list > * + * {
            border-top: 1px solid var(--border-color);
            padding-top: 1.5rem;
          }

          .reviews-list > *:not(:last-child) {
            padding-bottom: 1.5rem;
          }
        `})]})})},Oe=({productId:s,onReviewSubmitted:C,show:x=!1,onHide:g,asModal:v=!1})=>{const[n,t]=o.useState(0),[m,N]=o.useState(""),[f,l]=o.useState(""),[j,_]=o.useState(""),p=ie(),k=Z.loadFromDatabase(xe),{data:c,isLoading:z}=Te({productId:s},{skip:!k}),[h,{isLoading:M}]=Be(),[w,{isLoading:b}]=ve(),i=!!c,u=M||b;o.useEffect(()=>{c&&(t(c.rating),N(c.comment))},[c]);const S=async Y=>{var q;if(Y.preventDefault(),!u){if(l(""),_(""),!k){l("You must be logged in to submit a review.");return}if(n===0){l("Please select a rating.");return}if(!m.trim()){l("Please write a review comment.");return}try{let R;if(i){R=await w({reviewId:c.id,rating:n,comment:m.trim(),productId:c.product_id}).unwrap();const E="Your review has been updated successfully!";_(E),p($({message:E,type:"success"}))}else{R=await h({productId:s,rating:n,comment:m.trim()}).unwrap();const E="Thank you for your review!";_(E),p($({message:E,type:"success"}))}C==null||C(),v&&g?setTimeout(()=>{g(),t(0),N(""),_(""),l("")},1500):setTimeout(()=>{t(0),N(""),_(""),l("")},3e3)}catch(R){console.error("Review submission error:",R);let E="Failed to submit review. Please try again.";(q=R==null?void 0:R.data)!=null&&q.message?E=R.data.message:R!=null&&R.message?E=R.message:typeof R=="string"&&(E=R),l(E),p($({message:E,type:"error"}))}}},F=()=>{v&&g?g():(t(c?c.rating:0),N(c?c.comment:""),l(""),_(""))};if(z)return e.jsx(T,{className:"border-0 shadow-sm",children:e.jsxs(T.Body,{className:"p-4 text-center",children:[e.jsx("div",{className:"spinner-border text-primary mb-3"}),e.jsx("p",{className:"text-muted mb-0",children:"Loading..."})]})});if(!k)return e.jsx(T,{className:"border-0 shadow-sm",children:e.jsxs(T.Body,{className:"p-4 text-center",children:[e.jsx("i",{className:"bi bi-person-circle fs-1 text-muted mb-3 d-block"}),e.jsx("h6",{children:"Sign In to Write a Review"}),e.jsx("p",{className:"text-muted mb-0",children:"You need to be logged in to share your thoughts about this product."})]})});const I=e.jsxs(e.Fragment,{children:[f&&e.jsx(W,{variant:"danger",dismissible:!0,onClose:()=>l(""),children:f}),j&&e.jsx(W,{variant:"success",dismissible:!0,onClose:()=>_(""),children:j}),e.jsxs(L,{onSubmit:S,children:[e.jsxs(L.Group,{className:"mb-4",children:[e.jsxs(L.Label,{className:"fw-semibold",children:["Rate this product ",e.jsx("span",{className:"text-danger",children:"*"})]}),e.jsxs("div",{className:"mt-2",children:[e.jsx(ee,{rating:n,interactive:!0,onRatingChange:t,size:"lg"}),n>0&&e.jsx("div",{className:"mt-2",children:e.jsxs("small",{className:"text-muted",children:[n===1&&"Poor",n===2&&"Fair",n===3&&"Good",n===4&&"Very Good",n===5&&"Excellent"]})})]})]}),e.jsxs(L.Group,{className:"mb-4",children:[e.jsxs(L.Label,{className:"fw-semibold",children:["Your review ",e.jsx("span",{className:"text-danger",children:"*"})]}),e.jsx(L.Control,{as:"textarea",rows:4,value:m,onChange:Y=>N(Y.target.value),placeholder:"Share your thoughts about this product. What did you like or dislike about it?",maxLength:1e3,required:!0}),e.jsxs(L.Text,{className:"text-muted",children:[m.length,"/1000 characters"]})]}),e.jsxs("div",{className:"d-flex gap-3",children:[e.jsx(y,{type:"submit",variant:"primary",disabled:u||n===0||!m.trim()||j!=="",className:"flex-grow-1",children:u?e.jsxs(e.Fragment,{children:[e.jsx("span",{className:"spinner-border spinner-border-sm me-2",role:"status","aria-hidden":"true"}),i?"Updating Review...":"Submitting Review..."]}):j?e.jsxs(e.Fragment,{children:[e.jsx("i",{className:"bi bi-check-circle me-2"}),i?"Review Updated!":"Review Submitted!"]}):e.jsxs(e.Fragment,{children:[e.jsx("i",{className:"bi bi-send me-2"}),i?"Update Review":"Submit Review"]})}),(v||i)&&e.jsx(y,{type:"button",variant:"outline-secondary",onClick:F,disabled:u,children:"Cancel"})]})]}),e.jsx("style",{children:`
        .review-form-card {
          border: 1px solid var(--border-color);
          border-radius: var(--border-radius);
          box-shadow: var(--shadow-sm);
          background: var(--white);
        }

        .form-label {
          color: var(--text-color-dark);
        }

        .form-control:focus {
          border-color: var(--primary-color);
          box-shadow: 0 0 0 0.2rem rgba(var(--primary-color-rgb), 0.25);
        }

        .btn-primary {
          background-color: var(--primary-color);
          border-color: var(--primary-color);
          font-weight: 500;
          transition: all 0.3s ease;
        }

        .btn-primary:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        .btn-outline-secondary {
          border-color: var(--border-color);
          color: var(--text-color);
        }

        .btn-outline-secondary:hover:not(:disabled) {
          background-color: var(--background-light);
          border-color: var(--text-color-muted);
        }
      `})]});return v?e.jsxs(A,{show:x,onHide:g,centered:!0,size:"lg",children:[e.jsx(A.Header,{closeButton:!0,children:e.jsx(A.Title,{children:i?"Edit Your Review":"Write a Review"})}),e.jsx(A.Body,{className:"p-4",children:I})]}):e.jsx(T,{className:"border-0 shadow-sm review-form-card",children:e.jsxs(T.Body,{className:"p-4",children:[e.jsxs("h5",{className:"section-title mb-4",children:[e.jsx("i",{className:"bi bi-pencil-square me-2"}),i?"Edit Your Review":"Write a Review"]}),I]})})},X=`
  /* ===================================================================
     Product Detail Page - Modern Square Design
     Extends parent theme variables for consistency
     =================================================================== */

  /* Loading, Error, Not Found States */
  .pdp-loading-container,
  .pdp-error-container,
  .pdp-not-found-container {
    min-height: 50vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: var(--white);
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius);
    box-shadow: var(--shadow-sm);
    padding: var(--spacing-3xl);
  }

  .pdp-loading-container .spinner-border {
    width: 3rem;
    height: 3rem;
    color: var(--primary-color);
    margin-bottom: var(--spacing-lg);
  }

  .pdp-loading-container h4,
  .pdp-error-container h4,
  .pdp-not-found-container h4 {
    color: var(--text-color-dark);
    font-weight: 600;
    margin-bottom: var(--spacing-md);
  }

  /* Main Product Container */
  .product-detail-page-container {
    background: var(--white);
  }

  /* Product Image Gallery */
  .product-image-gallery {
    position: relative;
  }

  .main-image-wrapper {
    width: 100%;
    aspect-ratio: 1;
    background: var(--background-light);
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius);
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all var(--transition-speed) var(--transition-timing);
    position: relative;
  }

  .main-image-wrapper:hover {
    border-color: var(--primary-color);
    box-shadow: var(--shadow-md);
  }

  .main-image-wrapper img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    transition: transform var(--transition-speed) var(--transition-timing);
  }

  .main-image-wrapper:hover img {
    transform: scale(1.02);
  }

  .discount-badge {
    position: absolute;
    top: var(--spacing-md);
    right: var(--spacing-md);
    background: var(--accent-color);
    color: var(--white);
    padding: var(--spacing-xs) var(--spacing-sm);
    border-radius: var(--border-radius);
    font-weight: 600;
    font-size: 12px;
    box-shadow: var(--shadow-sm);
    z-index: 2;
  }

  /* Thumbnail Gallery */
  .thumbnail-row {
    display: flex;
    gap: var(--spacing-sm);
    overflow-x: auto;
    padding: var(--spacing-sm) 0;
    scrollbar-width: thin;
    scrollbar-color: var(--primary-color) var(--background-light);
    scroll-behavior: smooth;
  }

  .thumbnail-row::-webkit-scrollbar {
    height: 6px;
  }

  .thumbnail-row::-webkit-scrollbar-track {
    background: var(--background-light);
    border-radius: 3px;
  }

  .thumbnail-row::-webkit-scrollbar-thumb {
    background: var(--primary-color);
    border-radius: 3px;
  }

  .thumbnail-row::-webkit-scrollbar-thumb:hover {
    background: var(--primary-color);
    opacity: 0.8;
  }

  .thumb-wrapper {
    flex: 0 0 auto;
    width: 70px;
    height: 70px;
    border: 1px solid var(--border-color);
    border-radius: 0px;
    overflow: hidden;
    cursor: pointer;
    transition: all var(--transition-speed) var(--transition-timing);
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--white);
    position: relative;
  }

  .thumb-wrapper:hover {
    border-color: var(--primary-color);
    box-shadow: 0 0 0 2px rgba(var(--primary-color-rgb), 0.2);
  }

  .thumb-wrapper.selected-thumb {
    border-color: var(--primary-color);
    box-shadow: 0 0 0 2px rgba(var(--primary-color-rgb), 0.3);
  }

  .thumb-wrapper img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  @media (max-width: 576px) {
    .thumb-wrapper {
      width: 60px;
      height: 60px;
    }
  }

  /* Product Info */
  .product-title {
    font-size: 1.75rem;
    font-weight: 700;
    color: var(--text-color-dark);
    line-height: 1.3;
    margin-bottom: var(--spacing-lg);
  }

  .category-badge {
    background: var(--primary-color);
    color: var(--white);
    padding: var(--spacing-xs) var(--spacing-md);
    border-radius: var(--border-radius);
    font-weight: 500;
    font-size: 13px;
    border: none;
  }

  .rating-container {
    background: var(--background-light);
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius);
    padding: var(--spacing-md);
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
  }

  .rating-stars {
    display: flex;
    align-items: center;
    gap: 2px;
  }

  .rating-stars i {
    color: var(--warning-color);
    font-size: 1rem;
  }

  .rating-value {
    font-weight: 600;
    color: var(--text-color-dark);
  }

  .rating-count {
    color: var(--text-color-medium);
    font-size: 14px;
  }

  /* Share Buttons */
  .share-buttons {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
    margin-top: var(--spacing-lg);
  }

  .share-buttons .btn {
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: var(--border-radius);
    border: 1px solid var(--border-color);
    background: var(--white);
    color: var(--text-color-medium);
    transition: all var(--transition-speed) var(--transition-timing);
    font-size: 14px;
  }

  .share-buttons .btn:hover {
    box-shadow: var(--shadow-sm);
  }

  .share-buttons .btn-facebook:hover {
    background: #1877f2;
    color: var(--white);
    border-color: #1877f2;
  }

  .share-buttons .btn-twitter:hover {
    background: #1da1f2;
    color: var(--white);
    border-color: #1da1f2;
  }

  .share-buttons .btn-whatsapp:hover {
    background: #25d366;
    color: var(--white);
    border-color: #25d366;
  }

  /* Sidebar Card */
  .sidebar-card {
    background: var(--white);
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius);
    box-shadow: var(--shadow-sm);
    position: sticky;
    top: var(--spacing-2xl);
  }

  .sidebar-card .card-body {
    padding: var(--spacing-2xl);
  }

  /* Pricing Section */
  .pricing-section {
    margin-bottom: var(--spacing-2xl);
    padding-bottom: var(--spacing-lg);
    border-bottom: 1px solid var(--border-color-light);
  }

  .current-price {
    font-size: 2rem;
    font-weight: 700;
    color: var(--primary-color);
    line-height: 1.2;
    margin-bottom: var(--spacing-xs);
  }

  .old-price {
    font-size: 1rem;
    color: var(--text-color-light);
    text-decoration: line-through;
    margin-left: var(--spacing-sm);
  }

  .savings-badge {
    background: var(--success-color);
    color: var(--white);
    padding: var(--spacing-xs) var(--spacing-sm);
    border-radius: var(--border-radius);
    font-weight: 500;
    font-size: 12px;
    margin-top: var(--spacing-xs);
    display: inline-block;
  }

  /* Stock Status */
  .stock-container {
    background: var(--background-light);
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius);
    padding: var(--spacing-lg);
    margin-bottom: var(--spacing-lg);
    transition: all var(--transition-speed) var(--transition-timing);
  }

  .stock-container.in-stock {
    background: rgba(25, 135, 84, 0.05);
    border-color: rgba(25, 135, 84, 0.2);
  }

  .stock-container.out-of-stock {
    background: rgba(var(--primary-color-rgb), 0.05);
    border-color: rgba(var(--primary-color-rgb), 0.2);
  }

  .stock-status {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
    font-weight: 600;
    margin-bottom: var(--spacing-sm);
  }

  .stock-status.in-stock {
    color: var(--success-color);
  }

  .stock-status.out-of-stock {
    color: var(--primary-color);
  }

  .stock-count {
    color: var(--text-color-medium);
    font-size: 14px;
    margin-bottom: var(--spacing-sm);
  }

  /* Progress Bar */
  .stock-progress {
    height: 6px;
    background: var(--background-muted);
    border-radius: var(--border-radius);
    overflow: hidden;
  }

  .stock-progress .progress-bar {
    border-radius: var(--border-radius);
    transition: width 0.6s ease;
  }

  /* Variants */
  .variants-section {
    margin-bottom: var(--spacing-lg);
  }

  .variant-label {
    font-weight: 600;
    color: var(--text-color-dark);
    margin-bottom: var(--spacing-sm);
    display: block;
    font-size: 14px;
  }

  .variant-options {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-sm);
  }

  .variant-btn {
    padding: var(--spacing-sm) var(--spacing-md);
    border: 1px solid var(--border-color);
    background: var(--white);
    color: var(--text-color-medium);
    border-radius: var(--border-radius);
    cursor: pointer;
    transition: all var(--transition-speed) var(--transition-timing);
    font-weight: 500;
    font-size: 13px;
  }

  .variant-btn:hover {
    border-color: var(--primary-color);
    color: var(--primary-color);
    background: var(--background-light);
  }

  .variant-btn.active {
    background: var(--primary-color);
    border-color: var(--primary-color);
    color: var(--white);
    box-shadow: var(--shadow-sm);
  }

  /* Quantity */
  .quantity-section {
    margin-bottom: var(--spacing-lg);
  }

  .quantity-label {
    font-weight: 600;
    color: var(--text-color-dark);
    margin-bottom: var(--spacing-sm);
    display: block;
    font-size: 14px;
  }

  .quantity-input {
    width: 90px;
    padding: var(--spacing-sm);
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius);
    font-weight: 500;
    text-align: center;
    transition: all var(--transition-speed) var(--transition-timing);
    font-size: 14px;
  }

  .quantity-input:focus {
    border-color: var(--primary-color);
    box-shadow: 0 0 0 2px rgba(var(--primary-color-rgb), 0.1);
    outline: none;
  }

  /* Action Buttons */
  .action-buttons {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);
  }

  .btn-add-to-cart,
  .btn-buy-now {
    padding: var(--spacing-md) var(--spacing-lg);
    font-size: 14px;
    font-weight: 600;
    border-radius: var(--border-radius);
    border: 1px solid transparent;
    transition: all var(--transition-speed) var(--transition-timing);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--spacing-sm);
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .btn-add-to-cart {
    background: var(--primary-color);
    color: var(--white);
    border-color: var(--primary-color);
  }

  .btn-add-to-cart:hover:not(:disabled) {
    background: var(--primary-color-dark);
    border-color: var(--primary-color-dark);
    color: var(--white);
    box-shadow: var(--shadow-md);
  }

  .btn-buy-now {
    background: var(--white);
    color: var(--primary-color);
    border-color: var(--primary-color);
  }

  .btn-buy-now:hover:not(:disabled) {
    background: var(--primary-color);
    color: var(--white);
    border-color: var(--primary-color);
  }

  .btn-add-to-cart:disabled,
  .btn-buy-now:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  /* Checkout Button */
  .btn-checkout {
    width: 100%;
    padding: 0.75rem;
    margin-top: 0.75rem;
    font-weight: 600;
    font-size: 0.95rem;
    border-radius: var(--border-radius);
    border: none;
    background: #28a745 !important;
    color: white !important;
    transition: all var(--transition-speed) var(--transition-timing);
    box-shadow: 0 2px 8px rgba(40, 167, 69, 0.3);
  }

  .btn-checkout:hover {
    background: #218838 !important;
    color: white !important;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(40, 167, 69, 0.4);
  }

  .btn-checkout:active {
    transform: translateY(0);
  }

  .btn-checkout:focus {
    box-shadow: 0 0 0 3px rgba(40, 167, 69, 0.25);
  }

  /* Product Tabs */
  .product-tabs {
    background: var(--white);
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius);
    box-shadow: var(--shadow-sm);
    overflow: hidden;
    margin-bottom: var(--spacing-2xl);
  }

  .product-tabs .nav-pills {
    background: var(--background-light);
    padding: var(--spacing-lg);
    border-bottom: 1px solid var(--border-color);
    margin-bottom: 0;
  }

  .product-tabs .nav-pills .nav-link {
    background: transparent;
    color: var(--text-color-medium);
    font-weight: 500;
    border-radius: var(--border-radius);
    padding: var(--spacing-sm) var(--spacing-lg);
    margin-right: var(--spacing-sm);
    border: 1px solid transparent;
    transition: all var(--transition-speed) var(--transition-timing);
    font-size: 14px;
  }

  .product-tabs .nav-pills .nav-link:hover {
    background: var(--white);
    color: var(--text-color-dark);
    border-color: var(--border-color);
  }

  .product-tabs .nav-pills .nav-link.active {
    background: var(--primary-color);
    color: var(--white);
    border-color: var(--primary-color);
  }

  .product-tabs .tab-content {
    padding: var(--spacing-2xl);
    background: var(--white);
  }

  .product-tabs .tab-pane {
    color: var(--text-color-medium);
    line-height: 1.6;
  }

  /* Specifications Table */
  .specs-table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius);
    overflow: hidden;
  }

  .specs-table th,
  .specs-table td {
    padding: var(--spacing-md);
    text-align: left;
    border-bottom: 1px solid var(--border-color);
  }

  .specs-table th {
    background: var(--background-light);
    font-weight: 600;
    color: var(--text-color-dark);
    width: 30%;
    font-size: 14px;
  }

  .specs-table td {
    color: var(--text-color-medium);
    font-size: 14px;
  }

  .specs-table tr:last-child th,
  .specs-table tr:last-child td {
    border-bottom: none;
  }

  .specs-table tr:nth-child(even) {
    background: var(--background-muted);
  }

  /* Product Tags */
  .product-tags {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-xs);
    margin-top: var(--spacing-sm);
  }

  .product-tag {
    background: var(--primary-color);
    color: var(--white);
    padding: var(--spacing-xs) var(--spacing-sm);
    border-radius: var(--border-radius);
    font-size: 11px;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    transition: all var(--transition-speed) var(--transition-timing);
    cursor: pointer;
    border: 1px solid transparent;
    user-select: none;
    outline: none;
  }

  .product-tag:hover,
  .product-tag:focus {
    background: var(--white);
    color: var(--primary-color);
    border-color: var(--primary-color);
    transform: translateY(-1px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .product-tag:active {
    transform: translateY(0);
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  }

  .product-tag.secondary {
    background: var(--text-color-light);
    color: var(--white);
  }

  .product-tag.secondary:hover,
  .product-tag.secondary:focus {
    background: var(--white);
    color: var(--text-color-dark);
    border-color: var(--text-color-light);
    transform: translateY(-1px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .product-tag.secondary:active {
    transform: translateY(0);
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  }

  /* Product Attributes Section */
  .product-attributes {
    margin-top: var(--spacing-lg);
    padding: 0;
    border: none;
  }

  .product-attributes h5 {
    font-size: 1.1rem;
    font-weight: 600;
    margin-bottom: 1rem;
    color: var(--primary-color);
    letter-spacing: 0.5px;
    text-transform: capitalize;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid var(--primary-color);
    position: relative;
  }

  .attributes-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 0;
    padding: 0;
    border: none;
    background: transparent;
  }

  .attribute-row {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 0.75rem;
    padding: 0.4rem 0.5rem;
    align-items: start;
    border-bottom: none;
  }

  .attribute-row:nth-child(even) {
    background: var(--bs-light);
  }

  .attribute-label {
    font-size: 0.8rem;
    font-weight: 600;
    color: var(--bs-secondary);
    line-height: 1.3;
    text-transform: uppercase;
    letter-spacing: 0.3px;
  }

  .attribute-value {
    font-size: 0.8rem;
    color: var(--bs-dark);
    line-height: 1.3;
    font-weight: 400;
  }

  @media (max-width: 768px) {
    .attribute-row {
      grid-template-columns: 1fr;
      gap: 0.1rem;
    }
  }

  /* Related Products */
  .related-products {
    background: var(--white);
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius);
    box-shadow: var(--shadow-sm);
    padding: 1.5rem;
    margin-top: 2rem;
  }

  .related-products h3 {
    color: var(--text-color-dark);
    font-weight: 600;
    margin-bottom: 1.5rem;
    font-size: 1.2rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .related-products h3::before {
    content: "";
    width: 3px;
    height: 20px;
    background: var(--primary-color);
    border-radius: 2px;
  }

  .related-products-slider {
    position: relative;
    overflow: hidden;
  }

  .related-products-container {
    display: flex;
    gap: 1rem;
    transition: transform 0.3s ease;
    overflow-x: auto;
    scroll-behavior: smooth;
    scrollbar-width: none;
    -ms-overflow-style: none;
    padding-bottom: 0.5rem;
  }

  .related-products-container::-webkit-scrollbar {
    display: none;
  }

  .related-product-item {
    flex: 0 0 200px;
    min-width: 200px;
  }

  .related-product-card {
    background: var(--white);
    border: 1px solid var(--border-color-light);
    border-radius: var(--border-radius);
    overflow: hidden;
    transition: all 0.3s ease;
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .related-product-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    border-color: var(--primary-color);
  }

  .related-product-image {
    position: relative;
    width: 100%;
    height: 150px;
    overflow: hidden;
    background: var(--bg-light);
  }

  .related-product-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  .related-product-card:hover .related-product-image img {
    transform: scale(1.05);
  }

  .related-product-content {
    padding: 0.75rem;
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .related-product-title {
    font-size: 0.85rem;
    font-weight: 500;
    color: var(--text-color-dark);
    margin-bottom: 0.5rem;
    line-height: 1.3;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-decoration: none;
    flex: 1;
  }

  .related-product-title:hover {
    color: var(--primary-color);
  }

  .related-product-price {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.75rem;
  }

  .related-product-price-current {
    font-size: 0.9rem;
    font-weight: 600;
    color: var(--primary-color);
  }

  .related-product-price-original {
    font-size: 0.8rem;
    color: var(--text-color-muted);
    text-decoration: line-through;
  }

  .related-product-discount {
    background: var(--accent-color);
    color: white;
    font-size: 0.7rem;
    font-weight: 500;
    padding: 0.15rem 0.4rem;
    border-radius: 8px;
  }

  .related-product-actions {
    display: flex;
    gap: 0.5rem;
  }

  .related-product-btn {
    flex: 1;
    padding: 0.4rem 0.5rem;
    border: none;
    border-radius: var(--border-radius);
    font-size: 0.8rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
    text-decoration: none;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.3rem;
  }

  .related-product-btn-primary {
    background: var(--primary-color);
    color: white;
  }

  .related-product-btn-primary:hover {
    background: var(--primary-color-dark);
    transform: translateY(-1px);
  }

  .related-product-btn-outline {
    background: transparent;
    color: var(--text-color-dark);
    border: 1px solid var(--border-color);
  }

  .related-product-btn-outline:hover {
    border-color: var(--primary-color);
    color: var(--primary-color);
    background: var(--primary-color-light);
  }

  .slider-button {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 32px;
    height: 32px;
    border: none;
    border-radius: 50%;
    background: var(--white);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    color: var(--text-color-dark);
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.2s ease;
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .slider-button:hover {
    background: var(--primary-color);
    color: white;
    transform: translateY(-50%) scale(1.1);
  }

  .slider-button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: translateY(-50%);
  }

  .slider-button.prev {
    left: -16px;
  }

  .slider-button.next {
    right: -16px;
  }

  /* Mobile responsive adjustments */
  @media (max-width: 768px) {
    .related-products {
      padding: 1rem;
      margin-top: 1rem;
    }

    .related-product-item {
      flex: 0 0 180px;
      min-width: 180px;
    }

    .related-product-image {
      height: 120px;
    }

    .related-product-content {
      padding: 0.5rem;
    }

    .related-product-title {
      font-size: 0.8rem;
    }

    .related-product-price-current {
      font-size: 0.85rem;
    }

    .related-product-btn {
      padding: 0.3rem 0.4rem;
      font-size: 0.75rem;
    }

    .slider-button {
      width: 28px;
      height: 28px;
      font-size: 14px;
    }

    .slider-button.prev {
      left: -14px;
    }

    .slider-button.next {
      right: -14px;
    }
  }

  @media (max-width: 480px) {
    .related-product-item {
      flex: 0 0 160px;
      min-width: 160px;
    }

    .related-product-image {
      height: 100px;
    }

    .related-product-actions {
      flex-direction: column;
      gap: 0.3rem;
    }

    .related-product-btn {
      padding: 0.35rem;
      font-size: 0.7rem;
    }
  }
    transform: translateY(-50%);
    width: 36px;
    height: 36px;
    background: var(--white);
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 16px;
    color: var(--text-color-dark);
    transition: all var(--transition-speed) var(--transition-timing);
    z-index: 2;
    box-shadow: var(--shadow-sm);
  }

  .slider-button:hover {
    background: var(--primary-color);
    color: var(--white);
    border-color: var(--primary-color);
    box-shadow: var(--shadow-md);
  }

  .slider-button.prev {
    left: -18px;
  }

  .slider-button.next {
    right: -18px;
  }

  .slider-button:disabled {
    opacity: 0.3;
    cursor: not-allowed;
    background: var(--background-light);
    color: var(--text-color-light);
  }

  .slider-button:disabled:hover {
    background: var(--background-light);
    color: var(--text-color-light);
    border-color: var(--border-color);
  }

  /* Fullscreen Modal Styles */
  .fullscreen-modal {
    position: fixed !important;
    top: 0 !important;
    left: 0 !important;
    width: 100vw !important;
    height: 100vh !important;
    background: rgba(0, 0, 0, 0.95) !important;
    z-index: 9999 !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    backdrop-filter: blur(3px);
  }

  .fullscreen-modal .modal-dialog {
    max-width: none !important;
    width: 100% !important;
    height: 100% !important;
    margin: 0 !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    position: relative !important;
  }

  .fullscreen-modal .modal-content {
    background: transparent !important;
    border: none !important;
    border-radius: 0 !important;
    box-shadow: none !important;
    width: 100% !important;
    height: 100% !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    position: relative !important;
  }

  .fullscreen-modal .modal-header,
  .fullscreen-modal .modal-footer {
    display: none !important;
  }

  .fullscreen-modal .modal-body {
    padding: 0 !important;
    width: 100% !important;
    height: 100% !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    position: relative !important;
    background: transparent !important;
  }

  .modal-image-container {
    position: relative;
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    overflow: hidden;
    padding: 0;
  }

  .modal-image-wrapper {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    align-items: center;
    justify-content: center;
    width: calc(100vw - 140px); /* Account for nav buttons */
    height: calc(100vh - 100px); /* Account for close button and counter */
    max-width: calc(100vw - 140px);
    max-height: calc(100vh - 100px);
    background: transparent;
    border-radius: 8px;
    overflow: hidden;
  }

  .modal-close-btn {
    position: absolute;
    top: 20px;
    right: 20px;
    background: rgba(255, 255, 255, 0.9);
    border: none;
    width: 44px;
    height: 44px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 10001;
    transition: all 0.2s ease;
    color: var(--text-color-dark);
    font-size: 18px;
    font-weight: 600;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  }

  .modal-close-btn:hover {
    background: rgba(255, 255, 255, 1);
    transform: scale(1.1);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
  }

  .modal-nav-btn {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(255, 255, 255, 0.9);
    border: none;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 10001;
    transition: all 0.2s ease;
    color: var(--text-color-dark);
    font-size: 24px;
    font-weight: 600;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  }

  .modal-nav-btn:hover {
    background: rgba(255, 255, 255, 1);
    transform: translateY(-50%) scale(1.1);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
  }

  .modal-nav-btn.prev {
    left: 20px;
  }

  .modal-nav-btn.next {
    right: 20px;
  }

  .modal-nav-btn:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }

  .modal-nav-btn:disabled:hover {
    transform: translateY(-50%) scale(1);
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  }

  .modal-image-counter {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(255, 255, 255, 0.9);
    padding: 8px 16px;
    border-radius: 20px;
    font-size: 14px;
    font-weight: 600;
    color: var(--text-color-dark);
    z-index: 10001;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  }

  @media (max-width: 768px) {
    .modal-close-btn {
      top: 10px;
      right: 10px;
      width: 40px;
      height: 40px;
      font-size: 16px;
    }

    .modal-nav-btn {
      width: 44px;
      height: 44px;
      font-size: 20px;
    }

    .modal-nav-btn.prev {
      left: 10px;
    }

    .modal-nav-btn.next {
      right: 10px;
    }

    .modal-image-counter {
      bottom: 10px;
      padding: 6px 12px;
      font-size: 12px;
    }

    .modal-image-wrapper {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: calc(100vw - 88px); /* Account for smaller nav buttons on mobile */
      height: calc(100vh - 80px); /* Account for smaller controls on mobile */
      max-width: calc(100vw - 88px);
      max-height: calc(100vh - 80px);
    }
  }

  /* Responsive Design */
  @media (max-width: 991.98px) {
    .sidebar-card {
      position: relative;
      top: auto;
      margin-top: var(--spacing-2xl);
    }

    .product-title {
      font-size: 1.5rem;
    }

    .current-price {
      font-size: 1.75rem;
    }

    .product-detail-page-container {
      padding: var(--spacing-lg);
    }
  }

  @media (max-width: 767.98px) {
    .product-detail-page-container {
      padding: var(--spacing-md);
    }

    .product-title {
      font-size: 1.25rem;
    }

    .current-price {
      font-size: 1.5rem;
    }

    .action-buttons {
      gap: var(--spacing-sm);
    }

    .btn-add-to-cart,
    .btn-buy-now {
      padding: var(--spacing-sm) var(--spacing-md);
      font-size: 13px;
    }

    .related-product-item {
      flex: 0 0 220px;
      min-width: 220px;
    }

    .slider-button {
      width: 32px;
      height: 32px;
      font-size: 14px;
    }

    .slider-button.prev {
      left: -16px;
    }

    .slider-button.next {
      right: -16px;
    }

    .sidebar-card .card-body {
      padding: var(--spacing-lg);
    }

    .product-tabs .nav-pills {
      padding: var(--spacing-md);
    }

    .product-tabs .tab-content {
      padding: var(--spacing-lg);
    }
  }

  @media (max-width: 575.98px) {
    .action-buttons {
      flex-direction: column;
    }

    .share-buttons {
      justify-content: center;
    }

    .related-products {
      padding: var(--spacing-lg);
    }

    .related-product-item {
      flex: 0 0 200px;
      min-width: 200px;
    }
  }

  /* ===================================================================
     Product Description Content Styling
     =================================================================== */
  .product-description-content {
    font-size: 0.875rem;
    line-height: 1.6;
    color: var(--text-color);
    word-wrap: break-word;
    overflow-wrap: break-word;
  }

  .product-description-content * {
    max-width: 100%;
    box-sizing: border-box;
  }

  /* Typography */
  .product-description-content p {
    margin-bottom: 1rem;
    line-height: 1.6;
  }

  .product-description-content h1,
  .product-description-content h2,
  .product-description-content h3,
  .product-description-content h4,
  .product-description-content h5,
  .product-description-content h6 {
    color: var(--primary-color);
    font-weight: 600;
    margin: 1.5rem 0 0.75rem 0;
    line-height: 1.3;
  }

  .product-description-content h1 { font-size: 1.5rem; }
  .product-description-content h2 { font-size: 1.375rem; }
  .product-description-content h3 { font-size: 1.25rem; }
  .product-description-content h4 { font-size: 1.125rem; }
  .product-description-content h5 { font-size: 1rem; }
  .product-description-content h6 { font-size: 0.875rem; }

  /* Lists */
  .product-description-content ul,
  .product-description-content ol {
    margin: 1rem 0;
    padding-left: 1.5rem;
  }

  .product-description-content li {
    margin-bottom: 0.5rem;
    line-height: 1.5;
  }

  /* Images */
  .product-description-content img {
    max-width: 250px !important;
    width: auto !important;
    height: auto !important;
    border-radius: var(--border-radius);
    box-shadow: var(--shadow-sm);
    margin: 1rem auto;
    display: block;
  }

  .product-description-content figure {
    margin: 1rem 0;
    text-align: center;
  }

  .product-description-content figcaption {
    font-size: 0.75rem;
    color: var(--text-color-light);
    margin-top: 0.5rem;
    font-style: italic;
  }

  /* Tables */
  .product-description-content table {
    width: 100%;
    border-collapse: collapse;
    margin: 1.5rem 0;
    font-size: 0.875rem;
    background: var(--white);
    border-radius: var(--border-radius);
    overflow: hidden;
    box-shadow: var(--shadow-sm);
  }

  .product-description-content table th,
  .product-description-content table td {
    padding: 0.75rem;
    text-align: left;
    border-bottom: 1px solid var(--border-color);
    vertical-align: top;
  }

  .product-description-content table th {
    background: var(--background-light);
    color: var(--text-color-dark);
    font-weight: 600;
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .product-description-content table tr:last-child td {
    border-bottom: none;
  }

  .product-description-content table tr:hover {
    background: var(--background-light);
  }

  /* Links */
  .product-description-content a {
    color: var(--primary-color);
    text-decoration: none;
    border-bottom: 1px solid transparent;
    transition: all var(--transition-speed) var(--transition-timing);
  }

  .product-description-content a:hover {
    color: var(--primary-color-dark);
    border-bottom-color: var(--primary-color);
  }

  /* Blockquotes */
  .product-description-content blockquote {
    margin: 1.5rem 0;
    padding: 1rem 1.5rem;
    border-left: 4px solid var(--primary-color);
    background: var(--background-light);
    border-radius: 0 var(--border-radius) var(--border-radius) 0;
    font-style: italic;
  }

  /* Code */
  .product-description-content code {
    background: var(--background-light);
    color: var(--primary-color);
    padding: 0.2rem 0.4rem;
    border-radius: 4px;
    font-family: 'Courier New', monospace;
    font-size: 0.8rem;
  }

  .product-description-content pre {
    background: var(--background-light);
    color: var(--text-color-dark);
    padding: 1rem;
    border-radius: var(--border-radius);
    overflow-x: auto;
    margin: 1rem 0;
    font-family: 'Courier New', monospace;
    font-size: 0.8rem;
    line-height: 1.4;
  }

  .product-description-content pre code {
    background: none;
    color: inherit;
    padding: 0;
  }

  /* Dividers */
  .product-description-content hr {
    border: none;
    height: 1px;
    background: var(--border-color);
    margin: 2rem 0;
  }

  /* Strong and emphasis */
  .product-description-content strong,
  .product-description-content b {
    color: var(--text-color-dark);
    font-weight: 600;
  }

  .product-description-content em,
  .product-description-content i {
    font-style: italic;
    color: var(--text-color);
  }

  /* Video and iframe responsiveness */
  .product-description-content iframe,
  .product-description-content video,
  .product-description-content embed,
  .product-description-content object {
    max-width: 100%;
    height: auto;
    margin: 1rem 0;
    border-radius: var(--border-radius);
  }

  /* Responsive iframe wrapper */
  .product-description-content .video-wrapper {
    position: relative;
    padding-bottom: 56.25%; /* 16:9 aspect ratio */
    height: 0;
    overflow: hidden;
    margin: 1rem 0;
    border-radius: var(--border-radius);
  }

  .product-description-content .video-wrapper iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    margin: 0;
  }

  /* Mobile responsiveness */
  @media (max-width: 768px) {
    .product-description-content {
      font-size: 0.8rem;
    }

    .product-description-content h1 { font-size: 1.25rem; }
    .product-description-content h2 { font-size: 1.125rem; }
    .product-description-content h3 { font-size: 1rem; }
    .product-description-content h4 { font-size: 0.95rem; }
    .product-description-content h5 { font-size: 0.9rem; }
    .product-description-content h6 { font-size: 0.85rem; }

    .product-description-content table {
      font-size: 0.75rem;
    }

    .product-description-content table th,
    .product-description-content table td {
      padding: 0.5rem;
    }
  }

  /* ===================================================================
     Page Navigator Styling
     =================================================================== */
  .page-navigator {
    border-top: 1px solid var(--border-color);
    padding-top: 1rem;
  }

  .navigator-title {
    font-size: 0.9rem;
    font-weight: 600;
    color: var(--text-color-dark);
    margin-bottom: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .navigator-links {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .nav-link-btn {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem;
    background: transparent;
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius);
    color: var(--text-color);
    text-decoration: none;
    transition: all var(--transition-speed) var(--transition-timing);
    cursor: pointer;
    font-size: 0.875rem;
    width: 100%;
    text-align: left;
  }

  .nav-link-btn:hover {
    background: var(--background-light);
    border-color: var(--primary-color);
    color: var(--primary-color);
    transform: translateX(2px);
  }

  .nav-link-btn:focus {
    outline: none;
    box-shadow: 0 0 0 2px var(--primary-color-light);
  }

  .nav-link-btn i {
    font-size: 1rem;
    width: 16px;
    text-align: center;
    color: var(--primary-color);
  }

  .nav-link-btn span {
    font-weight: 500;
  }

  /* Mobile responsiveness for navigator */
  @media (max-width: 992px) {
    .page-navigator {
      display: none;
    }

    /* Hide desktop action buttons on mobile */
    .action-buttons {
      display: none;
    }
  }

  /* ===================================================================
     Mobile Sticky Bottom Bar
     =================================================================== */
  .mobile-sticky-bottom {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: var(--white);
    border-top: 1px solid var(--border-color);
    padding: 1rem;
    z-index: 1000;
    box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
    display: none;
  }

  .mobile-action-buttons {
    display: flex;
    gap: 0.75rem;
    max-width: 500px;
    margin: 0 auto;
  }

  .mobile-btn-add-to-cart,
  .mobile-btn-buy-now {
    flex: 1;
    padding: 0.875rem 1rem;
    font-weight: 600;
    font-size: 0.95rem;
    border-radius: var(--border-radius);
    border: 2px solid var(--primary-color);
    transition: all var(--transition-speed) var(--transition-timing);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
  }

  .mobile-btn-add-to-cart {
    background: var(--white);
    color: var(--primary-color);
  }

  .mobile-btn-add-to-cart:hover:not(:disabled) {
    background: var(--primary-color-light);
    color: var(--primary-color);
    border-color: var(--primary-color);
  }

  .mobile-btn-buy-now {
    background: var(--primary-color);
    color: var(--white);
    border-color: var(--primary-color);
  }

  .mobile-btn-buy-now:hover:not(:disabled) {
    background: var(--primary-color-dark);
    color: var(--white);
    border-color: var(--primary-color-dark);
  }

  .mobile-btn-add-to-cart:disabled,
  .mobile-btn-buy-now:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  /* Show mobile bar only on mobile devices */
  @media (max-width: 992px) {
    .mobile-sticky-bottom {
      display: block;
    }

    /* Add bottom padding to container to prevent content overlap */
    .container {
      padding-bottom: 100px;
    }
  }

  /* Hide mobile bar on desktop */
  @media (min-width: 993px) {
    .mobile-sticky-bottom {
      display: none;
    }
  }

  /* ===================================================================
     Section Titles Styling
     =================================================================== */
  .section-title {
    color: var(--primary-color);
    font-weight: 600;
    font-size: 1.25rem;
    margin-bottom: 1rem;
    padding-bottom: 0.75rem;
    border-bottom: 2px solid var(--primary-color);
    position: relative;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .section-title i {
    color: var(--primary-color);
    font-size: 1.1rem;
  }

  .section-title::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 50px;
    height: 2px;
    background: var(--primary-color-light);
    border-radius: 1px;
  }

  /* Apply to existing section titles */
  .card-body h5:first-child,
  .product-attributes h5,
  .navigator-title {
    color: var(--primary-color);
    font-weight: 600;
    margin-bottom: 1rem;
    padding-bottom: 0.75rem;
    border-bottom: 2px solid var(--primary-color);
    position: relative;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .card-body h5:first-child::after,
  .product-attributes h5::after,
  .navigator-title::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 50px;
    height: 2px;
    background: var(--primary-color-light);
    border-radius: 1px;
  }

  .card-body h5:first-child i,
  .product-attributes h5 i,
  .navigator-title i {
    color: var(--primary-color);
    font-size: 1.1rem;
  }

  /* Related products title */
  .related-products h3 {
    color: var(--primary-color);
    font-weight: 600;
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
    padding-bottom: 0.75rem;
    border-bottom: 2px solid var(--primary-color);
    position: relative;
  }

  .related-products h3::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 60px;
    height: 2px;
    background: var(--primary-color-light);
    border-radius: 1px;
  }

  /* Mobile responsiveness for section titles */
  @media (max-width: 768px) {
    .section-title,
    .card-body h5:first-child,
    .product-attributes h5,
    .navigator-title {
      font-size: 1.1rem;
    }

    .related-products h3 {
      font-size: 1.3rem;
    }

    .section-title::after,
    .card-body h5:first-child::after,
    .product-attributes h5::after,
    .navigator-title::after,
    .related-products h3::after {
      width: 40px;
    }
  }
`,fr=()=>{const{id:s}=$e(),C=Pe(),x=ie(),{addToCart:g,isInCart:v}=De(),n=o.useMemo(()=>parseInt(s||"0",10),[s]),{data:t,isLoading:m,isFetching:N,isError:f,error:l}=Ye(n,{skip:!n}),{data:j}=He({page:1,limit:4,category:(t==null?void 0:t.category)||void 0},{skip:!(t!=null&&t.category)}),_=(j==null?void 0:j.data)||[],[p,k]=o.useState(""),[c,z]=o.useState(!1),[h,M]=o.useState(1),[w,b]=o.useState({}),[i,u]=o.useState(!1);o.useState(0);const[S,F]=o.useState(0),[I,Y]=o.useState(!1),q=r=>{C(`/search?q=${encodeURIComponent(r)}`)};o.useEffect(()=>{if(t)try{k(t.getMainImage()),z(!1);const r={};t.variants&&typeof t.variants=="object"&&Object.entries(t.variants).forEach(([a,d])=>{Array.isArray(d)&&d.length&&(r[a]=d[0])}),b(r)}catch(r){console.error("Error initializing product data:",r),k("/media/svg/files/blank-image.svg"),z(!0)}},[t]),o.useEffect(()=>{const r=()=>{i&&u(!1)};return i?(window.history.pushState({modalOpen:!0},""),window.addEventListener("popstate",r),document.body.style.overflow="hidden"):document.body.style.overflow="",()=>{window.removeEventListener("popstate",r),document.body.style.overflow=""}},[i]),o.useEffect(()=>{const r=d=>{d.key==="Escape"&&i&&u(!1)},a=d=>{i&&B.length>1&&(d.key==="ArrowLeft"?(d.preventDefault(),re()):d.key==="ArrowRight"&&(d.preventDefault(),te()))};return document.addEventListener("keydown",r),document.addEventListener("keydown",a),()=>{document.removeEventListener("keydown",r),document.removeEventListener("keydown",a)}},[i,S]);const R=o.useMemo(()=>t&&Number(t.price_1)||0,[t]),E=o.useMemo(()=>t&&Number(t.price_2)||0,[t]),Q=o.useMemo(()=>t&&E>R?Math.round((E-R)/E*100):0,[t,R,E]),se=o.useMemo(()=>{var r;return((r=t==null?void 0:t.stock)==null?void 0:r.items_sold)??0},[t]),G=o.useMemo(()=>{var r;return((r=t==null?void 0:t.stock)==null?void 0:r.total_items)??0},[t]),H=o.useMemo(()=>Math.floor(Math.random()*901)+100,[]);o.useMemo(()=>G?Math.min(100,se/G*100):0,[G,se]);const D=o.useMemo(()=>G>0&&H<=0,[G,H]),fe=r=>{const a=parseInt(r.target.value,10);if(isNaN(a)||a<1)return M(1);if(a>H)return x($({message:`Only ${H} available`,type:"warning"})),M(H);M(a)},we=(r,a)=>b(d=>({...d,[r]:a})),ne=async()=>{try{if(D||h<1){x($({message:"Cannot add to cart – out of stock or invalid quantity.",type:"error"}));return}const r={color:w.Color||w.color||"",size:w.Size||w.size||"",...w};t&&await g(t,h,r)&&M(1)}catch(r){console.error("Error in onAddToCart:",r),x($({message:"Failed to add item to cart",type:"error"}))}},le=async()=>{if(D||h<1){x($({message:"Cannot proceed – out of stock or invalid quantity.",type:"error"}));return}const r={color:w.Color||w.color||"",size:w.Size||w.size||"",...w};if(t){if(!he&&!await g(t,h,r)){x($({message:"Failed to add item to cart",type:"error"}));return}x($({message:"Proceeding to checkout...",type:"info"})),C("/checkout")}},ye=r=>{const a=Math.floor(r),d=r%1>=.5,V=5-a-(d?1:0);return e.jsxs(e.Fragment,{children:[Array(a).fill(0).map((Ie,ae)=>e.jsx("i",{className:"bi bi-star-fill"},`f${ae}`)),d&&e.jsx("i",{className:"bi bi-star-half"}),Array(V).fill(0).map((Ie,ae)=>e.jsx("i",{className:"bi bi-star"},`e${ae}`))]})},je=()=>{const r=document.querySelector(".related-products-container");r&&r.scrollBy({left:-300,behavior:"smooth"})},ke=()=>{const r=document.querySelector(".related-products-container");r&&r.scrollBy({left:300,behavior:"smooth"})},B=o.useMemo(()=>{if(!t)return[];try{const r=t.getMainImage&&typeof t.getMainImage=="function"?t.getMainImage():t.feature_photo||"/media/svg/files/blank-image.svg",a=t.getAllImages&&typeof t.getAllImages=="function"?t.getAllImages()||[]:[],d=new Set([r,...a].filter(Boolean));return Array.from(d)}catch(r){return console.error("Error generating gallery:",r),["/media/svg/files/blank-image.svg"]}},[t]),Ne=r=>{const a=B.findIndex(V=>V===r),d=a>=0?a:0;F(d),u(!0)},re=()=>{S>0&&F(S-1)},te=()=>{S<B.length-1&&F(S+1)},ce=()=>{u(!1)},de=o.useMemo(()=>B.length?B[S]||B[0]||p||"/media/svg/files/blank-image.svg":p||"/media/svg/files/blank-image.svg",[B,S,p]),[me,ze]=o.useState(null),[pe,ue]=o.useState(null),he=o.useMemo(()=>{if(!t)return!1;const r={color:w.Color||w.color||"",size:w.Size||w.size||"",...w};return v(t.id,r)},[t,w,v]),Se=r=>{ue(null),ze(r.targetTouches[0].clientX)},Ce=r=>{ue(r.targetTouches[0].clientX)},_e=()=>{if(!me||!pe)return;const r=me-pe,a=r>50,d=r<-50;a&&B.length>1&&te(),d&&B.length>1&&re()};if(m||N)return e.jsxs(e.Fragment,{children:[e.jsx("style",{dangerouslySetInnerHTML:{__html:X}}),e.jsxs(U,{className:"pdp-loading-container text-center my-5",children:[e.jsx(J,{animation:"border",role:"status"}),e.jsx("h4",{children:"Loading product details…"})]})]});if(f){let r="Unexpected error occurred.";if(typeof l=="string")r=l;else if(l&&typeof l=="object"){const a=l;a.data?typeof a.data=="string"?r=a.data:a.data.message?r=a.data.message:a.data.error&&(r=a.data.error):a.message?r=a.message:a.status&&(r=`Error ${a.status}: Failed to load product`)}return e.jsxs(e.Fragment,{children:[e.jsx("style",{dangerouslySetInnerHTML:{__html:X}}),e.jsxs(U,{className:"pdp-error-container text-center my-5",children:[e.jsx("h4",{className:"mb-3",style:{color:"var(--primary-color)"},children:"Could not load product."}),e.jsx("p",{children:r}),e.jsx(y,{onClick:()=>window.location.reload(),children:"Retry"})]})]})}return t?e.jsxs(e.Fragment,{children:[e.jsx("style",{dangerouslySetInnerHTML:{__html:X}}),e.jsx(We,{}),e.jsxs(U,{className:"my-0",children:[e.jsxs(O,{children:[e.jsxs(P,{lg:8,md:7,children:[e.jsx(T,{className:"border-0 shadow-none",children:e.jsx(T.Body,{className:"p-4 product-detail-page-container",children:e.jsxs(O,{children:[e.jsxs(P,{md:6,className:"mb-2",children:[e.jsxs("div",{className:"product-image-gallery",children:[e.jsxs("div",{className:"main-image-wrapper",onClick:()=>Ne(p),children:[e.jsx(oe,{src:c?"/media/svg/files/blank-image.svg":p,alt:t.name,className:"img-fluid",onError:()=>z(!0),style:{width:"100%",height:"100%",objectFit:"contain",cursor:"pointer",transition:"transform var(--transition-speed) var(--transition-timing)"},objectFit:"contain",loaderBackgroundColor:"var(--background-light)",loaderForegroundColor:"var(--border-color)"}),Q>0&&e.jsxs("span",{className:"discount-badge",children:["-",Q,"%"]})]}),e.jsx("div",{className:"thumbnail-row mt-3",children:B.map((r,a)=>e.jsx("div",{className:`thumb-wrapper ${r===p?"selected-thumb":""}`,onClick:()=>{k(r),z(!1)},children:e.jsx(oe,{src:r,alt:`Thumb ${a+1}`,style:{width:"100%",height:"100%",objectFit:"contain",cursor:"pointer"},objectFit:"contain",loaderBackgroundColor:"var(--background-light)",loaderForegroundColor:"var(--border-color)"})},a))})]}),e.jsx("hr",{className:"my-2",style:{borderColor:"lightgrey"}}),e.jsxs("div",{className:"share-buttons",children:[e.jsx("span",{className:"fw-semibold me-2",children:"Share:"}),e.jsx("a",{href:`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`,target:"_blank",rel:"noopener noreferrer",className:"btn btn-facebook",title:"Share on Facebook",children:e.jsx("i",{className:"bi bi-facebook"})}),e.jsx("a",{href:`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(t.name)}`,target:"_blank",rel:"noopener noreferrer",className:"btn btn-twitter",title:"Share on Twitter",children:e.jsx("i",{className:"bi bi-twitter-x"})}),e.jsx("a",{href:`https://wa.me/?text=${encodeURIComponent(t.name+" "+window.location.href)}`,target:"_blank",rel:"noopener noreferrer",className:"btn btn-whatsapp",title:"Share on WhatsApp",children:e.jsx("i",{className:"bi bi-whatsapp"})})]})]}),e.jsxs(P,{md:6,className:"mb-4",children:[e.jsxs("div",{className:"d-flex justify-content-between align-items-start mb-3",children:[e.jsx("span",{className:"category-badge",children:t.category_text||"Uncategorized"}),e.jsx(qe,{productId:t.id,productName:t.name,variant:"icon",size:"md"})]}),e.jsx("h1",{className:"product-title",children:t.name}),t.rating&&Number(t.rating)>0&&e.jsxs("div",{className:"rating-container mb-4",children:[e.jsx("div",{className:"rating-stars",children:ye(Number(t.rating))}),e.jsx("span",{className:"rating-value",children:Number(t.rating).toFixed(1)}),e.jsxs("span",{className:"rating-count",children:["(",Number(t.reviewsCount)||0," review",(Number(t.reviewsCount)||0)!==1?"s":"",")"]})]}),Array.isArray(t.attributes_array)&&t.attributes_array.length>0&&e.jsxs("div",{className:"product-attributes",children:[e.jsx("h5",{children:"Specifications"}),e.jsx("div",{className:"attributes-grid",children:t.attributes_array.map((r,a)=>e.jsxs("div",{className:"attribute-row",children:[e.jsx("span",{className:"attribute-label",children:(r==null?void 0:r.name)||"Unknown"}),e.jsx("span",{className:"attribute-value",children:(r==null?void 0:r.value)||"N/A"})]},a))})]}),(!Array.isArray(t.attributes_array)||t.attributes_array.length===0)&&e.jsxs("div",{className:"product-attributes",children:[e.jsx("h5",{children:"Product Information"}),e.jsxs("div",{className:"attributes-grid",children:[e.jsxs("div",{className:"attribute-row",children:[e.jsx("span",{className:"attribute-label",children:"Category"}),e.jsx("span",{className:"attribute-value",children:t.category_text||"Uncategorized"})]}),e.jsxs("div",{className:"attribute-row",children:[e.jsx("span",{className:"attribute-label",children:"Product ID"}),e.jsx("span",{className:"attribute-value",children:t.id||"N/A"})]}),t.local_id&&e.jsxs("div",{className:"attribute-row",children:[e.jsx("span",{className:"attribute-label",children:"SKU"}),e.jsx("span",{className:"attribute-value",children:t.local_id})]}),e.jsxs("div",{className:"attribute-row",children:[e.jsx("span",{className:"attribute-label",children:"Availability"}),e.jsx("span",{className:"attribute-value",children:t.in_stock===1?"In Stock":"Out of Stock"})]}),t.has_colors==="Yes"&&t.colors&&e.jsxs("div",{className:"attribute-row",children:[e.jsx("span",{className:"attribute-label",children:"Available Colors"}),e.jsx("span",{className:"attribute-value",children:t.colors})]}),t.has_sizes==="Yes"&&t.sizes&&e.jsxs("div",{className:"attribute-row",children:[e.jsx("span",{className:"attribute-label",children:"Available Sizes"}),e.jsx("span",{className:"attribute-value",children:t.sizes})]})]})]}),Array.isArray(t.tags_array)&&t.tags_array.length>0&&e.jsx("div",{style:{marginTop:"1rem"},children:e.jsx("div",{className:"product-tags",children:t.tags_array.map((r,a)=>e.jsx("span",{className:"product-tag",onClick:()=>q(r),title:`Search for products with tag: ${r}`,role:"button",tabIndex:0,onKeyDown:d=>{(d.key==="Enter"||d.key===" ")&&(d.preventDefault(),q(r))},children:r},a))})})]})]})})}),e.jsx(T,{className:"border-0 shadow-sm mt-4",children:e.jsxs(T.Body,{className:"p-4",children:[e.jsxs("h5",{className:"section-title",children:[e.jsx("i",{className:"bi bi-file-text"}),"Product Description"]}),t.description?e.jsx("div",{className:"product-description-content",dangerouslySetInnerHTML:{__html:t.description}}):e.jsx("p",{className:"text-muted",children:"No description available for this product."})]})})]}),e.jsx(P,{lg:4,md:5,children:e.jsx("div",{className:"sidebar-card",children:e.jsxs("div",{className:"card-body",children:[e.jsxs("div",{className:"pricing-section",children:[e.jsxs("div",{className:"d-flex align-items-center flex-wrap",children:[e.jsxs("div",{className:"current-price",children:["UGX ",R.toLocaleString()]}),E>R&&e.jsxs("span",{className:"old-price",children:["UGX ",E.toLocaleString()]})]}),Q>0&&e.jsxs("span",{className:"savings-badge",children:["Save ",Q,"%"]})]}),t.variants&&typeof t.variants=="object"&&Object.keys(t.variants).length>0&&e.jsx("div",{className:"variants-section mb-0",children:Object.entries(t.variants).map(([r,a])=>Array.isArray(a)&&a.length>0?e.jsxs("div",{className:"mb-3",children:[e.jsxs("label",{className:"variant-label",children:[r,":"]}),e.jsx("div",{className:"variant-options",children:a.map(d=>e.jsx("button",{type:"button",className:`variant-btn ${w[r]===d?"active":""}`,onClick:()=>we(r,d),children:d},d))})]},r):null)}),e.jsxs("div",{className:"quantity-section w-100 mt-0",children:[e.jsx("label",{className:"quantity-label",children:"Quantity:"}),e.jsx(L.Control,{type:"number",min:"1",max:H,value:h,onChange:fe,disabled:D,className:"quantity-input w-100"})]}),e.jsxs("div",{className:"action-buttons",children:[e.jsxs(y,{className:"btn-add-to-cart",onClick:ne,disabled:D,children:[e.jsx("i",{className:"bi bi-cart-plus"}),"Add to Cart"]}),e.jsxs(y,{className:"btn-buy-now",onClick:le,disabled:D,children:[e.jsx("i",{className:"bi bi-lightning"}),"Buy Now"]}),he&&e.jsxs(y,{className:"btn-checkout",onClick:()=>C("/checkout"),variant:"success",children:[e.jsx("i",{className:"bi bi-check-circle me-2"}),"Proceed to Checkout"]})]}),e.jsxs("div",{className:"page-navigator mt-4",children:[e.jsxs("h6",{className:"navigator-title",children:[e.jsx("i",{className:"bi bi-list-ul"}),"Quick Navigation"]}),e.jsxs("div",{className:"navigator-links",children:[e.jsxs("button",{type:"button",className:"nav-link-btn",onClick:()=>{const r=document.querySelector(".product-description-content");r==null||r.scrollIntoView({behavior:"smooth",block:"start"})},children:[e.jsx("i",{className:"bi bi-file-text"}),e.jsx("span",{children:"Description"})]}),e.jsxs("button",{type:"button",className:"nav-link-btn",onClick:()=>{const r=document.querySelector('[data-section="reviews"]');r==null||r.scrollIntoView({behavior:"smooth",block:"start"})},children:[e.jsx("i",{className:"bi bi-star"}),e.jsx("span",{children:"Reviews"})]}),e.jsxs("button",{type:"button",className:"nav-link-btn",onClick:()=>{const r=document.querySelector(".related-products");r==null||r.scrollIntoView({behavior:"smooth",block:"start"})},children:[e.jsx("i",{className:"bi bi-grid"}),e.jsx("span",{children:"Related Products"})]})]})]})]})})})]}),e.jsx(O,{className:"mt-4",children:e.jsx(P,{xs:12,className:"mb-4",children:e.jsx("div",{"data-section":"reviews",children:e.jsx(Ue,{productId:t.id,onWriteReviewClick:()=>Y(!0),showWriteReviewButton:!0})})})}),e.jsx(A,{show:i,onHide:ce,size:"xl",centered:!0,className:"fullscreen-modal",backdrop:"static",children:e.jsx(A.Body,{children:e.jsxs("div",{className:"modal-image-container",onTouchStart:Se,onTouchMove:Ce,onTouchEnd:_e,children:[e.jsx("button",{className:"modal-close-btn",onClick:ce,"aria-label":"Close modal",children:"×"}),B.length>1&&e.jsxs(e.Fragment,{children:[e.jsx("button",{className:"modal-nav-btn prev",onClick:re,disabled:S===0,"aria-label":"Previous image",children:"‹"}),e.jsx("button",{className:"modal-nav-btn next",onClick:te,disabled:S===B.length-1,"aria-label":"Next image",children:"›"})]}),e.jsx("div",{className:"modal-image-wrapper",children:de?e.jsx(oe,{src:de,alt:`${t.name} - Image ${S+1}`,width:"100%",height:"100%",style:{width:"100%",height:"100%",maxWidth:"100%",maxHeight:"100%",objectFit:"contain",borderRadius:"0px",display:"block"},objectFit:"contain",loaderBackgroundColor:"rgba(255, 255, 255, 0.2)",loaderForegroundColor:"rgba(255, 255, 255, 0.4)",loaderSpeed:1.2,onError:r=>{}}):e.jsx("div",{style:{width:"100%",height:"100%",display:"flex",alignItems:"center",justifyContent:"center",background:"rgba(255, 255, 255, 0.1)",color:"rgba(255, 255, 255, 0.7)",fontSize:"18px"},children:"No image available"})}),B.length>1&&e.jsxs("div",{className:"modal-image-counter",children:[S+1,"/",B.length]})]})})})]}),_.length>0&&e.jsx(U,{className:"mt-4",children:e.jsxs("div",{className:"related-products",children:[e.jsx("h3",{children:"Related Products"}),e.jsxs("div",{className:"related-products-slider",children:[e.jsx("button",{className:"slider-button prev",onClick:je,type:"button","aria-label":"Previous products",children:"‹"}),e.jsx("div",{className:"related-products-container",children:_.map(r=>e.jsx("div",{className:"related-product-item",children:e.jsxs("div",{className:"related-product-card",children:[e.jsx("div",{className:"related-product-image",children:e.jsx("img",{src:Z.img(r.feature_photo),alt:r.name,onError:a=>{const d=a.target;d.src=Z.img("default.png")}})}),e.jsxs("div",{className:"related-product-content",children:[e.jsx(be,{to:`/product/${r.id}`,className:"related-product-title",children:r.name}),e.jsxs("div",{className:"related-product-price",children:[e.jsxs("span",{className:"related-product-price-current",children:["£",r.price_2||r.price_1]}),r.price_2&&parseFloat(r.price_2)<parseFloat(r.price_1)&&e.jsxs(e.Fragment,{children:[e.jsxs("span",{className:"related-product-price-original",children:["£",r.price_1]}),e.jsxs("span",{className:"related-product-discount",children:["-",Math.round((parseFloat(r.price_1)-parseFloat(r.price_2))/parseFloat(r.price_1)*100),"%"]})]})]}),e.jsxs("div",{className:"related-product-actions",children:[e.jsx("button",{className:"related-product-btn related-product-btn-primary",onClick:async()=>{try{await g(r,1)&&x($({message:`${r.name} added to cart!`,type:"success"}))}catch{x($({message:"Failed to add item to cart",type:"error"}))}},children:"+ Cart"}),e.jsx(be,{to:`/product/${r.id}`,className:"related-product-btn related-product-btn-outline",children:"View"})]})]})]})},r.id))}),e.jsx("button",{className:"slider-button next",onClick:ke,type:"button","aria-label":"Next products",children:"›"})]})]})}),e.jsx("div",{className:"mobile-sticky-bottom",children:e.jsxs("div",{className:"mobile-action-buttons",children:[e.jsxs(y,{className:"mobile-btn-add-to-cart",onClick:ne,disabled:D,children:[e.jsx("i",{className:"bi bi-cart-plus"}),"Add to Cart"]}),e.jsxs(y,{className:"mobile-btn-buy-now",onClick:le,disabled:D,children:[e.jsx("i",{className:"bi bi-lightning"}),"Buy Now"]})]})}),e.jsx(Oe,{productId:t.id,show:I,onHide:()=>Y(!1),asModal:!0,onReviewSubmitted:()=>{}})]}):e.jsxs(e.Fragment,{children:[e.jsx("style",{dangerouslySetInnerHTML:{__html:X}}),e.jsxs(U,{className:"pdp-not-found-container text-center my-5",children:[e.jsx("h4",{children:"Product not found."}),e.jsx(y,{variant:"outline-primary",onClick:()=>C("/"),children:"Back to Home"})]})]})};export{fr as default};
