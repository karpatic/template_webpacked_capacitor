# <a href="https://karpatic.github.io/projName/">Template Webpack</a>

Scrip1 - > exportedComponent
Scrip2 - > Nothing
file.worker.js - > console.log('workerhelper')

## index.js: 
- Entirely Async  
- Import Chardin
- if (window.location.search contains 'viewone')
- - lay load assets
- - document.body.innerHTML 


##  package.json:

### TODO
- https://webpack.js.org/guides/code-splitting/ bundle analyzers
- preload woff n pics
- File loader replacement for copyWebpackPlugin and ProxyServer

###  Entry
- head: './src/head.js',
- index: './src/index.js'

### Optimization
- minimizer
- - `TerserPlugin` => sourcemap: true, **removeComments: commentedOut**
- - `OptimizeCssAssetsPlugin`
- splitChunks: all

### Output
- ChunkFileNames
- GlobalObject: "this"

### Module Rules
- .worker.js => `worker-loader`: inline: true
- .jsx => `babel-loader`: 
- - presets: ["@babel/preset-env", "@babel/preset-react"], 
- - plugins: [ '@babel/transform-runtime' ]
- .css or .s[ac]ss => 
- - `MiniCssExtractPlugin`: hmr: iffInDevMode
- - `css-loader`
- - `postcss-loader`:  Plugins: [`postcss-preset-env`, `cssnano`]
- - `sass-loader`: .s[ac]ss Only
- .svg => `svg-inline-loader?classPrefix`
- .(png|jpg|gif|ico) => `url-loader`: limit: false
- .(csv|tsv)$/ => `csv-loader`

### plugins
- `CleanWebpackPlugin`
- `MiniCssExtractPlugin`
- `HtmlWebpackInlineSourcePlugin`(HtmlWebpackPlugin)
- `HtmlWebpackPlugin` =>
- - templateContent: "<!DOCTYPE html> <html lang="en"> <div id="head"></div> <body> <div id="body"></div> </body> </html>",
- - inlineSource: env.NODE_ENV == 'local' ? false : '^(index).*.(css)$', 
- - inject: 'head'
- `ScriptExtHtmlWebpackPlugin`
- - **Delete '/head/' e.g [vendors~head] Before deploy**
- - preload: (index|imported).*.(js|json|svg|css),
- - prefetch: .(js|json|svg|css),
- - defaultAttribute: 'async',
- `WebpackPwaManifest`: Inline Specifications
- `WorkboxPlugin.GenerateSW`
- - **Commented out**
- - swDest: './sw.js',
- - runtimeCaching: [/\.(?:png|jpg|jpeg|svg|js)$/]
- `CopyWebpackPlugin`: ['./src/data', './src/header.json', './src/error', './src/.htaccess',  './src/robots.txt' ] 

### devServer
- A proxy was set up to deliver data from the localhost path /data during dev.
- For production, copyWebpackPlugin is used and the path just works.
- https://webpack.js.org/loaders/file-loader/ removes this complication.










# Dependency description and caveats

## [mini-svg-data-uri](https://www.npmjs.com/package/mini-svg-data-uri/v/1.0.0)
Description
- This tool converts SVGs into the most compact, compressible data: URI that SVG-supporting browsers tolerate. 
Warning
- - This does not optimize the SVG source file. You’ll want svgo or its brother SVGOMG for that.
- - The resulting Data URI should be wrapped with double quotes: url("…"), <img src="…">, etc.
- - This might change or break SVGs that use " in character data, like inside <text> or aria-label or something. Try curly quotes (“”) or &quot; instead.













## Without Webpack-template
Contains 
- same-page web-workers -> notifications button
- Service workers
- module -> semanticUIReact.Header
- - Handlebars JsonUrlCompressed
- localforage 

## Project X includes
webpack.config.js:
- Does not include
{ 
test: /\.geojson$/,
exclude: /node_modules/,
use: {
  loader: "babel-loader",
  options: { 
	  "presets": ["@babel/preset-env", "@babel/preset-react"],
	  "plugins": [ '@babel/transform-runtime' ]
  }
}
}
