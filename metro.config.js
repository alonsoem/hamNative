const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname, {
    // Enable CSS support.
    isCSSEnabled: true,
  });

  module.exports = {
    /* general options */
  
    resolver: {
      /* resolver options */
    },
    transformer: {
      /* transformer options */
      "unstable_workerThreads": false
    },
    serializer: {
      /* serializer options */
    },
    server: {
      /* server options */
    },
    watcher: {
      /* watcher options */
      watchman: {
        /* Watchman-specific options */
      }
    }
  };

//module.exports = config;