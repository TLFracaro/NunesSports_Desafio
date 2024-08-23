import './index.scss';

import { Link } from 'react-router-dom';

import balaoMensagem from '../../assets/image/balaoMensagem.svg';
import carrinho from '../../assets/image/carrinho.svg';
import categoria from '../../assets/image/categoria.svg';
import NunesSportsLogo from '../../assets/image/NunesSportsLogo.svg';
import lupa from '../../assets/image/lupa.svg';
import pessoaPixel from '../../assets/image/pessoaPixel.svg';
import seta from '../../assets/image/seta.svg';
import tracos from '../../assets/image/tracos.svg';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

import '../../css/global.css';

export default function Cabecalho1() {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const [usuario, setUsuario] = useState(null);

    const clickConta = () => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
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

    const token = localStorage.getItem('token');


    return (
        <section className='cabecalho1Estilo'>
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
                <div className="navegacaoCategoria">
                    <div className="maisCategorias">
                        <button><img src={categoria}
                            alt="Icone de mostrar mais categorias" />Categorias</button>
                    </div>

                    <div className="principal">

                        <button>Roupas Esportivas
                            <img className="seta" src={seta}
                                alt="Seta para mostrar subcategorias" /></button>
                        <img className='tracos' src={tracos} />

                        <button>Calçados Esportivos
                            <img className="seta" src={seta}
                                alt="Seta para mostrar subcategorias" /></button>
                        <img className='tracos' src={tracos} />
                        <button>Equipamentos
                            <img className="seta" src={seta}
                                alt="Seta para mostrar subcategorias" /></button>
                        <img className='tracos' src={tracos} />
                        <button>Acessórios
                            <img className="seta" src={seta}
                                alt="Seta para mostrar subcategorias" /></button>

                        <img className='tracos' src={tracos} />
                        <button>Mais Categorias
                            <img className="seta" src={seta}
                                alt="Seta para mostrar subcategorias" /></button>

                    </div>
                </div>
            </nav>
        </section>
    );
}