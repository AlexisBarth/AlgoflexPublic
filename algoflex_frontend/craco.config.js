const CracoAlias = require("craco-alias");

module.exports = {
  webpack: {
    alias: {
        'vscode': require.resolve('@codingame/monaco-languageclient/lib/vscode-compatibility')
    }
  },
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        source: "tsconfig",
        baseUrl: "./src",
        tsConfigPath: "./tsconfig.extend.json"
      }
    }
  ]
};
