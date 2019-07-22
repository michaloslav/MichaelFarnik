import {sections, getSections, windowWidthWhenSettingSections} from "../src/javascript/scrolling/getSections"
import scrollSetupFunction from "./scrollSetupFunction"

beforeEach(scrollSetupFunction)

describe("getSections", () => {
  it("Initializes sections with the correct test values", () => {
    expect(sections).toEqual(require("./mocks/sections"))
  })

  it("Correctly gets sections from mock HTML", () => {
    getSections()
    expect(sections).toEqual([
      {selector: "#section0.section", top: 0, bottom: 1000, height: 1000},
      {selector: "#section1.section", top: 1000, bottom: 2000, height: 1000},
      {selector: "#section2.section", top: 2000, bottom: 3000, height: 1000},
      {selector: "#section3.section", top: 3000, bottom: 4000, height: 1000}
    ])

    expect(windowWidthWhenSettingSections).toBe(window.innerWidth)
  })
})