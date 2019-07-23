const presets = [
    "@babel/preset-react",
    [
        "@babel/preset-env",
        {
            targets: "node 4",
            useBuiltIns: "usage",
            corejs: "3"
        }
    ]
];
const plugins = ["@babel/plugin-proposal-class-properties"];

module.exports = { presets, plugins };
