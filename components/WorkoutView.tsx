import React, { useState, useEffect } from 'react';
import { generateWorkoutRoutine } from '../services/geminiService';
import { WorkoutRoutine } from '../types';

const WorkoutView: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [difficulty, setDifficulty] = useState('Intermediate');
  const [routine, setRoutine] = useState<WorkoutRoutine | null>(null);

  const difficultyMap: Record<string, string> = {
    'Beginner': '초급',
    'Intermediate': '중급',
    'Advanced': '고급'
  };

  // Initial generation on mount
  useEffect(() => {
    handleGenerate(difficulty);
  }, []);

  const handleGenerate = async (level: string) => {
    setDifficulty(level);
    setLoading(true);
    // Fetch mock data
    const result = await generateWorkoutRoutine(level);
    setRoutine(result);
    setLoading(false);
  };

  return (
    <div className="space-y-8 pb-24 md:pb-0">
       <div className="bg-secondary p-8 rounded-[32px] shadow-2xl text-white relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-96 h