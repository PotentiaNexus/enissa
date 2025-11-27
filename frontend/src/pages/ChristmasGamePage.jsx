import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Sparkles, Undo, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import { usePlayerName } from '@/components/PlayerProfile';

const ChristmasGamePage = () => {
  const navigate = useNavigate();
  const playerName = usePlayerName();
  const [placedItems, setPlacedItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('tree');

  const decorations = {
    tree: [
      { id: 'star', emoji: '⭐', name: 'Stern' },
      { id: 'ball-red', emoji: '🔴', name: 'Rote Kugel' },
      { id: 'ball-gold', emoji: '🟡', name: 'Goldene Kugel' },
      { id: 'ball-blue', emoji: '🔵', name: 'Blaue Kugel' },
      { id: 'candy', emoji: '🍬', name: 'Zuckerstange' },
      { id: 'bell', emoji: '🔔', name: 'Glocke' },
      { id: 'gift', emoji: '🎁', name: 'Geschenk' },
      { id: 'snowflake', emoji: '❄️', name: 'Schneeflocke' },
      { id: 'angel', emoji: '👼', name: 'Engel' },
      { id: 'light', emoji: '💡', name: 'Licht' },
    ],
    room: [
      { id: 'santa', emoji: '🎅', name: 'Weihnachtsmann' },
      { id: 'snowman', emoji: '⛄', name: 'Schneemann' },
      { id: 'wreath', emoji: '🎄', name: 'Kranz' },
      { id: 'candle', emoji: '🕯️', name: 'Kerze' },
      { id: 'sock', emoji: '🧦', name: 'Socke' },
      { id: 'cookie', emoji: '🍪', name: 'Plätzchen' },
      { id: 'present', emoji: '🎁', name: 'Geschenk' },
      { id: 'reindeer', emoji: '🦌', name: 'Rentier' },
    ]
  };

  const handleDragStart = (e, item) => {
    e.dataTransfer.setData('item', JSON.stringify(item));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const item = JSON.parse(e.dataTransfer.getData('item'));
    
    setPlacedItems([...placedItems, { ...item, x, y, id: `${item.id}-${Date.now()}` }]);
    toast.success(`${item.name} platziert! 🎄✨`);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const removeItem = (itemId) => {
    setPlacedItems(placedItems.filter(item => item.id !== itemId));
    toast.info('Dekoration entfernt! 🗑️');
  };

  const clearAll = () => {
    setPlacedItems([]);
    toast.success('Alles zurückgesetzt! 🔄');
  };

  return (
    <div className="min-h-screen star-pattern flex flex-col">
      <header className="p-4 md:p-6 border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <Button
            variant="outline"
            size="lg"
            onClick={() => navigate('/')}
            className="rounded-xl font-display font-semibold btn-bounce border-2"
          >
            <Home className="w-5 h-5 mr-2" />
            Zurück
          </Button>

          <div className="flex items-center gap-3">
            <Sparkles className="w-6 h-6 md:w-8 md:h-8 text-secondary" />
            <h1 className="text-2xl md:text-4xl font-display font-bold text-foreground">
              Weihnachten
            </h1>
            <Sparkles className="w-6 h-6 md:w-8 md:h-8 text-accent" />
          </div>

          <Button
            variant="outline"
            size="lg"
            onClick={clearAll}
            className="rounded-xl font-display font-semibold btn-bounce border-2"
          >
            <RefreshCw className="w-5 h-5 md:mr-2" />
            <span className="hidden md:inline">Zurücksetzen</span>
          </Button>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-6 max-w-7xl">
        <div className="text-center mb-6">
          <p className="text-lg md:text-xl text-muted-foreground font-medium">
            {playerName !== 'Spieler' ? `${playerName}, d` : 'D'}ekoriere dein Weihnachtszimmer! 🎄🎅
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6">
          {/* Decoration Panel */}
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="space-y-4"
          >
            {/* Category Selection */}
            <Card className="p-4 shadow-medium">
              <div className="space-y-3">
                <Button
                  variant={selectedCategory === 'tree' ? 'default' : 'outline'}
                  onClick={() => setSelectedCategory('tree')}
                  className="w-full rounded-xl font-display font-semibold btn-bounce text-base py-6"
                >
                  🎄 Baum schmücken
                </Button>
                <Button
                  variant={selectedCategory === 'room' ? 'default' : 'outline'}
                  onClick={() => setSelectedCategory('room')}
                  className="w-full rounded-xl font-display font-semibold btn-bounce text-base py-6"
                >
                  🏠 Zimmer dekorieren
                </Button>
              </div>
            </Card>

            {/* Decorations */}
            <Card className="p-4 shadow-medium">
              <h3 className="text-lg font-display font-bold text-foreground mb-4">
                Dekorationen
              </h3>
              <div className="grid grid-cols-3 gap-3">
                {decorations[selectedCategory].map((item) => (
                  <motion.div
                    key={item.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, item)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="cursor-grab active:cursor-grabbing"
                  >
                    <Card className="aspect-square flex flex-col items-center justify-center p-2 hover:shadow-medium transition-shadow bg-gradient-to-br from-muted/30 to-background">
                      <span className="text-4xl mb-1">{item.emoji}</span>
                      <span className="text-xs text-center font-semibold">{item.name}</span>
                    </Card>
                  </motion.div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-4 text-center">
                💡 Ziehe die Dekorationen auf den Baum!
              </p>
            </Card>
          </motion.div>

          {/* Christmas Tree/Room Area */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Card
              className="relative h-[500px] md:h-[600px] overflow-hidden shadow-large"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            >
              {/* Background */}
              <div className="absolute inset-0 bg-gradient-to-b from-sky-100 to-white">
                {/* Tree */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-center">
                  <div className="text-9xl">🎄</div>
                  <div className="text-6xl -mt-4">🪵</div>
                </div>

                {/* Room elements */}
                {selectedCategory === 'room' && (
                  <>
                    <div className="absolute bottom-0 left-0 text-7xl">🎁</div>
                    <div className="absolute top-10 right-10 text-6xl">❄️</div>
                    <div className="absolute top-10 left-10 text-6xl">❄️</div>
                  </>
                )}
              </div>

              {/* Placed Items */}
              {placedItems.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  style={{ left: item.x, top: item.y }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                  onClick={() => removeItem(item.id)}
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  whileTap={{ scale: 0.8 }}
                >
                  <span className="text-5xl drop-shadow-lg">{item.emoji}</span>
                </motion.div>
              ))}

              {/* Instructions */}
              {placedItems.length === 0 && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <Card className="p-6 bg-card/90 backdrop-blur-sm">
                    <p className="text-xl font-display font-bold text-center">
                      Ziehe Dekorationen hierher! 🎨✨
                    </p>
                  </Card>
                </div>
              )}
            </Card>

            {/* Stats */}
            <div className="mt-4 text-center">
              <p className="text-lg font-display font-semibold text-foreground">
                {placedItems.length} Dekorationen platziert 🎄
              </p>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default ChristmasGamePage;