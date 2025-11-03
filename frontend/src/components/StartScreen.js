import React, { useState } from 'react';

const StartScreen = ({ onStart }) => {
  const [name, setName] = useState('');
  const [score, setScore] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      alert('Please enter your name or team name!');
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      onStart(name.trim(), parseInt(score) || 0);
    }, 500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-cyber-purple rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-cyber-orange rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-cyber-blue rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="glass-card rounded-2xl p-8 md:p-12 max-w-md w-full relative z-10 border-2 border-cyber-purple/50 shadow-2xl animate-glow">
        <div className="text-center mb-8">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 cyber-glow" style={{ color: '#ff6b35' }}>
            REAL
          </h1>
          <h2 className="text-3xl md:text-4xl font-bold mb-2 cyber-glow" style={{ color: '#9d4edd' }}>
            or
          </h2>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 cyber-glow" style={{ color: '#4cc9f0' }}>
            AI?
          </h1>
          <p className="text-purple-300 text-lg mb-2">🎃 Halloween Edition 🎃</p>
          <p className="text-gray-400 text-sm">Test your perception in this futuristic guessing game</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-purple-300 font-semibold mb-2 text-sm">
              Name / Team Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 bg-black/30 border border-purple-500/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyber-purple focus:ring-2 focus:ring-cyber-purple/50 transition-all"
              placeholder="Enter your name..."
              required
            />
          </div>

          <div>
            <label className="block text-purple-300 font-semibold mb-2 text-sm">
              Starting Score
            </label>
            <input
              type="number"
              value={score}
              onChange={(e) => setScore(e.target.value)}
              className="w-full px-4 py-3 bg-black/30 border border-purple-500/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyber-purple focus:ring-2 focus:ring-cyber-purple/50 transition-all"
              placeholder="0"
              min="0"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 bg-gradient-to-r from-cyber-purple to-cyber-orange text-white font-bold text-lg rounded-lg hover:from-cyber-orange hover:to-cyber-purple transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-cyber-purple/50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Loading...' : 'Start Game'}
          </button>
        </form>

        <div className="mt-6 text-center text-gray-400 text-xs">
          <p>40 questions await... Can you tell the difference? 👻</p>
        </div>
      </div>
    </div>
  );
};

export default StartScreen;



