module.exports = function () {
    return {
        plugins: [
            require('precss')({}),
            require('postcss-cssnext')({ browsers: ['> 0.05%', 'IE 7'], cascade: false })
        ]
    }
};