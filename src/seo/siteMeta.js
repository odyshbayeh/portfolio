/**
 * Central SEO copy.
 * Production build uses Vite `base` (/portfolio/) + this host for absolute URLs.
 * Override with VITE_SITE_URL if you use a custom domain.
 */

/** Used when there is no window (e.g. prerender) and BASE_URL is the GitHub Pages subpath. */
export const GITHUB_PAGES_ORIGIN = "https://odyshbayeh.github.io";

export const SITE_NAME = "Ody Shbayeh";

export const SITE_TITLE =
  "Ody Shbayeh | Software Engineer & AI Enthusiast — Portfolio";

export const SITE_DESCRIPTION =
  "Portfolio of Ody Shbayeh — Computer Engineer graduate from Birzeit University. Software engineering, AI, web development, backend systems, and selected projects.";

export const SITE_KEYWORDS = [
  "Ody Shbayeh",
  "software engineer",
  "portfolio",
  "Birzeit University",
  "React",
  "Three.js",
  "web developer",
  "backend developer",
  "AI",
  "computer engineer",
].join(", ");

/** Optional: without @ */
export const TWITTER_CREATOR = "";

/** Public site root, e.g. https://odyshbayeh.github.io/portfolio (no trailing slash). */
export function getSiteUrl() {
  const fromEnv = import.meta.env.VITE_SITE_URL;
  if (fromEnv && String(fromEnv).trim()) {
    return String(fromEnv).replace(/\/$/, "");
  }

  const basePath = (import.meta.env.BASE_URL || "/").replace(/\/$/, "");

  if (typeof window !== "undefined" && window.location?.origin) {
    const origin = window.location.origin.replace(/\/$/, "");
    return basePath ? `${origin}${basePath}` : origin;
  }

  if (basePath) {
    return `${GITHUB_PAGES_ORIGIN}${basePath}`.replace(/\/$/, "");
  }

  return GITHUB_PAGES_ORIGIN;
}

export function getPersonJsonLd(siteUrl) {
  const base = siteUrl?.replace(/\/$/, "");
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: SITE_NAME,
    jobTitle: "Software Engineer",
    description: SITE_DESCRIPTION,
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Birzeit University",
    },
    knowsAbout: [
      "Software Engineering",
      "Web Development",
      "Artificial Intelligence",
      "Backend Development",
    ],
    sameAs: [
      "https://www.linkedin.com/in/ody-shbayeh-080833311/",
      "https://github.com/odyshbayeh",
    ],
  };
  if (base) {
    data.url = `${base}/`;
  }
  return data;
}

/** React Router v6: leading slash, no trailing slash. */
export function getRouterBasename() {
  const raw = import.meta.env.BASE_URL || "/";
  if (raw === "/") {
    return undefined;
  }
  return raw.replace(/\/$/, "");
}
