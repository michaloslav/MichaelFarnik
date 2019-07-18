import {scrollToElement, wheelEventHandler, scrollEventHandler} from './scroll'
import {sections, getSections} from './getSections'
import "../stylesheets/index.sass"
import "../stylesheets/home.sass"
import "../stylesheets/skills.sass"
import "../stylesheets/projects.sass"
import "../stylesheets/about.sass"
import "../stylesheets/contact.sass"

// init
document.addEventListener("DOMContentLoaded", () => {
  getSections()

  // attach event listeners to the downward arrows
  sections.forEach(({selector}, i) => {
    // if this is the last section, there won't be another downward arrow -> return
    if(i === sections.length - 1) return

    let nextSectionSelector = sections[i + 1].selector
    let arrow = document.querySelector(`${selector} .down svg`)
    
    // check if the section has an arrow to begin with
    if(arrow) arrow.addEventListener("click", () => scrollToElement(nextSectionSelector))
  })

  // scrolling - prevent default on desktop, instead move to the next section; preserve native behavior on mobile
  // (ensure browser compatibility)
  document.addEventListener("wheel", wheelEventHandler, {passive: false})
  window.onwheel = wheelEventHandler
  window.onmousewheel  = wheelEventHandler

  // handles all scrolling - desktop, mobile and programmatic
  window.addEventListener("scroll", scrollEventHandler, {capture: true, passive: true})
})
