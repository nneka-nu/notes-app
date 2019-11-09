export const isNoteEmpty = (text) => {
  return text.replace(/[\n\t\r]/g, '').trim().length === 0;
}
