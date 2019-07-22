// globals
export let sections = process.env.NODE_ENV === "test" ? require("../../../tests/mocks/sections") : []
export let windowWidthWhenSettingSections = window.innerWidth

// get all section selectors
export function getSections(){
  sections = []

  let sectionElements = document.getElementsByClassName("section")

  // convert the HTMLCollection to an Array
  sectionElements = Array.from(sectionElements)

  sectionElements.forEach(element => {
    let {id, offsetTop, offsetHeight} = element

    sections.push({
      selector: `#${id}.section`,
      top: offsetTop,
      bottom: offsetTop + offsetHeight,
      height: offsetHeight
    })
  })

  windowWidthWhenSettingSections = window.innerWidth
}
