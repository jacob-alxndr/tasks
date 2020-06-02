// 1.Imports
import { updateStorage, removeItem, findItem } from './util';
import elements from './DOMelements';

// 2. Variables
let items = JSON.parse(localStorage.getItem('items')) || [];
const { form } = elements;
const { list } = elements;

// 3. Actions

// CREATE LIST ITEM HTML
export function createHTML(item, i) {
  return /* html */ `<li class="item" data-id="${item.id}" data-index="${i}">
      <div class="item-group">
      <label class="checkbox">
        <input ${
          item.done === true ? 'checked' : ''
        } type="checkbox" name="complete" id="${item.id}">
        <span class="checkmark"></span>
      </label>
          <p class="paragraph">${item.text}</p>
          <input class="close" value='${item.text}' type="text">
      </div>
      <div class="buttons">
          <button class="btn btn--edit">Edit</button>
          <button class="btn btn--submit close">submit</button>
          <button class="btn btn--delete">&#10005;</button>
      </div>
      </li>`;
}

// MAP ARRAY OF HTML => POPULATE HTML
export function populateList(array, el) {
  const html = array.map(createHTML);
  el.innerHTML = html.join('');
}

// ADD ITEM TO ARRAY
export function addItem(text) {
  const item = {
    text,
    done: false,
    id: Date.now(),
  };
  items.push(item);
  updateStorage('items', items);

  populateList(items, list);
  form.reset();
}

// REMOVE LIST ITEM ELEMENT & REMOVE ITEM FROM ARRAY
export function deleteItem(e) {
  if (!e.target.classList.contains('btn--delete')) return;

  e.target.parentElement.parentElement.remove();
  const value = parseInt(e.target.parentElement.parentElement.dataset.index);

  items = removeItem(value, items);

  updateStorage('items', items);
  populateList(items, list);
}

// EDIT ELEMENT TEXT CONTENT & EDIT ITEM TEXT PROPERTY
export function editItem(e) {
  if (!e.target.classList.contains('btn--edit')) return;
  const item = e.target.parentElement.parentElement;
  const p = item.querySelector('p');
  const submitBtn = item.querySelector('.btn--submit');
  const editBtn = e.target;
  const input = item.querySelector('input[type="text"]');
  p.classList.add('close');
  submitBtn.classList.remove('close');
  editBtn.classList.add('close');
  input.classList.remove('close');
  input.classList.add('open');
  input.focus();

  submitBtn.addEventListener(
    'click',
    function() {
      const id = parseInt(item.dataset.id);
      const refID = findItem(id, items);
      console.log(refID);
      refID.text = input.value;
      updateStorage('items', items);
      populateList(items, list);
    },
    { once: true }
  );
}

// STORE CHECKED ITEMS IN DONE PROPERTY & DISPLAY CHECKED STATE
export function checkedItem(e) {
  if (!e.target.id) {
    return;
  }
  const id = parseInt(e.target.id);
  const refID = findItem(id, items);
  refID.done = !refID.done;
  updateStorage('items', items);
}
