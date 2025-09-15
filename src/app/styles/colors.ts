/**
 * 禅的カラーパレット - 最終調整版
 * Phase 6.1: カラーシステムの統一化
 */

export const ZenColors = {
  // プライマリーカラー（竹緑系）
  primary: {
    main: '#65856e',      // 竹緑 - 静寂と成長
    light: '#8ba394',     // 明るい竹緑 - 希望
    dark: '#4a6552',      // 暗い竹緑 - 深い静寂
  },
  
  // セカンダリーカラー（茶褐系）
  secondary: {
    main: '#d4a574',      // 茶褐 - 大地と安定
    light: '#e2bb94',     // 明るい茶褐 - 温かみ
    dark: '#b8905d',      // 暗い茶褐 - 深い安定
  },
  
  // 背景色（和紙系）
  background: {
    primary: '#faf9f6',   // 和紙 - 純粋と静寂
    secondary: '#f5f3f0', // 薄い和紙 - 微細な変化
    tertiary: '#f0ede8',  // より薄い和紙 - 重層的な静寂
    focus: '#1a1a1a',     // 深い瞑想 - 集中時の暗い環境
  },
  
  // テキストカラー（墨・石系）
  text: {
    primary: '#2c2c2c',   // 墨 - 深い思考
    secondary: '#8b8680', // 石色 - 落ち着き
    tertiary: '#a8a39e',  // 薄い石色 - 控えめな存在
    inverse: '#faf9f6',   // 逆転色（ボタン内など）
    focus: '#e8e6e3',     // 月光 - 暗闇での可読性
  },
  
  // アクセントカラー（砂色系）
  accent: {
    main: '#e8dcc0',      // 砂色 - 枯山水の砂紋
    light: '#f0e6d4',     // 明るい砂色 - 繊細な表現
    dark: '#d9c8a8',      // 暗い砂色 - 深い枯山水
  },
  
  // 状態色（控えめな表現）
  state: {
    focus: '#65856e',     // フォーカス状態 - 竹緑
    rest: '#d4a574',      // 休息状態 - 茶褐
    disabled: '#a8a39e',  // 無効状態 - 薄い石色
  },
  
  // 瞑想オーラ（集中時のエネルギー表現 - 周囲の人にも見えるよう彩度向上）
  aura: {
    primary: 'rgba(85, 170, 120, 0.5)',   // 主要オーラ - より鮮やかな竹緑（彩度向上）
    secondary: 'rgba(85, 170, 120, 0.4)', // 副次オーラ - 中程度の竹緑（彩度向上）
    tertiary: 'rgba(85, 170, 120, 0.3)',  // 三次オーラ - やや薄い竹緑（彩度向上）
  },
  
  // 影・境界線（雲のような表現）
  shadow: {
    light: 'rgba(44, 44, 44, 0.05)',   // 極薄い影
    medium: 'rgba(44, 44, 44, 0.08)',  // 標準的な影
    dark: 'rgba(44, 44, 44, 0.12)',    // 濃い影
  },
} as const;

export type ColorPath = 
  | 'primary.main' | 'primary.light' | 'primary.dark'
  | 'secondary.main' | 'secondary.light' | 'secondary.dark'
  | 'background.primary' | 'background.secondary' | 'background.tertiary' | 'background.focus'
  | 'text.primary' | 'text.secondary' | 'text.tertiary' | 'text.inverse' | 'text.focus'
  | 'accent.main' | 'accent.light' | 'accent.dark'
  | 'state.focus' | 'state.rest' | 'state.disabled'
  | 'aura.primary' | 'aura.secondary' | 'aura.tertiary'
  | 'shadow.light' | 'shadow.medium' | 'shadow.dark';

/**
 * ネストされたカラー値を取得するヘルパー関数
 */
export const getColor = (path: ColorPath): string => {
  const keys = path.split('.');
  let value: any = ZenColors;
  
  for (const key of keys) {
    value = value[key];
  }
  
  return value;
};