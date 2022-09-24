import logoImg from '../assets/logo-nlw-esports.svg';

interface HeaderProps {
  title: string;
  description?: string;
}

export default function Header({title, description} : HeaderProps) {
  return (
    <div className="flex flex-col items-center justify-center">
      <img src={logoImg} alt="logo" />
      <h2 className="text-transparent bg-nlw-gradient bg-clip-text text-4xl my-4 font-semibold">{title}</h2>
      <p>{description}</p>
    </div>
  )
}
