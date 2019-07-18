import {wheelEventHandler, scrollEventHandler} from './scrollEventHandlers'
import {getSections} from './getSections'
import "../stylesheets/index.sass"
import "../stylesheets/home.sass"
import "../stylesheets/skills.sass"
import "../stylesheets/projects.sass"
import "../stylesheets/about.sass"
import "../stylesheets/contact.sass"
import "../files/resume.pdf"
import "../files/cv-cz.pdf"

// init
document.addEventListener("DOMContentLoaded", () => {
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
