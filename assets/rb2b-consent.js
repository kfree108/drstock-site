(function(){
var storageKey='drstock-visitor-identification-consent';
function load(){if(window.reb2b||navigator.globalPrivacyControl)return;window.reb2b={loaded:true};var s=document.createElement('script');s.async=true;s.src='https://ddwl4m2hdecbv.cloudfront.net/b/GNLKQHMW526Q/GNLKQHMW526Q.js.gz';document.head.appendChild(s);}
var choice;try{choice=localStorage.getItem(storageKey);}catch(e){}
if(choice==='yes'){load();return;}if(choice==='no'||navigator.globalPrivacyControl)return;
var box=document.createElement('aside');box.setAttribute('aria-label','Visitor identification preferences');box.style.cssText='position:fixed;bottom:16px;left:16px;right:16px;max-width:600px;padding:20px;background:#fff;color:#151515;border:1px solid #ccc;border-radius:12px;box-shadow:0 4px 24px #0003;z-index:99999;font:16px/1.5 sans-serif';
box.innerHTML='<p style="margin:0 0 12px">May we use cookies and data partners to identify visiting companies and potential business contacts? <a href="/visitor-privacy/#visitor-identification">Privacy and opt-out details</a></p><button type="button" data-choice="yes">Allow visitor identification</button> <button type="button" data-choice="no">Decline</button>';
box.addEventListener('click',function(e){var c=e.target.getAttribute('data-choice');if(!c)return;try{localStorage.setItem(storageKey,c);}catch(e){}box.remove();if(c==='yes')load();});document.body.appendChild(box);
})();
