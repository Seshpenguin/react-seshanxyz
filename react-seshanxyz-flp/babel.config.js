const presets = [
    "@babel/preset-react",
    [
        "@babel/preset-env",
        {
            targets: "node 4",
            useBuiltIns: "usage",
            corejs: "2"
        }
    ]
];

module.exports = { presets };
