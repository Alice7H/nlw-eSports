import { UserAds } from '../pages/Ads';
import { GameController } from 'phosphor-react';

interface AdsCardProps {
  user: UserAds,
}

export default function AdsCard( { user } : AdsCardProps) {
  const {name, yearsPlaying, weekDays, hourStart, hourEnd, useVoiceChannel} = user;
  
  return (
    <div className="flex flex-col px-4 py-3 border border-zinc-900 rounded-lg bg-[#2A2634]">
      <p className="mt-4">Nome ou nickname:</p>
      <span>{name}</span>
      <br />
      <p>Tempo de Jogo:</p>
      <span>{yearsPlaying} anos </span>
      <br />
      <p>Disponibilidade:</p>
      <span>{weekDays.length} dias - {hourStart}h - {hourEnd}h </span>
      <br />
      <p>Chamada de áudio?</p>
      <span className={useVoiceChannel ? 'text-green-500' : 'text-red-500'}>{useVoiceChannel ? 'Sim' : 'Não'}</span>

      {/* clipboard copiar nome para disponibilizar no discord */}
      <button type="button" className="flex justify-center items-center gap-2 bg-violet-500 hover:bg-violet-600 font-semibold rounded-md my-4 px-8 h-9">
        <GameController size={20} />
        Conectar
      </button> 
    </div>
  )
}
