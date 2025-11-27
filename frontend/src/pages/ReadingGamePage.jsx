import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, BookOpen, CheckCircle, XCircle, Star, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';
import { usePlayerName } from '@/components/PlayerProfile';

const ReadingGamePage = () => {
  const navigate = useNavigate();
  const playerName = usePlayerName();
  const [gameState, setGameState] = useState('menu');
  const [grade, setGrade] = useState(1);
  const [currentStory, setCurrentStory] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);

  const stories = {
    1: [
      {
        title: 'Der kleine Hund',
        text: 'Max ist ein kleiner Hund. Er ist braun. Max mag Bälle. Er spielt gern im Park. Max hat viele Freunde.',
        questions: [
          {
            question: 'Welche Farbe hat Max?',
            answers: ['braun', 'schwarz', 'weiß', 'gelb'],
            correct: 0
          },
          {
            question: 'Was mag Max?',
            answers: ['Katzen', 'Bälle', 'Autos', 'Bücher'],
            correct: 1
          }
        ]
      },
      {
        title: 'Die Katze Luna',
        text: 'Luna ist eine Katze. Sie ist grau und weiß. Luna schläft gern auf dem Sofa. Sie trinkt Milch. Luna ist sehr lieb.',
        questions: [
          {
            question: 'Wo schläft Luna gern?',
            answers: ['auf dem Sofa', 'im Garten', 'auf dem Baum', 'im Auto'],
            correct: 0
          },
          {
            question: 'Was trinkt Luna?',
            answers: ['Wasser', 'Saft', 'Milch', 'Tee'],
            correct: 2
          }
        ]
      }
    ],
    2: [
      {
        title: 'Der Schulausflug',
        text: 'Heute macht die Klasse 2b einen Ausflug in den Zoo. Emma freut sich sehr. Sie möchte die Affen sehen. Ihr Freund Tim mag Löwen am liebsten. Die Lehrerin Frau Müller hat Äpfel und Brote dabei.',
        questions: [
          {
            question: 'Wohin geht die Klasse?',
            answers: ['in den Park', 'in den Zoo', 'ins Museum', 'ins Kino'],
            correct: 1
          },
          {
            question: 'Welche Tiere möchte Emma sehen?',
            answers: ['Löwen', 'Elefanten', 'Affen', 'Zebras'],
            correct: 2
          }
        ]
      }
    ],
    3: [
      {
        title: 'Das Geburtstagsfest',
        text: 'Sarah wird heute neun Jahre alt. Sie hat viele Freunde zu ihrer Geburtstagsfeier eingeladen. Ihre Mutter hat einen großen Schokoladenkuchen gebacken. Im Garten spielen die Kinder Verstecken und Fangen. Als Geschenk wünscht sich Sarah ein neues Fahrrad.',
        questions: [
          {
            question: 'Wie alt wird Sarah?',
            answers: ['acht', 'neun', 'zehn', 'elf'],
            correct: 1
          },
          {
            question: 'Was für einen Kuchen gibt es?',
            answers: ['Erdbeerkuchen', 'Apfelkuchen', 'Schokoladenkuchen', 'Zitronenkuchen'],
            correct: 2
          },
          {
            question: 'Was wünscht sich Sarah als Geschenk?',
            answers: ['ein Buch', 'ein Fahrrad', 'eine Puppe', 'einen Ball'],
            correct: 1
          }
        ]
      }
    ],
    4: [
      {
        title: 'Die Schulbibliothek',
        text: 'In der Pause geht Leon oft in die Schulbibliothek. Dort ist es ruhig und gemütlich. Frau Weber, die Bibliothekarin, hilft ihm beim Suchen von spannenden Büchern. Leon liebt Abenteuergeschichten und Sachbücher über Dinosaurier. Jeden Freitag darf er sich zwei Bücher ausleihen. Seine Lieblingsbücher nimmt er auch mit nach Hause, um sie seinen Eltern vorzulesen.',
        questions: [
          {
            question: 'Wann geht Leon in die Bibliothek?',
            answers: ['nach der Schule', 'in der Pause', 'am Wochenende', 'am Morgen'],
            correct: 1
          },
          {
            question: 'Welche Bücher mag Leon besonders?',
            answers: ['Märchen', 'Kochbücher', 'Abenteuergeschichten', 'Comics'],
            correct: 2
          },
          {
            question: 'Wie viele Bücher darf Leon freitags ausleihen?',
            answers: ['eins', 'zwei', 'drei', 'vier'],
            correct: 1
          }
        ]
      }
    ],
    5: [
      {
        title: 'Der Waldspaziergang',
        text: 'Am Samstagnachmittag unternahm Familie Schmidt einen Spaziergang durch den nahegelegenen Wald. Die herbstlichen Blätter in verschiedenen Farbtönen – von goldgelb bis rotbraun – bedeckten den Waldboden wie ein bunter Teppich. Plötzlich entdeckte der zehnjährige Jonas ein Eichhörnchen, das geschickt von Ast zu Ast sprang und Nüsse sammelte. "Das Eichhörnchen bereitet sich auf den Winter vor", erklärte Vater Schmidt. Die Familie beobachtete das flinke Tier noch eine Weile, bevor sie ihren Weg fortsetzten.',
        questions: [
          {
            question: 'Wann machte die Familie den Spaziergang?',
            answers: ['Sonntagmorgen', 'Samstagnachmittag', 'Freitagabend', 'Montagvormittag'],
            correct: 1
          },
          {
            question: 'Welche Jahreszeit wird im Text beschrieben?',
            answers: ['Frühling', 'Sommer', 'Herbst', 'Winter'],
            correct: 2
          },
          {
            question: 'Was macht das Eichhörnchen?',
            answers: ['Es schläft', 'Es sammelt Nüsse', 'Es baut ein Nest', 'Es frisst Blätter'],
            correct: 1
          },
          {
            question: 'Warum sammelt das Eichhörnchen Nüsse?',
            answers: ['Zum Spielen', 'Zur Vorbereitung auf den Winter', 'Für seine Freunde', 'Weil es Hunger hat'],
            correct: 1
          }
        ]
      }
    ]
  };

  const grades = [
    { id: 1, name: '1. Klasse', emoji: '📖', color: 'from-success to-success-light', desc: 'Erste Wörter' },
    { id: 2, name: '2. Klasse', emoji: '📚', color: 'from-primary to-primary-light', desc: 'Kurze Texte' },
    { id: 3, name: '3. Klasse', emoji: '📝', color: 'from-secondary to-secondary-light', desc: 'Geschichten' },
    { id: 4, name: '4. Klasse', emoji: '📔', color: 'from-accent to-accent-light', desc: 'Längere Texte' },
    { id: 5, name: '5. Klasse', emoji: '📕', color: 'from-[hsl(280_65%_60%)] to-[hsl(320_75%_70%)]', desc: 'Fortgeschritten' }
  ];

  const startGame = (selectedGrade) => {
    setGrade(selectedGrade);
    const gradeStories = stories[selectedGrade];
    const randomStory = gradeStories[Math.floor(Math.random() * gradeStories.length)];
    setCurrentStory(randomStory);
    setScore(0);
    setQuestionNumber(0);
    setGameState('playing');
  };

  const handleAnswer = (answerIndex) => {
    if (showFeedback) return;

    setSelectedAnswer(answerIndex);
    setShowFeedback(true);

    const isCorrect = answerIndex === currentStory.questions[questionNumber].correct;

    if (isCorrect) {
      setScore(score + 1);
      toast.success('Richtig! Super gelesen! 📖✨');
    } else {
      toast.error('Nicht ganz richtig. Lies nochmal genau! 🤔');
    }

    setTimeout(() => {
      setShowFeedback(false);
      setSelectedAnswer(null);

      if (questionNumber < currentStory.questions.length - 1) {
        setQuestionNumber(questionNumber + 1);
      } else {
        setGameState('finished');
      }
    }, 2000);
  };

  return (
    <div className="min-h-screen star-pattern flex flex-col">
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

          {gameState === 'playing' && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="flex items-center gap-2 bg-card px-4 py-2 rounded-xl shadow-soft"
            >
              <Trophy className="w-5 h-5 text-secondary" />
              <span className="font-display font-bold text-lg">{score}/{currentStory.questions.length}</span>
            </motion.div>
          )}
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-6 md:py-8 max-w-4xl">
        <AnimatePresence mode="wait">
          {gameState === 'menu' && (
            <motion.div
              key="menu"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              <div className="text-center">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <BookOpen className="w-12 h-12 md:w-16 md:h-16 text-primary" />
                  <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground">
                    Lesen lernen
                  </h1>
                </div>
                <p className="text-lg md:text-xl text-muted-foreground font-medium">
                  {playerName !== 'Spieler' ? `${playerName}, w` : 'W'}ähle deine Klassenstufe!
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {grades.map((g, index) => (
                  <motion.div
                    key={g.id}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: index * 0.1, type: 'spring' }}
                  >
                    <Card
                      className="cursor-pointer hover:shadow-large transition-all duration-300 border-2 hover:border-primary overflow-hidden"
                      onClick={() => startGame(g.id)}
                    >
                      <div className={`bg-gradient-to-br ${g.color} p-6 md:p-8 text-center`}>
                        <div className="text-5xl md:text-6xl mb-3">{g.emoji}</div>
                        <h3 className="text-2xl md:text-3xl font-display font-bold text-card mb-2">
                          {g.name}
                        </h3>
                        <p className="text-base text-card/90 font-semibold">{g.desc}</p>
                      </div>
                      <div className="p-6">
                        <Button className="w-full text-lg py-6 rounded-xl font-display font-bold btn-bounce">
                          Lesen!
                        </Button>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {gameState === 'playing' && currentStory && (
            <motion.div
              key="playing"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="space-y-6"
            >
              <div className="text-center">
                <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-2">
                  {currentStory.title}
                </h2>
                <Progress value={(questionNumber / currentStory.questions.length) * 100} className="h-2" />
              </div>

              <Card className="p-6 md:p-8 shadow-large">
                <div className="prose prose-lg max-w-none mb-6">
                  <p className="text-lg md:text-xl leading-relaxed text-foreground">
                    {currentStory.text}
                  </p>
                </div>

                <div className="border-t pt-6 space-y-6">
                  <h3 className="text-xl md:text-2xl font-display font-bold text-foreground">
                    Frage {questionNumber + 1}: {currentStory.questions[questionNumber].question}
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {currentStory.questions[questionNumber].answers.map((answer, index) => {
                      const isSelected = selectedAnswer === index;
                      const isCorrect = index === currentStory.questions[questionNumber].correct;
                      const shouldShowCorrect = showFeedback && isCorrect;
                      const shouldShowWrong = showFeedback && isSelected && !isCorrect;

                      return (
                        <motion.div key={index} whileHover={!showFeedback ? { scale: 1.02 } : {}} whileTap={!showFeedback ? { scale: 0.98 } : {}}>
                          <Button
                            size="lg"
                            variant={showFeedback ? 'outline' : 'default'}
                            onClick={() => handleAnswer(index)}
                            disabled={showFeedback}
                            className={`w-full h-auto py-6 text-lg rounded-xl font-display font-semibold ${
                              shouldShowCorrect ? 'bg-success text-success-foreground' : ''
                            } ${
                              shouldShowWrong ? 'bg-destructive text-destructive-foreground' : ''
                            }`}
                          >
                            {shouldShowCorrect && <CheckCircle className="w-5 h-5 mr-2" />}
                            {shouldShowWrong && <XCircle className="w-5 h-5 mr-2" />}
                            {answer}
                          </Button>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </Card>
            </motion.div>
          )}

          {gameState === 'finished' && (
            <motion.div
              key="finished"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="text-center space-y-8"
            >
              <Card className="p-8 md:p-12 shadow-large max-w-2xl mx-auto">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', delay: 0.2 }}
                  className="text-7xl md:text-8xl mb-6"
                >
                  {score === currentStory.questions.length ? '🏆' : score >= currentStory.questions.length * 0.7 ? '⭐' : '📚'}
                </motion.div>

                <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
                  Super gelesen{playerName !== 'Spieler' ? `, ${playerName}` : ''}!
                </h2>

                <div className="text-5xl md:text-6xl font-display font-bold text-primary mb-4">
                  {score} / {currentStory.questions.length}
                </div>

                <p className="text-xl md:text-2xl text-muted-foreground font-medium mb-8">
                  {score === currentStory.questions.length ? 'Perfekt! Du hast alles verstanden! 🌟' :
                   score >= currentStory.questions.length * 0.7 ? 'Sehr gut! Weiter so! 👏' :
                   'Übe weiter! Du schaffst das! 💪'}
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    size="lg"
                    onClick={() => startGame(grade)}
                    className="text-lg md:text-xl py-6 md:py-7 px-8 rounded-2xl font-display font-bold btn-bounce"
                  >
                    Nochmal!
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={() => setGameState('menu')}
                    className="text-lg md:text-xl py-6 md:py-7 px-8 rounded-2xl font-display font-bold btn-bounce border-2"
                  >
                    Neue Klasse
                  </Button>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default ReadingGamePage;