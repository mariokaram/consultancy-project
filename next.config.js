/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
};

const withImages = require("next-images");
module.exports = withImages({
  images: {
    disableStaticImages: true,
    domains: ["res.cloudinary.com"],
  },
});

module.exports = nextConfig;
