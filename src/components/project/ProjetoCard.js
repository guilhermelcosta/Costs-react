import styles from './ProjetoCard.module.css';
import {BsPencil, BsFillTrashFill} from 'react-icons/bs';
import {Link} from 'react-router-dom';

export default function ProjetoCard({id, nome, orcamento, categoria, handleRemove}) {

    const remover = (e) => {
        e.preventDefault();
        handleRemove(id);
    };

    return (
        <div className={styles.projetoCard}>
            <h4>{nome}</h4>
            <p><span>Orçamento:</span> R$ {orcamento}</p>
            <p className={styles.textoCategoria}><span
                className={`${styles[categoria.toLowerCase()]}`}></span>{categoria}</p>
            <div className={styles.projetoCardAcoes}>
                <Link to={`/projeto/${id}`}><BsPencil/>Editar</Link>
                <button onClick={remover}><BsFillTrashFill/>Excluir</button>
            </div>
        </div>
    );
}