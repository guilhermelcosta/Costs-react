import styles from './Projeto.module.css';
import Container from '../layout/Container';
import LinkButton from '../layout/LinkButton';
import ProjetoCard from '../project/ProjetoCard';
import {useState, useEffect} from 'react';

function Projetos() {

    const [projetos, setProjetos] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/projetos', {
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            }
        }).then(resp => resp.json()).then(data => {
            console.log(data);
            setProjetos(data);
        }).catch(e => console.log(e));
    }, []);


    return (
        <div className={styles.container}>
            <div className={styles.titulo_container}>
                <h1>Meus projetos</h1>
                <LinkButton to={'/novoprojeto'} text="Criar projeto"/>
            </div>
            <Container customClass="start">
                {projetos.length > 0 && projetos.map((projeto) => (
                    <ProjetoCard id={projeto.id} nome={projeto.nome} orcamento={projeto.orcamento}
                                 categoria={projeto.categoria.nome} key={projeto.id}/>
                ))}
            </Container>
        </div>
    );
}

export default Projetos;