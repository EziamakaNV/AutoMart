/* eslint-disable linebreak-style */
const presets = [
  [
    '@babel/env',
    {
      targets: {
        edge: '17',
        firefox: '60',
        chrome: '67',
        safari: '11.1',
      },
      useBuiltIns: 'usage',
      corejs: '2.0.0',
    },
  ],
];
module.exports = { presets };
