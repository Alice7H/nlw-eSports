import Header from "../components/Header";
import Button from "../components/Form/Button";
import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center text-white text-small mt-8">
      <Header title="Opa!"/>
      <h3 className="font-semibold text-4xl mt-12">Erro 404</h3>
      <p className="font-semibold text-2xl my-6">Página não encontrada</p>
      <div className="mt-8">
          <Button type="button" onClick={()=>navigate('/')}>Voltar</Button>
      </div>
    </div>
  )
}
