export function expectScrollTo(destination){
  expect(window.scroll).toHaveBeenCalledWith({top: destination, left: 0, behavior: "smooth"})
}