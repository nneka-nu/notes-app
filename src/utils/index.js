export const editorIsBlank = (quillOps) => {
  let editorIsBlank = true;
  for (let i = 0; i < quillOps.length; i++) {
    let text = quillOps[i].insert;
    if (text.replace(/\n/g, '').trim() !== '') {
      editorIsBlank = false;
      break;
    }
  }
  return editorIsBlank;
}
