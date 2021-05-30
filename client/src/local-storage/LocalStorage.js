export default class LocalStorage {
  constructor(key) {
    this.key = key;
  }

  get() {
    return localStorage.getItem(this.key) || null;
  }

  set(value) {
    localStorage.setItem(this.key, value);
  }

  clear() {
    localStorage.removeItem(this.key);
  }
}
