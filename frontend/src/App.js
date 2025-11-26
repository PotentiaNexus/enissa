import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from '@/pages/HomePage';
import MathGamePage from '@/pages/MathGamePage';
import DrawingPage from '@/pages/DrawingPage';
import MemoryGamePage from '@/pages/MemoryGamePage';
import SequenceGamePage from '@/pages/SequenceGamePage';
import FocusGamePage from '@/pages/FocusGamePage';
import AboutPage from '@/pages/AboutPage';
import { Toaster } from '@/components/ui/sonner';
import '@/App.css';

function App() {
  return (
    <div className="App min-h-screen">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/math" element={<MathGamePage />} />
          <Route path="/draw" element={<DrawingPage />} />
          <Route path="/memory" element={<MemoryGamePage />} />
          <Route path="/sequence" element={<SequenceGamePage />} />
          <Route path="/focus" element={<FocusGamePage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </BrowserRouter>
      <Toaster position="top-center" richColors />
    </div>
  );
}

export default App;
