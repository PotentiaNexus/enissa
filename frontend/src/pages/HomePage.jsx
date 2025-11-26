import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calculator, Palette, Star, Sparkles, Brain, Zap, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export const HomePage = () => {
  const navigate = useNavigate();

  const games = [
    {
      id: 'math',
      title: 'Mathe-Spiele',
      description: 'Lerne Mathematik mit Spaß!',
      icon: Calculator,
      color: 'from-primary to-primary-light',
      path: '/math'
    },
    {
      id: 'draw',
      title: 'Malen & Zeichnen',
      description: 'Werde kreativ mit Farben!',
      icon: Palette,
      color: 'from-accent to-accent-light',
      path: '/draw'
    },
    {
      id: 'memory',
      title: 'Gedächtnisspiel',
      description: 'Trainiere dein Gedächtnis!',
      icon: Brain,
      color: 'from-[hsl(270_75%_65%)] to-[hsl(270_75%_80%)]',
      path: '/memory'
    },
    {
      id: 'sequence',
      title: 'Sequenz-Spiel',
      description: 'Merke dir die Reihenfolge!',
      icon: Zap,
      color: 'from-secondary to-secondary-light',
      path: '/sequence'
    },
    {
      id: 'focus',
      title: 'Fokus-Training',
      description: 'Verbessere deine Konzentration!',
      icon: Eye,
      color: 'from-success to-success-light',
      path: '/focus'
    }
  ];

  return (
    <div className="min-h-screen star-pattern flex flex-col">
      {/* Header */}
      <header className="p-6 md:p-8">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-2">
            <Sparkles className="w-8 h-8 md:w-10 md:h-10 text-secondary" />
            <h1 className="text-5xl md:text-7xl font-display font-bold text-foreground">
              ENISSA
            </h1>
            <Star className="w-8 h-8 md:w-10 md:h-10 text-accent" />
          </div>
          <p className="text-lg md:text-xl font-medium text-muted-foreground">
            Deine Lern- und Spiel-App!
          </p>
        </motion.div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8 md:py-12 max-w-6xl">
        {/* Welcome Section with Photo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-12"
        >
          <Card className="overflow-hidden shadow-large bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 md:p-8 items-center">
              <div className="space-y-4">
                <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">
                  Willkommen bei ENISSA! 🌟
                </h2>
                <p className="text-lg md:text-xl text-foreground/80 leading-relaxed">
                  Spiele, lerne und wachse mit uns! Diese App wurde speziell für dich entwickelt, 
                  um dir beim Lernen zu helfen und dabei viel Spaß zu haben.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-primary text-primary-foreground rounded-full text-sm font-semibold">
                    ✨ Macht Spaß
                  </span>
                  <span className="px-3 py-1 bg-success text-success-foreground rounded-full text-sm font-semibold">
                    🧠 Lehrreich
                  </span>
                  <span className="px-3 py-1 bg-accent text-accent-foreground rounded-full text-sm font-semibold">
                    🎯 Effektiv
                  </span>
                </div>
              </div>
              <div className="relative">
                <div className="relative rounded-2xl overflow-hidden shadow-large aspect-[4/3]">
                  <img
                    src="https://customer-assets.emergentagent.com/job_math-art-games/artifacts/iiy91kll_m.jpeg"
                    alt="ENISSA Familie"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent"></div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {games.map((game, index) => {
            const Icon = game.icon;
            return (
              <motion.div
                key={game.id}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ 
                  delay: index * 0.1,
                  type: 'spring',
                  stiffness: 200,
                  damping: 15
                }}
              >
                <Card className="h-full overflow-hidden border-2 hover:border-primary transition-all duration-300 shadow-medium hover:shadow-large">
                  <div className="h-full flex flex-col">
                    {/* Colorful Header */}
                    <div className={`bg-gradient-to-br ${game.color} p-6 md:p-8 text-center`}>
                      <div className="inline-block p-4 md:p-5 bg-card rounded-2xl shadow-large mb-3">
                        <Icon className="w-10 h-10 md:w-12 md:h-12 text-primary" />
                      </div>
                      <h2 className="text-xl md:text-2xl font-display font-bold text-card mb-2">
                        {game.title}
                      </h2>
                      <p className="text-sm md:text-base text-card/90 font-medium">
                        {game.description}
                      </p>
                    </div>

                    {/* Button Area */}
                    <div className="p-4 md:p-6 mt-auto">
                      <Button
                        size="lg"
                        onClick={() => navigate(game.path)}
                        className="w-full text-base md:text-lg py-5 md:py-6 rounded-xl font-display font-bold shadow-medium hover:shadow-large btn-bounce bg-gradient-to-r from-primary to-primary-light hover:opacity-90 border-0"
                      >
                        Jetzt spielen! 🎮
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Info Section */}
        <motion.div
          className="mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="p-6 md:p-8 bg-gradient-to-br from-muted/50 to-background max-w-3xl mx-auto">
            <div className="text-center space-y-4">
              <h3 className="text-2xl md:text-3xl font-display font-bold text-foreground">
                🧠 Konzentrations-Training
              </h3>
              <p className="text-base md:text-lg text-foreground/80">
                Diese Spiele helfen dir, deine Konzentration zu verbessern, dein Gedächtnis zu trainieren und in der Schule besser zu werden!
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-4">
                <div className="p-3 bg-card rounded-xl">
                  <div className="text-2xl mb-1">🎯</div>
                  <div className="text-sm font-semibold">Fokus</div>
                </div>
                <div className="p-3 bg-card rounded-xl">
                  <div className="text-2xl mb-1">🧩</div>
                  <div className="text-sm font-semibold">Gedächtnis</div>
                </div>
                <div className="p-3 bg-card rounded-xl">
                  <div className="text-2xl mb-1">⚡</div>
                  <div className="text-sm font-semibold">Reaktion</div>
                </div>
                <div className="p-3 bg-card rounded-xl">
                  <div className="text-2xl mb-1">📚</div>
                  <div className="text-sm font-semibold">Lernen</div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Fun decoration elements */}
        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <div className="flex items-center justify-center gap-2 text-3xl md:text-4xl">
            <motion.span
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
            >
              ⭐
            </motion.span>
            <motion.span
              animate={{ rotate: [0, -10, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 1, delay: 0.2 }}
            >
              🌟
            </motion.span>
            <motion.span
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 1, delay: 0.4 }}
            >
              ✨
            </motion.span>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="p-6 text-center">
        <p className="text-muted-foreground font-medium">
          Viel Spaß beim Lernen und Spielen! 🎉
        </p>
      </footer>
    </div>
  );
};

export default HomePage;
