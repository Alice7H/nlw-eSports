import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Ads from './pages/Ads';
import Home from './pages/Home';
import './styles/main.css';

export default function App() {
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="games/:id/ads" element={<Ads />} />
      </Routes>
    </BrowserRouter>
  );
}
