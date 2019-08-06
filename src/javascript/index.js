import {wheelEventHandler, scrollEventHandler} from './scrolling/scrollEventHandlers'
import {getSections} from './scrolling/getSections'
import intersectionObserverInit from './lazyload'
import polyfills from './polyfills/polyfills'
import "../stylesheets/index.sass"
import "../files/resume.pdf"
import "../files/cv-cz.pdf"

document.addEventListener("DOMContentLoaded", initIfPromiseExistsElseWait)

// to ensure IE compatibility, we need to make sure Promise is defined in the global scope
// since we're loading Promise on browsers that don't support it natively from a CDN, we can't be sure that it has been loaded on DOMContentLoaded
// (and the load event doesn't have the same level of compatibility)
// therefore we need to manually check if Promise is defined and wait it if isn't
function initIfPromiseExistsElseWait(){
  if(window.Promise){
    polyfills()
      .then(() => {
        intersectionObserverInit()
        getSections()

        // init all the things determined by the scroll handler
        scrollEventHandler(null, true)
    
        // scrolling - prevent default on desktop, instead move to the next section; preserve native behavior on mobile
        // (ensure browser compatibility)
        document.addEventListener("wheel", wheelEventHandler, {passive: false})
        window.onwheel = wheelEventHandler
        window.onmousewheel  = wheelEventHandler
    
        // handles all scrolling - desktop, mobile and programmatic
        window.addEventListener("scroll", scrollEventHandler, {capture: true, passive: true})
      })
  }
  else setTimeout(initIfPromiseExistsElseWait, 5)
}