const path = require("path"); // импорт утилиты для преобразования относительных путей в абсолютные
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  // синтаксис экспорта в node.js
  entry: { main: path.resolve(__dirname, "src", "pages", "index.js") }, // точка входа. __dirname - глобальная переменная в node.js, хранящая абсолютный путь до текущего js файла
  output: {
    // точка выхода
    path: path.resolve(__dirname, "dist"),
    filename: "main.js",
    publicPath: "",
  },
  mode: "development", // добавление режима для разработки
  devServer: {
    static: path.resolve(__dirname, "./dist"), // путь, куда "смотрит" режим разработчика
    compress: true, // это ускорит загрузку в режиме разработки
    port: 8080, // порт для открытия сайта по адресу localhost:8080
    open: true, // сайт будет открываться сам при запуске npm run dev
  },
  module: {
    rules: [
      // rules — это массив правил. добавим в него объект правил для бабеля
      {
        // регулярное выражение, которое ищет все js файлы
        test: /\.js$/,
        // при обработке этих файлов нужно использовать babel-loader
        use: "babel-loader",
        // исключает папку node_modules, файлы в ней обрабатывать не нужно
        exclude: "/node_modules/",
      },
      {
        // регулярное выражение, которое ищет все файлы с такими расширениями
        test: /\.(woff(2)?|eot|ttf|otf)$/,
        type: "asset/resource",
      },
      {
        test: /\.(png|svg|jpg|gif|woff(2)?|eot|ttf|otf)$/,
        type: "asset/resource",
      },
      {
        test: /\.css$/,
        // при обработке css нужно использовать MiniCssExtractPlugin.loader и css-loader
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: { importLoaders: 1 } // для корректной работы с диррективой @import
          },
          'postcss-loader' // подключение плагина postcss-loader
        ]
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(), // плагин для очищения дирректории dist
    new HtmlWebpackPlugin({
      template: "./src/index.html", // путь к файлу index.html
    }),
    new MiniCssExtractPlugin() // объединение css файлов в один
  ],
};
