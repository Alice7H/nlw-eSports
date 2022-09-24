import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Ads from './pages/Ads';
import Home from './pages/Home';
import NotFound from './pages/NotFound';

import './styles/main.css';
import 'keen-slider/keen-slider.min.css';
import 'react-datepicker/dist/react-datepicker.css';

export default function App() {
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="games/:id/ads" element={<Ads />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
