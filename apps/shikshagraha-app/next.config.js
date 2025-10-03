//@ts-check

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { composePlugins, withNx } = require('@nx/next');
const withPWAInit = require("@ducanh2912/next-pwa").default;
// @ts-ignore
const PORTAL_BASE_URL = 'https://sunbird-editor.tekdinext.com';

const routes = {
  API: {
    GENERAL: {
      CONTENT_PREVIEW: '/content/preview/:path*',
      CONTENT_PLUGINS: '/content-plugins/:path*',
      GENERIC_EDITOR: '/generic-editor/:path*',
    },
  },
};
const BASE_PATH = process.env.NEXT_PUBLIC_SHIKSHAGRAHA_BASEPATH || '';

const isDev = process.env.NODE_ENV === 'development';
const withPWA = withPWAInit({
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  swcMinify: true,
  dest: "public",
  fallbacks: {
    //image: "/static/images/fallback.png",
    document: "/offline",
    // font: '/static/font/fallback.woff2',
    // audio: ...,
    // video: ...,
  },
  dir: './src',
  pwa: {
    dest: 'public',
    cleanupOutdatedCaches: true,
    runtimeCaching: [
      {
        // Cache HTML pages (like /home)
        urlPattern: ({ request }) => request.destination === "document",
        handler: "NetworkFirst",
        options: {
          cacheName: "pages-cache",
          expiration: {
            maxEntries: 20,
            maxAgeSeconds: 24 * 60 * 60,
          },
        },
      },
      {
        // Cache CSS/JS
        urlPattern: ({ request }) =>
          ["style", "script", "worker"].includes(request.destination),
        handler: "StaleWhileRevalidate",
        options: {
          cacheName: "static-resources",
        },
      },
      {
        // Cache images
        urlPattern: ({ request }) => request.destination === "image",
        handler: "CacheFirst",
        options: {
          cacheName: "images-cache",
          expiration: {
            maxEntries: 50,
            maxAgeSeconds: 7 * 24 * 60 * 60, // 7 days
          },
        },
      },
    ]
  },
  workboxOptions: {
    disableDevLogs: true,
  },
});


const nextConfig = {
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  nx: {
    // Set this to true if you would like to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false,
  },
  basePath: '',
  async rewrites() {
    return [
      {
        source: '/action/data/v3/telemetry',
        destination: `${process.env.NEXT_PUBLIC_TELEMETRY_URL}/v1/telemetry`,
      },
      {
        source: '/action/v1/telemetry',
        destination: `${process.env.NEXT_PUBLIC_TELEMETRY_URL}/v1/telemetry`,
      },
      {
        source: '/data/v3/telemetry',
        destination: `${process.env.NEXT_PUBLIC_TELEMETRY_URL}/v1/telemetry`,
      },
      {
        source: '/assets/public/:path*', // Match any URL starting with /assets/public/
        destination: `${process.env.NEXT_PUBLIC_CLOUD_STORAGE_URL}/:path*`, // Forward to S3, stripping "/assets/public"
      },
      //for player content v1
      {
        source: routes.API.GENERAL.CONTENT_PREVIEW,
        destination: `${PORTAL_BASE_URL}${routes.API.GENERAL.CONTENT_PREVIEW}`, // Proxy to portal
      },
    ];
  },
};

const plugins = [withNx, withPWA];

module.exports = composePlugins(...plugins)(nextConfig);
