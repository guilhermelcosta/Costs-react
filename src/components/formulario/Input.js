import styles from './Input.module.css';

function Input({tipo, texto, nome, placeholder, handleOnChange, valor}) {
    return (
        <div className={styles.input_container}>
            <label htmlFor={nome}>{texto}:</label>
            <input type={tipo} name={nome} id={nome} placeholder={placeholder} onChange={handleOnChange} value={valor}/>
        </div>
    );
}

export default Input;