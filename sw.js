const VERSION='v1.0.0-opt2-safari1';
const SHELL_CACHE=`pinkverse-shell-${VERSION}`;
const RUNTIME_CACHE=`pinkverse-runtime-${VERSION}`;
const SHELL=[
  './',
  './index.html',
  './styles.css?v=1.0.0-safari1',
  './app.js?v=1.0.0-safari1',
  './manifest.json',
  './assets/icons/logo-mark.svg',
  './assets/icons/icon-192.png',
  './assets/icons/icon-512.png',
  './assets/icons/apple-touch-icon.png',
  './assets/icons/favicon-32.png'
];

self.addEventListener('install',event=>{
  self.skipWaiting();
  event.waitUntil(caches.open(SHELL_CACHE).then(cache=>cache.addAll(SHELL)));
});

self.addEventListener('activate',event=>{
  event.waitUntil(Promise.all([
    caches.keys().then(keys=>Promise.all(keys.filter(key=>key.startsWith('pinkverse-')&&![SHELL_CACHE,RUNTIME_CACHE].includes(key)).map(key=>caches.delete(key)))),
    self.clients.claim()
  ]));
});

self.addEventListener('fetch',event=>{
  const request=event.request;
  if(request.method!=='GET')return;
  const url=new URL(request.url);
  if(url.origin!==self.location.origin)return;
  const isNavigation=request.mode==='navigate'||request.destination==='document';
  const isAsset=['image','font'].includes(request.destination);

  if(isNavigation){
    event.respondWith((async()=>{
      try{
        const response=await fetch(request);
        if(response?.ok){
          try{const cache=await caches.open(SHELL_CACHE);await cache.put('./index.html',response.clone());}catch{}
        }
        return response;
      }catch{
        return (await caches.match('./index.html'))||Response.error();
      }
    })());
    return;
  }

  if(isAsset){
    const networkUpdate=fetch(request).then(async response=>{
      if(response?.ok){
        try{const cache=await caches.open(RUNTIME_CACHE);await cache.put(request,response.clone());}catch{}
      }
      return response;
    }).catch(()=>null);
    event.waitUntil(networkUpdate.then(()=>{}));
    event.respondWith((async()=>{
      const cached=await caches.match(request);
      return cached||await networkUpdate||Response.error();
    })());
    return;
  }

  event.respondWith((async()=>{
    try{
      const response=await fetch(request);
      if(response?.ok){
        try{const cache=await caches.open(SHELL_CACHE);await cache.put(request,response.clone());}catch{}
      }
      return response;
    }catch{
      return (await caches.match(request,{ignoreSearch:request.destination==='script'||request.destination==='style'}))||Response.error();
    }
  })());
});
