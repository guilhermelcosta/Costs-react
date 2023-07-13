import styles from './Projeto.module.css';
import {useParams} from 'react-router-dom';
import {useEffect, useState} from 'react';
import Loading from '../layout/Loading';
import Container from '../layout/Container';

export default function Projeto() {

    const {id} = useParams();
    const [projeto, setProjeto] = useState([]);
    const [showProjectForm, setshowProjectForm] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            fetch(`http://localhost:5000/projetos/${id}`, {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json'
                }
            }).then((resp) => resp.json()).then((data) => {
                setProjeto(data);
            }).catch(e => console.log(e));
        }, 1000);
    }, [id]);

    function toggleProjectForm() {
        setshowProjectForm(!showProjectForm);
    }

    return (
        <>
            {projeto.nome ? (
                <div className={styles.detalhes_projeto}>
                    <Container customClass="column">
                        <div className={styles.detalhes_container}>
                            <h1>Projeto: {projeto.nome}</h1>
                            <button className={styles.btn}
                                    onClick={toggleProjectForm}>{!showProjectForm ? 'Editar projeto' : 'Fechar'}</button>
                            {!showProjectForm ? (
                                <div className={styles.info_projeto}>
                                    <p><span>Categoria: </span>{projeto.categoria.nome}</p>
                                    <p><span>Total orçamento: </span>R$ {projeto.orcamento}</p>
                                    <p><span>Total utilizado: </span>R$ {projeto.custo}</p>
                                </div>
                            ) : (
                                <div className={styles.info_projeto}>
                                    <p>Detalhes do projeto</p>
                                </div>
                            )}
                        </div>
                    </Container>
                </div>
            ) : (
                <Loading/>
            )}
        </>
    );
}