import Head from "next/head";
import { configs } from "@/utils/config";

type SEOProps = {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  noIndex?: boolean; // Control indexing dynamically
};

export default function SEO({
  title = "Horizon Consultancy",
  description = "Online Business Consultancy",
  image = `https://res.cloudinary.com/dfbxrjdfd/image/upload/v1748852373/main_g0nq3k.jpg`,
  url = configs.PUBLIC_URL,
  noIndex = false, // Default: Allow indexing
}: SEOProps) {
  return (
    <Head>
      {/* ✅ Essential Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      {/* ✅ Open Graph for Facebook, WhatsApp, LinkedIn */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />

      {/* ✅ Twitter Card for Twitter Previews */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:image:alt" content={title} />

      {/* ✅ Robots Meta Tag for Search Engines */}
      <meta
        name="robots"
        content={noIndex ? "noindex, nofollow" : "index, follow"}
      />
    </Head>
  );
}
