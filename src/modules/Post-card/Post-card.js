import './Post-card.scss'
import template from './Post-card.pug'

export default class PostCard {
  constructor (node, jsonTemplate) {
    this.node = node
    this.node.innerHTML = template(jsonTemplate)
  }
}
