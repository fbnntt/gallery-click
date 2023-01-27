const mix = require("laravel-mix");

require("laravel-mix-copy-watched");
require("laravel-mix-tailwind");

mix
  .options({
    processCssUrls: false,
    sourcemaps: false,
  })

  .js("src/js/main.js", "assets/main.min.js")
  .postCss("src/css/main.css", "./assets/main.min.css", [
    require("postcss-import"),
    require('tailwindcss/nesting'),
    require("tailwindcss"),
    require("autoprefixer"),
    require("postcss-pxtorem")({
      propWhiteList: ["*"],
      rootValue: 10,
      unitPrecision: 2,
    }),
  ])

  .copyDirectoryWatched("src/fonts", "./assets/fonts")
  .copyDirectoryWatched("src/images", "./assets/images")

  .webpackConfig({
    module: {
      rules: [
        {
          test: /\.css/,
          enforce: "pre",
          loader: "import-glob-loader",
        },
      ],
    },
  })