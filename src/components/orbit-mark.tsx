// The Solaris mark: a core and three partial orbits, drawn from the logo files in /public/brand.
// `intro` draws the rings on in sequence; `spin` keeps each ring turning at its own speed.

const rings = [
  { r: 10.5, color: "var(--ring-1)", dash: "62 38", rotate: 200, speed: 9 },
  { r: 16.5, color: "var(--ring-2)", dash: "70 30", rotate: 250, speed: 15 },
  { r: 22, color: "var(--ring-3)", dash: "78 22", rotate: 300, speed: 24 },
] as const;

const seam = (dash: string) => {
  const [on, off] = dash.split(" ").map(Number);
  return ((on + off / 2) / 100) * 360;
};

export function OrbitMark({
  className,
  intro = false,
  spin = false,
  delay = 0,
  title,
}: {
  className?: string;
  intro?: boolean;
  spin?: boolean;
  delay?: number;
  title?: string;
}) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      overflow="visible"
    >
      <circle
        cx="24"
        cy="24"
        r="4.5"
        fill="var(--ring-1)"
        className={intro ? "orbit-core" : undefined}
        style={intro ? { animationDelay: `${delay}s` } : undefined}
      />
      {rings.map((ring, i) => (
        <g
          key={ring.r}
          className={spin ? "orbit-spin" : undefined}
          style={spin ? { animationDuration: `${ring.speed}s` } : undefined}
        >
          <g transform={`rotate(${ring.rotate} 24 24)`}>
            {/* Two circles: the visible dash pattern, and when animating in, a mask that draws it on. */}
            {intro ? (
              <>
                <mask id={`orbit-draw-${ring.r}`} maskUnits="userSpaceOnUse" x="-4" y="-4" width="56" height="56">
                  <circle
                    cx="24"
                    cy="24"
                    r={ring.r}
                    fill="none"
                    stroke="#fff"
                    strokeWidth="5"
                    pathLength={100}
                    strokeDasharray="100 100"
                    // Start the reveal mid-gap so the mask's seam never cuts across the visible arc.
                    transform={`rotate(${seam(ring.dash)} 24 24)`}
                    className="orbit-ring"
                    style={{ animationDelay: `${delay + 0.25 + i * 0.22}s` }}
                  />
                </mask>
                <circle
                  cx="24"
                  cy="24"
                  r={ring.r}
                  fill="none"
                  stroke={ring.color}
                  strokeWidth="3"
                  strokeLinecap="round"
                  pathLength={100}
                  strokeDasharray={ring.dash}
                  mask={`url(#orbit-draw-${ring.r})`}
                />
              </>
            ) : (
              <circle
                cx="24"
                cy="24"
                r={ring.r}
                fill="none"
                stroke={ring.color}
                strokeWidth="3"
                strokeLinecap="round"
                pathLength={100}
                strokeDasharray={ring.dash}
              />
            )}
          </g>
        </g>
      ))}
    </svg>
  );
}
