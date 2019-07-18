// temp globals
export let canScrollFurther = true

// determine if the browser supports window.scroll options
let browserSupportsScrollOptionsObject = (
  () => {
    let supports = false
    try{
      let div = document.createElement("div")
      div.scrollTo({
        top: 0,
        get behavior(){
          supports = true
          return "smooth"
        }
      })
    }
    catch(e){}
    return supports
  }
)()



export function scrollToDestination(destination = window.pageYOffset){
  let options = {top: destination, left: 0, behavior: "smooth"}

  if(browserSupportsScrollOptionsObject) window.scroll(options)
  else window.scroll(...Object.values(options))
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
  scrollToDestination(destination)

  // used with a timeout to prevent accidentally scrolling multiple times
  canScrollFurther = false
  setTimeout(() => canScrollFurther = true, 100)
}
