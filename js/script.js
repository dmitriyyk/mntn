const showMobileMenuButtonElement = document.querySelector('[data-js-show-mobile-menu-button]')
const hideMobileMenuButtonElement = document.querySelector('[data-js-hide-mobile-menu-button]')

const contentListElements = document.querySelectorAll('[data-js-content]')
const contentSliderListElements = document.querySelectorAll('[data-js-content-slider-item]')

const showMobileMenu = () => {
  document.body.classList.add('stop-scroll')
  mobileMenu.showModal()
}

const hideMobileMenu = () => {
  document.body.classList.remove('stop-scroll')
  mobileMenu.close()
}

showMobileMenuButtonElement.addEventListener('click', showMobileMenu)
hideMobileMenuButtonElement.addEventListener('click', hideMobileMenu)

const observerOptions = {
  root: null,
  threshold: 0.5
}

const observerCallback = (entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const contentId = entry.target.dataset.jsContent

      contentSliderListElements.forEach(sliderElement => {
        const sliderElementId = sliderElement.dataset.jsContentSliderItem

        contentId === sliderElementId ?
          sliderElement.classList.add('content-slider__item--active') :
          sliderElement.classList.remove('content-slider__item--active')
      })
    }
  })
}

const observer = new IntersectionObserver(observerCallback, observerOptions)

contentListElements.forEach(contentElement => {
  observer.observe(contentElement)
})