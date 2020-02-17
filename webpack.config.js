// 基于node的 遵循commonjs规范的
const path = require('path'); //node的模块
const uglify = require('uglifyjs-webpack-plugin');
const htmlPlugin = require('html-webpack-plugin');
const extractTextPlugin = require('mini-css-extract-plugin');
module.exports = {
    entry: {
        main: './src/main.js'
    }, // 入口
    output: {
        filename: '[name].js',
        // 这个路径必须是绝对路径
        path: path.resolve('./dist')
    }, // 出口
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        port: 3000,
        compress: true, // 服务器压缩
        open: true, // 自动打开浏览器
        // hot:true//热更新
    }, // 开发服务器
    module: {
        rules: [{
            test: /\.(htm|html)$/i,
            use: ['html-withimg-loader'],
            include: path.join(__dirname, './src')
        }, {
            test: /\.css$/,
            use: [
                extractTextPlugin.loader,
                "css-loader"
            ],
            include: path.join(__dirname, './src'),
            exclude: /node_modules/
        }, {
            test: /\.(png|jpg|gif|jpeg)/, //是匹配图片文件后缀名称
            use: [{
                loader: 'url-loader', //是指定使用的loader和loader的配置参数
                options: {
                    limit: 1024, //是把小于500B的文件打成Base64的格式，写入JS
                    publicPath: './images/',
                    outputPath: 'images/'
                }
            }]
        }, {
            test: /\.jsx|js$/,
            use: ['babel-loader'],
            exclude: /node_modules/
        }, {
            test: require.resolve('zepto'),
            use: ['exports-loader?window.Zepto', 'script-loader']
        }]
    }, // 模块配置
    plugins: [
        new uglify(),
        new htmlPlugin({
            minify: { //是对html文件进行压缩
                removeAttributeQuotes: true //removeAttrubuteQuotes是却掉属性的双引号。
            },
            hash: true, //为了开发中js有缓存效果，所以加入hash，这样可以有效避免缓存JS。
            template: './src/index.html' //是要打包的html模版路径和文件名称。
        }),
        new extractTextPlugin({
            filename: './css/[name].css',
            chunkFilename: '[id].css'
        })
    ], // 插件的配置
    mode: 'development', // 可以更改模式
    resolve: {
        //自动补全后缀，注意第一个必须是空字符串,后缀一定以点开头
        extensions: [" ", ".js", ".css", ".json"],
    }, // 配置解析
}
// 在webpack中如何配置开发服务器 webpack-dev-server