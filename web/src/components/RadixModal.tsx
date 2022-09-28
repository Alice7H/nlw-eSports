import { ReactNode } from 'react';
import * as Dialog  from '@radix-ui/react-dialog'

interface RadixModalProps {
  title: string;
  children: ReactNode;
}

export default function RadixModal({title, children}: RadixModalProps) {
  return (
    <Dialog.Portal>
      <Dialog.Overlay className="bg-black/60 inset-0 fixed" />
      <Dialog.Content className="bg-[#2A2634] py-4 px-5 md:py-8 md:px-10 text-white w-full md:w-[480px] h-full overflow-y-auto fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg shadow-lg shadow-black/25">
        <Dialog.Title className="text-3xl font-black">
          {title}
        </Dialog.Title>
        {children}     
      </Dialog.Content>
    </Dialog.Portal>
  )
}
