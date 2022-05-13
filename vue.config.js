module.exports = {
    css: {
        loaderOptions: {
            scss: {
                prependData: '@import "~@/assets/scss/variables.scss"; @import "~@/assets/scss/main.scss";',
            },
        },
    },
    publicPath: process.env.NODE_ENV === 'production'
        ? '/Infinity-Adventures-Pub/'
        : '/'
};
