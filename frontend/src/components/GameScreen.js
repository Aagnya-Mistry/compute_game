import React, { useState, useEffect, useRef } from 'react';
import { mediaApi } from '../services/api';

const GameScreen = ({ playerName, startingScore, onGameEnd }) => {
  const [currentMedia, setCurrentMedia] = useState(null);
  const [score, setScore] = useState(startingScore);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [timeLeft, setTimeLeft] = useState(10);
  const [isLoading, setIsLoading] = useState(true);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [sessionId] = useState(() => `session-${Date.now()}`);
  const timerRef = useRef(null);
  const timeoutRef = useRef(null);
  const audioRef = useRef(null);

  useEffect(() => {
    // Load ambient sound
    audioRef.current = new Audio();
    audioRef.current.src = '/ambient.mp3'; // You'll need to add this file
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3;
    
    // Try to play, but don't fail if file doesn't exist
    audioRef.current.play().catch(() => {
      console.log('Ambient sound not available');
    });

    loadNextQuestion();

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (questionNumber > 40) {
      onGameEnd(score);
      return;
    }

    if (currentMedia && currentMedia.type === 'image' && !hasAnswered) {
      setTimeLeft(10);
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            handleSkip();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (currentMedia && currentMedia.type === 'video') {
      setTimeLeft(null);
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [currentMedia, questionNumber, hasAnswered]);

  const loadNextQuestion = async () => {
    setIsLoading(true);
    setHasAnswered(false);
    setShowFeedback(false);
    setTimeLeft(10);

    try {
      const response = await mediaApi.getRandomMedia(sessionId);

      console.log('[GameScreen] media response:', response.status, response.data);

      setCurrentMedia(response.data);
      setIsLoading(false);
    } catch (error) {
      // Log detailed error info for diagnostics
      console.error('[GameScreen] Error loading media:', error);
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
      }
      // Show a slightly more informative alert to the user
      const status = error.response ? ` (status ${error.response.status})` : '';
      alert(`Failed to load media${status}. Please try again.`);
      setIsLoading(false);
    }
  };

  const handleAnswer = (selectedLabel) => {
    if (hasAnswered) return;

    setHasAnswered(true);
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    const correct = selectedLabel === currentMedia.label;
    setIsCorrect(correct);

    setScore((prev) => {
      const newScore = correct ? prev + 200 : prev - 100;
      
      setShowFeedback(true);

      timeoutRef.current = setTimeout(() => {
        if (questionNumber >= 40) {
          onGameEnd(newScore);
        } else {
          setQuestionNumber((prevQ) => prevQ + 1);
          loadNextQuestion();
        }
      }, 1500);
      
      return newScore;
    });
  };

  const handleSkip = () => {
    if (hasAnswered) return;

    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    if (questionNumber >= 40) {
      onGameEnd(score);
    } else {
      setQuestionNumber((prev) => prev + 1);
      loadNextQuestion();
    }
  };

  const progress = (questionNumber / 40) * 100;

  return (
    <div className="min-h-screen p-4 relative overflow-hidden">
      {/* Background ambient elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-10 w-96 h-96 bg-cyber-purple rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyber-orange rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
      </div>

      {/* Header */}
      <div className="max-w-6xl mx-auto mb-6 relative z-10">
        <div className="glass-card rounded-xl p-4 border border-purple-500/30">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyber-purple to-cyber-orange">
                {playerName}
              </h2>
              <p className="text-gray-400 text-sm">Question {questionNumber} of 40</p>
            </div>
            <div className="text-right">
              <p className="text-gray-400 text-sm mb-1">Score</p>
              <p className="text-3xl font-bold cyber-glow" style={{ color: score >= 0 ? '#4cc9f0' : '#ff6b35' }}>
                {score}
              </p>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-4 h-2 bg-black/30 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-cyber-purple to-cyber-orange transition-all duration-300 relative"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 bg-white/20 animate-scan"></div>
            </div>
          </div>

          {/* Timer for images */}
          {currentMedia?.type === 'image' && timeLeft !== null && !hasAnswered && (
            <div className="mt-4 text-center">
              <div className="inline-block px-4 py-2 bg-black/40 rounded-lg border border-cyber-orange/50">
                <span className="text-cyber-orange font-bold text-lg">{timeLeft}s</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Media Display */}
      <div className="max-w-6xl mx-auto mb-6 relative z-10">
        <div className="glass-card rounded-xl p-4 md:p-8 border-2 border-purple-500/50 relative overflow-hidden min-h-[400px] flex items-center justify-center">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center">
              <div className="relative w-20 h-20 mb-4">
                <div className="absolute inset-0 border-4 border-cyber-purple/30 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-transparent border-t-cyber-purple rounded-full animate-spin"></div>
              </div>
              <p className="text-purple-300 animate-pulse">AI Scanning...</p>
            </div>
          ) : currentMedia ? (
            <div className="w-full relative">
              {/* AI Scanning overlay effect */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyber-purple/10 to-transparent animate-scan"></div>
              </div>

              {currentMedia.type === 'image' ? (
                <img
                  src={`${process.env.REACT_APP_API_URL || 'https://compute-game.onrender.com'}${currentMedia.url}`}
                  alt="Question"
                  className={`max-w-full max-h-[500px] mx-auto rounded-lg object-contain ${showFeedback && !isCorrect ? 'animate-glitch' : 'animate-fade-in'}`}
                  onError={() => handleSkip()}
                />
              ) : (
                <video
                  src={`${process.env.REACT_APP_API_URL || 'https://compute-game.onrender.com'}${currentMedia.url}`}
                  controls
                  className="max-w-full max-h-[500px] mx-auto rounded-lg animate-fade-in"
                  onError={() => handleSkip()}
                />
              )}

              {/* Feedback overlay */}
              {showFeedback && (
                <div className={`absolute inset-0 flex items-center justify-center ${isCorrect ? 'bg-green-500/20' : 'bg-red-500/20'} rounded-lg animate-fade-in`}>
                  <div className={`text-6xl font-bold cyber-glow ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
                    {isCorrect ? '✓' : '✗'}
                  </div>
                  <div className={`absolute top-4 text-2xl font-bold cyber-glow ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
                    {isCorrect ? '+200' : '-100'}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center text-gray-400">
              <p>No media available</p>
            </div>
          )}
        </div>
      </div>

      {/* Answer Buttons */}
      {!isLoading && currentMedia && !hasAnswered && (
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="glass-card rounded-xl p-6 border border-purple-500/30">
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <button
                onClick={() => handleAnswer('ai')}
                className="flex-1 py-6 px-8 bg-gradient-to-r from-cyber-purple to-purple-600 text-white font-bold text-xl rounded-lg hover:from-purple-600 hover:to-cyber-purple transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-cyber-purple/50 border-2 border-cyber-purple/50"
              >
                🤖 AI Generated
              </button>
              <button
                onClick={() => handleAnswer('real')}
                className="flex-1 py-6 px-8 bg-gradient-to-r from-cyber-blue to-blue-600 text-white font-bold text-xl rounded-lg hover:from-blue-600 hover:to-cyber-blue transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-cyber-blue/50 border-2 border-cyber-blue/50"
              >
                👁️ Real
              </button>
              <button
                onClick={handleSkip}
                className="px-6 py-6 bg-black/40 text-gray-300 font-semibold rounded-lg hover:bg-black/60 transition-all duration-300 border border-gray-600/50"
              >
                ⏭️ Skip
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameScreen;

