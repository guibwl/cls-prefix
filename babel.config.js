const path = require("path");

module.exports = function(api) {
  api.cache(true);

  const presets = [
    [
      "@babel/env",
      {
        useBuiltIns: "entry",
        corejs: { version: 3 },
        modules: false,
        // Exclude transforms that make all code slower
        exclude: ["transform-typeof-symbol"]
      }
    ],
    ["@babel/preset-typescript"]
  ];

  const plugins = [
    ["@babel/proposal-class-properties", { loose: true }],
    [
      "@babel/plugin-transform-runtime",
      {
        absoluteRuntime: path.dirname(
          require.resolve("@babel/runtime/package.json")
        ),
        corejs: false,
        helpers: true,
        regenerator: true,
        useESModules: false,
        version: require("@babel/runtime/package.json").version
      }
    ]
  ];

  return {
    presets,
    plugins
  };
};
