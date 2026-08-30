import { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'

const levels = [
  {
    id: 'easy',
    title: 'Easy',
    eyebrow: 'Bob essentials',
    questions: [
      {
        question: 'Legacy app needs file inspection, code edits, commands, and browser testing. Which Bob mode fits?',
        choices: ['Ask', 'Plan', 'Agent'],
        answer: 2,
        explanation: 'Agent mode gives Bob tools for code changes and validation.',
      },
      {
        question: 'What is Lab 1 goal?',
        choices: ['Add category budgets', 'Preserve Expense Tracker behavior while modernizing old JavaScript into React', 'Connect cloud database'],
        answer: 1,
        explanation: 'Modernization preserves user workflows while improving code structure.',
      },
      {
        question: 'After migration, what should Bob validate in browser?',
        choices: ['Page title only', 'Filter expenses, add expense, verify list and total update', 'Git history'],
        answer: 1,
        explanation: 'Visible user behavior is proof that modernization preserved the app.',
      },
    ],
  },
  {
    id: 'medium',
    title: 'Medium',
    eyebrow: 'Guide Bob',
    questions: [
      {
        question: 'Legacy code changes UI with innerHTML and stores expenses in global var. What should Bob migrate toward?',
        choices: ['More innerHTML', 'React state and components that render from state', 'CSS animations only'],
        answer: 1,
        explanation: 'React renders the UI from state instead of mutating page fragments directly.',
      },
      {
        question: 'Which instruction best starts Lab 1?',
        choices: ['Modernize it', 'Inspect legacy behavior, propose React component plan, preserve filter, add-expense, and total behavior', 'Rewrite all files'],
        answer: 1,
        explanation: 'Specific behavior and constraints help Bob make a safe, focused change.',
      },
      {
        question: 'Food expenses are 120 and 60. Bob filters Food. What filtered total should appear?',
        choices: ['80', '180', '260'],
        answer: 1,
        explanation: 'The filtered total includes only the visible Food expenses.',
      },
    ],
  },
  {
    id: 'hard',
    title: 'Hard',
    eyebrow: 'Validate Bob',
    questions: [
      {
        question: 'Bob adds an expense, list updates, but total does not. Best next prompt?',
        choices: ['Looks good', 'Trace total calculation from React state, fix stale calculation, rerun browser validation', 'Delete total'],
        answer: 1,
        explanation: 'Ask Bob to trace state through the broken behavior, fix it, then verify again.',
      },
      {
        question: 'Which browser-validation prompt is strongest?',
        choices: ['Test it', 'Open local app, filter Food, add Lunch for 120, verify new row and total, report expected versus observed', 'Check browser console'],
        answer: 1,
        explanation: 'A precise user flow and observable checks make validation repeatable.',
      },
      {
        question: 'Why preserve legacy behavior during migration?',
        choices: ['React requires old bugs', 'Modernization should improve code structure without silently breaking user workflows', 'Browser tool needs tables'],
        answer: 1,
        explanation: 'Code can change radically; the behavior users depend on must remain.',
      },
    ],
  },
]

const groupFor = (scores) => {
  if (scores.easy < 2) return 'Core'
  if (scores.medium < 2 || scores.hard < 2) return 'Stretch'
  return 'Expert'
}

const labPrompts = {
  Core: {
    lab1: 'Open legacy/index.html and inspect app.js. First list every visible behavior. Then create a React version in modern/ that keeps category filtering, add-expense form, and displayed total. Use components for the form, filters, list, and summary. Do not add budgets yet. Run it locally, open it in browser, filter Food, add Lunch for 120, and report expected versus observed.',
    lab2: 'Create .bob/skills/expense-feature-builder/SKILL.md and .bob/skills/expense-browser-validator/SKILL.md from the workshop instructions. Add Category Budgets to modern/: set a limit for each category, show spent and remaining amounts, warn when over budget, persist data, then use Bob browser tools to validate the flow.',
  },
  Stretch: {
    lab1: 'Inspect legacy Expense Tracker. Propose React component boundaries that preserve its filter, expense creation, and total behavior. Implement modern app, including useful empty and error states. Validate the full user flow with Bob browser tools.',
    lab2: 'Create focused Bob skills for expense feature delivery and browser validation. Use them to add persistent category budgets with accessible over-budget feedback. Add meaningful edge-case coverage and validate the user flow in browser.',
  },
  Expert: {
    lab1: 'Modernize legacy Expense Tracker to React without breaking visible behavior. Choose architecture, state ownership, and validation strategy. Use Bob browser tools to prove filtering and expense creation work.',
    lab2: 'Author two focused Bob skills that let Bob implement and validate Category Budgets. Include activation descriptions, acceptance rules, failure reporting, persistence, accessibility, and edge cases. Improve the skills after one validation run.',
  },
}

function CopyButton({ text, children }) {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1600)
  }
  return <button onClick={copy}>{copied ? 'Copied' : children}</button>
}

const lab1Challenges = {
  Core: [
    { title: 'Prove current behavior', task: 'Run legacy app. Capture four facts before Bob changes code.', deliverable: 'Expense fields, category filter result, visible rows, and filtered total.', choices: ['Food total is $180', 'Page title looks modern', 'React components exist'], answers: [0] },
    { title: 'Build Bob request from fragments', task: 'Choose every fragment needed. Then write your own request in Bob; do not copy a supplied prompt.', deliverable: 'Bob response lists visible behavior and modernization risks before edits.', choices: ['Inspect legacy/index.html and legacy/app.js', 'Preserve add, filter, list, and filtered total', 'Change files now', 'Do not edit yet'], answers: [0, 1, 3] },
    { title: 'Gate Bob plan', task: 'Review plan. Select required acceptance conditions before approval.', deliverable: 'Approved plan names components, state owner, unchanged legacy app, and validation flow.', choices: ['One source of truth for expenses', 'Keep inline onclick handlers', 'Total derives from visible filtered expenses', 'Legacy app stays unchanged'], answers: [0, 2, 3] },
    { title: 'Direct implementation', task: 'Tell Bob to implement only approved scope. Check resulting UI yourself.', deliverable: 'React app has semantic labels, add form, filter, list, total, and stable test IDs.', choices: ['Form + filter + list + summary components', 'Global var state', 'data-testid on key controls'], answers: [0, 2] },
    { title: 'Run visible browser proof', task: 'Give Bob test fragments, then observe browser actions.', deliverable: 'Evidence: Lunch row visible; Food total changes from $180 to $300.', choices: ['Open local modern app', 'Add Lunch, $120, Food', 'Filter Food and compare expected versus observed', 'Edit React state directly'], answers: [0, 1, 2] },
    { title: 'Repair smallest layer', task: 'If proof fails, make Bob explain cause before it edits.', deliverable: 'One focused fix followed by same browser test.', choices: ['Trace state to rendered total', 'Delete failed feature', 'Rerun identical acceptance flow'], answers: [0, 2] },
  ],
  Stretch: [
    { title: 'Prove current behavior', task: 'Run legacy app. Capture four facts before Bob changes code.', deliverable: 'Expense fields, category filter result, visible rows, and filtered total.', choices: ['Food total is $180', 'Page title looks modern', 'React components exist'], answers: [0] },
    { title: 'Build Bob request from fragments', task: 'Choose fragments. Add one constraint of your own about empty or invalid input.', deliverable: 'Bob response lists behavior, risks, and one edge case before edits.', choices: ['Inspect legacy/index.html and legacy/app.js', 'Preserve add, filter, list, and filtered total', 'Change files now', 'Do not edit yet'], answers: [0, 1, 3] },
    { title: 'Gate Bob plan', task: 'Review plan. Require a clear component boundary and state owner.', deliverable: 'Plan includes behavior parity plus empty and validation states.', choices: ['One source of truth for expenses', 'Keep inline onclick handlers', 'Total derives from visible filtered expenses', 'Legacy app stays unchanged'], answers: [0, 2, 3] },
    { title: 'Direct implementation', task: 'Approve implementation. Decide where validation feedback belongs in UI.', deliverable: 'React app has accessible controls, useful empty/error states, and stable test IDs.', choices: ['Form + filter + list + summary components', 'Global var state', 'data-testid on key controls'], answers: [0, 2] },
    { title: 'Run visible browser proof', task: 'Compose a browser test from fragments. Add one edge case.', deliverable: 'Evidence: Lunch row visible; Food total changes from $180 to $300.', choices: ['Open local modern app', 'Add Lunch, $120, Food', 'Filter Food and compare expected versus observed', 'Edit React state directly'], answers: [0, 1, 2] },
    { title: 'Repair smallest layer', task: 'If proof fails, have Bob identify broken invariant and smallest responsible component.', deliverable: 'Focused repair, repeated browser proof, short failure report.', choices: ['Trace state to rendered total', 'Delete failed feature', 'Rerun identical acceptance flow'], answers: [0, 2] },
  ],
  Expert: [
    { title: 'Prove current behavior', task: 'Define observable behavior contract from live legacy UI, including one boundary case.', deliverable: 'Behavior contract you can use to challenge Bob’s plan.', choices: ['Food total is $180', 'Page title looks modern', 'React components exist'], answers: [0] },
    { title: 'Build Bob request from fragments', task: 'Choose fragments; add your own scope boundary and ask Bob to identify migration risks.', deliverable: 'Evidence-based behavior inventory before edits.', choices: ['Inspect legacy/index.html and legacy/app.js', 'Preserve add, filter, list, and filtered total', 'Change files now', 'Do not edit yet'], answers: [0, 1, 3] },
    { title: 'Gate Bob plan', task: 'Challenge state ownership and rendering choices before approval.', deliverable: 'Plan names acceptance criteria, testability seam, and no behavior drift.', choices: ['One source of truth for expenses', 'Keep inline onclick handlers', 'Total derives from visible filtered expenses', 'Legacy app stays unchanged'], answers: [0, 2, 3] },
    { title: 'Direct implementation', task: 'Approve only after Bob can explain component responsibilities and test hooks.', deliverable: 'React app with semantic UI, stable selectors, and rationale for state ownership.', choices: ['Form + filter + list + summary components', 'Global var state', 'data-testid on key controls'], answers: [0, 2] },
    { title: 'Run visible browser proof', task: 'Build browser flow from fragments. Add a negative or boundary assertion.', deliverable: 'Evidence for happy path plus your additional assertion.', choices: ['Open local modern app', 'Add Lunch, $120, Food', 'Filter Food and compare expected versus observed', 'Edit React state directly'], answers: [0, 1, 2] },
    { title: 'Repair smallest layer', task: 'Require Bob to state failed invariant, root cause, patch scope, and proof.', deliverable: 'Minimal repair and reproducible browser regression test.', choices: ['Trace state to rendered total', 'Delete failed feature', 'Rerun identical acceptance flow'], answers: [0, 2] },
  ],
}

function LabChallenge({ challenge, index }) {
  const [selected, setSelected] = useState([])
  const [checked, setChecked] = useState(false)
  const toggle = (choice) => {
    if (checked) return
    setSelected((current) => current.includes(choice) ? current.filter((item) => item !== choice) : [...current, choice])
  }
  const passed = checked && challenge.answers.length === selected.length && challenge.answers.every((answer) => selected.includes(answer))
  return <li className="lab-step">
    <div className="step-top"><span className="step-number">{String(index + 1).padStart(2, '0')}</span><div><h4>{challenge.title}</h4><p>{challenge.task}</p></div></div>
    <div className="challenge" aria-label={`${challenge.title} choices`}>
      {challenge.choices.map((choice, choiceIndex) => <button key={choice} type="button" className={selected.includes(choiceIndex) ? 'fragment selected' : 'fragment'} onClick={() => toggle(choiceIndex)}>{choice}</button>)}
      <button type="button" className="check-button" onClick={() => setChecked(true)}>Check choices</button>
      {checked && <p className={passed ? 'challenge-result pass' : 'challenge-result'}>{passed ? 'Ready. Now write or say request in your own words.' : 'Try again. Keep only fragments that protect behavior and safe workflow.'}</p>}
    </div>
    <p className="deliverable"><strong>Evidence to show:</strong> {challenge.deliverable}</p>
  </li>
}

function WorkshopInstructions({ group }) {
  const prompts = labPrompts[group]
  const challenges = lab1Challenges[group]
  return <section className="workshop-flow" aria-label="Workshop instructions">
    <div className="section-heading"><p className="eyebrow">Your workshop runbook</p><h2>Follow this page. No README hunt.</h2></div>
    <article className="instruction-card setup">
      <span className="lab-number">00</span>
      <div><p className="eyebrow">Setup · 30 minutes</p><h3>Prepare Bob and project</h3><ol><li>Open this folder in IBM Bob and trust workspace.</li><li>Select Agent mode so Bob can inspect files, run commands, and open browser.</li><li>Run <code>npm install</code>, then <code>npm run dev</code>.</li><li>Open legacy app. Filter Food and add one expense to see current behavior.</li></ol></div>
    </article>
    <article className="instruction-card">
      <span className="lab-number">01</span>
      <div><p className="eyebrow">Lab 1 · 30 minutes</p><h3>Modernize Expense Tracker</h3><p className="lab-intro">Each step has a decision challenge. Fragments guide your Bob request; no full prompt to copy.</p><ol className="lab-steps">{challenges.map((challenge, index) => <LabChallenge key={challenge.title} challenge={challenge} index={index} />)}</ol></div>
    </article>
    <article className="instruction-card">
      <span className="lab-number">02</span>
      <div><p className="eyebrow">Lab 2 · 30 minutes</p><h3>Teach Bob reusable skills</h3><ol><li>Create focused feature-builder and browser-validator skills in <code>.bob/skills/</code>.</li><li>Give skills a clear activation description and short ordered workflow.</li><li>Use them to add Category Budgets: limits, remaining amount, warning, and persistence.</li><li>Start fresh Bob conversation, invoke skills, then watch Bob validate in browser.</li></ol><CopyButton text={prompts.lab2}>Copy Lab 2 prompt</CopyButton></div>
    </article>
  </section>
}

function App() {
  const [stage, setStage] = useState(0)
  const [question, setQuestion] = useState(0)
  const [answers, setAnswers] = useState([])
  const [scores, setScores] = useState({ easy: 0, medium: 0, hard: 0 })
  const [result, setResult] = useState(null)

  const currentLevel = levels[stage]
  const currentQuestion = currentLevel.questions[question]
  const selected = answers[question]
  const correct = selected === currentQuestion.answer
  const allAnswered = answers.length === currentLevel.questions.length
  const progress = ((stage * 3 + question + (selected !== undefined ? 1 : 0)) / 9) * 100

  useEffect(() => {
    const saved = window.localStorage.getItem('bob-workshop-diagnostic')
    if (saved) setResult(JSON.parse(saved))
  }, [])

  const selectAnswer = (choice) => {
    if (selected !== undefined) return
    setAnswers((existing) => [...existing, choice])
  }

  const continueQuiz = () => {
    const gained = answers.reduce((total, answer, index) => total + (answer === currentLevel.questions[index].answer ? 1 : 0), 0)
    const nextScores = { ...scores, [currentLevel.id]: gained }

    if (stage === 0 && gained < 2) return finish(nextScores)
    if (stage === 1 && gained < 2) return finish(nextScores)
    if (stage === 2) return finish(nextScores)

    setScores(nextScores)
    setStage((value) => value + 1)
    setQuestion(0)
    setAnswers([])
  }

  const finish = (finalScores) => {
    const finalResult = { group: groupFor(finalScores), scores: finalScores }
    window.localStorage.setItem('bob-workshop-diagnostic', JSON.stringify(finalResult))
    setScores(finalScores)
    setResult(finalResult)
  }

  const reset = () => {
    window.localStorage.removeItem('bob-workshop-diagnostic')
    setStage(0)
    setQuestion(0)
    setAnswers([])
    setScores({ easy: 0, medium: 0, hard: 0 })
    setResult(null)
  }

  if (result) {
    return <main className="shell">
      <header className="hero compact">
        <p className="eyebrow">Refactor Revolution</p>
        <h1>Your route: <span>{result.group}</span></h1>
        <p>Same project. Different amount of guidance.</p>
      </header>
      <section className="route-grid" aria-label="Workshop paths">
        <article className={result.group === 'Core' ? 'route selected' : 'route'}><h2>Core</h2><p>Exact Bob prompts, visible hints, one change at a time.</p></article>
        <article className={result.group === 'Stretch' ? 'route selected' : 'route'}><h2>Stretch</h2><p>Partial prompts. Choose component boundaries and user experience.</p></article>
        <article className={result.group === 'Expert' ? 'route selected' : 'route'}><h2>Expert</h2><p>Outcome-led brief. Diagnose Bob output and improve validation.</p></article>
      </section>
      <WorkshopInstructions group={result.group} />
      <div className="actions"><a className="secondary" href="/legacy/index.html">Open legacy app</a><button className="text-button" onClick={reset}>Retake diagnostic</button></div>
    </main>
  }

  return <main className="shell">
    <header className="hero">
      <p className="eyebrow">Refactor Revolution · IBM Bob</p>
      <h1>Find your <span>Lab 1</span> route.</h1>
      <p>Answer Bob-and-modernization questions. This changes guidance, not whether you belong here.</p>
      <div className="progress" aria-label={`${Math.round(progress)}% complete`}><i style={{ width: `${progress}%` }} /></div>
    </header>
    <section className="quiz-card" aria-live="polite">
      <div className="quiz-meta"><span>{currentLevel.eyebrow}</span><span>{currentLevel.title} · {question + 1} / 3</span></div>
      <h2>{currentQuestion.question}</h2>
      <div className="choices">
        {currentQuestion.choices.map((choice, index) => <button key={choice} className={selected === index ? (correct ? 'choice correct' : 'choice wrong') : 'choice'} onClick={() => selectAnswer(index)}>{choice}</button>)}
      </div>
      {selected !== undefined && <div className={correct ? 'feedback good' : 'feedback'}><strong>{correct ? 'Correct.' : 'Not quite.'}</strong> {currentQuestion.explanation}</div>}
      <div className="quiz-footer">
        <span>Each correct answer earns 1 point.</span>
        {selected !== undefined && !allAnswered && <button onClick={() => setQuestion((value) => value + 1)}>Next question</button>}
        {allAnswered && <button onClick={continueQuiz}>{stage === 2 ? 'See route' : 'Continue'}</button>}
      </div>
    </section>
    <section className="preview-flow" aria-label="Workshop overview">
      <p className="eyebrow">After your route</p>
      <h2>Three blocks. One working app.</h2>
      <p>Setup Bob. Modernize Expense Tracker to React. Create Bob skills that build and browser-validate Category Budgets.</p>
    </section>
  </main>
}

createRoot(document.getElementById('root')).render(<App />)
