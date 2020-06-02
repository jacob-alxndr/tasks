import elements from './DOMelements';
import { handleSubmit } from './handlers';
import { populateList, deleteItem, checkedItem, editItem } from './lib';
import { items } from './storage';

const { form } = elements;
const { list } = elements;
// 3. Events
export function start() {
  form.addEventListener('submit', handleSubmit);
  window.addEventListener('load', () => populateList(items, list));
  list.addEventListener('click', deleteItem);
  list.addEventListener('click', checkedItem);
  list.addEventListener('click', editItem);
}
