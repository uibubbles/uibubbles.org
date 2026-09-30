// Shared by the visuals: the droplet burst of a popped Bubble, and a motion check.
export const reducedMotion = (): boolean => matchMedia("(prefers-reduced-motion: reduce)").matches;

const FILM = ["--film-a", "--film-b", "--film-c", "--film-d"];

/**
 * Burst of droplets and one fading ring at (x, y), in the coordinates of `layer`.
 * `layer` must be position: relative (or absolute). Purely visual: everything it adds is
 * aria-hidden, non-interactive and removed when done. Does nothing under reduced motion.
 */
export function burst(layer: HTMLElement, x: number, y: number, size = 120, count = 11): void {
  if (reducedMotion() || typeof layer.animate !== "function") return;
  const radius = size / 2;
  const ring = document.createElement("span");
  ring.setAttribute("aria-hidden", "true");
  ring.style.cssText = `position:absolute;left:${x - radius}px;top:${y - radius}px;width:${size}px;height:${size}px;border-radius:50%;border:2px solid var(--film-a);pointer-events:none;z-index:3;`;
  layer.append(ring);
  ring.animate(
    [{ transform: "scale(0.85)", opacity: 0.9 }, { transform: "scale(1.35)", opacity: 0 }],
    { duration: 380, easing: "ease-out" },
  ).finished.then(() => ring.remove(), () => ring.remove());
  for (let i = 0; i < count; i++) {
    const angle = (Math.PI * 2 * i) / count + Math.random() * 0.5;
    const dist = radius * (0.9 + Math.random() * 0.7);
    const d = 4 + Math.random() * 6;
    const drop = document.createElement("span");
    drop.setAttribute("aria-hidden", "true");
    drop.style.cssText = `position:absolute;left:${x - d / 2}px;top:${y - d / 2}px;width:${d}px;height:${d}px;border-radius:50%;pointer-events:none;z-index:3;background:radial-gradient(circle at 32% 30%,#fff 0 22%,var(${FILM[i % FILM.length]}) 60%);box-shadow:0 0 0 1px color-mix(in srgb,var(${FILM[i % FILM.length]}) 70%,transparent);`;
    layer.append(drop);
    const dx = Math.cos(angle) * dist;
    const dy = Math.sin(angle) * dist;
    drop.animate(
      [
        { transform: "translate(0,0) scale(1)", opacity: 1 },
        { transform: `translate(${dx}px,${dy + 14}px) scale(0.3)`, opacity: 0 },
      ],
      { duration: 480 + Math.random() * 360, easing: "cubic-bezier(.15,.7,.3,1)" },
    ).finished.then(() => drop.remove(), () => drop.remove());
  }
}
