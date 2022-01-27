const CracoAlias = require("craco-alias");

module.exports = {
  webpack: {
    alias: {
        'vscode': require.resolve('@codingame/monaco-languageclient/lib/vscode-compatibility')
    },
    devServer: {
      host: '0.0.0.0',
      port: 3000
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