import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';

import AdsCard from '../components/AdsCard';
import Header from '../components/Header';
import Button from '../components/Form/Button';

export interface UserAds {
  id: string,
  name: string,
  yearsPlaying: number,
  discord: string,
  weekDays: string[],
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

  return (
    <div className="text-white text-small mt-8">
       <Header 
        title={location.state.game} 
        description={'Conecte-se e comece a jogar!'}
       />

       <div className={ads.length > 0 ? "grid grid-cols-1 md:grid-cols-4 xl:grid-cols-6 gap-4 mt-4 px-4 py-3" : "flex justify-center mt-8 px-8"}>
        { ads.length > 0 
          ? ads.map(ad => <AdsCard key={ad.id} user={ad} /> )
          : <h3 className="mt-4">Você ainda não possui anúncio para este jogo</h3>
        }
       </div>

       <div className={`flex justify-end py-3 px-4 ${ads.length == 0 ? 'mt-40' : 'mt-4'}`}>
        <Button type="button" onClick={()=>navigate(-1)} >
          Voltar
        </Button>
       </div>
    </div>
  )
}
