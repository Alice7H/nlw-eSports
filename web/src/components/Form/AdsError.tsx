import {FieldErrors } from 'react-hook-form';
import { IFormValues } from '../CreateAdModal';

interface AdsErrorProps { 
 errors: FieldErrors<IFormValues>;
}

export default function AdsError({errors}:AdsErrorProps) {
  return (
    <>
      { errors.gameSelected?.type === "required" && <MessageError message="Selecione o jogo"/>}
      { errors.name?.type === "required" && <MessageError message="Informe o nome (ou apelido)" /> }
      { errors.hourStart?.type === "required" && <MessageError message="Informe qual horário inicial que você joga"/> }
      { errors.hourEnd?.type === "required" && <MessageError message="Informe qual horário final que você joga" /> }
      { errors.weekDays?.type === "required" && <MessageError message="Informe quais dias da semana você joga" /> }
      { errors.discord?.type === "required" && <MessageError message="Informe código do discord" /> }
      { errors.yearsPlaying?.type === "required" && <MessageError message="Informe há quantos anos joga" /> }

      { errors.yearsPlaying?.type === "min" && <MessageError message="A idade de jogo deve ser no mínimo 0" /> }
      { errors.name?.type === "minLength" && <MessageError message="O nome (ou apelido) possui no mínimo 3 caracteres" /> }
      { errors.name?.type === "maxLength" && <MessageError message="O nome (ou apelido) possui no máximo 50 caracteres" /> }
    </>
  )
}

export function MessageError({ message }: { message: string }) { 
  return <p className="text-red-500">{message}</p>;
}