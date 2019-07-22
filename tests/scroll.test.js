import {
  scrollToDestination,
  scrollToElement,
  getCurrentSectionIndex,
  scrollToNextSection,
  scrollToPreviousSection,
  scrollDownWithinASection,
  scrollUpWithinASection
} from "../src/javascript/scrolling/scroll"
import scrollSetupFunction from "./scrollSetupFunction"
import {expectScrollTo} from "./scrollUtilFuncs"

beforeEach(scrollSetupFunction)

describe("The sections in the simulated DOM", () => {
  test("Have the correct offsetTop and offsetHeight", () => {
    for(let i = 0; i < 4; i++){
      let {offsetTop, offsetHeight} = document.getElementById("section" + i)
      expect(offsetTop).toBe(i * 1000)
      expect(offsetHeight).toBe(1000)
    }
  })
})

describe("scrollToDestination", () => {
  it("Calls window.scroll with the correct value", () => {
    for(let destination of [500, 1200, 3500]){
      scrollToDestination(destination)
      expectScrollTo(destination)
    }
  })
})

describe("scrollToElement", () => {
  beforeEach(() => {
    window.innerHeight = 500
    window.pageYOffset = 100
  })

  it("Calls window.scroll via scrollToDestination with the correct value (to the top of each section)", () => {
    for(let i = 0; i < 4; i++){
      scrollToElement("#section" + i)
      expectScrollTo(i * 1000)
    }
  })

  it("Calls window.scroll via scrollToDestination with the correct value (to the bottom of each section)", () => {
    for(let i = 0; i < 4; i++){
      scrollToElement("#section" + i, true)
      expectScrollTo((i * 1000) + 500)
    }
  })
})

describe("getCurrentSectionIndex", () => {
  it("Returns the correct value when at the top of each section", () => {
    window.innerHeight = 1000

    for(let i = 0; i < 4; i++){
      window.pageYOffset = i * 1000
      expect(getCurrentSectionIndex()).toBe(i)
    }
  })

  it("Returns the correct value when near the bottom of each section", () => {
    window.innerHeight = 1000

    for(let i = 0; i < 3; i++){
      window.pageYOffset = i * 1000 + 800
      expect(getCurrentSectionIndex()).toBe(i + 1)
    }
  })

  it("Returns the correct value when the sections are larger than the screen", () => {
    window.innerHeight = 500

    for(let i = 0; i < 4; i++){
      window.pageYOffset = i * 1000
      expect(getCurrentSectionIndex()).toBe(i)

      window.pageYOffset = i * 1000 + 200
      expect(getCurrentSectionIndex()).toBe(i)

      window.pageYOffset = i * 1000 + 400
      expect(getCurrentSectionIndex()).toBe(i)

      window.pageYOffset = i * 1000 + 700
      expect(getCurrentSectionIndex()).toBe(i)

      if(i < 3){
        window.pageYOffset = i * 1000 + 850
        expect(getCurrentSectionIndex()).toBe(i + 1)
      }
    }
  })
})

describe("scrollToNextSection", () => {
  beforeEach(() => {
    window.innerHeight = 1000
  })

  it("Calls scrollToElement with the correct arguments", () => {
    for(let i = 0; i < 3; i++){
      scrollToNextSection(i)
      expectScrollTo((i + 1) * 1000)
    }
  })

  it("Handles an incorrect argument and determines currentSectionIndex on its own", () => {
    window.pageYOffset = 1200
    scrollToNextSection({a: 123})
    expectScrollTo(2000)
  })
})

describe("scrollToPreviousSection", () => {
  beforeEach(() => {
    window.innerHeight = 500
  })

  it("Calls scrollToElement with the correct arguments", () => {
    for(let i = 1; i < 4; i++){
      scrollToPreviousSection(i)
      expectScrollTo(((i - 1) * 1000) + 500)
    }
  })

  it("Handles an incorrect argument and determines currentSectionIndex on its own", () => {
    window.pageYOffset = 3400
    scrollToPreviousSection({a: 123})
    expectScrollTo(2500)
  })

})

describe("scrollDownWithinASection", () => {
  beforeEach(() => {
    window.innerHeight = 300
  })

  it("Calls scrollToElement if it should scroll to the bottom of the current section", () => {
    // window.pageYOffset = 500
    scrollDownWithinASection(0, 1000, 800)
    expectScrollTo(700)

    // window.pageYOffset = 1450
    scrollDownWithinASection(1, 2000, 1750)
    expectScrollTo(1700)
  })

  it("Calls scrollToDestination if it should scroll down by 100 vh", () => {
    // window.pageYOffset = 300
    scrollDownWithinASection(0, 1000, 600)
    expectScrollTo(600)

    // window.pageYOffset = 3000
    scrollDownWithinASection(3, 4000, 3300)
    expectScrollTo(3300)
  })
})

describe("scrollUpWithinASection", () => {
  beforeEach(() => {
    window.innerHeight = 300
    window.pageYOffset = 100
  })

  it("Calls scrollToElement if it should scroll to the top of the current section", () => {
    // window.pageYOffset = 200
    scrollUpWithinASection(0, 0, 200)
    expectScrollTo(0)

    // window.pageYOffset = 1250
    scrollUpWithinASection(1, 1000, 1250)
    expectScrollTo(1000)
  })

  it("Calls scrollToDestination if it should scroll up by 100 vh", () => {
    // window.pageYOffset = 1500
    scrollUpWithinASection(1, 1000, 1500)
    expectScrollTo(1200)

    // window.pageYOffset = 3700
    debugger
    scrollUpWithinASection(3, 3000, 3700)
    expectScrollTo(3400)
  })
})
