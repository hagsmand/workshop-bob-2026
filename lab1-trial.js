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

const trialStyle = document.createElement('style')
trialStyle.textContent = `.bob-trial-card{display:grid;grid-template-columns:minmax(8rem,12rem) 1fr;gap:1.5rem;align-items:center;padding:1.25rem 1.5rem;border:1px solid #ffffff20;border-radius:20px;background:linear-gradient(135deg,#263f73,#161f3ae8);box-shadow:0 25px 70px #02040f44}.bob-trial-card img{width:100%;max-width:12rem;border-radius:12px;background:#fff}.bob-trial-card h2{margin:.35rem 0;font-size:clamp(1.4rem,3.5vw,2rem);letter-spacing:-.04em}.bob-trial-card p:not(.eyebrow){margin:.5rem 0 0;color:#c9cadd;line-height:1.5}.bob-trial-card a{color:#ffd3a4}@media(max-width:640px){.bob-trial-card{grid-template-columns:1fr;padding:1.5rem}.bob-trial-card img{width:min(12rem,100%)}}`
document.head.append(trialStyle)

new MutationObserver(addLab1TrialCard).observe(document.querySelector('#app'), { childList: true, subtree: true })
addLab1TrialCard()
