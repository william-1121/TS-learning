import {Collection} from "../models/Collection";

export abstract class CollectionView<T, K>{
  //collection: Collection<User, UserProps>

  constructor(public parent: Element, public collection: Collection<T, K>) { }

  abstract renderItem(model: T, parent: Element): void;

  render(): void {
    this.parent.innerHTML = '';

    const templateElement = document.createElement('template');
    for (let model of this.collection.models) {
      const itemParent = document.createElement('div')
      this.renderItem(model, itemParent)
      templateElement.content.append(itemParent)
    }
    this.parent.append(templateElement.content)

  }

}










