import {sections} from './getSections'
import {scrollToDestination, scrollToElement} from './scrollCore'

// basic unit of height used in comparisons
export function getSmallHeightDelta(){
  return window.innerHeight / 5
}

// determines which sections you're currently in (returns its index in the sections global variable)
export function getCurrentSectionIndex(){
  let windowOffset = window.pageYOffset || document.documentElement.scrollTop
  for(let index = 0; index < sections.length; index++){
    let section = sections[index]

    let sectionOffset = section.top

    // if the sectionOffset is greater than the windowOffset, that means we looped one too far and the index is the current one minus one
    if(sectionOffset - getSmallHeightDelta() >= windowOffset){
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

export function scrollToNextSection(currentSectionIndex){
  // the first argument passed to this function might be an event in some cases, in which case we need to override it
  if(typeof currentSectionIndex !== "number"){
    currentSectionIndex = getCurrentSectionIndex()
  }

  // if this is the last section, don't do anything
  if(currentSectionIndex >= sections.length - 1) return

  let newSectionIndex = currentSectionIndex + 1
  
  scrollToElement(sections[newSectionIndex].selector)
}

export function scrollToPreviousSection(currentSectionIndex){
  // the first argument passed to this function might be an event in some cases, in which case we need to override it
  if(typeof currentSectionIndex !== "number"){
    currentSectionIndex = getCurrentSectionIndex()
  }

  // if this is the first section, don't do anything
  if(currentSectionIndex <= 0) return

  let newSectionIndex = currentSectionIndex - 1

  scrollToElement(sections[newSectionIndex].selector, true)
}

export function scrollDown(){
  let currentSectionIndex = getCurrentSectionIndex()

  // if the user doesn't see the bottom of the current section yet, scroll down one viewport
  // else, scroll to the next section
  let sectionBottom = sections[currentSectionIndex].bottom
  let windowTop = window.pageYOffset || document.documentElement.scrollTop
  let windowBottom = windowTop + window.innerHeight

  if(sectionBottom - getSmallHeightDelta() > windowBottom){
    scrollDownWithinASection(currentSectionIndex, sectionBottom, windowBottom)
  }
  else scrollToNextSection(currentSectionIndex)
}

export function scrollUp(){
  let currentSectionIndex = getCurrentSectionIndex()

  // if the user doesn't see the top of the current section yet, scroll up one viewport
  // else, scroll to the previous section
  let sectionTop = sections[currentSectionIndex].top
  let windowTop = window.pageYOffset || document.documentElement.scrollTop
  if(sectionTop + getSmallHeightDelta() < windowTop){
    scrollUpWithinASection(currentSectionIndex, sectionTop, windowTop)
  }
  else scrollToPreviousSection(currentSectionIndex)
}

function scrollUpWithinASection(currentSectionIndex, currentSectionTop, currentViewportTop){
  // scroll up by either window.innerHeight or to the top of the section, whichever is smaller
  if(currentViewportTop - currentSectionTop < window.innerHeight){
    scrollToElement(sections[currentSectionIndex].selector)
  }
  else{
    let destination = currentViewportTop - window.innerHeight
    scrollToDestination(destination)
  }

}

function scrollDownWithinASection(currentSectionIndex, currentSectionBottom, currentViewportBottom){
  // scroll down by either window.innerHeight or to the bottom of the section, whichever is smaller
  if(currentSectionBottom - currentViewportBottom < window.innerHeight){
    scrollToElement(sections[currentSectionIndex].selector, true)
  }
  else{
    scrollToDestination(currentViewportBottom)
  }
}

