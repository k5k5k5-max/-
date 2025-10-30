import React from 'react';
import type { SkillCategory } from '../types';

interface SkillsChartProps {
  skillScores: {
    [key in SkillCategory]: {
      score: number;
      maxScore: number;
      name: string;
    };
  };
}

const SkillsChart: React.FC<SkillsChartProps> = ({ skillScores }) => {
  return (
    <div className="w-full bg-slate-50 p-6 rounded-lg border border-slate-200 mb-10 text-left">
      <h3 className="text-xl font-bold text-slate-700 mb-6 text-center">スキル分析</h3>
      <div className="space-y-5">
        {/* Fixed: Iterate over skillScores with type-safe keys to resolve 'unknown' type errors. */}
        {(Object.keys(skillScores) as Array<keyof typeof skillScores>).map((key) => {
          const skill = skillScores[key];
          const percentage = (skill.score / skill.maxScore) * 100;
          return (
            <div key={key}>
              <div className="flex justify-between items-center mb-1">
                <span className="font-semibold text-slate-600">{skill.name}</span>
                <span className="text-sm font-bold text-slate-500">{skill.score} / {skill.maxScore}</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-4 shadow-inner">
                <div
                  className="bg-indigo-500 h-4 rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${percentage}%` }}
                >
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SkillsChart;
