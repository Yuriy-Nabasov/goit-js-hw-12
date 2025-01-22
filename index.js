import{a as h,S as f,i as a}from"./assets/vendor-B6jJ9_I0.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))y(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const d of s.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&y(d)}).observe(document,{childList:!0,subtree:!0});function o(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function y(r){if(r.ep)return;r.ep=!0;const s=o(r);fetch(r.href,s)}})();const b=e=>`
    <li class="gallery-item gallery-card">
      <a class="gallery-link" href="${e.largeImageURL}">
        <img
          class="gallery-image gallery-img"
          src="${e.webformatURL}"
          alt="${e.tags}"
        />
        <div class="gallery-info">
          <div class="info-item">
            <p>Likes</p>
            <span>${e.likes}</span>
          </div>
          <div class="info-item">
            <p>Views</p>
            <span>${e.views}</span>
          </div>
          <div class="info-item">
            <p>Comments</p>
            <span>${e.comments}</span>
          </div>
          <div class="info-item">
            <p>Downloads</p>
            <span>${e.downloads}</span>
          </div>
        </div>
      </a>
    </li>`,u=(e,t=1)=>{const o=new URLSearchParams({key:"48208866-6baf83551ffafce9b15eedbf6",q:e,image_type:"photo",orientation:"horizontal",safesearch:"true",page:t,per_page:15});return h.get(`https://pixabay.com/api/?${o}`)},v=document.querySelector(".js-search-form"),p=document.querySelector(".js-gallery"),n=document.querySelector(".js-loader"),i=document.querySelector(".js-load-more-btn");let c="",l=1;const g=15;let w=new f(".gallery a",{captions:!0,captionsData:"alt",captionDelay:250,animationSpeed:300,overlayOpacity:.8});const L=async e=>{try{e.preventDefault();const t=e.currentTarget.elements.user_query.value.trim();if(t===""){a.error({title:"Error",message:"❌ Поле має бути заповнено!",position:"topRight"});return}t!==c&&(c=t,l=1,p.innerHTML="",i.style.display="none"),n.style.display="block";const o=await u(c,l);if(n.style.display="none",o.data.hits.length===0){a.error({title:"Error",message:"❌ Sorry, there are no images matching your search query. Please try again!",position:"topRight"});return}m(o.data.hits),a.success({title:"Success",message:`🎉 Found ${o.data.totalHits} images!`,position:"topRight"}),o.data.totalHits>g&&(i.style.display="block")}catch(t){n.style.display="none",a.error({title:"Error",message:"❌ Something went wrong. Please try again.",position:"topRight"}),console.log(t)}},S=async()=>{try{l+=1,n.style.display="block",i.style.display="none";const e=await u(c,l);if(n.style.display="none",e.data.hits.length===0){a.info({title:"End",message:"We're sorry, but you've reached the end of search results.",position:"topRight"}),i.style.display="none";return}m(e.data.hits),l*g>=e.data.totalHits?(a.info({title:"End",message:"We're sorry, but you've reached the end of search results.",position:"topRight"}),i.style.display="none"):i.style.display="block";const{height:t}=p.firstElementChild.getBoundingClientRect();window.scrollBy({top:t*2,behavior:"smooth"})}catch(e){n.style.display="none",a.error({title:"Error",message:"❌ Something went wrong. Please try again.",position:"topRight"}),console.error(e)}},m=e=>{const t=e.map(b).join("");p.insertAdjacentHTML("beforeend",t),w.refresh()};v.addEventListener("submit",L);i.addEventListener("click",S);
//# sourceMappingURL=index.js.map
