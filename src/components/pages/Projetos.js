import styles from './Projetos.module.css';
import Container from '../layout/Container';
import LinkButton from '../layout/LinkButton';
import ProjetoCard from '../project/ProjetoCard';
import {useState, useEffect} from 'react';
import Loading from '../layout/Loading';

function Projetos() {

    const [projetos, setProjetos] = useState([]);
    const [removerLoading, setRemoverLoading] = useState(false);

    useEffect(() => {
        // Adicionei esse setTimeout apenas para conseguir visualizar o icone de loading
        setTimeout(() => {
            fetch('http://localhost:5000/projetos', {
                method: 'GET', headers: {
                    'Content-type': 'application/json'
                }
            }).then(resp => resp.json()).then(data => {
                setProjetos(data);
                setRemoverLoading(true);
            }).catch(e => console.log(e));
        }, 1000);
    }, []);

    function removerProjeto(id) {
        fetch(`http://localhost:5000/projetos/${id}`, {
            method: 'DELETE', headers: {
                'Content-type': 'application/json'
            }
        }).then(resp => resp.json).then(() => {
            setProjetos(projetos.filter((projeto) => projeto.id !== id));
        }).catch(e => console.log(e));
    }


    return (<div className={styles.container}>
        <div className={styles.titulo_container}>
            <h1>Meus projetos</h1>
            <LinkButton to={'/novoprojeto'} text="Criar projeto"/>
        </div>
        <Container customClass="start">
            {projetos.length > 0 && projetos.map((projeto) => (
                <ProjetoCard id={projeto.id} nome={projeto.nome} orcamento={projeto.orcamento}
                             categoria={projeto.categoria.nome} key={projeto.id} handleRemove={removerProjeto}/>))}
            {!removerLoading && <Loading/>}
            {removerLoading && projetos.length === 0 && (<p>Não há projetos cadastrados!</p>)}
        </Container>
    </div>);
}

export default Projetos;