import styles from '../project/ProjetoFormulario.module.css';
import Input from '../formulario/Input';
import BtnSubmit from '../formulario/BtnSubmit';
import {useState} from 'react';

export default function FormularioServico({handleSubmit, btnText, projectData}) {

    const [servico, setServico] = useState({});

    function submit(e) {
        e.preventDefault();
        projectData.servicos.push(servico);
        handleSubmit(projectData);
    }

    function handleChange(e) {
        setServico({...servico, [e.target.name]: e.target.value});
    }

    return (
        <form onSubmit={submit} className={styles.formulario}>
            <Input tipo="text" texto="Nome do serviço" nome="nome" placeholder="Insira o nome do serviço"
                   handleOnChange={handleChange}/>
            <Input tipo="number" texto="Custo do serviço" nome="custo" placeholder="Insira o valor total"
                   handleOnChange={handleChange}/>
            <Input tipo="text" texto="Descrição do serviço" nome="descricao"
                   placeholder="Insira a descrição do serviço" handleOnChange={handleChange}/>
            <BtnSubmit texto={btnText}/>
        </form>
    );
}