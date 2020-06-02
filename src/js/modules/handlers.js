// 1.Imports
import { cleanHTML } from './util';
import { addItem } from './lib';

// 2. Actions

// SUBMIT HANDLER
export function handleSubmit(e) {
  e.preventDefault();
  const cleanText = cleanHTML(e.currentTarget.task.value);
  addItem(cleanText);
}
