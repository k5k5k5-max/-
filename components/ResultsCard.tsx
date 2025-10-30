import React from 'react';
import { RESULTS, QUESTIONS, SKILLS } from '../constants';
import SkillsChart from './SkillsChart';

interface ResultsCardProps {
  answers: { questionIndex: number; score: number }[];
  totalQuestions: number;
  onRestart: () => void;
}

const ResultsCard: React.FC<ResultsCardProps> = ({ answers, totalQuestions, onRestart }) => {
  const score = answers.reduce((total, answer) => total + answer.score, 0);
  const maxScore = totalQuestions * 3;

  const skillScores = {
    hearing: { score: 0, maxScore: SKILLS.hearing.maxScore, name: SKILLS.hearing.name },
    proposal: { score: 0, maxScore: SKILLS.proposal.maxScore, name: SKILLS.proposal.name },
    trust: { score: 0, maxScore: SKILLS.trust.maxScore, name: SKILLS.trust.name },
    business: { score: 0, maxScore: SKILLS.business.maxScore, name: SKILLS.business.name },
  };

  answers.forEach(answer => {
    const question = QUESTIONS[answer.questionIndex];
    if (question) {
      skillScores[question.skill].score += answer.score;
    }
  });
  
  // Find the correct result level based on the score
  const result = RESULTS.find(r => score >= r.minScore);
  const resultIndex = RESULTS.findIndex(r => score >= r.minScore);

  if (!result) {
    return <div>Error: 結果を判定できませんでした。</div>;
  }
  
  const Icon = result.icon;
  
  // Find the next level if the current one is not the highest
  const nextLevel = resultIndex > 0 ? RESULTS[resultIndex - 1] : null;

  return (
    <div className="bg-white p-8 md:p-12 rounded-2xl shadow-2xl max-w-3xl mx-auto text-center animate-fade-in">
      <p className="text-lg font-semibold text-slate-500 mb-2">診断結果</p>
      <div className="mb-6">
        <div className="mx-auto bg-indigo-100 rounded-full w-24 h-24 flex items-center justify-center">
            <Icon className="w-14 h-14 text-indigo-600" />
        </div>
      </div>
      <h2 className="text-2xl text-slate-700 font-bold mb-2">
        あなたのレベルは...
      </h2>
      <h1 className="text-4xl md:text-5xl font-extrabold text-indigo-600 mb-2">{result.title}</h1>
      <p className="text-xl text-indigo-500 font-semibold mb-6">「{result.catchphrase}」</p>

      <p className="text-2xl text-slate-700 font-bold mb-8">
        スコア: <span className="text-indigo-600 text-3xl">{score}</span> / {maxScore}点
      </p>
      
      <div className="text-left text-slate-600 bg-slate-50 p-6 rounded-lg border border-slate-200 mb-10">
        <p className="leading-relaxed">{result.description}</p>
      </div>

      <SkillsChart skillScores={skillScores} />

      {nextLevel && (
        <div className="mb-10 p-4 bg-yellow-50 border border-yellow-300 rounded-lg">
          <p className="text-slate-700">
            次のレベル「<strong className="text-yellow-800">{nextLevel.title}</strong>」まであと <span className="font-bold text-yellow-800 text-lg">{nextLevel.minScore - score}</span> 点です！
          </p>
        </div>
      )}

      <button
        onClick={onRestart}
        className="w-full md:w-auto bg-indigo-600 text-white font-bold py-4 px-12 rounded-lg text-xl hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 transition-all duration-300 transform hover:-translate-y-1 shadow-lg"
      >
        もう一度診断する
      </button>

      {/* --- START: Modified Bonus Section --- */}
      <div className="mt-16 pt-10 border-t border-slate-200">
        <div className="mb-10 animate-pulse">
          <div className="bg-gradient-to-r from-yellow-300 to-amber-400 rounded-lg shadow-lg p-4 transform -rotate-1">
            <h2 className="text-3xl md:text-4xl font-extrabold text-center text-slate-800">
              【期間限定】<br className="sm:hidden" />追加特典のお知らせ
            </h2>
          </div>
        </div>
        <div className="bg-slate-900 text-white rounded-2xl p-8 md:p-10 text-left">
          
          <div className="text-center mb-10">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              「クライアントワーク力診断」<br className="sm:hidden" />お疲れ様でした。
            </h3>
            <p className="text-lg md:text-xl font-semibold text-yellow-400">
              しかし、本当の戦いはここからです。
            </p>
          </div>
          <p className="text-slate-300 leading-relaxed mb-12">
            診断結果を通じて、<br />
            今のあなたの「現在地」が<br className="sm:hidden" />明確になったかと思います。
            <br /><br />
            そのスコアが良いか悪いか、<br />
            それは一切問題ではありません。
            <br /><br />
            なぜなら、プロの戦場で重要なのは、<br />
            スタート地点ではなく、<br />
            <strong className="text-yellow-400">目的地までの"正しい地図"を<br className="sm:hidden" />持っているかどうか</strong>、<br />
            ただそれだけだからです。
            <br /><br />
            診断を受けてくれた、<br />
            本気で今の自分を変えたいと願う<br className="sm:hidden" />あなたにだけ、その<strong className="text-yellow-400">"正しい地図"</strong>を<br />
            手に入れるための<br className="sm:hidden" />特別なチャンスを用意しました。
          </p>
          
          <div className="border-2 border-yellow-400 rounded-lg p-6 mb-12">
            <h4 className="text-xl md:text-2xl font-bold text-center text-yellow-400 mb-4">
              【診断テスト受診者・限定特典】
            </h4>
            <h3 className="text-2xl md:text-3xl font-bold text-center mb-6">
              あなたの現在地から月商100万へ。<br />常識を破壊する「0→100達成ロードマップ」
            </h3>
            <div className="w-full h-48 bg-slate-700 rounded-lg flex items-center justify-center mb-6">
              <span className="text-slate-400">（ロードマップの表紙画像）</span>
            </div>
            <p className="text-slate-300 leading-relaxed mb-6">
              このロードマップは、<br className="sm:hidden" />巷にあふれる綺麗なノウハウ集ではありません。
              <br /><br />
              僕が200社以上の現場で、<br />
              泥臭く結果を出し、<br />
              <strong className="text-white">1件5000円の"作業員"から抜け出してきた<br className="sm:hidden" />「戦い方」そのもの</strong>を、<br />
              4つのステップに凝縮したものです。
            </p>
            <p className="text-slate-300 leading-relaxed mb-8">
              これを読めば、<br />
              あなたがなぜ今まで稼げなかったのか、<br />
              その根本原因が分かり、<br />
              明日から何をすべきかが明確になります。
            </p>
            <div className="bg-slate-800 p-6 rounded-lg">
              <h5 className="text-lg font-bold text-center mb-4 text-yellow-400">
                【このロードマップで、あなたが手に入れる思考】
              </h5>
              <ul className="space-y-4">
                <li>
                  <p className="font-bold text-white">STEP1：案件獲得</p>
                  <p className="text-slate-300 pl-4">なぜ「スキル学習」が時間の無駄であり、「まず案件を取る」ことが最速の成長に繋がるのか？</p>
                </li>
                <li>
                  <p className="font-bold text-white">STEP2：成果創出</p>
                  <p className="text-slate-300 pl-4">なぜ、競合リサーチは不要で、答えは全て「クライアントの頭脳の中」にあるのか？</p>
                </li>
                <li>
                  <p className="font-bold text-white">STEP3：単価向上</p>
                  <p className="text-slate-300 pl-4">なぜ、「単価を上げてください」と交渉する人間は三流で、一流は「提案」によって単価を上げるのか？</p>
                </li>
                <li>
                  <p className="font-bold text-white">STEP4：事業拡大</p>
                  <p className="text-slate-300 pl-4">なぜ、あなたの収入を決めるのはスキルではなく、「どこで戦うか」という市場選びなのか？</p>
                </li>
              </ul>
            </div>
            <p className="mt-8 text-center font-semibold text-lg leading-relaxed">
              診断で己を知った今、次は<br />
              <strong className="text-yellow-400">「プロの勝ち方」</strong>をインストールしてください。
            </p>
          </div>

          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold mb-8">
              ロードマップの受け取りは、<br />3ステップで完了します。
            </h3>
            <div className="space-y-10">
              {/* Step 1 */}
              <div>
                <div className="flex items-center justify-center mb-4">
                  <span className="bg-yellow-400 text-slate-900 font-bold rounded-full w-8 h-8 flex items-center justify-center mr-3">1</span>
                  <h4 className="text-xl font-bold">企画ポストを「感想付き」で<br className="sm:hidden" />引用リポストする</h4>
                </div>
                <p className="text-slate-300 mb-6 leading-relaxed">
                  まずは、僕のX企画ポストを<br />
                  <strong className="text-white">「感想付き」で引用リポスト</strong>してください。
                  <br /><br />
                  感想は、今回の診断結果についてでも、<br />
                  ロードマップへの期待でも、何でも構いません。<br />
                  あなたの言葉で、熱意をぶつけてください。
                </p>
                <a href="#" target="_blank" rel="noopener noreferrer" className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-lg transition-colors">
                  ▼引用するポストはこちら
                </a>
                <div className="mt-6 text-left space-y-4">
                  <div className="bg-slate-800 p-4 rounded-lg">
                    <p className="font-semibold mb-1 text-sm text-slate-400">例文1：</p>
                    <p className="text-slate-300">竹内さん（@instamaster_y）のクライアントワーク力診断受けた！結果は〇〇点…。まさに自分の課題が言語化された感じ。特典の「0→100ロードマップ」で人生変えます。</p>
                  </div>
                  <div className="bg-slate-800 p-4 rounded-lg">
                    <p className="font-semibold mb-1 text-sm text-slate-400">例文2：</p>
                    <p className="text-slate-300">フリーランスとして伸び悩んでる人は、竹内さん（@instamaster_y）のこの診断受けた方がいい。自分の現在地が分かった。特典のロードマップが楽しみすぎる…！</p>
                  </div>
                </div>
              </div>
              {/* Step 2 */}
              <div>
                <div className="flex items-center justify-center mb-4">
                  <span className="bg-yellow-400 text-slate-900 font-bold rounded-full w-8 h-8 flex items-center justify-center mr-3">2</span>
                  <h4 className="text-xl font-bold">引用リポストした投稿の<br className="sm:hidden" />「スクリーンショット」を撮る</h4>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  次に、あなたが引用リポストした投稿が、<br />
                  ご自身のタイムラインに表示されている状態の<br />
                  <strong className="text-white">スクリーンショットを撮影</strong>してください。
                </p>
              </div>
              {/* Step 3 */}
              <div>
                <div className="flex items-center justify-center mb-4">
                  <span className="bg-yellow-400 text-slate-900 font-bold rounded-full w-8 h-8 flex items-center justify-center mr-3">3</span>
                  <h4 className="text-xl font-bold">公式LINEに「スクショ」と<br className="sm:hidden" />「秘密のキーワード」を送る</h4>
                </div>
                <p className="text-slate-300 mb-6 leading-relaxed">
                  最後に、以下のLINEを友だち追加し、<br />
                  <strong className="text-white">【STEP2で撮影したスクリーンショット】</strong>と、<br />
                  <strong className="text-white">秘密のキーワード【ゼロヒャク】</strong>の<br />
                  2点をメッセージで送信してください。
                </p>
                <a href="#" target="_blank" rel="noopener noreferrer" className="w-full md:w-auto bg-green-500 text-white font-bold py-4 px-12 rounded-lg text-xl hover:bg-green-600 focus:outline-none focus:ring-4 focus:ring-green-300 transition-all duration-300 transform hover:-translate-y-1 shadow-lg inline-block">
                  公式LINEに登録する
                </a>
                <p className="mt-4 font-bold">
                  ▲ 上のボタンからLINEを追加し、<br />
                  「スクショ」と「ゼロヒャク」を送信！
                </p>
                <p className="mt-4 text-sm text-slate-400">
                  ※キーワードはカタカナで「ゼロヒャク」です。<br />お間違えのないようご注意ください。<br/>
                  ※メッセージを確認後、運営より順次ロードマップをお送りします。
                </p>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">準備はいいですか？</h3>
            <p className="text-slate-300 leading-relaxed">
              このロードマップは、<br className="sm:hidden" />あなたの働き方の常識をすべて破壊します。<br />
              そして、あなたが"作業員"から、<br className="sm:hidden" />自分の人生の主導権を握る"戦略パートナー"へと<br className="sm:hidden" />進化するための、最初の切符です。
            </p>
          </div>

        </div>
      </div>
       <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default ResultsCard;