module.exports = function (api) {
  api.cache.using(() => process.env.NODE_ENV);
  
  const isTest = api.env('test');
  
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'react-native-reanimated/plugin',
      ...(isTest ? ['babel-plugin-espower'] : []),
    ],
  };
};