import styles from './Projeto.module.css';
import Container from '../layout/Container';
import LinkButton from '../layout/LinkButton';

function Projetos() {
    return (
        <div className={styles.container}>
            <div className={styles.titulo_container}>
                <h1>Meus projetos</h1>
                <LinkButton to={'/novoprojeto'} text="Criar projeto"/>
            </div>
            <Container customClass="start">
                <p>Projetos</p>
            </Container>
        </div>
    );
}

export default Projetos;