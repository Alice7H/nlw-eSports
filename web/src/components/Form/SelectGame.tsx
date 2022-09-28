import * as Select from '@radix-ui/react-select';
import { CaretDown } from 'phosphor-react';
import { Games } from './CreateAdModal';

interface SelectGameProps {
  value: string;
  onChange: ()=> void;
  games: Games[];
}

export default function SelectGame({value, onChange, games}: SelectGameProps) {
  return (
    <Select.Root value={value} onValueChange={onChange}>
            <Select.Trigger 
              id="game"
              name="game"
              className="flex justify-between bg-zinc-900 py-3 px-4 rounded text-small text-white"
            >
              <Select.Value>
                { value 
                  ? games.find((game: Games) => game.id === value)?.title 
                  : 'Selecione o game que deseja jogar' 
                }
              </Select.Value>
              <Select.Icon><CaretDown size={24} /></Select.Icon>
            </Select.Trigger>

            <Select.Portal>
              <Select.Content className="py-3 px-4 rounded text-small text-white">
              <Select.ScrollUpButton />
              <Select.Viewport>             
                {games && games.map((game: Games) => (
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
  )
}
