// Lightweight constellation particle background
// Inspired by common SPA background patterns. Respects reduced motion.

export function mountConstellation(canvas, opts = {}) {
  const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1))
  const ctx = canvas.getContext('2d')
  const width = () => (canvas.clientWidth || window.innerWidth)
  const height = () => (canvas.clientHeight || window.innerHeight)
  const state = {
    particles: [],
    raf: null,
    mouse: { x: null, y: null }
  }
  const config = {
    particleCount: opts.particleCount ?? 80,
    lineDistance: opts.lineDistance ?? 110,
    speed: opts.speed ?? 0.3
  }

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (prefersReduced) return () => {}

  function resize() {
    const w = width()
    const h = height()
    canvas.width = Math.floor(w * dpr)
    canvas.height = Math.floor(h * dpr)
    canvas.style.width = w + 'px'
    canvas.style.height = h + 'px'
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  }

  function initParticles() {
    const w = width()
    const h = height()
    state.particles = Array.from({ length: config.particleCount }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * config.speed,
      vy: (Math.random() - 0.5) * config.speed
    }))
  }

  function step() {
    const w = width()
    const h = height()
    ctx.clearRect(0, 0, w, h)

    // Move and draw particles
    ctx.fillStyle = 'rgba(255,255,255,0.7)'
    for (const p of state.particles) {
      p.x += p.vx
      p.y += p.vy
      if (p.x < 0 || p.x > w) p.vx *= -1
      if (p.y < 0 || p.y > h) p.vy *= -1
      ctx.beginPath()
      ctx.arc(p.x, p.y, 1.2, 0, Math.PI * 2)
      ctx.fill()
    }

    // Lines between close particles
    for (let i = 0; i < state.particles.length; i++) {
      for (let j = i + 1; j < state.particles.length; j++) {
        const a = state.particles[i]
        const b = state.particles[j]
        const dx = a.x - b.x
        const dy = a.y - b.y
        const dist = Math.hypot(dx, dy)
        if (dist < config.lineDistance) {
          const alpha = 1 - dist / config.lineDistance
          ctx.strokeStyle = `rgba(140, 190, 230, ${alpha * 0.4})`
          ctx.beginPath()
          ctx.moveTo(a.x, a.y)
          ctx.lineTo(b.x, b.y)
          ctx.stroke()
        }
      }
    }

    // Mouse attraction
    if (state.mouse.x != null) {
      for (const p of state.particles) {
        const dx = state.mouse.x - p.x
        const dy = state.mouse.y - p.y
        const dist = Math.hypot(dx, dy)
        if (dist < config.lineDistance) {
          p.vx += dx * 0.00003
          p.vy += dy * 0.00003
        }
      }
    }

    state.raf = requestAnimationFrame(step)
  }

  function onMouseMove(e) {
    const rect = canvas.getBoundingClientRect()
    state.mouse.x = e.clientX - rect.left
    state.mouse.y = e.clientY - rect.top
  }

  function onMouseLeave() {
    state.mouse.x = state.mouse.y = null
  }

  resize()
  initParticles()
  state.raf = requestAnimationFrame(step)
  window.addEventListener('resize', resize)
  canvas.addEventListener('mousemove', onMouseMove)
  canvas.addEventListener('mouseleave', onMouseLeave)

  return function dispose() {
    cancelAnimationFrame(state.raf)
    window.removeEventListener('resize', resize)
    canvas.removeEventListener('mousemove', onMouseMove)
    canvas.removeEventListener('mouseleave', onMouseLeave)
  }
}

