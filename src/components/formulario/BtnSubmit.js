import styles from './BtnSubmit.module.css';

function BtnSubmit({texto}) {
    return (
        <div>
            <button className={styles.btn}>{texto}</button>
        </div>
    );
}

export default BtnSubmit;