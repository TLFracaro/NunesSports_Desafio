import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cabecalho1 from '../../components/Cabecalho1';
import Rodape from '../../components/Rodape';
import '../../css/global.css';
import './index.scss';
import loginImagem from "../../assets/image/loginImage.png"
import api from '../../api';

export default function Login() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const navigate = useNavigate();
    const [texto, setTexto] = useState('');
    const [modalAberto, setModalAberto] = useState(false);

    const caixaDeDialogo = useRef(null);

    useEffect(() => {
        caixaDeDialogo.current = document.getElementById("CaixaDeDialogo");
    }, []);

    const fecharModal = () => {
        if (caixaDeDialogo.current) {
            caixaDeDialogo.current.close();
        }
    };

    const mostrarModal = () => {
        if (caixaDeDialogo.current) {
            caixaDeDialogo.current.showModal();
        }
    };

    const login = async () => {
        try {
            if (email.trim() === '' || senha.trim() === '') {
                setTexto('Preencha os campos e-mail e senha!');
                mostrarModal();
                return;
            }
    
            let body = {
                email: email,
                senha: senha,
            };
    
            const r = await api.post(`/login`, body);
            
            console.log('Resposta da requisição:', r.data);
    
            if (r && r.data) {
                console.log('Propriedades na resposta:', Object.keys(r.data));
            
                if (r.data.success) {
                    const { nome, cpf, email, privilegio, token } = r.data.user;
                    localStorage.setItem('token', token);
                    navigate('/menu', { state: { nome, cpf, email, privilegio } });
                } else {
                    if (r.status === 401) {
                        setTexto('Usuário não encontrado. Verifique seu e-mail e senha.');
                    } else {
                        setTexto('Erro ao realizar login. Verifique os detalhes e tente novamente.');
                    }
                    mostrarModal();
                }
            } else {
                console.log('Resposta ou r.data está faltando');
                setTexto('Erro ao realizar login. Verifique os detalhes e tente novamente.');
                mostrarModal();
            }
            
        } catch (error) {
            console.error('Erro ao realizar login:', error);
            setTexto('Erro ao realizar login. Verifique os detalhes e tente novamente.');
            mostrarModal();
        }
    };

    const enviar = (e) => {
        e.preventDefault();
        login();
    };

    const ApertaEnter = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            login();
        }
    };

    useEffect(() => {
        document.addEventListener('keypress', ApertaEnter);
        return () => {
            document.removeEventListener('keypress', ApertaEnter);
        };
    }, [email, senha]);

    return (
        <section className="LoginEstilo">
            <Cabecalho1 />

            <main>
                <section className="conteudoMain">
                    <dialog open={modalAberto} id="CaixaDeDialogo">
                        <p>{texto}</p>
                        <button id="botao" onClick={fecharModal}>
                            Ok
                        </button>
                    </dialog>
                    <div className="imagem">
                        <img
                            src={loginImagem}
                            alt="Uma imagem representando o cliente em uma loja de artigos esportivos"
                        />
                    </div>
                    <div className="areaLogin">
                        <div className="loginTexto">
                            <h1>Login</h1>
                            <h2>Bem vindo de Volta!</h2>

                        </div>
                        <form onSubmit={enviar}>
                            <label htmlFor="email">E-mail:</label>
                            <input id="email" placeholder='Digite o email de cadastro' type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                            <label htmlFor="senha">Senha:</label>
                            <input id="senha" placeholder='Digite a senha de cadastro' type="password" value={senha} onChange={(e) => setSenha(e.target.value)} />
                            <Link to="/">Esqueceu sua senha?</Link>
                            <button type="button" onClick={enviar}> Login </button>
                        </form>
                        <div className="criarConta">
                            <p>
                                Ainda não tem conta? <Link to="/cadastro">Clique aqui</Link>
                            </p>
                        </div>
                    </div>
                </section>
            </main>

            <Rodape />
        </section>
    );
}
