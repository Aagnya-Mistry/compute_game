import React from 'react';

const ResultsScreen = ({ playerName, finalScore, onPlayAgain }) => {
  const getScoreMessage = () => {
    if (finalScore >= 8000) return "🎃 Legendary! You're a true AI detective!";
    if (finalScore >= 6000) return "👻 Excellent! You have a sharp eye!";
    if (finalScore >= 4000) return "🎃 Great job! You're getting the hang of it!";
    if (finalScore >= 2000) return "👻 Not bad! Keep practicing!";
    if (finalScore >= 0) return "🎃 Good try! Better luck next time!";
    return "👻 Tough round! Don't give up!";
  };

  const getScoreColor = () => {
    if (finalScore >= 6000) return 'text-green-400';
    if (finalScore >= 3000) return 'text-cyber-blue';
    if (finalScore >= 0) return 'text-cyber-orange';
    return 'text-red-400';
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-96 h-96 bg-cyber-purple rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyber-orange rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyber-blue rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="glass-card rounded-2xl p-8 md:p-12 max-w-2xl w-full relative z-10 border-2 border-cyber-purple/50 shadow-2xl animate-glow">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 cyber-glow" style={{ color: '#ff6b35' }}>
            Game Over!
          </h1>
          
          <div className="my-8">
            <p className="text-purple-300 text-xl mb-2">Player: {playerName}</p>
            <p className="text-gray-400 text-sm mb-6">Final Score</p>
            <div className={`text-7xl md:text-8xl font-bold cyber-glow mb-4 ${getScoreColor()}`}>
              {finalScore}
            </div>
            <p className="text-2xl md:text-3xl font-semibold text-purple-300 mt-4">
              {getScoreMessage()}
            </p>
          </div>

          <div className="mt-12">
            <button
              onClick={onPlayAgain}
              className="py-4 px-12 bg-gradient-to-r from-cyber-purple to-cyber-orange text-white font-bold text-xl rounded-lg hover:from-cyber-orange hover:to-cyber-purple transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-cyber-purple/50 border-2 border-cyber-purple/50"
            >
              🎮 Play Again
            </button>
          </div>

          <div className="mt-8 text-gray-400 text-sm">
            <p>Thanks for playing Real or AI? 🎃👻</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsScreen;



