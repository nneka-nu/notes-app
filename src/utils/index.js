export const isNoteEmpty = (text) => {
  return text.replace(/[\n\t\r]/g, '').trim().length === 0;
}

export const isInputValid = (text) => {
  return /^[A-Za-z0-9 _-]+$/.test(text);
}
