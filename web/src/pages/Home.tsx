import { useState, useEffect } from 'react';
import { useKeenSlider, KeenSliderPlugin } from 'keen-slider/react';
import axios from 'axios';

import GameBanner from '../components/GameBanner';
import CreateAdBanner from '../components/CreateAdBanner';
import CreateAdModal from '../components/CreateAdModal';
import Arrow from '../components/Slider/Arrow';

import * as Dialog from '@radix-ui/react-dialog';
import logoImg from '../assets/logo-nlw-esports.svg';

interface Games {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number;
  }
}

const ResizePlugin: KeenSliderPlugin = (slider) => {
  const observer = new ResizeObserver(() => slider.update())
  slider.on("created", () => {
    observer.observe(slider.container)
  })  
  slider.on("destroyed", () => {
    observer.unobserve(slider.container)
  })
}

export default function Home() {
  const [games, setGames]= useState<Games[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [counter, setCounter] = useState(1);

  useEffect(()=> {
    axios(`http://localhost:3333/games`)
    .then(response => setGames(response.data))
    .catch(error => alert(error.message));
  },[]);

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
      breakpoints: {
        "(min-width: 425px)": {
          slides: { origin: "center", perView: 2, spacing: 5 },
        },
        "(min-width: 768px)": {
          slides: { perView: 3, spacing: 25 },
        },
        "(min-width: 1024px)": {
          slides: { perView: 4, spacing: 25 },
        },
        "(min-width: 1280px)": {
          slides: { perView: 6, spacing: 25 },
        },
      },
      slides: { origin: "center", perView: 1.5},
      slideChanged(slider) {
        setCurrentSlide(slider.track.details.rel)
      },
      created() { setLoaded(true)},
    },
    [ResizePlugin],
  )

  function handleCounterSlide() {
    setCounter(prev => prev + 1);
    return counter;
  }

  return (
    <div className="relative max-w-[1344px] mx-auto flex flex-col items-center my-20">
      <img src={logoImg} alt="Logo" />
      
      <h1 className="text-3xl md:text-4xl lg:text-6xl text-white font-black mt-20">
        Seu <span className="text-transparent bg-nlw-gradient bg-clip-text">duo</span> está aqui.
      </h1>
    
      <div ref={sliderRef} className="keen-slider mt-16 px-4 py-3"> 
        { games.map(game => 
          <GameBanner 
            bannerUrl={game.bannerUrl} 
            title={game.title} 
            adsCount={game._count.ads}
            key={game.id}
            gameId={game.id}
            slideCounter={handleCounterSlide}
          />)
        }
      </div>
      
      { games.length > 0 && loaded && instanceRef.current &&(
        <>
          <Arrow
            left
            onClick={(e: any) => e.stopPropagation() || instanceRef.current?.prev()}
            disabled={currentSlide === 0}
          />
          <Arrow
            onClick={(e: any) => e.stopPropagation() || instanceRef.current?.next()}
            disabled={currentSlide === instanceRef.current.track.details?.maxIdx } 
          />
        </>
      )}

      <Dialog.Root>
        <CreateAdBanner/>
        <CreateAdModal/>
      </Dialog.Root>
    </div>
  )
}