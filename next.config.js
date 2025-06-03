/** @type {import('next').NextConfig} */

const cspHeader =
  process.env.NODE_ENV === "production"
    ? `
    default-src 'self';
    script-src 'self' https://www.youtube.com https://www.youtube-nocookie.com;
    style-src 'self' 'unsafe-inline';
    img-src 'self' blob: data: https://res.cloudinary.com https://i.ytimg.com;
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-src 'self' https://www.youtube.com https://www.youtube-nocookie.com;
    connect-src 'self' https://api.cloudinary.com https://vitals.vercel-insights.com;
    media-src 'self' https://res.cloudinary.com;
    upgrade-insecure-requests;
`
    : `default-src * 'unsafe-inline' 'unsafe-eval'; img-src * data: blob:; script-src * 'unsafe-inline' 'unsafe-eval'; style-src * 'unsafe-inline'; connect-src *; font-src *; media-src *; frame-src *; form-action *;`;

const nextConfig = {
  reactStrictMode: false,

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: cspHeader.replace(/\n/g, ""),
          },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
        ],
      },
    ];
  },
};

const withImages = require("next-images");
module.exports = withImages({
  images: {
    disableStaticImages: true,
    domains: ["res.cloudinary.com"],
  },
});

module.exports = nextConfig;
