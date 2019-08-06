export default function lazyLoadInit(){
  const targets = [
    ...document.getElementsByClassName("dontLoad"),
    ...document.querySelectorAll("img[data-src]")
  ]

  targets.forEach(target => {
    const io = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if(entry.isIntersecting){
          const element = entry.target

          element.classList.remove("dontLoad")

          observer.disconnect()
        }
      })
    }, {rootMargin: "20%"})

    io.observe(target)
  })
}