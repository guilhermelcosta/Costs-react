import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './components/pages/Home';
import Empresa from './components/pages/Empresa';
import Contato from './components/pages/Contato';
import Container from './components/layout/Container';
import NavBar from './components/layout/NavBar';
import Footer from './components/layout/Footer';
import Projetos from './components/pages/Projetos';
import NovoProjeto from './components/pages/NovoProjeto';
import Projeto from './components/pages/Projeto';

function App() {
    return (
        <Router>
            <NavBar/>

            <Container customClass="min-height">
                <Routes>
                    <Route exact path="/" element={<Home/>}></Route>
                    <Route path="/projetos" element={<Projetos/>}></Route>
                    <Route path="/empresa" element={<Empresa/>}></Route>
                    <Route path="/contato" element={<Contato/>}></Route>
                    <Route path="/novoprojeto" element={<NovoProjeto/>}></Route>
                    <Route path="/projeto/:id" element={<Projeto/>}></Route>
                </Routes>
            </Container>

            <Footer/>
        </Router>
    );
}

export default App;
