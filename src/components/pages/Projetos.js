import Mensagem from '../layout/Mensagem';
import {useSearchParams} from 'react-router-dom';

function Projetos() {

    const [searchParams] = useSearchParams();
    let mensagem = '';

    if (searchParams.get('mensagem')) mensagem = searchParams.get('mensagem');

    return (
        <div>
            <h1>Meus projetos</h1>
            <Mensagem tipo="sucesso" mensagem={mensagem}/>
        </div>
    );
}

export default Projetos;