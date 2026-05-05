/**
 * @splinetool/viewer ships a bundled Three.js; R3F uses node_modules/three.
 * Both register on window — the second load logs a harmless duplicate warning.
 */
const warn = console.warn;
console.warn = (...args) => {
  const first = args[0];
  if (
    typeof first === "string" &&
    first.includes("Multiple instances of Three.js")
  ) {
    return;
  }
  warn.apply(console, args);
};
