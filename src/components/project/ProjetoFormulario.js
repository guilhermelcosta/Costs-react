import styles from './ProjetoFormulario.module.css';
import {useEffect, useState} from 'react';
import Input from '../formulario/Input';
import Select from '../formulario/Select';
import BtnSubmit from '../formulario/BtnSubmit';

function ProjetoFormulario({TextoBtn}) {

    const [categorias, setCategorias] = useState([]);

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

    return (
        <form className={styles.formulario}>
            <Input tipo="text" texto="Nome do projeto" nome="nome" placeholder="Insira o nome do projeto"/>
            <Input tipo="number" texto="Orçamento do projeto" nome="orçamento"
                   placeholder="Insira o orçamento do projeto"/>
            <Select name="id_categoria" texto="Selecione a categoria" options={categorias}/>
            <BtnSubmit texto={TextoBtn}/>
        </form>
    );
}

export default ProjetoFormulario;