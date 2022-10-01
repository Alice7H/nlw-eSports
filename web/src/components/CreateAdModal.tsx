import { useState, useEffect } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { convertDateTimeToString } from '../utils/convertDateTimeToString';
import Input from './Form/Input';
import Button from './Form/Button';
import TimePicker from './Form/TimePicker';
import Checkbox from './Form/CheckBox';
import SelectWeekDays from './Form/SelectWeekDays';
import SelectGame from './Form/SelectGame';
import AdsError from './Form/AdsError';

import * as Dialog from '@radix-ui/react-dialog';
import { Label } from '@radix-ui/react-label';
import RadixModal from './RadixModal';

import axios from 'axios';
import { GameController } from 'phosphor-react';
import toast, { Toaster } from 'react-hot-toast';

export interface Games {
  id: string;
  title: string;
}

export interface IFormValues{
  gameSelected: string;
  name: string;
  discord: string;
  hourStart: Date;
  hourEnd: Date;
  useVoiceChannel: boolean;
  weekDays: string[];
  yearsPlaying: number;
}
 
interface Props {
  loadGames: () => void;
}

export default function CreateAdModal({loadGames} : Props) {
  const { register, control, handleSubmit, reset, formState: { errors } } = useForm<IFormValues>();
  const [games, setGames] = useState<Games[]>([]);
 
  useEffect(() => {
    axios(`http://localhost:3333/games`)
      .then(response => setGames(response.data));
  }, []);

  const onReset = () => reset()

  const onSubmitAd: SubmitHandler<IFormValues> = async(data) => {
    try {
      await axios.post(`http://localhost:3333/games/${data.gameSelected}/ads`, {
        name: data.name,
        yearsPlaying: Number(data.yearsPlaying),
        discord: data.discord,
        weekDays: data.weekDays.map(Number),
        hourStart: convertDateTimeToString(data.hourStart),
        hourEnd: convertDateTimeToString(data.hourEnd),
        useVoiceChannel: data.useVoiceChannel, 
      }) 
      toast.success('Anúncio adicionado com sucesso!');   
      onReset(); 
      loadGames();
    } catch(error){
      console.log(error);
      toast.error('Erro ao adicionar anúncio');
    }
  };

  return (
    <RadixModal title="Publique um anúncio">
      <form id="gameForm" onSubmit={handleSubmit(onSubmitAd)} className="mt-8 flex flex-col md:gap-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="game">Qual o game?</Label> 
          <Controller
            name="gameSelected"
            control={control}
            rules={{ required: true }}
            render={({field}) => 
              <SelectGame 
                value={field.value} 
                onChange={field.onChange} 
                games={games}
              />
            } 
          />         
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="name">Seu nome (ou apelido)</label>
          <Input
            type="text"
            id="name"
            label="name"
            placeholder="Como te chamam dentro do game?"
            register={register}           
            required
            minLength={3}
            maxLength={50}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="yearsPlaying">Joga há quantos anos</label>
            <Input
              type="number"
              id="yearsPlaying"
              label="yearsPlaying"
              placeholder="Tudo bem ser ZERO"
              register={register}
              required
              min={0}
              pattern={/^\d+$/}
            />
          </div>
         
          <div className="flex flex-col gap-2">
            <label htmlFor="discord">Qual o seu Discord?</label>
            <Input
              type="text"
              id="discord"
              label="discord"
              placeholder="Usuario#0000"
              register={register}
              required
              pattern={/^(?!(here|everyone))^(?!.*(discord|`{3})).[^\@\#\:\s]{2,32}#\d{4}$/}
            />
          </div>
        </div>
 
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex flex-col gap-2">
            <Label htmlFor="weekDays">Quando costuma jogar?</Label>
            <Controller 
              name="weekDays"
              control={control}
              rules={{ required: true }}
              render={({field})=> 
                <SelectWeekDays 
                  value={field.value} 
                  onSelect={field.onChange}
                />
              }
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="hourStart">Qual horário do dia?</label>
            <div className="flex flex-auto justify-between gap-4">
              <Controller 
                name="hourStart"
                control={control}
                rules={{ required: true }}
                render={({field}) => 
                  <TimePicker
                    selected={field.value}
                    onChange={field.onChange}           
                    id="hourStart"
                    placeholderText="De"
                    aria-placeholder="De"
                  />
                }
              />     

              <Controller 
                name="hourEnd"
                control={control}
                rules={{ required: true }}
                render={({field}) => 
                  <TimePicker
                    selected={field.value}
                    onChange={field.onChange}
                    id="hourEnd"
                    placeholderText="Até"
                    aria-placeholder="Até"
                  />
                }
              />
            </div>
          </div>
        </div>
   
        <Controller
          name="useVoiceChannel"
          control={control}
          defaultValue={false}
          render={({ field }) => 
            <Checkbox
              label="Costumo me conectar ao chat de voz"
              onCheck={field.onChange}
            />
          }

        />
        <div>

        <AdsError errors={errors} />
        <Toaster position="bottom-center"/>

        </div>         
        <footer className="mt-4 flex justify-end gap-4">
          <Dialog.Close
            className="bg-zinc-500 hover:bg-zinc-600 rounded-md px-5 h-12 font-semibold"
            onClick={onReset}
          >
            Cancelar
          </Dialog.Close>

          <Button type="submit">
            <GameController size={24} />
            Encontrar duo
          </Button>
        </footer>
      </form>
    </RadixModal>
  );
}
