function genericIOCallback(action){
  return function(entries, observer){
    entries.forEach(entry => {
      if(entry.isIntersecting){
        const element = entry.target

        action(element)

        observer.disconnect()
      }
    })
  }
}

export default function intersectionObserverInit(){
  const targets = {
    lazyLoad: [...document.getElementsByClassName("dontLoad")],
    floatUp: [...document.getElementsByClassName("floatUpOnScroll")]
  }

  targets.lazyLoad.forEach(target => {
    const io = new IntersectionObserver(genericIOCallback(element => {
      element.classList.remove("dontLoad")
    }), {rootMargin: "0px 0px 25% 0px"})

    io.observe(target)
  })

  targets.floatUp.forEach(target => {
    const io = new IntersectionObserver(genericIOCallback(element => {
      element.classList.add("prepareToShow")

      const timeout = element.classList.contains("delayFloatUp") ? 250 : 100

      setTimeout(() => {element.classList.add("show")}, timeout)
    }), {rootMargin: "-10%"})

    io.observe(target)
  })
}