module.exports = {
  env: {
    test: {
      // preset-typescript снимает типы с .ts при запуске тестов через Jest;
      // plugin-transform-modules-commonjs переводит ESM (import/export) в
      // CommonJS, который понимает Jest.
      presets: ["@babel/preset-typescript"],
      plugins: ["@babel/plugin-transform-modules-commonjs"],
    },
  },
};
