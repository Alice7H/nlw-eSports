import { useState, useEffect } from 'react';
import GameBanner from './components/GameBanner';
import CreateAdBanner from './components/CreateAdBanner';
import CreateAdModal from './components/CreateAdModal';
import * as Dialog from '@radix-ui/react-dialog';
import axios from 'axios';

import logoImg from './assets/logo-nlw-esports.svg';
import './styles/main.css';


interface Games {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number;
  }
}

function App() {
  const [games, setGames]= useState<Games[]>([]);

  useEffect(()=> {
    axios(`http://localhost:3333/games`)
    .then(response => setGames(response.data));
  },[]);

  function openAdListFromGame(){
    console.log('redirect to ad page');
  }

  return (
    <div className="max-w-[1344px] mx-auto flex flex-col items-center my-20">
      <img src={logoImg} alt="" />
      
      <h1 className="text-6xl text-white font-black mt-20">
        Seu <span className="text-transparent bg-nlw-gradient bg-clip-text">duo</span> está aqui.
      </h1>

      <div className="grid grid-cols-6 gap-6 mt-16"> 
        {
          games 
          ? games.slice(0,6).map((game) => 
          <GameBanner 
            bannerUrl={game.bannerUrl} 
            title={game.title} 
            adsCount={game._count.ads}
            key={game.id}
          />)
          : <p>Carregando...</p>
        }
      </div>

      <Dialog.Root>
        <CreateAdBanner/>
        <CreateAdModal/>
      </Dialog.Root>
    </div>
  )
}

export default App
