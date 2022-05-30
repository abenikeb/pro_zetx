// const isDev = process.env.NODE_ENV === 'development'
// const useEmulators = false // manually change if emulators needed
const isDevMode = process.env.NODE_ENV !== 'production'

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,
  target: 'static',
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'GreenCheddar - Voluntary Carbon Trading',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
      {
        name: 'facebook-domain-verification',
        content: 'r7zaqr3xvftn3683jt4saau45k9oyh',
      },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: 'https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css',
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~/assets/style/global.css'],

  script: [
    {
      hid: 'fontawesome',
      src: 'https://kit.fontawesome.com/0d6fc792bb.js',
      crossorigin: 'anonymous',
    },
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins

  plugins: [
    '~/plugins/lodash.js',
    { src: '~/plugins/vue-good-table', ssr: false },
    { src: '~/plugins/BarChart', ssr: false },
    { src: '~/plugins/PieChart', ssr: false },
    '~plugins/vue-js-modal.js',
    '@/plugins/vue-toastify.js',
    { src: '~/plugins/vue-carousel', ssr: false },
    { src: '~/plugins/slider', ssr: false },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/pwa',
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
  ],

  pwa: {
    manifest: {
      name: 'GreenCheddar - Voluntary Carbon Trading',
      lang: 'en',
      useWebmanifestExtension: false,
      short_name: 'GreenCheddar',
    },
  },
  router: {
    middleware: ['locationGuard'],
  },
  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    [
      '@nuxtjs/firebase',
      {
        config: {
          apiKey: 'AIzaSyCb763LTfBgULXlSBBhk5bDJEP6kVuX9ss',
          authDomain: 'greencheddar-9525f.firebaseapp.com',
          projectId: 'greencheddar-9525f',
          storageBucket: 'greencheddar-9525f.appspot.com',
          messagingSenderId: '624325909257',
          appId: '1:624325909257:web:41f01d1c69784aad4ed1d8',
          measurementId: 'G-LTDTG5LYWT',
        },
        services: {
          auth: {
            persistance: 'local',
            initialize: {
              onAuthStateChangedAction: 'auth/onAuthStateChangedAction',
              subscribeManually: false,
            },
            ssr: false,
            // emulatorPort: isDev && useEmulators ? 9099 : undefined,
            // disableEmulatorWarnings: false,
          },
          firestore: {
            memoryOnly: false,
            enablePersistence: true,
            // emulatorPort: isDev && useEmulators ? 9090 : undefined,
          },
          // storage: {
          //   // emulatorPort: isDev && useEmulators ? 9199 : undefined,
          //   // emulatorHost: 'localhost',
          // },
          storage: true,

          // performance: true,
          analytics: true,
          // remoteConfig: {
          //   settings: {
          //     fetchTimeoutMillis: 60000,
          //     minimumFetchIntervalMillis: 43200000,
          //   },
          //   defaultConfig: {
          //     welcome_message: 'Welcome',
          //   },
          // },

          messaging: {
            createServiceWorker: true,
            actions: [
              {
                action: 'measure',
                url: 'www.greencheddar.org/dashboard/measure',
              },
            ],
          },
        },
      },
    ],
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extend(config, ctx) {
      if (ctx.isDev) {
        config.devtool = ctx.isClient ? 'source-map' : 'inline-source-map'
      }
    },
  },

  typescript: {
    /**
     * !! WARN !!
     * Dangerously allow production builds to successfully complete even if
     * your project has type errors.
     * !! WARN !!
     *
     * This will show us errors on dev, but not stop builds for production
     */
    typeCheck: isDevMode,
  },
}
