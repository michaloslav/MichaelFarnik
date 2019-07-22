import {wheelEventHandler, scrollEventHandler} from "../src/javascript/scrolling/scrollEventHandlers"
import {windowWidthWhenSettingSections} from "../src/javascript/scrolling/getSections"
import scrollSetupFunction from "./scrollSetupFunction"
import arrowHTML from "./mocks/arrowHTML"
import {expectScrollTo} from "./scrollUtilFuncs"

describe("wheelEventHandler", () => {
  beforeEach(() => {
    scrollSetupFunction()
    window.innerHeight = 1000
  })

  describe("Scrolling down", () => {
    beforeEach(() => {
      window.pageYOffset = 0
    })

    let mockEvent = {
      preventDefault: jest.fn(),
      deltaY: 100
    }

    test("Simple scroll down", () => {
      wheelEventHandler(mockEvent)
      expectScrollTo(1000)
    })

    test("Scroll down with a changed window width", () => {
      // setup
      let previousWindowWidth = window.innerWidth
      window.innerWidth = 1234

      // execution
      wheelEventHandler(mockEvent)
      expect(windowWidthWhenSettingSections).toBe(1234)
      expectScrollTo(1000)

      // teardown
      window.innerWidth = previousWindowWidth
      wheelEventHandler(mockEvent)
    })
  })

  test("Scrolling up", () => {
    window.pageYOffset = 2000
    let mockEvent = {
      preventDefault: jest.fn(),
      deltaY: -100
    }

    wheelEventHandler(mockEvent)
    expectScrollTo(1000)
  })
})

describe("scrollEventHandler", () => {
  beforeEach(() => {
    scrollSetupFunction(arrowHTML)
    window.innerHeight = 1000
  })

  describe("Pulsing of the first arrow", () => {
    let firstArrowClassList

    beforeEach(() => {
      firstArrowClassList = document.querySelector("#home.section .arrow").classList
    })

    test("Pulsing class added when the scroll position is 0", () => {
      window.pageYOffset = 0

      scrollEventHandler()
      expect(firstArrowClassList.value.includes("pulse")).toBe(true)
    })
    
    test("Pulsing class is removed when the scroll position is below the center of the first section", () => {
      firstArrowClassList.add("pulse")
      window.pageYOffset = 600

      scrollEventHandler()
      expect(firstArrowClassList.value.includes("pulse")).toBe(false)
    })
  })

  test("If window width changes, sections get recalculated", () => {
    // setup
    let previousWindowWidth = window.innerWidth
    window.innerWidth = 1234
    window.pageYOffset = 0

    // execution
    scrollEventHandler()
    expect(windowWidthWhenSettingSections).toBe(1234)

    // teardown
    window.innerWidth = previousWindowWidth
    scrollEventHandler()
  })

  describe("Arrows get turned correctly", () => {
    let arrows

    beforeEach(() => {
      arrows = document.querySelectorAll(".section .arrow")
    })

    describe("Class flipping", () => {
      test("All arrows down when we're at the top", () => {
        window.pageYOffset = 0
  
        scrollEventHandler()
        arrows.forEach(arrow => {
          expect(arrow.classList.value.includes("down")).toBe(true)
          expect(arrow.classList.value.includes("up")).toBe(false)
        })
      })

      test("First arrow gets turned when in the second half of the first section, the rest stays down", () => {
        window.pageYOffset = 600
  
        scrollEventHandler()
        arrows.forEach((arrow, index) => {
          expect(arrow.classList.value.includes("up")).toBe(index === 0)
          expect(arrow.classList.value.includes("down")).toBe(index !== 0)
        })
      })

      test("Half the arrows down, the other half up", () => {
        window.pageYOffset = 2000
  
        scrollEventHandler()
        arrows.forEach((arrow, index) => {
          expect(arrow.classList.value.includes("up")).toBe(index <= 1)
          expect(arrow.classList.value.includes("down")).toBe(index >= 2)
        })
      })

      test("All arrows are up", () => {
        window.pageYOffset = 3800
  
        scrollEventHandler()
        arrows.forEach((arrow, index) => {
          expect(arrow.classList.value.includes("up")).toBe(true)
          expect(arrow.classList.value.includes("down")).toBe(false)
        })
      })
    })
  })
})