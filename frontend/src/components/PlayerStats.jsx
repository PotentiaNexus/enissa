import { useState, useEffect } from 'react';
import { Trophy, Star, Target } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';

export const PlayerStats = ({ gameName }) => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const savedStats = localStorage.getItem(`enissa_stats_${gameName}`);
    if (savedStats) {
      setStats(JSON.parse(savedStats));
    }
  }, [gameName]);

  const saveStats = (newStats) => {
    const currentStats = stats || { gamesPlayed: 0, bestScore: 0, totalScore: 0 };
    const updated = {
      gamesPlayed: currentStats.gamesPlayed + 1,
      bestScore: Math.max(currentStats.bestScore, newStats.score || 0),
      totalScore: currentStats.totalScore + (newStats.score || 0),
      lastPlayed: new Date().toISOString()
    };
    localStorage.setItem(`enissa_stats_${gameName}`, JSON.stringify(updated));
    setStats(updated);
  };

  if (!stats || stats.gamesPlayed === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-6"
    >
      <Card className="p-4 bg-gradient-to-r from-primary/10 to-accent/10">
        <div className="flex items-center justify-around gap-4 text-center">
          <div>
            <Trophy className="w-6 h-6 text-secondary mx-auto mb-1" />
            <div className="text-lg font-display font-bold">{stats.bestScore}</div>
            <div className="text-xs text-muted-foreground">Beste</div>
          </div>
          <div>
            <Star className="w-6 h-6 text-accent mx-auto mb-1" />
            <div className="text-lg font-display font-bold">{stats.gamesPlayed}</div>
            <div className="text-xs text-muted-foreground">Gespielt</div>
          </div>
          <div>
            <Target className="w-6 h-6 text-primary mx-auto mb-1" />
            <div className="text-lg font-display font-bold">
              {Math.round(stats.totalScore / stats.gamesPlayed)}
            </div>
            <div className="text-xs text-muted-foreground">Ø Punkte</div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

// Hook to save game stats
export const useSaveGameStats = (gameName) => {
  const saveStats = (score) => {
    const currentStatsStr = localStorage.getItem(`enissa_stats_${gameName}`);
    const currentStats = currentStatsStr ? JSON.parse(currentStatsStr) : { 
      gamesPlayed: 0, 
      bestScore: 0, 
      totalScore: 0 
    };
    
    const updated = {
      gamesPlayed: currentStats.gamesPlayed + 1,
      bestScore: Math.max(currentStats.bestScore, score || 0),
      totalScore: currentStats.totalScore + (score || 0),
      lastPlayed: new Date().toISOString()
    };
    
    localStorage.setItem(`enissa_stats_${gameName}`, JSON.stringify(updated));
  };

  return saveStats;
};

export default PlayerStats;
