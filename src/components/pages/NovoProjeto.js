import styles from './NovoProjeto.module.css';
import ProjetoFormulario from '../project/ProjetoFormulario';
import {useNavigate} from 'react-router-dom';

function NovoProjeto() {

    const navigate = useNavigate();

    function criarPost(projeto) {

        /*inicializa custos e servicos*/
        projeto.custo = 0;
        projeto.servicos = [];

        fetch('http://localhost:5000/projetos', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(projeto)
        }).then((resposta) => resposta.json).then((data) => {
            navigate('/projetos', {message: 'Projeto criado com sucesso!'});
        }).catch((e) => console.log(e));
    }

    return (
        <div className={styles.container}>
            <h1>Criar projeto</h1>
            <p>Crie seu projeto para depois adicionar os serviços</p>
            <ProjetoFormulario handleSubmit={criarPost} TextoBtn="Cadastrar novo projeto"/>
        </div>
    );
}

export default NovoProjeto;