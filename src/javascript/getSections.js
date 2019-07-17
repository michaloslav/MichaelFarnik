// globals
export let sections = []
export let windowWidthWhenSettingSections = window.innerWidth

// get all section selectors
export function getSections(){
  sections = []

  let sectionElements = [...document.getElementsByClassName("section")]
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
