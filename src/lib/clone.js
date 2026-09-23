// Deep-clones block content so local edits never mutate store state
export function cloneContent(content) {
  return JSON.parse(JSON.stringify(content));
}
