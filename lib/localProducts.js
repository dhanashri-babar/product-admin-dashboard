const KEY = "local-product-changes";

function read() {
  if (typeof window === "undefined") return { added: [], updated: {}, deleted: [] };
  try {
    return JSON.parse(localStorage.getItem(KEY)) || { added: [], updated: {}, deleted: [] };
  } catch {
    return { added: [], updated: {}, deleted: [] };
  }
}

function write(value) {
  localStorage.setItem(KEY, JSON.stringify(value));
}

export function applyLocalChanges(products) {
  const state = read();
  return products
    .filter(p => !state.deleted.includes(p.id))
    .map(p => state.updated[p.id] ? { ...p, ...state.updated[p.id] } : p)
    .concat(state.added);
}

export function saveAdded(product) {
  const state = read();
  state.added.push(product);
  write(state);
}

export function saveUpdated(id, product) {
  const state = read();
  state.updated[id] = product;
  write(state);
}

export function saveDeleted(id) {
  const state = read();
  state.deleted.push(id);
  delete state.updated[id];
  state.added = state.added.filter(p => p.id !== id);
  write(state);
}