import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function MainScreen() {
  const handleStartFocus = () => {
    // TODO: 集中モード開始処理
    console.log('Start Focus pressed');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Zeen</Text>
      
      <TouchableOpacity style={styles.startButton} onPress={handleStartFocus}>
        <Text style={styles.buttonText}>Start Focus</Text>
      </TouchableOpacity>
      
      <Text style={styles.description}>Ready to focus</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#faf9f6', // 和紙 - 純粋と静寂
    paddingHorizontal: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: '200', // ExtraLight
    color: '#2c2c2c', // 墨 - 深い思考
    marginBottom: 64, // XXLarge - 瞑想的な間
  },
  startButton: {
    backgroundColor: '#65856e', // 竹緑 - 静寂と成長
    borderRadius: 8, // 微妙に丸めた矩形（自然石のイメージ）
    paddingVertical: 16,
    paddingHorizontal: 32,
    marginBottom: 40, // XLarge - 深い呼吸
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1, // 極薄のドロップシャドウ
    shadowRadius: 2,
    elevation: 1,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '300', // Light
    color: '#faf9f6',
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    fontWeight: '300', // Light
    color: '#8b8680', // 石色 - 落ち着き
    textAlign: 'center',
  },
});