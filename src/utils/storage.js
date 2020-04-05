// 处理本地储存数据

export function getItem (name) {
  return JSON.parse(window.localStorage.getItem(name))
}

export function setItem (name, data) {
  return window.localStorage.setItem(name, JSON.stringify(data))
}

export function removeItem (name) {
  return window.localStorage.getItem(name)
}
