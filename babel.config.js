module.exports = function (api) {
  api.cache.using(() => process.env.NODE_ENV);
  
  const isTest = api.env('test');
  const isWeb = api.caller(caller => caller?.platform === 'web');
  
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // Reanimated pluginはWeb以外でのみ有効化
      ...(isWeb ? [] : ['react-native-reanimated/plugin']),
      ...(isTest ? ['babel-plugin-espower'] : []),
    ],
  };
};