/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com"
      },
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
      { protocol: "https", hostname: "tailwindui.com" },
      { protocol: "https", hostname: "lh3.googleusercontent.com" }
    ]
  }
};

module.exports = nextConfig;
