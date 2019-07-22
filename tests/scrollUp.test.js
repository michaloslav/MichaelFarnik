import {scrollUp} from "../src/javascript/scrolling/scroll"
import scrollSetupFunction from "./scrollSetupFunction"
import {expectScrollTo} from "./scrollUtilFuncs"

function scrollUpTest(from, to){
  window.pageYOffset = from
  scrollUp()

 if(to !== null) expectScrollTo(to)
  else expect(window.scroll).not.toHaveBeenCalled()
}

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

describe("scrollUp", () => {
  describe("If window height === section height", () => {
    beforeEach(() => {
      window.innerHeight = 1000
    })

    describe("It scrolls to the previous section when", () => {
      describe("We're not in the first section and", () => {
        test("The top of a section is slightly above the center of the screen", () => {
          for(let i = 1; i < 4; i++){
            scrollUpTest(
              (i * 1000) - 400,
              (i - 1) * 1000
            )
          }
        })

        test("We're at the top of a section", () => {
          for(let i = 1; i < 4; i++){
            scrollUpTest(
              i * 1000,
              (i - 1) * 1000
            )
          }
        })

        test("We're slightly below the top of a section", () => {
          for(let i = 1; i < 4; i++){
            scrollUpTest(
              (i * 1000) + 50,
              (i - 1) * 1000
            )
          }
        })
      })
    })

    describe("It scrolls to the top of the current section when", () => {
      describe("We're not in the last section", () => {
        test("We're slightly below the top of the first section", () => {
          scrollUpTest(
            50,
            0
          )
        })

        test("We're slightly above the center of a section", () => {
          for(let i = 0; i < 3; i++){
            scrollUpTest(
              (i * 1000) + 450,
              i * 1000
            )
          }
        })
      })
    })
  })

  describe("If window height < section height", () => {
    describe("The height difference is small", () => {
      beforeEach(() => {
        window.innerHeight = 750
      })

      describe("It scrolls to the bottom of the previous section when", () => {
        describe("We're not in the first section and", () => {
          test("We're slightly above the top of a section", () => {
            for(let i = 1; i < 4; i++){
              scrollUpTest(
                (i * 1000) - 50,
                ((i - 1) * 1000) + 250
              )
            }
          })

          test("We're at the top of a section", () => {
            for(let i = 1; i < 4; i++){
              scrollUpTest(
                i * 1000,
                ((i - 1) * 1000) + 250
              )
            }
          })

          test("We're slightly below the top of a section", () => {
            for(let i = 1; i < 4; i++){
              scrollUpTest(
                (i * 1000) + 50,
                ((i - 1) * 1000) + 250
              )
            }
          })
        })
      })

      describe("It scrolls to the top of the current section when", () => {
        test("We're slightly below the top of the first section", () => {
          scrollUpTest(
            50,
            0
          )
        })

        test("We're near the middle of a section", () => {
          for(let i = 0; i < 4; i++){
            scrollUpTest(
              (i * 1000) + 400,
              i * 1000
            )
          }
        })
      })
    })

    describe("The height difference is large", () => {
      beforeEach(() => {
        window.innerHeight = 250
      })

      describe("It scrolls to the bottom of the previous section when", () => {
        describe("We're not in the first section and", () => {
          test("We're significantly above the top of a section", () => {
            for(let i = 1; i < 4; i++){
              scrollUpTest(
                (i * 1000) - 100,
                ((i - 1) * 1000) + 750
              )
            }
          })

          test("We're slightly above the top of a section", () => {
            for(let i = 1; i < 4; i++){
              scrollUpTest(
                (i * 1000) - 50,
                ((i - 1) * 1000) + 750
              )
            }
          })

          test("We're at the top of a section", () => {
            for(let i = 1; i < 4; i++){
              scrollUpTest(
                i * 1000,
                ((i - 1) * 1000) + 750
              )
            }
          })

          test("We're slightly below the top of a section", () => {
            for(let i = 1; i < 4; i++){
              scrollUpTest(
                (i * 1000) + 20,
                ((i - 1) * 1000) + 750
              )
            }
          })
        })
      })

      describe("It scrolls to the top of the current section when", () => {
        test("We're slightly below the top of the first section", () => {
          scrollUpTest(
            50,
            0
          )
        })

        test("We're roughly 40vh below the top of a section", () => {
          for(let i = 0; i < 4; i++){
            scrollUpTest(
              (i * 1000) + 100,
              i * 1000
            )
          }
        })
      })

      describe("It scrolls up by 100vh when", () => {
        test("We're in the middle of a section", () => {
          for(let i = 0; i < 4; i++){
            scrollUpTest(
              (i * 1000) + 400,
              (i * 1000) + 150
            )
          }
        })

        test("We're at the bottom of a section", () => {
          for(let i = 0; i < 4; i++){
            scrollUpTest(
              (i * 1000) + 750,
              (i * 1000) + 500
            )
          }
        })

        test("We're roughly 40vh below the bottom of a section (and it's not the last section)", () => {
          for(let i = 0; i < 3; i++){
            scrollUpTest(
              (i * 1000) + 850,
              (i * 1000) + 600
            )
          }
        })
      })
    })
  })
})
