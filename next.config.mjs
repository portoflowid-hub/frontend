/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      // Konfigurasi lama Anda dalam format baru
      { hostname: 'images.pexels.com' },
      { hostname: 'i.ibb.co' },
      { hostname: 'images.unsplash.com' },
      
      // Konfigurasi baru untuk storage Anda
      {
        protocol: 'https',
        hostname: 'is3.cloudhost.id',
        pathname: '/portoflow-storage-1/**',
      },
    ],
  },
};

export default nextConfig;