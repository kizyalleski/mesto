// импорт плагинов
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");

module.exports = {
  plugins: [
    autoprefixer, // подключение autoprefixer
    cssnano({ preset: "default" }) // подключение cssnano со стандартными настройками
  ]
};
