export class StorageService {
  setItem(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
  }

  removeItem(key) {
    localStorage.removeItem(key)
  }
  getItem(key) {
    const value = localStorage.getItem(key)
    return value ? JSON.parse(value) : null
  }
  clear() {
    localStorage.clear()
  }
}
