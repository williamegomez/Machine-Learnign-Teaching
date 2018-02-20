import './../Post-card/Post-card.scss'
import './Paginator.scss'
import jsonCards from './../../../data/CardsMain.json'
import templateContainer from './Paginator.pug'
import templateCard from './../Post-card/Post-card.pug'

export default class Paginator {
  constructor (node, jsonPages) {
    this.node = node
    this.node.innerHTML = templateContainer()
    this.jsonPages = jsonPages
    this.indexPage = 0
    this.cardContainer = this.node.querySelector('.paginator__posts')
    this.fillPaginator()
  }

  fillPaginator () {
    jsonCards.forEach((card) => {
      this.addCard(card)
    })
  }

  addCard (json) {
    var parser = new DOMParser()
    var card = parser.parseFromString(templateCard(json), 'text/html').body.children[0]
    this.cardContainer.appendChild(card)
  }
}
