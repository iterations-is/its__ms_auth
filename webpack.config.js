const path = require('path');

module.exports = {
	entry: {
		main: './src/main.ts',
	},
	mode: 'production',
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			},
		],
	},
	resolve: {
		extensions: ['.ts', '.js'],
		alias: {
			'@its/ms': path.resolve(__dirname, 'src-ms'),
		},
	},
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, 'build'),
		clean: true,
	},
	target: 'node',
	externalsPresets: {
		node: true,
	},
	externals: {
		_http_common: 'commonjs2 _http_common',
	},
	optimization: {
		splitChunks: {
			chunks: 'all',
			minSize: 0,
			maxInitialRequests: Infinity,
			cacheGroups: {
				vendors: {
					test: /[/]node_modules[/]/,
				},
			},
		},
	},
};
