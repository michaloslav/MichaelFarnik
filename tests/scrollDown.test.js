import {scrollDown} from "../src/javascript/scrolling/scroll"
import scrollSetupFunction from "./scrollSetupFunction"
import {expectScrollTo} from "./scrollUtilFuncs"

function scrollDownTest(from, to){
  window.pageYOffset = from
  scrollDown()

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

describe("scrollDown", () => {
  describe("If window height === section height", () => {
    beforeEach(() => {
      window.innerHeight = 1000
    })

    describe("It scrolls to the next section when", () => {
      describe("We're not in the last section and", () => {
        test("We're slightly above the top of a section", () => {
          for(let i = 1; i < 3; i++){
            scrollDownTest(
              (i * 1000) - 50,
              (i + 1) * 1000
            )
          }
        })
  
        test("We're at the top of a section", () => {
          for(let i = 0; i < 3; i++){
            scrollDownTest(
              i * 1000,
              (i + 1) * 1000
            )
          }
        })
  
        test("We're in the middle of a section", () => {
          for(let i = 0; i < 3; i++){
            scrollDownTest(
              (i * 1000) + 200,
              (i + 1) * 1000
            )

            scrollDownTest(
              (i * 1000) + 600,
              (i + 1) * 1000
            )
          }
        })
      })
    })

    describe("It scrolls to the top of the current section when", () => {
      describe("We're in the last section and", () => {
        test("We're slightly above the top of the last section", () => {
          scrollDownTest(
            2950,
            3000
          )
        })
      })
    })

    describe("It doesn't scroll when", () => {
      describe("We're in the last section and", () => {
        test("We're at the top of the last section", () => {
          scrollDownTest(
            3000,
            null
          )
        })
      })
    })
  })

  describe("If window height < section height", () => {
    describe("If the height difference is tiny", () => {
      beforeEach(() => {
        window.innerHeight = 950
      })

      describe("It scrolls to the next section when", () => {
        describe("We're not in the last section and", () => {
          test("We're at the top of a section", () => {
            for(let i = 0; i < 3; i++){
              scrollDownTest(
                i * 1000,
                (i + 1) * 1000
              )
            }
          })

          test("We're in the middle of a section", () => {
            for(let i = 0; i < 3; i++){
              scrollDownTest(
                (i * 1000) + 500,
                (i + 1) * 1000
              )
            }
          })
        })
      })

      describe("It scrolls to the bottom of the current section when", () => {
        describe("We're not in the last section and", () => {
          test("We're slightly above the top of a section", () => {
            for(let i = 0; i < 3; i++){
              scrollDownTest(
                (i * 1000) - 50,
                ((i + 1) * 1000) - 950
              )
            }
          })
        })

        describe("We're in the last section and", () => {
          test("We're slightly above the top of the last section", () => {
            scrollDownTest(
              2950,
              3050
            )
          })

          test("We're at the top of the last section", () => {
            scrollDownTest(
              3000,
              3050
            )
          })
        })
      })

      describe("It doesn't scroll if", () => {
        describe("We're in the last section and", () => {
          test("We're in the middle of the last section", () => {
            scrollDownTest(
              3050,
              null
            )
          })
        })
      })
    })

    describe("If the height difference is small", () => {
      beforeEach(() => {
        window.innerHeight = 750
      })

      describe("It scrolls to the bottom of the current section when", () => {
        describe("We're not in the last section and", () => {
          test("We're at the top of a section", () => {
            for(let i = 0; i < 3; i++){
              scrollDownTest(
                i * 1000,
                (i * 1000) + 250
              )
            }
          })
        })
      })
    })

    describe("If the height difference is large", () => {
      beforeEach(() => {
        window.innerHeight = 250
      })
  
      describe("It scrolls by 100vh when", () => {
        test("We're in the middle of a section", () => {
          for(let i = 0; i < 4; i++){
            scrollDownTest(
              (i * 1000) + 400,
              (i * 1000) + 650
            )
          }
        })
  
        describe("We're not in the last section and", () => {
          test("We're slightly above the top of a section", () => {
            for(let i = 0; i < 3; i++){
              scrollDownTest(
                (i * 1000) - 50,
                (i * 1000) + 200
              )
            }
          })
        })
  
        describe("We're in the last section and", () => {
          test("We're at the top of the last section", () => {
            scrollDownTest(
              3000,
              3250
            )
          })
        })
      })
  
      describe("It scrolls to the bottom of the current section when", () => {
        test("We're near the bottom of a section", () => {
          for(let i = 0; i < 4; i++){
            scrollDownTest(
              (i * 1000) + 600,
              (i * 1000) + 750
            )
          }
        })
      })
  
      describe("It scrolls to the top of the next section when", () => {
        describe("We're not in the last section and", () => {
          test("We're near the bottom of a section and we see the top of the next one", () => {
            for(let i = 0; i < 3; i++){
              scrollDownTest(
                (i * 1000) + 800,
                (i + 1) * 1000
              )
            }
          })
        })
      })
    })
  })
})