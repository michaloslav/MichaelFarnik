export default function polyfills(){
  // requestAnimationFrame (IE 9-)
  let rafPromise = new Promise((resolve, reject) => {
    if(window.requestAnimationFrame) resolve() // raf already present
    else{
      // polyfill raf
      import(/* webpackChunkName: "rafPolyfill" */ "./rafPolyfill")
        .then(rafPolyfill => window.requestAnimationFrame = rafPolyfill.default)
        .then(resolve)
        .catch(reject)
    }
  })

  // smooth scrolling
  let scrollPromise = new Promise((resolve, reject) => {
    try{
      let div = document.createElement("div")
      div.scrollTo({
        top: 0,
        get behavior(){
          // if we get this far without an error then the browser does support it 
          resolve()
          return "smooth"
        }
      })
    }
    catch(e){
      // if the previous code threw an error then the browser doesn't support it -> polyfill
      import(/* webpackChunkName: "scrollPolyfill" */ "./scrollPolyfill")
        .then(scrollPolyfill => scrollPolyfill.default())
        .then(resolve)
        .catch(reject)
    }
  })

  return rafPromise.then(scrollPromise)
}
