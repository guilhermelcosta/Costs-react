import styles from './NovoProjeto.module.css';
import ProjetoFormulario from '../project/ProjetoFormulario';

function NovoProjeto() {
    return (
        <div className={styles.container}>
            <h1>Criar projeto</h1>
            <p>Crie seu projeto para depois adicionar os serviços</p>
            <ProjetoFormulario TextoBtn="Cadastrar novo projeto"/>
        </div>
    );
}

export default NovoProjeto;