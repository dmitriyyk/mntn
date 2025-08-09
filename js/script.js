const headerElement = document.querySelector('[data-js-header]')

const showMobileOverlayButtonElement = document.querySelector('[data-js-show-mobile-overlay-button]')
const hideMobileOverlayButtonElement = document.querySelector('[data-js-hide-mobile-overlay-button]')
const mobileOverlayElement = document.querySelector('[data-js-mobile-overlay]')
const mobileOverlayListElement = document.querySelector('[data-js-mobile-overlay-list]')

const contentListElements = document.querySelectorAll('[data-js-content]')
const contentSliderListElements = document.querySelectorAll('[data-js-content-slider-item]')

const toggleHeaderBackgroundOnScroll = () => {
  const scrollTopPos = window.scrollY;

  if (scrollTopPos >= 120) {
    headerElement.classList.add('header--background')
  } else {
    headerElement.classList.remove('header--background')
  }
}

window.addEventListener('scroll', toggleHeaderBackgroundOnScroll)

const showMobileOverlay = () => {
  document.body.classList.add('stop-scroll')
  mobileOverlayElement.showModal()
}

const hideMobileOverlay = () => {
  document.body.classList.remove('stop-scroll')
  mobileOverlayElement.close()
}

const hideMobileOverlayOnClickOnLink = (e) => {
  e.target.closest('a') && hideMobileOverlay()
}

showMobileOverlayButtonElement.addEventListener('click', showMobileOverlay)
hideMobileOverlayButtonElement.addEventListener('click', hideMobileOverlay)
mobileOverlayListElement.addEventListener('click', hideMobileOverlayOnClickOnLink)

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