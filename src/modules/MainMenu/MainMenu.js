import template from './MainMenu.pug'
import './MainMenu.scss'
import jsonData from './../../../data/MainMenu.json'

export default class MainMenu {
  constructor (node) {
    this.node = node
    this.indexSublist = -1
    this.node.innerHTML = template(jsonData)
    this.getNodes()
    this.setEvents()
  }

  static get states () {
    return {
      subMenuOpen: 'main-menu__sublist--open',
      menuOpen: 'main-menu__list--open',
      burgerTopOpen: 'main-menu__hamburger-top--open',
      burgerBottomOpen: 'main-menu__hamburger-bottom--open'
    }
  }

  getNodes () {
    this.list = this.node.querySelector('.main-menu__list')
    this.buttons = this.node.querySelectorAll('.main-menu__button')
    this.hamburger = this.node.querySelector('.main-menu__hamburger')
    this.hamburgerTop = this.node.querySelector('.main-menu__hamburger-top')
    this.hamburgerBottom = this.node.querySelector('.main-menu__hamburger-bottom')
    this.sublists = this.node.querySelectorAll('.main-menu__sublist')
  }

  setEvents () {
    this.list.addEventListener('click', this.handleClickList.bind(this))
    this.hamburger.addEventListener('click', this.handleHamburger.bind(this))
  }

  handleClickList (event) {
    this.newIndexSublist = Array.from(this.buttons).indexOf(event.target)
    if (this.indexSublist !== -1) {
      this.sublists[this.indexSublist].classList.remove(MainMenu.states.subMenuOpen)
      this.sublists[this.newIndexSublist].classList.add(MainMenu.states.subMenuOpen)
    } else {
      if (this.sublists[this.newIndexSublist].classList.contains(MainMenu.states.subMenuOpen)) {
        this.sublists[this.newIndexSublist].classList.remove(MainMenu.states.subMenuOpen)
      } else {
        this.sublists[this.newIndexSublist].classList.add(MainMenu.states.subMenuOpen)
      }
    }
  }

  handleHamburger (event) {
    this.list.classList.toggle(MainMenu.states.menuOpen)
    this.hamburgerTop.classList.toggle(MainMenu.states.burgerTopOpen)
    this.hamburgerBottom.classList.toggle(MainMenu.states.burgerBottomOpen)
  }
}
