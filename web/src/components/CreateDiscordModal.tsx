import { useState } from 'react';
import axios from 'axios';

import { GameController } from 'phosphor-react';
import * as Dialog from '@radix-ui/react-dialog';

interface CreateDiscordModalProp {
  adId: string;
  username: string;
}

export default function CreateDiscordModal({ adId, username }: CreateDiscordModalProp) {
  const [discord, setDiscord] = useState('');
  const [showCode, setShowCode] = useState(false);

  function handleShowDiscordCode() {
    setShowCode(!showCode);
    discord.length === 0 && handleGetDiscord();
  }

  function handleGetDiscord(){
    axios.get(`http://localhost:3333/ads/${adId}/discord`)
    .then(response => setDiscord(response.data.discord))
    .catch(error => console.log(error.message));
  }

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="bg-black/60 inset-0 fixed" />
      <Dialog.Content className="bg-[#2A2634] py-4 px-5 md:py-8 md:px-10 text-white w-[480px] overflow-y-auto fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg shadow-lg shadow-black/25">
        <Dialog.Title className="text-2xl font-black truncate hover:text-clip"> 
          Conectar-se com { username }
        </Dialog.Title>
        <Dialog.Description>
          <button 
            onClick={handleShowDiscordCode} 
            className="flex items-center justify-center gap-2 truncate hover:text-clip w-[100%] px-3 py-4 mt-2 bg-zinc-900 text-white rounded-md"
          >
            { !showCode 
              ? (
                <>
                  <GameController size={32}/>
                  Ver o código
                </>
              ): `O código é ${discord}` 
            }   
          </button>
        </Dialog.Description>
        <div className="flex flex-col md:flex-row items-center gap-4 justify-center mt-4 mx-2">
          <Dialog.Close 
            className="bg-violet-500 hover:bg-violet-600 rounded-md px-5 h-12 font-semibold"
            type="button"
            onClick={()=> setShowCode(false)}
          >
            Cancelar
          </Dialog.Close>
          {/* login button */}
        </div>
      </Dialog.Content>
    </Dialog.Portal>
  )
}
