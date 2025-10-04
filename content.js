function injectStyle(value) {
  const styleId = 'yt-grid-custom-style'
  let style = document.getElementById(styleId)

  if (!style) {
    style = document.createElement('style')
    style.id = styleId
    document.head.appendChild(style)
  }

  style.textContent = `
    ytd-rich-grid-renderer {
      --ytd-rich-grid-items-per-row: ${value} !important;
    }
  `
}

chrome.runtime.onMessage.addListener((msg) => {
  if (msg.type === 'setColumns') injectStyle(msg.value)
})

chrome.storage.local.get('ytColumns', (data) => {
  if (data.ytColumns) injectStyle(data.ytColumns)
})
