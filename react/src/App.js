import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/home/Home';
import { Survival } from './pages/quizzes/survival/Survival';
import { Minute } from './pages/quizzes/minute/Minute';
import { Result } from './pages/quizzes/result/Result';
import { Leaderboard } from './pages/leaderboard/Leaderboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/survival" element={<Survival />} />
        <Route path="/minute" element={<Minute />} />
        <Route path="/result" element={<Result />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
