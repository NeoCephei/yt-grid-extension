const slider = document.getElementById('columns')
const display = document.getElementById('valueDisplay')
const applyBtn = document.getElementById('apply')

chrome.storage.local.get('ytColumns', (data) => {
  const val = data.ytColumns || slider.value
  slider.value = val
  display.textContent = `${val} columna${val > 1 ? 's' : ''}`
})

slider.addEventListener('input', () => {
  display.textContent = `${slider.value} columna${slider.value > 1 ? 's' : ''}`
})

applyBtn.addEventListener('click', async () => {
  const value = parseInt(slider.value, 10)
  chrome.storage.local.set({ ytColumns: value })

  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
  chrome.tabs.sendMessage(tab.id, { type: 'setColumns', value })
})
