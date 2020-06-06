const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin"); 
const path = require("path");

module.exports = {
	devtool: process.env.NODE_ENV !== "production",
	mode: process.env.NODE_ENV || "development",
	entry: {
		main: "./src/index.js"
	},
	output: {
		path: path.resolve(__dirname, "/dist"),
		filename: "[name]-[hash]-bundle.js"
	}
	module: {
		rules: [{
			test: /\.(js|jsx)$/,
			exclude: /node_modules/,
			use: {
				loader: "babel-loader",
				options: [
					presets: [ "@babel/preset-env", "@babel/preset-react" ]
				]
			}
		},{
			test: /\.s[ac]ss$/i,
			use: [{
				loader: process.env.NODE_ENV === "production" 
					? MiniCssExtractPlugin.loader
					: "style-loader"
					 
			},{
				loader: "css-loader",
				options: {
					modules: true,
					sourceMap:  process.env.NODE_ENV !== "production"
				}
			},{
				loader: "sass-loader",
				options: {
					sourceMap: process.env.NODE_ENV !== "production"	
				}
			}]
		}]	
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: "[name]-[hash].css",
			chunkFilename: "[id].css"
		}),
		new HtmlWebpackPlugin({
			// scriptLoading: "defer",
			// favicon: path.resolve(__dirname, "/favicon.ico"),
			showErrors: process.env.NODE_ENV !== "production",
		})
	]
}
