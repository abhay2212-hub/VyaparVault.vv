/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    output: 'export',
    images: {
        unoptimized: true,
        domains: ['res.cloudinary.com', 'localhost'], // For product images
    },
}

module.exports = nextConfig
