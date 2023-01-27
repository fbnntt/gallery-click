module.exports = {
  plugins: {
    "postcss-pxtorem": { 
      propWhiteList: ["*"],
      rootValue: 10,
      unitPrecision: 2,
    },
  },
};