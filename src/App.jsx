import { useState, useRef } from 'react'
import confetti from 'canvas-confetti'
import './App.css'

const NO_BUTTON_MESSAGES = [
  'No',
  'Are you sure?',
  'Think again!',
  'Really?',
  'Please?',
  'Pretty please?',
  'Just think about it',
  'You might regret it',
  'Last chance!',
  'Are you absolutely sure?',
  'Maybe reconsider?',
  "I'll be sad 😢",
  'Pretty please with a cherry on top?',
  "You're breaking my heart 💔",
  'One more chance?',
  'Please say yes!',
  "I'm not giving up!",
  'Still no?',
  "You're persistent!",
  'Okay, fine... but are you sure?',
  "Don't hover!",
  'Stop it!',
  'Go away!',
  'Not today!',
  'Nope!',
  'Try again!',
  'Nice try!',
  'Almost!',
  'Missed me!',
  'Too slow!',
  'Stop Itttttt',
  'Really???',
  "C'monnnnnnnn",
]

function App() {
  const [showCelebration, setShowCelebration] = useState(false)
  const [secondaryView, setSecondaryView] = useState('celebration')
  const [noButtonText, setNoButtonText] = useState('No')
  const [clickCount, setClickCount] = useState(0)
  const [noButtonPosition, setNoButtonPosition] = useState({ left: null, top: null })
  const [isHoveringYes, setIsHoveringYes] = useState(false)
  const noButtonRef = useRef(null)

  const randomInRange = (min, max) => Math.random() * (max - min) + min

  const handleYesClick = () => {
    setShowCelebration(true)
    setSecondaryView('celebration')

    const duration = 3000
    const animationEnd = Date.now() + duration
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now()
      if (timeLeft <= 0) return clearInterval(interval)

      const particleCount = 50 * (timeLeft / duration)
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } })
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } })
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.4, 0.6), y: Math.random() - 0.2 } })
    }, 250)
  }

  const moveNoButtonToRandomPosition = (includePadding = false) => {
    if (!noButtonRef.current) return

    const viewportWidth = window.innerWidth
    const viewportHeight = window.innerHeight
    const { width: btnWidth, height: btnHeight } = noButtonRef.current.getBoundingClientRect()
    const padding = includePadding ? 20 : 0

    const maxX = viewportWidth - btnWidth - padding
    const maxY = viewportHeight - btnHeight - padding

    setNoButtonPosition({
      left: `${Math.max(padding, Math.random() * maxX)}px`,
      top: `${Math.max(padding, Math.random() * maxY)}px`,
    })
  }

  const handleNoClick = (e) => {
    e.preventDefault()
    const newClickCount = clickCount + 1
    setClickCount(newClickCount)
    const messageIndex = Math.min(newClickCount - 1, NO_BUTTON_MESSAGES.length - 1)
    setNoButtonText(NO_BUTTON_MESSAGES[messageIndex])
    moveNoButtonToRandomPosition()
  }

  const handleNoMouseEnter = () => {
    setNoButtonText(NO_BUTTON_MESSAGES[Math.floor(Math.random() * NO_BUTTON_MESSAGES.length)])
    moveNoButtonToRandomPosition(true)
  }

  const noButtonStyle = {
    position: noButtonPosition.left ? 'fixed' : 'relative',
    left: noButtonPosition.left || undefined,
    top: noButtonPosition.top || undefined,
    transform: noButtonPosition.left ? 'translate(-50%, -50%)' : undefined,
    transition: 'left 0.2s ease, top 0.2s ease',
  }

  const BackButton = () => (
    <button className="back-btn" onClick={() => setSecondaryView('celebration')}>
      ← Back
    </button>
  )

  return (
    <div className="app">

      {/* ── Main question page ── */}
      {!showCelebration && (
        <div className="content-container">
          <h6 className="question">Hey You!!!</h6>
          <p className="question">Will you be my Valentine?</p>

          <img
            src={isHoveringYes ? 'https://media.tenor.com/RYmzfAp_1p0AAAAj/peach-goma-happy-shine-stars.gif' : 'https://media.tenor.com/kVYPN27KtDwAAAAj/bear-love.gif'}
            alt={isHoveringYes ? 'Yay!' : 'Bear jumping'}
            className="bear-gif"
          />

          <div className="buttons-container">
            <button
              id="yesBtn"
              className={`btn yes-btn ${isHoveringYes ? 'hover-green' : ''}`}
              onClick={handleYesClick}
              onMouseEnter={() => setIsHoveringYes(true)}
              onMouseLeave={() => setIsHoveringYes(false)}
            >
              Yes
            </button>

            <button
              ref={noButtonRef}
              id="noBtn"
              className="btn no-btn"
              onClick={handleNoClick}
              onMouseEnter={handleNoMouseEnter}
              style={noButtonStyle}
            >
              {noButtonText}
            </button>
          </div>
        </div>
      )}

      {/* ── Celebration page ── */}
      {showCelebration && secondaryView === 'celebration' && (
        <div className="content-container celebration-page">
          <h1 className="celebration-title">She said yes guysssssssssssss!!!</h1>

          <img src="https://media.tenor.com/gUiu1zyxfzYAAAAi/bear-kiss-bear-kisses.gif" />

          <p>
            Thank you for saying yes my love. <br />
            There are some things you might wanna check out below.
          </p>

          <div className="options-row">
            <div className="option-card" onClick={() => setSecondaryView('letter')}>
              <img src="https://media.tenor.com/ZcHQpxHaVB4AAAAM/pusheen-pusheen-cat.gif" alt="Open letter" className="option-image" />
              <p>A little letter to you my love</p>
            </div>
            <div className="option-card" onClick={() => setSecondaryView('music')}>
              <img src="https://media.tenor.com/aHJWo8AyQvAAAAAj/apu-apustaja-apu.gif" alt="Open playlist" className="option-image" />
              <p>A playlist for you my love</p>
            </div>
          </div>
        </div>
      )}

      {/* ── Letter page ── */}
      {showCelebration && secondaryView === 'letter' && (
        <div className="content-container letter-page">
          <BackButton />

          <h1 className="celebration-title">A little letter for you 💌</h1>

          <div className="letter-text">
            <p>Hello darling,</p>

            <p>
              I've never written a letter like this before, so fair warning, I'm improvising. I've
              been agonizing about writing something normal and sweet, but then I remembered… I'm me.
              And for whatever reason, you somehow love that. So here goes.
            </p>

            <p>
              Let's start with the reasons why I <em>might</em> be obsessed with you (yes, I said{' '}
              <em>might</em> — can't catch a nigga lacking over here).
            </p>

            <p>
              You. The beauty in your eyes. Your radiant smile. The way you think. The way you move.
              You're so beautiful, and that's somehow the least interesting thing about you. I love
              the way you've turned my days into something I actually look forward to. How kind you
              are without even realizing it. How effortlessly considerate you are. It's wild.
            </p>

            <p>
              You've dealt with so much in your past, and somehow you haven't let those experiences
              harden you or define you. I admire that deeply. I pray you keep moving forward and keep
              being the woman I know you are — the woman I love.
            </p>

            <p>
              Also… I've come to accept something. You might be a little insane. Just a little. The
              way your mind works. The randomness. The dramatic storytelling. The way you can escalate
              a simple conversation into a full production. And unfortunately for me, I think I might
              be attracted to that. There's something about your chaos that just makes sense to me.
              It's unhinged, but it's ours.
            </p>

            <p>
              I still remember our first date. Kinda impromptu. Not perfect by any means, but still
              unforgettable. I think about it more than I probably should. I genuinely believe that
              was the moment it began. There was magic in its simplicity, and I fear that's when I
              started falling for the woman that is you.
            </p>

            <p>
              You make my life better in ways I don't always say out loud. You make my hard days
              lighter, my good days brighter, and my normal days feel like something I always want to
              remember. I love how we can go from deep, intimate conversations to absolute goofiness
              within five minutes. That's something I didn't even know I was missing. And somehow, it
              feels like home.
            </p>

            <p>
              I don't promise to always have the right words or always say the right things. But I do
              promise to keep choosing you. On the loud days. The boring ones (not that there really
              are any — there's always something happening 😭). And the days when we're both tired and
              burnt out. Especially those days.
            </p>

            <p>
              To you, my love,
              <br />
              Sarah Obinnah Uchechi Oluwatoyin Onome.
            </p>

            <p>
              Still yours.
              <br />
              Still obsessed.
            </p>

            <p>
              Love,
              <br />
              Some guy named Lanre
            </p>
          </div>
        </div>
      )}

      {/* ── Music / Spotify page ── */}
      {showCelebration && secondaryView === 'music' && (
        <div className="content-container music-page">
          <BackButton />

          <h3 className="celebration-title">A Collection of Songs for you 🎧</h3>
          <p className="celebration-subtitle">Hit play and enjoy these songs with me.</p>

          <div className="spotify-wrapper">
            <iframe
              className="spotify-frame"
              src="https://open.spotify.com/embed/playlist/6oaPPncxiYF2593wvJ0x2w?utm_source=generator"
              width="100%"
              height="380"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              title="Spotify playlist"
            />
          </div>
        </div>
      )}

    </div>
  )
}

export default App