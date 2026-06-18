/**
 * Fixed, behind-everything animated backdrop: three slowly drifting blurred
 * gradient blobs over the dark base. Pure CSS keyframes (compositor-only),
 * so it costs ~nothing and pauses under prefers-reduced-motion.
 */
const AuroraBackground = () => (
  <div className="aurora" aria-hidden="true">
    <span className="aurora-blob aurora-blob--1" />
    <span className="aurora-blob aurora-blob--2" />
    <span className="aurora-blob aurora-blob--3" />
    <div className="aurora-grid" />
  </div>
);

export default AuroraBackground;
