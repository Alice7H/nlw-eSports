import { useState, useEffect } from 'react';
import { GameController } from 'phosphor-react';
import GameBanner from './components/GameBanner';
import CreateAdBanner from './components/CreateAdBanner';
import * as Dialog from '@radix-ui/react-dialog';

import logoImg from './assets/logo-nlw-esports.svg';
import './styles/main.css';
import Input from './components/Form/Input';

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
    async function getGames(){
      const res = await fetch(`http://localhost:3333/games`);
      const data = await res.json();
      setGames(data);
    }
    getGames();
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
        
        <Dialog.Portal>
          <Dialog.Overlay className="bg-black/60 inset-0 fixed"/>          
          <Dialog.Content className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25">
            <Dialog.Title className="text-3xl font-black">Publique um anúncio</Dialog.Title>
            <form className="mt-8 flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="game" className="font-semibold">Qual o game</label>
                <Input type="text" name="game" id="game" placeholder="selecione o game que deseja jogar" />           
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="name">Seu nome (ou nickname)</label>
                <Input type="text" name="name" id="name" placeholder="Como te chamam dentro do game?" />         
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="yearsPlaying">Joga há quantos anos</label>
                  <Input type="text" name="yearsPlaying" id="yearsPlaying" placeholder="Tudo bem ser ZERO"/>
                </div>              
                <div className="flex flex-col gap-2">
                  <label htmlFor="discord">Qual o seu Discord?</label>
                  <Input type="text" name="discord" id="discord" placeholder="Usuario#0000" />
                </div>
              </div>
              
              <div className="flex gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="weekDays">Quando costuma jogar?</label>
                  <div className="grid grid-cols-4 gap-2">
                    <button className="w-8 h-8 rounded bg-zinc-900" title="Domingo">D</button>    
                    <button className="w-8 h-8 rounded bg-zinc-900" title="Segunda-feira">S</button>
                    <button className="w-8 h-8 rounded bg-zinc-900" title="Terça-feira">T</button>
                    <button className="w-8 h-8 rounded bg-zinc-900" title="Quarta-feira">Q</button>
                    <button className="w-8 h-8 rounded bg-zinc-900" title="Quinta-feira">Q</button>
                    <button className="w-8 h-8 rounded bg-zinc-900" title="Sexta-feira">S</button>
                    <button className="w-8 h-8 rounded bg-zinc-900" title="Sábado">S</button>
                  </div>         
                </div>
                <div className="flex flex-col gap-2 flex-1">
                  <label htmlFor="hourStart">Qual horário do dia?</label>
                  <div className="grid grid-cols-2 gap-2">
                    <Input type="time" id="hourStart" name="hourStart" placeholder="De" />
                    <Input type="time" id="hourEnd" name="hourEnd" placeholder="Até" />
                  </div>
                </div>
              </div>

              <div className="mt-2 flex gap-2 text-sm">
                <Input type="checkbox" name="useVoiceChannel" id="useVoiceChannel"/>
                <label htmlFor="useVoiceChannel">Costumo me conectar ao chat de voz</label>
              </div>

              <footer className="mt-4 flex justify-end gap-4">
                <Dialog.Close 
                  className="bg-zinc-500 hover:bg-zinc-600 rounded-md px-5 h-12 font-semibold" 
                  type="button" 
                >
                  Cancelar
                </Dialog.Close>  

                <button 
                  className="flex items-center gap-3 bg-violet-500 hover:bg-violet-600 rounded-md px-5 h-12 font-semibold" 
                  type="submit"
                >
                  <GameController size={24}/>
                  Encontrar duo
                </button>  
              </footer>
            </form>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  )
}

export default App
