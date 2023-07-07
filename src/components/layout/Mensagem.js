import styles from './Mensagem.module.css';
import {useState} from 'react';
import {useEffect} from 'react';

function Mensagem({tipo, mensagem}) {

    const [visivel, setVisivel] = useState(true);
    //
    // useEffect(() => {
    //     if (!mensagem) {
    //         setVisivel(false);
    //         return;
    //     }
    //     setVisivel(true);
    //
    //     const timer = setTimeout(() => {
    //         setVisivel(false);
    //     }, 3000);
    //
    //     return () => clearTimeout(timer);
    // }, [mensagem]);

    return (
        <>
            {visivel && (<div className={`${styles.mensagem} ${styles[tipo]}`}>{mensagem}</div>)}
        </>
    );
}

export default Mensagem;