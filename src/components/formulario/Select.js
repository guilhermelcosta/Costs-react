import styles from './Select.module.css';

function Select({texto, nome, options, handleOnChange, valor}) {
    return (
        <div className={styles.select_container}>
            <label htmlFor={nome}>{texto}:</label>
            <select name={nome} id={nome}>
                <option>Selecione uma opção</option>
                {options.map((option) => (
                    <option value={option.id} key={option.id}>{option.nome}</option>
                ))}
            </select>
        </div>
    );
}

export default Select;