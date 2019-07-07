const webpack = require(`webpack`);
const path = require(`path`);
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const zopfli = require('@gfx/zopfli')

module.exports = {
    mode : 'development',
    entry : path.join(__dirname,'Components','src','Root.jsx'),
    output : {
        filename : 'bundle.js',
        path : path.join(__dirname,'bundle')
    },
    devServer: {
		hot : true,
		contentBase: [			
			path.join(__dirname, `public`),
			path.join(__dirname, `Components`)],
		watchContentBase: true,
		historyApiFallback: true,
		compress: true,
		host: `0.0.0.0`,
		disableHostCheck: true,
		port: 9000,
	},
    devtool : 'inline-source-map',
    module : {
        rules : [
            {
                test : /\.(js|jsx)$/,
                exclude : /node_modules/,
                use : ['babel-loader']
            },
            {
                test : /.(css)&/,
                use : [
                    {
                        loader : 'style-loader'
                    },
                    {
                        loader : 'css-loader',
                    }
                ]
            },

        ]
    },
    plugins : [
        // new CompressionPlugin({
		// 	compressionOptions: {
		// 	  numiterations: 15,
		// 	},
		// 	algorithm(input, compressionOptions, callback) {
		// 	  return zopfli.gzip(input, compressionOptions, callback);
		// 	},
		// }),
        new CleanWebpackPlugin({}),
        new webpack.ProgressPlugin(),
        new HtmlWebpackPlugin({
            template : path.join(__dirname, 'public', 'html', 'index.html'),
            inject : true
        })
    ],
    target : 'web'
}