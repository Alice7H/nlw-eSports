import { CaretLeft, CaretRight, IconProps } from 'phosphor-react';
import './slides.css';

interface ArrowProps {
  disabled: boolean;
  left?: boolean;
  onClick: (e:any) => void;
}

export default function Arrow(props: ArrowProps) {
 const data: IconProps = {
  weight: "bold",
  size: 24,
  color: props.disabled ? '#5a516d' : 'white',
 }

  return (
    <svg
      onClick={props.onClick}
      className={`arrow w-8 h-8 md:w-16 md:h-16 top-1/2 md:top-[60%] lg:top-2/3 ${props.left ? "arrow--left" : "arrow--right"}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      {props.left && ( <CaretLeft weight={data.weight} size={data.size} color={data.color}/> )}
      {!props.left && ( <CaretRight weight={data.weight} size={data.size} color={data.color}/> )}
    </svg>
  )
}