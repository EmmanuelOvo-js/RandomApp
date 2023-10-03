const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
	mode: "development",
	entry: "./src/index.js",
	output: {
		path: path.resolve(__dirname, "../public"),
		filename: "bundle.js",
	},
	// For dev in script in package.json
	devServer: {
		static: {
			directory: path.resolve(__dirname, "../public"),
		},
		port: 3000,
		open: true,
		hot: true,
		compress: true,
		historyApiFallback: true,
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [MiniCssExtractPlugin.loader, "css-loader"],
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ["@babel/preset-env"],
					},
				},
			},
		],
	},
	plugins: [
		/*Html plugin automatically creates dist folder and everything in it */
		new HtmlWebpackPlugin({
			title: "Webpack App",
			//usually used in single page application
			filename: "index.html",
			/*Template holds a temp so that whenever 
			'npm run' is invoked it does not wipe out the index.html contents*/
			template: "./src/index.html",
		}),
		new MiniCssExtractPlugin(),
	],
};
