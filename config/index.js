module.exports = {
    build: {
        env: require('./dev.env'),
    },
    buildProduction: {
        env: require('./prod.env'),
        // ...
    },
}