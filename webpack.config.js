'use strict'
const { watch } = require('fs');
const HTMLWebpackPlugin=require('html-webpack-plugin');

const path = require('path');

module.exports={
    module:{
        rules:[
            {
                test:/\.css$/,
                use:['style-loader','css-loader']
            },
            {
                test:/\.scss$/,
                use:['style-loader','css-loader','sass-loader']
            },
            {
                test:/\.js$/,
                exclude:/node_modules/,
                use:['babel-loader']
            }
        ]
    },
    plugins:[
        new HTMLWebpackPlugin({
            template: path.resolve(__dirname,"SHELTER","index.html")
        })
    ],
    "entry":{index:path.resolve(__dirname,"SHELTER","index.js")},
    "output":{path:path.resolve(__dirname,"build"),filename:"bundle.js"},

    watch:true,
    watchOptions:{
        aggregateTimeout:100
    }
}