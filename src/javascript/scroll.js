import {sections, getSections, windowWidthWhenSettingSections} from './getSections'

// temp globals
let canScrollFurther = true

// determines which sections you're currently in (returns its index in the sections global variable)
function getCurrentSectionIndex(){
  let windowOffset = window.pageYOffset || document.documentElement.scrollTop
  for(let [index, section] of sections.entries()){
    let sectionOffset = section.top

    // if the sectionOffset is greater than the windowOffset, that means we looped one too far and the index is the current one minus one
    if(sectionOffset - 25 >= windowOffset){
      // however, if only the very bottom of a certain section is taking up the top of the screen,...
      // we should instead use the one occupying the majority of the screen
      let previousSectionBottom = sections[index - 1].bottom
      if(previousSectionBottom - (window.innerHeight / 2) < windowOffset) return index

      else return index - 1
    }
  }

  // if we don't have currentSectionIndex yet, that means we're in the last section
  return sections.length - 1
}

// scrolling funcs
export function scrollToElement(selector, toBottom = false){
  let element = document.querySelector(selector)
  let topOfElement = element.offsetTop
  let destination
  if(toBottom){
    // if we're scrolling to the bottom of the element, we need to align the bottom of the element with the bottom of the viewport
    let bottomOfElement = topOfElement + element.offsetHeight
    destination = bottomOfElement - window.innerHeight
  }
  else destination = topOfElement
  window.scroll({top: destination, behavior: "smooth"})

  // used with a timeout to prevent accidentally scrolling multiple times
  canScrollFurther = false
  setTimeout(() => canScrollFurther = true, 100)
}

function scrollToNextSection(event, currentSectionIndex){
  // if the user doesn't see the bottom of the current section yet, scroll down one viewport
  // else, scroll to the next section
  let sectionBottom = sections[currentSectionIndex].bottom
  let windowTop = window.pageYOffset || document.documentElement.scrollTop
  let windowBottom = windowTop + window.innerHeight

  if(sectionBottom - 25 > windowBottom){
    scrollDownWithinASection(currentSectionIndex, sectionBottom, windowBottom)
  }

  else{
    // if this is the last section, don't do anything
    if(currentSectionIndex >= sections.length - 1) return
  
    let newSectionIndex = currentSectionIndex + 1
    
    scrollToElement(sections[newSectionIndex].selector)
  }
}

function scrollToPreviousSection(event, currentSectionIndex){
  // if the user doesn't see the top of the current section yet, scroll up one viewport
  // else, scroll to the previous section
  let sectionTop = sections[currentSectionIndex].top
  let windowTop = window.pageYOffset || document.documentElement.scrollTop
  if(sectionTop + 25 < windowTop){
    scrollUpWithinASection(currentSectionIndex, sectionTop, windowTop)
  }

  else{
    // if this is the first section, don't do anything
    if(currentSectionIndex <= 0) return

    let newSectionIndex = currentSectionIndex - 1

    scrollToElement(sections[newSectionIndex].selector, true)
  }
}

function scrollUpWithinASection(currentSectionIndex, currentSectionTop, currentViewportTop){
  // scroll up by either window.innerHeight or to the top of the section, whichever is smaller
  if(currentViewportTop - currentSectionTop < window.innerHeight){
    scrollToElement(sections[currentSectionIndex].selector)
  }
  else{
    let destination = currentViewportTop - window.innerHeight
    window.scroll({top: destination, behavior: "smooth"})
  }

}

function scrollDownWithinASection(currentSectionIndex, currentSectionBottom, currentViewportBottom){
  // scroll down by either window.innerHeight or to the bottom of the section, whichever is smaller
  if(currentSectionBottom - currentViewportBottom < window.innerHeight){
    scrollToElement(sections[currentSectionIndex].selector, true)
  }
  else{
    window.scroll({top: currentViewportBottom, behavior: "smooth"})
  }
}

export function wheelEventHandler(event){
  event.preventDefault()

  // if the user just scrolled to another section, we don't want to accidentally trigger another scroll right away
  if(!canScrollFurther) return

  // if the window width has changed since we got the sections global, get them again
  if(window.innerWidth !== windowWidthWhenSettingSections) getSections()

  let currentSectionIndex = getCurrentSectionIndex()

  if(event.deltaY > 0) scrollToNextSection(event, currentSectionIndex)
  else scrollToPreviousSection(event, currentSectionIndex)
}
