import{a as m,S as f,i}from"./assets/vendor-B6jJ9_I0.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))u(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const d of r.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&u(d)}).observe(document,{childList:!0,subtree:!0});function o(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function u(s){if(s.ep)return;s.ep=!0;const r=o(s);fetch(s.href,r)}})();const v=e=>`
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
    </li>`,y=(e,t)=>{const o={params:{key:"48208866-6baf83551ffafce9b15eedbf6",q:e,image_type:"photo",orientation:"horizontal",safesearch:"true",page:t,per_page:15}};return m.get("https://pixabay.com/api/",o)},L=document.querySelector(".js-search-form"),p=document.querySelector(".js-gallery"),n=document.querySelector(".js-loader"),a=document.querySelector(".js-load-more-btn");let c="",l=1;const h=15;let b=new f(".gallery a",{captions:!0,captionsData:"alt",captionDelay:250,animationSpeed:300,overlayOpacity:.8});const w=async e=>{try{e.preventDefault();const t=e.currentTarget.elements.user_query.value.trim();if(t===""){i.error({title:"Error",message:"❌ Поле має бути заповнено!",position:"topRight"});return}t!==c&&(c=t,l=1,p.innerHTML="",a.classList.add("is-hidden")),n.style.display="block";const o=await y(c,l);if(n.style.display="none",o.data.hits.length===0){i.error({title:"Error",message:"❌ Sorry, there are no images matching your search query. Please try again!",position:"topRight"});return}g(o.data.hits),i.success({title:"Success",message:`🎉 Found ${o.data.totalHits} images!`,position:"topRight"}),o.data.totalHits>h&&a.classList.remove("is-hidden")}catch(t){n.style.display="none",i.error({title:"Error",message:"❌ Something went wrong. Please try again.",position:"topRight"}),console.log(t)}},S=async()=>{try{l+=1,n.style.display="block",a.classList.add("is-hidden");const e=await y(c,l);if(n.style.display="none",e.data.hits.length===0){i.info({title:"End",message:"We're sorry, but you've reached the end of search results.",position:"topRight"}),a.classList.add("is-hidden");return}g(e.data.hits),l*h>=e.data.totalHits?(i.info({title:"End",message:"We're sorry, but you've reached the end of search results.",position:"topRight"}),a.classList.add("is-hidden")):a.classList.remove("is-hidden");const{height:t}=p.firstElementChild.getBoundingClientRect();window.scrollBy({top:t*2,behavior:"smooth"})}catch(e){n.style.display="none",i.error({title:"Error",message:"❌ Something went wrong. Please try again.",position:"topRight"}),console.error(e)}},g=e=>{const t=e.map(v).join("");p.insertAdjacentHTML("beforeend",t),b.refresh()};L.addEventListener("submit",w);a.addEventListener("click",S);
//# sourceMappingURL=index.js.map
