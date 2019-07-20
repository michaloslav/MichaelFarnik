// this script is inserted separately into index.html before main.js
// it inserts polyfills for Symbol and Promise in browsers that don't have them already

let missingFeatures = []

if(!window.Symbol){
  missingFeatures.push("Symbol")
  missingFeatures.push("Symbol.iterator")
}
else if(!window.Symbol.iterator) missingFeatures.push("Symbol.iterator")
if(!window.Promise) missingFeatures.push("Promise")
if(!window.Array.from) missingFeatures.push("Array.from")

if(missingFeatures.length){
  let importScript = document.createElement("script")
  let featuresString = missingFeatures.join("%2C")
  importScript.src = "https://polyfill.io/v3/polyfill.min.js?features=" + featuresString
  document.body.appendChild(importScript)
}