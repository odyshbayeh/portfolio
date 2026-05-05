import { Helmet } from "react-helmet-async";
import {
  SITE_DESCRIPTION,
  SITE_KEYWORDS,
  SITE_NAME,
  SITE_TITLE,
  TWITTER_CREATOR,
  getPersonJsonLd,
  getSiteUrl,
} from "../seo/siteMeta";

const SEO = () => {
  const siteUrl = getSiteUrl();
  const canonical = siteUrl ? `${siteUrl}/` : undefined;
  const ogImage = siteUrl ? `${siteUrl}/logo.svg` : `${import.meta.env.BASE_URL}logo.svg`;

  const jsonLd = getPersonJsonLd(siteUrl);

  return (
    <Helmet defaultTitle={SITE_TITLE} titleTemplate={`%s | ${SITE_NAME}`}>
      <html lang="en" />
      <title>{SITE_TITLE}</title>
      <meta name="description" content={SITE_DESCRIPTION} />
      <meta name="keywords" content={SITE_KEYWORDS} />
      <meta name="author" content={SITE_NAME} />
      <meta name="robots" content="index, follow" />
      <meta name="theme-color" content="#050816" />

      {canonical ? <link rel="canonical" href={canonical} /> : null}

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={SITE_TITLE} />
      <meta property="og:description" content={SITE_DESCRIPTION} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:locale" content="en_US" />
      {canonical ? <meta property="og:url" content={canonical} /> : null}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={SITE_TITLE} />
      <meta name="twitter:description" content={SITE_DESCRIPTION} />
      <meta name="twitter:image" content={ogImage} />
      {TWITTER_CREATOR ? (
        <meta name="twitter:creator" content={`@${TWITTER_CREATOR}`} />
      ) : null}

      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    </Helmet>
  );
};

export default SEO;
