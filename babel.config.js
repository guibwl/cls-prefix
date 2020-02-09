module.exports = function (api) {
    api.cache(true);
  
    const presets = [
        ["@babel/env", {
          useBuiltIns: "usage",
          corejs: 3
        }]
      ];
    const plugins = [];
  
    return {
      presets,
      plugins
    };
  }