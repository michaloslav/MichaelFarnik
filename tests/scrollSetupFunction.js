import sectionHTML from "./mocks/sectionHTML"

export default function scrollSetupFunction(innerHTML = sectionHTML){
  window.scroll = jest.fn()

  document.body.innerHTML = innerHTML

  // mock the height and positioning of sections
  Object.defineProperties(window.HTMLElement.prototype, {
    offsetHeight: {
      get(){
        if(this.classList.value.includes("section")) return 1000
        else return 0
      }
    },
    offsetTop: {
      get(){
        try{
          let sectionIndex = Number(this.id.split("section")[1])
          if(isNaN(sectionIndex)) sectionIndex = parseInt(this.classList.value.split("pos")[1])
          let position = sectionIndex * 1000
          if(isNaN(position)) throw new Error()
          return position
        }
        catch(e){
          console.warn("Can't get value of element!");
          return 0
        }
      }
    }
  })
}