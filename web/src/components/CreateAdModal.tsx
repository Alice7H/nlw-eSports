import { useState, useEffect, FormEvent } from 'react';
import { CaretDown, Check, GameController } from 'phosphor-react';
import Input from './Form/Input';
import * as Dialog from '@radix-ui/react-dialog';
import * as Checkbox from '@radix-ui/react-checkbox';
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import * as Select from '@radix-ui/react-select';
import axios from 'axios';

interface Games {
  id: string;
  title: string;
}

export default function CreateAdModal() {
  const [games, setGames] = useState<Games[]>([]);
  const [weekDays, setWeekDays] = useState<string[]>([]);
  const [useVoiceChannel, setUseVoiceChannel] = useState(false);
  const [gameSelected,setGameSelected] = useState<string>('');

  useEffect(() => {
    axios(`http://localhost:3333/games`)
      .then(response => setGames(response.data));
  }, []);

  async function handleCreateAd(event: FormEvent) {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const data = Object.fromEntries(formData);
    // validação
    if(!data.name){
      return;
    }
    try {
      await axios.post(`http://localhost:3333/games/${gameSelected}/ads`, {
        name: data.name,
        yearsPlaying: Number(data.yearsPlaying),
        discord: data.discord,
        weekDays: weekDays.map(Number),
        hourStart: data.hourStart,
        hourEnd: data.hourEnd,
        useVoiceChannel: useVoiceChannel, 
      })
      alert('Anúncio adicionado com sucesso!');   
      handleReset(event);    
    } catch(error){
      console.log(error);
      alert('Erro ao adicionar anúncio');
    }
  }

  function handleReset(event : FormEvent) {
    const form = event.target as HTMLFormElement;
    form.reset();
    setGameSelected('');
    setWeekDays([]);
    setUseVoiceChannel(false);
  }

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="bg-black/60 inset-0 fixed" />
      <Dialog.Content className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25">
        <Dialog.Title className="text-3xl font-black">
          Publique um anúncio
        </Dialog.Title>

        <form id="gameForm" onSubmit={handleCreateAd} className="mt-8 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="game" className="font-semibold">
              Qual o game?
            </label> 
            
            <Select.Root value={gameSelected} onValueChange={setGameSelected}>
              <Select.Trigger 
                name="game"
                id="game"
                className="flex justify-between bg-zinc-900 py-3 px-4 rounded text-small text-white"
              >
                <Select.Value>
                  { gameSelected ? games.find(game => game.id === gameSelected)?.title : 'Selecione o game que deseja jogar' }
                </Select.Value>
                <Select.Icon><CaretDown size={24} /></Select.Icon>
              </Select.Trigger>

              <Select.Portal>
                <Select.Content className="py-3 px-4 rounded text-small text-white">
                <Select.ScrollUpButton />
                <Select.Viewport>
                {games && games.map(game => (
                  <Select.Item 
                    value={game.id} 
                    key={game.id} 
                    className="bg-zinc-900 py-3 px-4 rounded text-small focus:bg-violet-500"
                  >
                    <Select.ItemText>{game.title}</Select.ItemText>
                  </Select.Item>
                ))} 
                </Select.Viewport>
                </Select.Content>
              </Select.Portal>
            </Select.Root>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="name">Seu nome (ou nickname)</label>
            <Input
              type="text"
              name="name"
              id="name"
              placeholder="Como te chamam dentro do game?"
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="yearsPlaying">Joga há quantos anos</label>
              <Input
                type="text"
                name="yearsPlaying"
                id="yearsPlaying"
                placeholder="Tudo bem ser ZERO"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="discord">Qual o seu Discord?</label>
              <Input
                type="text"
                name="discord"
                id="discord"
                placeholder="Usuario#0000"
              />
            </div>
          </div>

          <div className="flex gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="weekDays">Quando costuma jogar?</label>
              <ToggleGroup.Root 
                type="multiple" 
                className="grid grid-cols-4 gap-2"
                defaultValue={weekDays}
                onValueChange={setWeekDays}
              >
                <ToggleGroup.Item
                  className={`w-8 h-8 rounded ${ weekDays.includes('0') ? 'bg-violet-500' : 'bg-zinc-900' }`}
                  title="Domingo"
                  value="0"
                >
                  D
                </ToggleGroup.Item>

                <ToggleGroup.Item
                  className={`w-8 h-8 rounded ${ weekDays.includes('1') ? 'bg-violet-500' : 'bg-zinc-900' }`}
                  title="Segunda-feira"
                  value="1"
                >
                  S
                </ToggleGroup.Item>
                
                <ToggleGroup.Item
                  className={`w-8 h-8 rounded ${ weekDays.includes('2') ? 'bg-violet-500' : 'bg-zinc-900' }`}
                  title="Terça-feira"
                  value="2"
                >
                  T
                </ToggleGroup.Item>
                
                <ToggleGroup.Item
                  className={`w-8 h-8 rounded ${ weekDays.includes('3') ? 'bg-violet-500' : 'bg-zinc-900' }`}
                  title="Quarta-feira"
                  value="3"
                >
                  Q
                </ToggleGroup.Item>
                
                <ToggleGroup.Item
                  className={`w-8 h-8 rounded ${ weekDays.includes('4') ? 'bg-violet-500' : 'bg-zinc-900' }`}
                  title="Quinta-feira"
                  value="4"
                >
                  Q
                </ToggleGroup.Item>
                
                <ToggleGroup.Item
                  className={`w-8 h-8 rounded ${ weekDays.includes('5') ? 'bg-violet-500' : 'bg-zinc-900' }`}
                  title="Sexta-feira"
                  value="5"
                >
                  S
                </ToggleGroup.Item>
                
                <ToggleGroup.Item
                  className={`w-8 h-8 rounded ${ weekDays.includes('6') ? 'bg-violet-500' : 'bg-zinc-900' }`}
                  title="Sábado"
                  value="6"
                >
                  S
                </ToggleGroup.Item>
              </ToggleGroup.Root>
            </div>
            <div className="flex flex-col gap-2 flex-1">
              <label htmlFor="hourStart">Qual horário do dia?</label>
              <div className="grid grid-cols-2 gap-2">
                <Input
                  type="time"
                  id="hourStart"
                  name="hourStart"
                  aria-placeholder="De"
                />
                <Input
                  type="time"
                  id="hourEnd"
                  name="hourEnd"
                  aria-placeholder="Até"
                />
              </div>
            </div>
          </div>

          <label className="mt-2 flex items-center gap-2 text-sm">
            <Checkbox.Root
              className="w-6 h-6 p-1 rounded bg-zinc-900"
              checked={useVoiceChannel}
              onCheckedChange={(checked)=> checked ? setUseVoiceChannel(true) : setUseVoiceChannel(false)}
            >
              <Checkbox.Indicator>
                <Check className="w-4 h-4 text-emerald-400" />
              </Checkbox.Indicator>
            </Checkbox.Root>
            Costumo me conectar ao chat de voz
          </label>         
          <footer className="mt-4 flex justify-end gap-4">
            <Dialog.Close
              className="bg-zinc-500 hover:bg-zinc-600 rounded-md px-5 h-12 font-semibold"
              type="button"
              onClick={()=> setGameSelected('')}
            >
              Cancelar
            </Dialog.Close>

            <button
              className="flex items-center gap-3 bg-violet-500 hover:bg-violet-600 rounded-md px-5 h-12 font-semibold"
              type="submit"
            >
              <GameController size={24} />
              Encontrar duo
            </button>
          </footer>
        </form>
      </Dialog.Content>
    </Dialog.Portal>
  );
}
