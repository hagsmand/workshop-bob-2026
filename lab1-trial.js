const trialUrl = 'https://ibm.biz/Bob_trial_KBTG'

function addLab1TrialCard() {
  const labHeading = [...document.querySelectorAll('.section-heading')]
    .find((heading) => heading.querySelector('.eyebrow')?.textContent.trim() === 'Lab 1 · 30 minutes')

  if (!labHeading || document.querySelector('#bob-trial-card')) return

  const card = document.createElement('article')
  card.id = 'bob-trial-card'
  card.className = 'bob-trial-card'
  card.innerHTML = `<img src="public/bob-trial-kbtg-qr.png" alt="QR code for the IBM Bob free trial" /><div><p class="eyebrow">Free IBM Bob trial</p><h2>Get your free trial before Lab 1</h2><p>Scan the QR code or open <a href="${trialUrl}" target="_blank" rel="noopener noreferrer">ibm.biz/Bob_trial_KBTG</a> to start your IBM Bob trial.</p></div>`
  labHeading.before(card)
}

const playwrightMcpConfig = JSON.stringify({
  mcpServers: {
    playwright: {
      command: 'npx',
      args: ['@playwright/mcp@latest'],
    },
  },
}, null, 2)

function addLab1McpSetup(labHeading) {
  const flow = labHeading.parentElement
  const firstStep = [...flow.children].find((child) => child.classList.contains('instruction-card'))

  if (!firstStep || document.querySelector('#playwright-mcp-setup')) return

  const card = document.createElement('article')
  card.id = 'playwright-mcp-setup'
  card.className = 'instruction-card setup mcp-setup-card'
  card.innerHTML = `<span class="lab-number">00</span><div><p class="eyebrow">Step 0 · Required workshop setup</p><h3>Connect Playwright MCP for browser automation</h3><p class="lab-intro">Add this server to the workshop MCP configuration in IBM Bob before you start Lab 1. It lets Bob automate the browser for the validation steps.</p><ol><li>Open the workshop MCP configuration in IBM Bob and add the Playwright server below.</li><li>Save the configuration, then restart or reconnect IBM Bob if it asks you to.</li><li><strong>Optional — only if <code>npx --version</code> does not work:</strong> install the current Node.js LTS release from <a href="https://nodejs.org/" target="_blank" rel="noopener noreferrer">nodejs.org</a>, reopen your terminal and IBM Bob, then run <code>npx --version</code> again.</li></ol><details class="mcp-config"><summary>Playwright MCP configuration</summary><pre><code>${playwrightMcpConfig}</code></pre></details></div>`
  firstStep.before(card)

  ;[...flow.children]
    .filter((child) => child.classList.contains('instruction-card'))
    .forEach((step, index) => { step.querySelector('.lab-number').textContent = String(index).padStart(2, '0') })
}

const trialStyle = document.createElement('style')
trialStyle.textContent = `.bob-trial-card{display:grid;grid-template-columns:minmax(8rem,12rem) 1fr;gap:1.5rem;align-items:center;padding:1.25rem 1.5rem;border:1px solid #ffffff20;border-radius:20px;background:linear-gradient(135deg,#263f73,#161f3ae8);box-shadow:0 25px 70px #02040f44}.bob-trial-card img{width:100%;max-width:12rem;border-radius:12px;background:#fff}.bob-trial-card h2{margin:.35rem 0;font-size:clamp(1.4rem,3.5vw,2rem);letter-spacing:-.04em}.bob-trial-card p:not(.eyebrow){margin:.5rem 0 0;color:#c9cadd;line-height:1.5}.bob-trial-card a{color:#ffd3a4}@media(max-width:640px){.bob-trial-card{grid-template-columns:1fr;padding:1.5rem}.bob-trial-card img{width:min(12rem,100%)}}`
document.head.append(trialStyle)

const mcpStyle = document.createElement('style')
mcpStyle.textContent = `.mcp-setup-card .mcp-config{position:relative;z-index:1;margin-top:1rem}.mcp-setup-card summary{cursor:pointer;color:#f4f0ea;font-weight:600}.mcp-setup-card pre{overflow:auto;margin:1rem 0 0;padding:1rem;border:1px solid #ffffff1b;border-radius:12px;background:#0c1328;color:#ffd3a4;font:500 .82rem/1.5 "DM Mono",monospace}.mcp-setup-card a{color:#ffd3a4}`
document.head.append(mcpStyle)

function enhanceLab1() {
  const labHeading = [...document.querySelectorAll('.section-heading')]
    .find((heading) => heading.querySelector('.eyebrow')?.textContent.trim() === 'Lab 1 · 30 minutes')

  if (!labHeading) return
  addLab1TrialCard()
  addLab1McpSetup(labHeading)
}

new MutationObserver(enhanceLab1).observe(document.querySelector('#app'), { childList: true, subtree: true })
enhanceLab1()
