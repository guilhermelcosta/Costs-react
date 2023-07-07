import styles from './ProjetoFormulario.module.css';
import {useEffect, useState} from 'react';
import Input from '../formulario/Input';
import Select from '../formulario/Select';
import BtnSubmit from '../formulario/BtnSubmit';

function ProjetoFormulario({TextoBtn, handleSubmit, dadosProjeto}) {

    const [categorias, setCategorias] = useState([]);
    const [projeto, setProjeto] = useState(dadosProjeto || {});

    /*O useEffect previne o fetch da URL em loop quando o conteudo e requisitado*/
    useEffect(() => {
        fetch('http://localhost:5000/categorias', {
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            }
        }).then((resposta) => resposta.json()).then((data) => {
            setCategorias(data);
        }).catch((e) => console.log(e));
    }, []);

    const submit = (e) => {
        e.preventDefault();
        handleSubmit(projeto);
    };

    function handleChange(e) {
        setProjeto({...projeto, [e.target.name]: e.target.value});
    }

    function handleCategoria(e) {
        setProjeto({
            ...projeto, categoria: {
                id: e.target.value,
                nome: e.target.options[e.target.selectedIndex].text,
            }
        });
    }

    return (
        <form onSubmit={submit} className={styles.formulario}>
            <Input tipo="text" texto="Nome do projeto" nome="nome" handleOnChange={handleChange}
                   placeholder="Insira o nome do projeto" valor={projeto.nome ? projeto.nome : ''}/>
            <Input tipo="number" texto="Orçamento do projeto" nome="orçamento"
                   handleOnChange={handleChange} placeholder="Insira o orçamento do projeto"
                   valor={projeto.orcamento}/>
            <Select name="id_categoria" texto="Selecione a categoria" options={categorias}
                    handleOnChange={handleCategoria} valor={projeto.categoria ? projeto.categoria.id : ''}/>
            <BtnSubmit texto={TextoBtn}/>
        </form>
    );
}

export default ProjetoFormulario;