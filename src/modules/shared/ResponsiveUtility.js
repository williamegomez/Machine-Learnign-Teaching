export default class ResponsiveUtility {
  constructor () {
    this.screenWidth = window.screen.width
  }

  static get sizes () {
    return {
      small: [0, 640],
      medium: [640, 1023],
      large: [1024, 100000]
    }
  }

  checkScreenWidth (viewport) {
    if ((this.screenWidth > ResponsiveUtility.sizes[viewport][0]) & (this.screenWidth < ResponsiveUtility.sizes[viewport][1])) {
      return true
    }
    return false
  }
}
