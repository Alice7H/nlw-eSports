import { UserAds } from "../pages/Ads";
import { GameController } from "phosphor-react";
import * as Dialog from '@radix-ui/react-dialog';
import Button from "./Form/Button";
import CreateDiscordModal from "./CreateDiscordModal";

interface AdsCardProps {
  user: UserAds;
}

export default function AdsCard({ user }: AdsCardProps) {
  const { name, yearsPlaying, weekDays, hourStart, hourEnd, useVoiceChannel } = user;
  const objectWeek = [ "Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
  const stringWeekNumber = weekDays.map(Number);
  const res = objectWeek.filter((el,idx) => stringWeekNumber.includes(idx) && el).join(", ");

  return (
    <div className="flex flex-col px-4 py-3 border border-zinc-900 rounded-lg bg-[#2A2634]">
      <p className="mt-4">Nome ou nickname:</p>
      <span>{name}</span>
      <br />
      <p>Tempo de Jogo:</p>
      <span>{yearsPlaying} ano(s) </span>
      <br />
      <p>Disponibilidade:</p>
      <span className="truncate hover:text-clip">{ res}</span> 
      <span>{hourStart}h - {hourEnd}h </span>
      <br />
      <p>Chamada de áudio?</p>
      <span className={useVoiceChannel ? "text-green-500" : "text-red-500"}>
        {useVoiceChannel ? "Sim" : "Não"}
      </span>
 
      <Dialog.Root>
        <Dialog.Trigger className="mt-4">
          <Button type="button">
            <GameController size={20} /> 
            Conectar
          </Button>
        </Dialog.Trigger>
        <CreateDiscordModal adId={user.id} username={user.name}/>
      </Dialog.Root>
    </div>
  );
}
