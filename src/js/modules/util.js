// 1.Imports
import DOMPurify from 'dompurify';

// 2. Actions

// CLEAN HTML
export function cleanHTML(dirty) {
  return DOMPurify.sanitize(dirty)
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

// DELETE ITEM
export function removeItem(i, array) {
  const newItems = [...array.slice(0, i), ...array.slice(i + 1)];
  return newItems;
}

// FIND ITEM
export const findItem = (id, array) => array.find(item => item.id === id);

// UPDATE LOCAL STORAGE
export function updateStorage(str, array) {
  localStorage.setItem(str, JSON.stringify(array));
}
