import styles from '../project/ProjetoCard.module.css';
import {BsTrashFill} from 'react-icons/bs';

export default function ServicoCard({id, nome, custo, descricao, handleRemove}) {

    const remove = (e) => {
        e.preventDefault();
        handleRemove(id, custo);
    };

    return (
        <div className={styles.projetoCard}>
            <h4>{nome}</h4>
            <p><span>Custo total:</span>{custo}</p>
            <p>{descricao}</p>
            <div className={styles.projetoCardAcoes}>
                <button onClick={remove}><BsTrashFill/> Excluir</button>
            </div>
        </div>
    );
}