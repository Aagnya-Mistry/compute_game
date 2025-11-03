import React, { useState } from 'react';
import StartScreen from './components/StartScreen';
import GameScreen from './components/GameScreen';
import ResultsScreen from './components/ResultsScreen';
import ApiDebug from './components/ApiDebug';

function App() {
  const [gameState, setGameState] = useState('start'); // 'start', 'playing', 'results'
  const [playerName, setPlayerName] = useState('');
  const [startingScore, setStartingScore] = useState(0);
  const [finalScore, setFinalScore] = useState(0);

  const handleStartGame = (name, score) => {
    setPlayerName(name);
    setStartingScore(score);
    setGameState('playing');
  };

  const handleGameEnd = (score) => {
    setFinalScore(score);
    setGameState('results');
  };

  const handlePlayAgain = () => {
    setGameState('start');
    setPlayerName('');
    setStartingScore(0);
    setFinalScore(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-bg via-purple-900 to-dark-bg">
      <ApiDebug />
      {gameState === 'start' && (
        <StartScreen onStart={handleStartGame} />
      )}
      {gameState === 'playing' && (
        <GameScreen
          playerName={playerName}
          startingScore={startingScore}
          onGameEnd={handleGameEnd}
        />
      )}
      {gameState === 'results' && (
        <ResultsScreen
          playerName={playerName}
          finalScore={finalScore}
          onPlayAgain={handlePlayAgain}
        />
      )}
    </div>
  );
}

export default App;



