/*Import Estilo*/
import './index.scss';
import '../../css/global.css';

/*Import Bibliotecas*/
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

/*Import Imagens*/
import balaoMensagem from '../../assets/image/balaoMensagem.svg';
import carrinho from '../../assets/image/carrinho.svg';
import produtos from '../../assets/image/produtos.svg';
import home from '../../assets/image/home.svg';
import NunesSportsLogo from '../../assets/image/NunesSportsLogo.svg';
import lupa from '../../assets/image/lupa.svg';
import pessoaPixel from '../../assets/image/pessoaPixel.svg';
import gerente from '../../assets/image/gerente.svg';
import tracos from '../../assets/image/tracos.svg';


export default function Cabecalho2() {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const [usuario, setUsuario] = useState(null);
    const token = localStorage.getItem('token');
    const decodedToken = jwtDecode(token);

    const clickConta = () => {
        if (token) {
            try {
                console.log('Dados decodificados do token:', decodedToken);
                setUsuario(decodedToken);
                setIsOpen(!isOpen);
                navigate('/menu', { state: decodedToken });
            } catch (error) {
                console.error('Erro ao decodificar o token:', error);
            }
        } else {
            navigate('/login');
        }
    };

    const sair = (event) => {
        event.stopPropagation();
        localStorage.removeItem('token');
        window.location.href = '/';
    };

    const isAdmin = decodedToken.privilegio === 'ADMIN';
    console.log(decodedToken.privilegio);

    return (
        <section className='cabecalho2Estilos'>
            <header>
                <div className="faixa1">
                    <div className="toolsUsuario">
                        <div className="logoImg">
                            <Link to="/"><img src={NunesSportsLogo}
                                alt="Logo da marca Nunes Sports" /></Link>
                        </div>

                        <div className="barraDePesquisa">
                            <input type="text" name="pesquisa" placeholder="Pesquisar"></input>
                            <button><img src={lupa} alt="Lupa clique para pesquisar" /></button>
                        </div>
                        <div className="contato">
                            <button>
                                <img src={balaoMensagem} alt="Balão de contato" />
                                <h1>Contato</h1>
                            </button>
                        </div>

                        <div className="contaUsuario">
                            <button className='minhaConta' onClick={clickConta}>
                                <img src={pessoaPixel} alt="Pessoa representando o usuário" />
                                <h1>Minha Conta</h1>
                            </button>
                            {token && (
                                <div className="menuSair">
                                    <button onClick={sair}>Sair</button>
                                </div>
                            )}
                        </div>

                        <div className="carrinho">
                            <button>
                                <img src={carrinho}
                                    alt="Carrinho de compra" />
                                <h1>Carrinho</h1>
                            </button>
                        </div>
                    </div>
                    <div className="barraDePesquisaCelular">
                        <input type="text" name="pesquisa" placeholder="Pesquisar"></input>
                        <button><img src={lupa} alt="Lupa clique para pesquisar" /></button>
                    </div>
                </div>
            </header>

            <nav>
                <div className="navConteudo">
                    <div className="paginaInicial">
                        <Link to="/menu"><img src={home}/>
                            Pagina incial</Link>
                    </div>
                    {isAdmin && (
                        <>
                            <img src={tracos}/>
                            <div className="produto">
                                <Link to="/produtos"><img src={produtos}/>
                                    Produtos</Link>
                            </div>
                            <img src={tracos}/>
                            <div className="gerenUsuario">
                                <Link to="/gerenciamentousuario"><img src={gerente}/>
                                    Gerenciamento de Usuário</Link>
                            </div>
                        </>
                    )}
                </div>
            </nav>
        </section>
    );
}