import { type Item, CrudStore } from './src';

const sci = new CrudStore()
console.log(sci)
const item: Item = sci.create('sdf')
  sci.create('asdf')
console.log(item)
sci.update(1, 'xxxx')
console.log(sci.getAll())

