import * as ToggleGroup from '@radix-ui/react-toggle-group';
import { WEEKDAYS } from '../../utils/ptBR-weekdays';

interface SelectWeekDaysProps {
  value: string[];
  onSelect: ()=> void;
}

export default function SelectWeekDays({value, onSelect}: SelectWeekDaysProps) {
  return (
    <ToggleGroup.Root 
      type="multiple" 
      className="grid grid-cols-4 gap-2"
      value={value}
      onValueChange={onSelect}
      id="weekDays"
    >
      { WEEKDAYS.map((day) => (
        <ToggleGroup.Item
          key={day.value}
          value={day.value}
          title={day.title}
          className={`w-8 h-8 rounded ${ value?.includes(day.value) ? 'bg-violet-500' : 'bg-zinc-900' }`}
        >
          {day.initial}
        </ToggleGroup.Item>
      ))}
    </ToggleGroup.Root>
  )
}
