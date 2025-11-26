import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import CanvasDraw from 'react-canvas-draw';
import { Home, Palette, Eraser, Trash2, Download, Undo, Redo } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { toast } from 'sonner';

const DrawingPage = () => {
  const navigate = useNavigate();
  const canvasRef = useRef(null);
  const [brushColor, setBrushColor] = useState('#2196F3');
  const [brushRadius, setBrushRadius] = useState(4);
  const [canvasSize, setCanvasSize] = useState({ width: 800, height: 600 });

  const colors = [
    { name: 'Blau', value: '#2196F3', bg: 'bg-primary' },
    { name: 'Rot', value: '#FF5252', bg: 'bg-destructive' },
    { name: 'Grün', value: '#4CAF50', bg: 'bg-success' },
    { name: 'Gelb', value: '#FFEB3B', bg: 'bg-secondary' },
    { name: 'Lila', value: '#9C27B0', bg: 'bg-[hsl(280_65%_55%)]' },
    { name: 'Orange', value: '#FF9800', bg: 'bg-warning' },
    { name: 'Rosa', value: '#E91E63', bg: 'bg-accent' },
    { name: 'Schwarz', value: '#000000', bg: 'bg-foreground' },
  ];

  const brushSizes = [
    { name: 'Klein', value: 2, emoji: '✏️' },
    { name: 'Mittel', value: 4, emoji: '🖊️' },
    { name: 'Groß', value: 8, emoji: '🖌️' },
    { name: 'Sehr groß', value: 16, emoji: '🎨' },
  ];

  useEffect(() => {
    const updateCanvasSize = () => {
      const container = document.getElementById('canvas-container');
      if (container) {
        const maxWidth = Math.min(container.clientWidth - 32, 800);
        const maxHeight = Math.min(window.innerHeight - 300, 600);
        setCanvasSize({ width: maxWidth, height: maxHeight });
      }
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);
    return () => window.removeEventListener('resize', updateCanvasSize);
  }, []);

  const handleClear = () => {
    if (canvasRef.current) {
      canvasRef.current.clear();
      toast.success('Alles gelöscht! 🧹');
    }
  };

  const handleUndo = () => {
    if (canvasRef.current) {
      canvasRef.current.undo();
      toast.info('Rückgängig');
    }
  };

  const handleSave = () => {
    if (canvasRef.current) {
      const dataUrl = canvasRef.current.getDataURL();
      const link = document.createElement('a');
      link.download = `enissa-zeichnung-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
      toast.success('Bild gespeichert! 🎨');
    }
  };

  return (
    <div className="min-h-screen star-pattern flex flex-col">
      {/* Header */}
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
            <Palette className="w-6 h-6 md:w-8 md:h-8 text-accent" />
            <h1 className="text-2xl md:text-4xl font-display font-bold text-foreground">
              Malen & Zeichnen
            </h1>
          </div>
          
          <Button
            variant="outline"
            size="lg"
            onClick={handleSave}
            className="rounded-xl font-display font-semibold btn-bounce border-2 bg-success text-success-foreground hover:bg-success/90"
          >
            <Download className="w-5 h-5 md:mr-2" />
            <span className="hidden md:inline">Speichern</span>
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6">
          {/* Tool Panel */}
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="space-y-4"
          >
            {/* Colors */}
            <Card className="p-4 md:p-6 shadow-medium">
              <h3 className="text-xl font-display font-bold text-foreground mb-4 flex items-center gap-2">
                <Palette className="w-5 h-5" />
                Farben
              </h3>
              <div className="grid grid-cols-4 gap-3">
                {colors.map((color) => (
                  <motion.button
                    key={color.value}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => {
                      setBrushColor(color.value);
                      toast.success(`${color.name} gewählt! 🎨`);
                    }}
                    className={`
                      w-full aspect-square rounded-xl shadow-soft
                      ${brushColor === color.value ? 'ring-4 ring-primary ring-offset-2' : ''}
                      transition-all duration-200
                    `}
                    style={{ backgroundColor: color.value }}
                    aria-label={color.name}
                  />
                ))}
              </div>
            </Card>

            {/* Brush Size */}
            <Card className="p-4 md:p-6 shadow-medium">
              <h3 className="text-xl font-display font-bold text-foreground mb-4">
                Pinselgröße
              </h3>
              <div className="grid grid-cols-2 gap-3 mb-4">
                {brushSizes.map((size) => (
                  <Button
                    key={size.value}
                    variant={brushRadius === size.value ? 'default' : 'outline'}
                    onClick={() => {
                      setBrushRadius(size.value);
                      toast.success(`${size.name} ${size.emoji}`);
                    }}
                    className="h-auto py-4 rounded-xl font-display font-semibold btn-bounce text-base"
                  >
                    <span className="text-2xl mr-2">{size.emoji}</span>
                    {size.name}
                  </Button>
                ))}
              </div>
            </Card>

            {/* Actions */}
            <Card className="p-4 md:p-6 shadow-medium space-y-3">
              <Button
                variant="outline"
                onClick={handleUndo}
                className="w-full rounded-xl font-display font-semibold btn-bounce text-base py-6"
              >
                <Undo className="w-5 h-5 mr-2" />
                Rückgängig
              </Button>
              
              <Button
                variant="outline"
                onClick={handleClear}
                className="w-full rounded-xl font-display font-semibold btn-bounce text-base py-6 border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
              >
                <Trash2 className="w-5 h-5 mr-2" />
                Alles löschen
              </Button>
            </Card>
          </motion.div>

          {/* Canvas Area */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            id="canvas-container"
          >
            <Card className="p-4 md:p-6 shadow-large">
              <div className="bg-card rounded-xl overflow-hidden border-4 border-border shadow-inner">
                <CanvasDraw
                  ref={canvasRef}
                  brushColor={brushColor}
                  brushRadius={brushRadius}
                  lazyRadius={0}
                  canvasWidth={canvasSize.width}
                  canvasHeight={canvasSize.height}
                  hideGrid={true}
                  backgroundColor="#ffffff"
                  className="cursor-crosshair"
                  style={{
                    boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.1)'
                  }}
                />
              </div>
              
              <div className="mt-4 text-center">
                <p className="text-muted-foreground font-medium">
                  Zeichne, was dir gefällt! 🎨✨
                </p>
              </div>
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default DrawingPage;
