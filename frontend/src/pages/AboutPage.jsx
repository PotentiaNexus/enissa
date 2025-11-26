import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Heart, Star, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const AboutPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen star-pattern flex flex-col">
      {/* Header */}
      <header className="p-4 md:p-6">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <Button
            variant="outline"
            size="lg"
            onClick={() => navigate('/')}
            className="rounded-xl font-display font-semibold btn-bounce border-2"
          >
            <Home className="w-5 h-5 mr-2" />
            Zurück
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-6 md:py-8 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          {/* Title */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Heart className="w-10 h-10 md:w-12 md:h-12 text-accent" />
              <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground">
                Über ENISSA
              </h1>
              <Sparkles className="w-10 h-10 md:w-12 md:h-12 text-secondary" />
            </div>
          </div>

          {/* Main Card with Photo */}
          <Card className="overflow-hidden shadow-large">
            <div className="relative h-64 md:h-96">
              <img
                src="https://customer-assets.emergentagent.com/job_math-art-games/artifacts/iiy91kll_m.jpeg"
                alt="ENISSA Familie"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent"></div>
            </div>
            
            <div className="p-6 md:p-8 space-y-6">
              <div className="space-y-4">
                <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground">
                  Für jedes Kind, das lernen und wachsen möchte 🌱
                </h2>
                <p className="text-lg text-foreground/80 leading-relaxed">
                  ENISSA wurde mit viel Liebe entwickelt, um Kindern dabei zu helfen, ihre 
                  Konzentration zu verbessern und in der Schule erfolgreicher zu sein. 
                  Jedes Spiel wurde sorgfältig gestaltet, um nicht nur Spaß zu machen, 
                  sondern auch echte Lernfortschritte zu ermöglichen.
                </p>
              </div>

              {/* Features Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-primary-light rounded-xl">
                  <div className="text-3xl mb-2">🎯</div>
                  <h3 className="font-display font-bold text-lg mb-2">Fokus & Konzentration</h3>
                  <p className="text-sm text-foreground/70">
                    Spiele die speziell entwickelt wurden, um die Aufmerksamkeitsspanne zu verlängern.
                  </p>
                </div>

                <div className="p-4 bg-secondary-light rounded-xl">
                  <div className="text-3xl mb-2">🧠</div>
                  <h3 className="font-display font-bold text-lg mb-2">Gedächtnistraining</h3>
                  <p className="text-sm text-foreground/70">
                    Verbessere dein Kurz- und Langzeitgedächtnis mit unterhaltsamen Übungen.
                  </p>
                </div>

                <div className="p-4 bg-success-light rounded-xl">
                  <div className="text-3xl mb-2">📚</div>
                  <h3 className="font-display font-bold text-lg mb-2">Schulerfolg</h3>
                  <p className="text-sm text-foreground/70">
                    Alle Spiele unterstützen Fähigkeiten, die für den Schulerfolg wichtig sind.
                  </p>
                </div>

                <div className="p-4 bg-accent-light rounded-xl">
                  <div className="text-3xl mb-2">🎨</div>
                  <h3 className="font-display font-bold text-lg mb-2">Kreativität</h3>
                  <p className="text-sm text-foreground/70">
                    Entfalte deine kreative Seite mit Mal- und Zeichenfunktionen.
                  </p>
                </div>
              </div>

              {/* Quote Section */}
              <div className="p-6 bg-gradient-to-br from-muted/50 to-background rounded-2xl border-l-4 border-primary">
                <p className="text-xl md:text-2xl font-display font-semibold text-foreground italic mb-3">
                  "Lernen sollte Freude machen, nicht Stress verursachen."
                </p>
                <p className="text-foreground/70">
                  Deshalb sind alle ENISSA-Spiele so gestaltet, dass sie motivieren, 
                  belohnen und positive Lernerfahrungen schaffen.
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 text-center py-6">
                <div>
                  <div className="text-3xl md:text-4xl font-display font-bold text-primary mb-2">5</div>
                  <div className="text-sm text-foreground/70">Spiele</div>
                </div>
                <div>
                  <div className="text-3xl md:text-4xl font-display font-bold text-secondary mb-2">∞</div>
                  <div className="text-sm text-foreground/70">Spaß</div>
                </div>
                <div>
                  <div className="text-3xl md:text-4xl font-display font-bold text-success mb-2">100%</div>
                  <div className="text-sm text-foreground/70">Lernerfolg</div>
                </div>
              </div>

              {/* Call to Action */}
              <div className="text-center pt-4">
                <Button
                  size="lg"
                  onClick={() => navigate('/')}
                  className="text-lg md:text-xl py-6 md:py-7 px-10 rounded-2xl font-display font-bold btn-bounce"
                >
                  <Star className="w-5 h-5 mr-2" />
                  Jetzt spielen!
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="p-6 text-center">
        <p className="text-muted-foreground font-medium">
          Mit ❤️ für alle Kinder gemacht
        </p>
      </footer>
    </div>
  );
};

export default AboutPage;
