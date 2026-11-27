const reduced = matchMedia('(prefers-reduced-motion: reduce)');
const finePointer = matchMedia('(hover: hover) and (pointer: fine)');
const targets = document.querySelectorAll<HTMLElement>('.aurora-surface, .gradient-button, .hero-visual, .spotlight-card');
const visible = new WeakSet<Element>();
const observer = new IntersectionObserver((entries) => {
  for (const entry of entries) {
    entry.target.classList.toggle('is-visible', entry.isIntersecting);
    if (entry.isIntersecting) visible.add(entry.target); else visible.delete(entry.target);
  }
}, { threshold: 0.05 });
targets.forEach((target) => observer.observe(target));
const syncMotion = () => { document.documentElement.dataset.motion = document.hidden || reduced.matches ? 'paused' : 'running'; };
document.addEventListener('visibilitychange', syncMotion);
reduced.addEventListener('change', syncMotion);
syncMotion();
let frame = 0;
let pointer: PointerEvent | null = null;
document.addEventListener('pointermove', (event) => {
  if (!finePointer.matches || reduced.matches || document.hidden) return;
  pointer = event;
  if (frame) return;
  frame = requestAnimationFrame(() => {
    frame = 0;
    if (!(pointer?.target instanceof Element)) return;
    const target = pointer.target.closest<HTMLElement>('.spotlight-card, .hero-visual');
    if (!target || !visible.has(target)) return;
    const box = target.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (pointer.clientX - box.left) / box.width));
    const y = Math.max(0, Math.min(1, (pointer.clientY - box.top) / box.height));
    target.style.setProperty('--light-x', `${x * 100}%`);
    target.style.setProperty('--light-y', `${y * 100}%`);
    target.style.setProperty('--tilt-x', `${(0.5 - y) * 5}deg`);
    target.style.setProperty('--tilt-y', `${(x - 0.5) * 5}deg`);
  });
}, { passive: true });
