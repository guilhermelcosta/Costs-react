import styles from './Projeto.module.css';
import {parse, v4 as uuidv4} from 'uuid';
import {useParams} from 'react-router-dom';
import {useEffect, useState} from 'react';
import Loading from '../layout/Loading';
import Container from '../layout/Container';
import ProjetoFormulario from '../project/ProjetoFormulario';
import FormularioServico from '../service/FormularioServico';
import ServicoCard from '../service/ServicoCard';

export default function Projeto() {

    const {id} = useParams();
    const [projeto, setProjeto] = useState([]);
    const [servicos, setServicos] = useState([]);
    const [showProjectForm, setshowProjectForm] = useState(false);
    const [showServiceForm, setshowServiceForm] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            fetch(`http://localhost:5000/projetos/${id}`, {
                method: 'GET', headers: {
                    'Content-type': 'application/json'
                }
            }).then((resp) => resp.json()).then((data) => {
                setProjeto(data);
                setServicos(data.servicos);
            }).catch(e => console.log(e));
        }, 1000);
    }, [id]);

    function editarPostagem(projeto) {
        if (projeto.orcamento < projeto.custo) {
            //     mensagem
        }
        fetch(`http://localhost:5000/projetos/${id}`, {
            method: 'PATCH', body: JSON.stringify(projeto), headers: {
                'Content-type': 'application/json'
            }
        }).then((resp) => resp.json()).then((data) => {
            setProjeto(data);
            setshowProjectForm(false);
        }).catch(e => console.log(e));
    }

    function criarServico(projeto) {
        const ultimoServico = projeto.servicos[projeto.servicos.length - 1];
        ultimoServico.id = uuidv4();

        const custoUltimoServico = ultimoServico.custo;
        const novoCusto = parseFloat(projeto.custo) + parseFloat(custoUltimoServico);

        if (novoCusto > parseFloat(projeto.orcamento)) {
            alert('Orçamento ultrapassado!');
            projeto.servicos.pop();
            return false;
        }

        projeto.custo = novoCusto;

        fetch(`http://localhost:5000/projetos/${projeto.id}`, {
            method: 'PATCH', body: JSON.stringify(projeto), headers: {
                'Content-type': 'application/json'
            }
        }).then((resp) => resp.json()).then((data) => {
            console.log(data);
            setshowServiceForm(false);
        }).catch(e => console.log(e));

    }

    function removerServico(id, custo) {
        const servicosAtualizado = projeto.servicos.filter((servico) => servico.id !== id);
        const projetoAtualizado = projeto;

        projetoAtualizado.servicos = servicosAtualizado;
        projetoAtualizado.custo = parseFloat(projetoAtualizado.custo) - parseFloat(custo);

        fetch(`http://localhost:5000/projetos/${projeto.id}`, {
            method: 'PATCH', body: JSON.stringify(projetoAtualizado), headers: {
                'Content-type': 'application/json'
            }
        }).then((resp) => resp.json()).then((data) => {
            setProjeto(projetoAtualizado);
            setServicos(servicosAtualizado);
        }).catch(e => console.log(e));
    }

    function toggleProjectForm() {
        setshowProjectForm(!showProjectForm);
    }

    function toggleServiceForm() {
        setshowServiceForm(!showServiceForm);
    }

    return (<>
        {projeto.nome ? (<div className={styles.detalhes_projeto}>
            <Container customClass="column">
                <div className={styles.detalhes_container}>
                    <h1>Projeto: {projeto.nome}</h1>
                    <button className={styles.btn}
                            onClick={toggleProjectForm}>{!showProjectForm ? 'Editar projeto' : 'Fechar'}</button>
                    {!showProjectForm ? (<div className={styles.info_projeto}>
                        <p><span>Categoria: </span>{projeto.categoria.nome}</p>
                        <p><span>Total orçamento: </span>R$ {projeto.orcamento}</p>
                        <p><span>Total utilizado: </span>R$ {projeto.custo}</p>
                    </div>) : (<div className={styles.info_projeto}>
                        <ProjetoFormulario handleSubmit={editarPostagem} TextoBtn="Concluir edição"
                                           dadosProjeto={projeto}/>
                    </div>)}
                </div>

                <div className={styles.formulario_container}>
                    <h2>Adicione um serviço:</h2>
                    <button className={styles.btn}
                            onClick={toggleServiceForm}>{!showServiceForm ? 'Adicionar serviço' : 'Fechar'}</button>
                    <div className={styles.info_projeto}>
                        {showServiceForm && (<FormularioServico handleSubmit={criarServico} btnText="Adicionar serviço"
                                                                projectData={projeto}/>)}
                    </div>
                </div>

                <h2>Servicos</h2>
                <Container customClass="start">
                    {servicos.length > 0 && servicos.map((servico) => (
                        <ServicoCard id={servico.id} nome={servico.nome} custo={servico.custo}
                                     descricao={servico.descricao} key={servico.id} handleRemove={removerServico}/>
                    ))}
                    {servicos.length === 0 && <p>Não há serviços cadastrados!</p>}
                </Container>
            </Container>
        </div>) : (<Loading/>)}
    </>);
}