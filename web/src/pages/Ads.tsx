import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';

import logoImg from '../assets/logo-nlw-esports.svg';
import AdsCard from '../components/AdsCard';

export interface UserAds {
  id: string,
  name: string,
  yearsPlaying: number,
  discord: string,
  weekDays: string,
  hourStart: string,
  hourEnd: string,
  useVoiceChannel: boolean, 
}

export default function Ads() {
  const gameId  = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  
  const [ads, setAds] = useState<UserAds[]>([]);

  useEffect(() => {
    axios(`http://localhost:3333/games/${gameId.id}/ads`)
    .then(response => setAds(response.data));
  },[gameId])

  function handleGoBack() {
    navigate(-1);
  }

  return (
    <div className="text-white text-small mt-8">
       <div className="flex flex-col items-center justify-center">
        <img src={logoImg} alt="logo" />
        <h2 className="text-2xl my-4">{location.state.game}</h2>
        <p>Conecte-se e comece a jogar!</p>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-4 xl:grid-cols-6 gap-4 mt-4 px-4 py-3">
        { ads.length > 0 
          ? ads.map(ad => <AdsCard key={ad.id} user={ad} /> )
          : <h3 className="mt-4">Você ainda não possui anúncio para este jogo</h3>
        }
       </div>

       <div className={`flex justify-end py-3 px-4 ${ads.length == 0 ? 'mt-40' : 'mt-4'}`}>
        <button 
          className="flex items-center gap-3 bg-violet-500 hover:bg-violet-600 rounded-md px-5 h-12 font-semibold"
          type="button"
          onClick={handleGoBack}
        >
          Voltar
        </button>
       </div>
    </div>
  )
}
