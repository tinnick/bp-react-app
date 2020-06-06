const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin"); 
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const path = require("path");

module.exports = {
	devServer: {
		port: "8000"
	},
	devtool: process.env.NODE_ENV === "production"
		? false
		: "source-map",
	mode: process.env.NODE_ENV || "development",
	entry: {
		main: "./src/index.js"
	},
	output: {
		path: path.resolve(__dirname, "./dist"),
		filename: "[name]-[hash]-bundle.js"
	},
	module: {
		rules: [{
			test: /\.(js|jsx)$/,
			exclude: /node_modules/,
			use: {
				loader: "babel-loader",
				options: {
					presets: [ "@babel/preset-env", "@babel/preset-react" ]
				}
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
		},{
			test: /\.html$/,
			use: "html-loader"
		}]	
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: "[name]-[hash].css",
			chunkFilename: "[id].css"
		}),
		new HtmlWebpackPlugin({
			filename: "index.html",
			// scriptLoading: "defer",
			// favicon: path.resolve(__dirname, "/favicon.ico"),
			showErrors: process.env.NODE_ENV !== "production",
		}),
		new CleanWebpackPlugin()
	]
}
