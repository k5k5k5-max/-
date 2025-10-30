import React from 'react';

interface StartScreenProps {
  onStart: () => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  return (
    <div className="bg-white p-8 md:p-12 rounded-2xl shadow-2xl max-w-3xl mx-auto text-center transform hover:scale-105 transition-transform duration-500">
      <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6">クライアントワーク力診断</h1>
      
      <div className="text-left text-slate-600 space-y-4 my-8 p-6 bg-slate-50 rounded-lg border border-slate-200">
        <p className="font-bold text-lg text-slate-700">クライアントワークで、こんな悩みはありませんか？</p>
        <ul className="list-disc list-inside space-y-2 text-slate-600 pl-2">
          <li>「要望と予算が合わない時、どう交渉すればいい？」</li>
          <li>「感情的なフィードバックへの適切な対応方法は？」</li>
          <li>「ミスをした時、信頼を回復するベストな方法は？」</li>
        </ul>
        <p className="pt-4">この診断では、実際の現場で起こりうる13のリアルなシチュエーションを通じて、あなたのクライアント対応力を徹底分析します。</p>
        
        <h2 className="text-xl font-bold text-slate-700 pt-4">【診断でわかること】</h2>
        <ul className="list-none space-y-3 mt-2">
          <li><strong className="text-indigo-600">■ あなたの対応力レベル</strong><br/><span className="pl-4">5段階評価（マスター/エキスパート/プロフェッショナル/アドバンス/ビギナー）で現在地を明確に数値化</span></li>
          <li><strong className="text-indigo-600">■ 具体的な強みと改善ポイント</strong><br/><span className="pl-4">どんな場面で力を発揮でき、どこを改善すれば良いかが明確に</span></li>
          <li><strong className="text-indigo-600">■ プロとしての最適解</strong><br/><span className="pl-4">各シチュエーションでの理想的な対応方法を解説</span></li>
          <li><strong className="text-indigo-600">■ 今後の成長戦略</strong><br/><span className="pl-4">次のレベルに到達するための具体的なアクションプラン</span></li>
        </ul>
        
        <p className="pt-4 font-semibold text-center">さあ、あなたの真のクライアントワーク力を確認してみましょう。</p>
      </div>

      <button
        onClick={onStart}
        className="w-full md:w-auto bg-indigo-600 text-white font-bold py-4 px-12 rounded-lg text-xl hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 transition-all duration-300 transform hover:-translate-y-1 shadow-lg"
      >
        診断を開始する
      </button>
    </div>
  );
};

export default StartScreen;