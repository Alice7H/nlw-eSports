import { Link } from 'react-router-dom';

interface GameBannerProps {
  bannerUrl: string;
  title: string;
  adsCount: number;
  gameId: string;
  slideCounter: ()=> number;
}

function GameBanner(props: GameBannerProps) {
  const { bannerUrl, title, adsCount, gameId, slideCounter} = props;
 
  if(!bannerUrl) {
    return <></>
  }

  return (
    <Link to={`games/${gameId}/ads`} state={{game: title}} className={`relative rounded-lg overflow-hidden keen-slider__slide number-slide${slideCounter}`}>
      <img src={bannerUrl} alt={title} />
      <div className="w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0 ">
        <strong className="font-bold text-white block">{title}</strong>
        <span className="text-zinc-300 text-sm block">{adsCount} anúncio(s)</span>
      </div>
    </Link>
  )
}

export default GameBanner;