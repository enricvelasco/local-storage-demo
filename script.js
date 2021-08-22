const localStorageWrite = (key, dataString) => {
  /** Escriu al local storage del navegador, només accepta Strings **/
  window.localStorage.setItem(key, dataString)
}

const localStorageGetData = key => {
  /** agafa les dades del localStorage, si no hi han torna un array empty **/
  const data = window.localStorage.getItem(key)
  return data ? stringToObject(data) : []
}

/** convertim l'objecte a string **/
const objectToString = obj => JSON.stringify(obj)

/** string a objecte **/
const stringToObject = string => JSON.parse(string)

const resetInputs = () => {
  document.getElementById('player-name').value = ''
  document.getElementById('score').value = ''
}

const saveData = () => {
  const name = document.getElementById('player-name').value
  const score = document.getElementById('score').value

  const player = {
    id: Date.now(), //posem un id autogenerat per si el nom es repeteix
    name,
    score
  }

  // accedim a les dades previes per guardar
  const list = localStorageGetData('list')
  list.push(player)
  localStorageWrite('list', objectToString(list))

  // reseteamos inputs
  resetInputs()

  updateList()
}

const cleanList = () => {
  const scoreListWrapper = document.getElementById('score-list')
  scoreListWrapper.remove()
  const scoreListContainer = document.getElementById('score-list-container')
  const listWrapper = document.createElement('ul')
  listWrapper.id = 'score-list'
  scoreListContainer.appendChild(listWrapper)
}

const updateList = () => {
  cleanList()

  const list = localStorageGetData('list')
  const scoreListWrapper = document.getElementById('score-list')

  list.map(item => {
    const li = document.createElement('li')
    li.innerText = `${item.name} - ${item.score}`
    scoreListWrapper.appendChild(li)
  })
}

updateList()
