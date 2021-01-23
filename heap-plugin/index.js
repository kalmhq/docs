module.exports = function (context, options) {
  // ...
  return {
    name: "heap-plugin",
    async loadContent() {
      /* ... */
      console.log("HEAP plugin load content");
    },
    async contentLoaded({ content, actions }) {
      console.log("HEAP plugin content loaded");
    },
    /* other lifecycle API */
    injectHtmlTags() {
      let heapId = process.env.HEAP_ID;

      return {
        headTags: [
          {
            tagName: "script",
            innerHTML: `
              window.heap=window.heap||[],heap.load=function(e,t){window.heap.appid=e,window.heap.config=t=t||{};var r=document.createElement("script");r.type="text/javascript",r.async=!0,r.src="https://cdn.heapanalytics.com/js/heap-"+e+".js";var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(r,a);for(var n=function(e){return function(){heap.push([e].concat(Array.prototype.slice.call(arguments,0)))}},p=["addEventProperties","addUserProperties","clearEventProperties","identify","resetIdentity","removeEventProperty","setEventProperties","track","unsetEventProperty"],o=0;o<p.length;o++)heap[p[o]]=n(p[o])};   
              heap.load("${heapId}"); 
            `,
          },
        ],
      };
    },
  };
};
