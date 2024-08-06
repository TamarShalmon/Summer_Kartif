/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images:{
    domains: [
      'cdn-icons-png.flaticon.com',
      "images.pexels.com",
      "avatars.githubusercontent.com",
      "lh3.googleusercontent.com",
      "res.cloudinary.com",
      "firebasestorage.googleapis.com/",
      "mnirvana.co.il",
      "res.cloudinary.com",
    ],
  }
}

module.exports = nextConfig
