const { FusesPlugin } = require('@electron-forge/plugin-fuses');
const { FuseV1Options, FuseVersion } = require('@electron/fuses');
const path = require('path');

module.exports = {
  packagerConfig: {
    asar: true,
    icon: path.join(process.cwd(), 'main', 'build', 'icon.png'),
  },
  rebuildConfig: {},

  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {
<<<<<<< HEAD
        bin: 'Electron Starter'
      }
=======
        iconUrl: './src/icons/icon.ico',
        setupIcon: './src/icons/icon.ico',
      },
>>>>>>> tea-ceremony-release
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin'],
    },
    {
      name: '@electron-forge/maker-dmg',
      config: {
<<<<<<< HEAD
        options: {
          icon: path.join(process.cwd(), 'main', 'build', 'icon.png'),
        },
=======
        icon: './src/icons/icon.icns',
>>>>>>> tea-ceremony-release
      },
    },
    {
      name: '@electron-forge/maker-deb',
      config: {
        options: {
<<<<<<< HEAD
          icon: path.join(process.cwd(), 'main', 'build', 'icon.png'),
        },
      }
=======
          icon: './src/icons/icon.png',
        },
      },
>>>>>>> tea-ceremony-release
    },
    {
      name: '@electron-forge/maker-rpm',
      config: {
<<<<<<< HEAD
        icon: path.join(process.cwd(), 'main', 'build', 'icon.png'),
      }
=======
        icon: './src/icons/icon.png',
      },
>>>>>>> tea-ceremony-release
    },
  ],
  plugins: [
    {
      name: '@electron-forge/plugin-auto-unpack-natives',
      config: {},
    },
    {
      name: '@electron-forge/plugin-webpack',
      config: {
        mainConfig: './webpack.main.config.js',
        renderer: {
          config: './webpack.renderer.config.js',
          entryPoints: [
            {
              html: './src/ui/index.html',
              js: './src/renderer/renderer.js',
              name: 'main_window',
              preload: {
                js: './src/main/preload.js',
              },
            },
          ],
        },
      },
    },
    // Fuses are used to enable/disable various Electron functionality
    // at package time, before code signing the application
    new FusesPlugin({
      version: FuseVersion.V1,
      [FuseV1Options.RunAsNode]: false,
      [FuseV1Options.EnableCookieEncryption]: true,
      [FuseV1Options.EnableNodeOptionsEnvironmentVariable]: false,
      [FuseV1Options.EnableNodeCliInspectArguments]: false,
      [FuseV1Options.EnableEmbeddedAsarIntegrityValidation]: true,
      [FuseV1Options.OnlyLoadAppFromAsar]: true,
    }),
  ],
  publishers: [
    {
      name: '@electron-forge/publisher-github',
      config: {
        repository: {
          owner: 'gregorycowley',
<<<<<<< HEAD
          name: 'ixd-tangible-player'
        },
        prerelease: true
      }
    }
  ]
=======
          name: 'ixd-tangible-player',
        },
        prerelease: true,
      },
    },
  ],
  hooks: {
    packageAfterPrune(config, buildPath) {
      if (process.platform === 'darwin') {
        const dirs = glob.sync(path.join(buildPath, 'node_modules/**/node_gyp_bins'), {
          onlyDirectories: true,
        });

        for (const directory of dirs) {
          fs.rmdirSync(directory, { recursive: true, force: true });
        }
      }
    },
  },
>>>>>>> tea-ceremony-release
};
