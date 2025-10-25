const DEFAULT_BASE = 'https://mr-ahuja.github.io/devx/'

function openUrl(url) {
  chrome.tabs.create({ url })
}

document.getElementById('open-devx').addEventListener('click', () => openUrl(DEFAULT_BASE))

for (const btn of document.querySelectorAll('[data-tool]')) {
  btn.addEventListener('click', () => {
    const tool = btn.getAttribute('data-tool')
    openUrl(`${DEFAULT_BASE}?tool=${encodeURIComponent(tool)}`)
  })
}

