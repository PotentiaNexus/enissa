import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Edit2, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

export const PlayerProfile = ({ onProfileComplete }) => {
  const [playerName, setPlayerName] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState('');

  useEffect(() => {
    const savedName = localStorage.getItem('enissa_player_name');
    if (savedName) {
      setPlayerName(savedName);
      if (onProfileComplete) onProfileComplete(savedName);
    } else {
      setIsEditing(true);
    }
  }, [onProfileComplete]);

  const handleSaveName = () => {
    const name = tempName.trim();
    if (name.length < 2) {
      toast.error('Dein Name muss mindestens 2 Buchstaben haben! 📝');
      return;
    }
    
    if (name.length > 20) {
      toast.error('Dein Name ist zu lang! Maximal 20 Buchstaben. ✂️');
      return;
    }

    localStorage.setItem('enissa_player_name', name);
    setPlayerName(name);
    setIsEditing(false);
    toast.success(`Willkommen, ${name}! 🎉`);
    if (onProfileComplete) onProfileComplete(name);
  };

  const handleEditName = () => {
    setTempName(playerName);
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setTempName('');
    if (playerName) {
      setIsEditing(false);
    }
  };

  if (!isEditing && playerName) {
    return null; // Profile is set, don't show anything
  }

  return (
    <AnimatePresence>
      {isEditing && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="w-full max-w-md"
          >
            <Card className="p-8 shadow-large border-2">
              <div className="text-center space-y-6">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring' }}
                  className="flex justify-center"
                >
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                    <User className="w-10 h-10 text-white" />
                  </div>
                </motion.div>

                <div>
                  <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2">
                    {playerName ? 'Name ändern' : 'Hallo! 👋'}
                  </h2>
                  <p className="text-lg text-muted-foreground">
                    {playerName ? 'Wie möchtest du jetzt heißen?' : 'Wie heißt du?'}
                  </p>
                </div>

                <div className="space-y-4">
                  <Input
                    type="text"
                    placeholder="Dein Name..."
                    value={tempName}
                    onChange={(e) => setTempName(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        handleSaveName();
                      }
                    }}
                    className="text-center text-xl font-display font-semibold h-14 rounded-xl"
                    autoFocus
                    maxLength={20}
                  />

                  <div className="flex gap-3">
                    <Button
                      size="lg"
                      onClick={handleSaveName}
                      className="flex-1 text-lg py-6 rounded-xl font-display font-bold btn-bounce"
                    >
                      <Check className="w-5 h-5 mr-2" />
                      Speichern
                    </Button>
                    {playerName && (
                      <Button
                        size="lg"
                        variant="outline"
                        onClick={handleCancelEdit}
                        className="flex-1 text-lg py-6 rounded-xl font-display font-bold btn-bounce border-2"
                      >
                        <X className="w-5 h-5 mr-2" />
                        Abbrechen
                      </Button>
                    )}
                  </div>
                </div>

                <div className="pt-4 text-sm text-muted-foreground">
                  💡 Tipp: Du kannst deinen Namen jederzeit ändern!
                </div>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Hook to get player name
export const usePlayerName = () => {
  const [playerName, setPlayerName] = useState('');

  useEffect(() => {
    const savedName = localStorage.getItem('enissa_player_name');
    if (savedName) {
      setPlayerName(savedName);
    }
  }, []);

  return playerName || 'Spieler';
};

// Component for showing player name with edit option
export const PlayerNameDisplay = ({ className = '' }) => {
  const [playerName, setPlayerName] = useState('');
  const [showEdit, setShowEdit] = useState(false);

  useEffect(() => {
    const savedName = localStorage.getItem('enissa_player_name');
    if (savedName) {
      setPlayerName(savedName);
    }
  }, []);

  const handleNameChange = (newName) => {
    setPlayerName(newName);
    setShowEdit(false);
  };

  if (!playerName) return null;

  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className={`flex items-center gap-2 bg-card px-4 py-2 rounded-xl shadow-soft ${className}`}
      >
        <User className="w-5 h-5 text-primary" />
        <span className="font-display font-bold text-lg">{playerName}</span>
        <Button
          size="sm"
          variant="ghost"
          onClick={() => setShowEdit(true)}
          className="w-8 h-8 p-0 rounded-lg hover:bg-primary/10"
        >
          <Edit2 className="w-4 h-4" />
        </Button>
      </motion.div>
      
      <PlayerProfile 
        onProfileComplete={handleNameChange}
      />
      {showEdit && (
        <div onClick={() => setShowEdit(true)} className="cursor-pointer" />
      )}
    </>
  );
};

export default PlayerProfile;
