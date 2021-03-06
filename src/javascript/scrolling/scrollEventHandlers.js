import {canScrollFurther, getSmallHeightDelta, scrollDown, scrollUp, scrollToNextSection, scrollToPreviousSection} from './scroll'
import {sections, getSections, windowWidthWhenSettingSections} from './getSections'

export function wheelEventHandler(event){
  event.preventDefault()

  // if the user just scrolled to another section, we don't want to accidentally trigger another scroll right away
  if(!canScrollFurther && process.env.NODE_ENV !== "test") return

  // if the window width has changed since we got the sections global, get them again
  if(window.innerWidth !== windowWidthWhenSettingSections) getSections()

  if(event.deltaY > 0) scrollDown()
  else scrollUp()
}

export function scrollEventHandler(event, initializing = false){
  // if we're almost at the top, make the first downward arrow pulse
  // else stop the pulsing
  let firstArrow = document.querySelector("#home.section .arrow")
  if(firstArrow){ // handle undefined
    if(window.pageYOffset < 5 * getSmallHeightDelta()) firstArrow.classList.add("pulse")
    else firstArrow.classList.remove("pulse")
  }

  // if the window width has changed since we got the sections global, get them again
  if(window.innerWidth !== windowWidthWhenSettingSections) getSections()

  // loop through the sections, turn arrows up or down if necessary
  let centerOfWindow = window.pageYOffset + (window.innerHeight / 2)
  for(let i = 0; i < sections.length; i++){
    let section = sections[i]

    let arrow = document.querySelector(`${section.selector} .arrow`)
    if(!arrow) continue

    let svg = arrow.children[0]

    if(centerOfWindow > section.bottom){
      // if the class is already set correctly, continue
      if(arrow.classList.contains("up") && !initializing) continue

      // update the classList
      arrow.classList.remove("down")
      arrow.classList.add("up")

      // update the event listener
      svg.removeEventListener("click", scrollToNextSection)
      svg.addEventListener("click", scrollToPreviousSection)
    }
    else{
      // if the class is already set correctly, continue
      if(arrow.classList.contains("down") && !initializing) continue

      // update the classList
      arrow.classList.remove("up")
      arrow.classList.add("down")

      // update the event listener
      svg.removeEventListener("click", scrollToPreviousSection)
      svg.addEventListener("click", scrollToNextSection)
    }
  }
}
