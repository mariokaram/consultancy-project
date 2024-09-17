/** @type {import('next').NextConfig} */

const fs = require("fs");
const path = require("path");

// Read the version from package.json
const packageJsonPath = path.resolve(__dirname, "package.json");
const { version } = JSON.parse(fs.readFileSync(packageJsonPath, "utf-8"));

const cspHeader =
  process.env.NODE_ENV === "production"
    ? `
  default-src 'self';
  script-src 'self'; 
  style-src 'self' 'unsafe-inline';
  img-src 'self' blob: data:;
  font-src 'self';
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  frame-src 'self' https://www.youtube.com;
  upgrade-insecure-requests;
`
    : `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline'; 
  style-src 'self' 'unsafe-inline';
  img-src 'self' blob: data:;
  font-src 'self';
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  frame-src 'self' https://www.youtube.com;
  upgrade-insecure-requests;
`;

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
          { key: "X-App-Version", value: version },
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
