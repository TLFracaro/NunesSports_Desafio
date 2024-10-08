/*Import Estilo*/
import './index.scss';
import '../../css/global.css';

/*Import Bibliotecas*/
import { useNavigate } from 'react-router-dom'
import { useEffect, useRef, useState, } from 'react';
import { Link } from 'react-router-dom';

/*Import Componentes*/
import Cabecalho1 from '../../components/Cabecalho1';
import Rodape from '../../components/Rodape';

/*Import Requisição API*/
import api from '../../api';


export default function Cadastro() {

    const [nome, setNome] = useState();
    const [cpf, setCpf] = useState('');
    const [cpfValdio, setcpfValdio] = useState(false);
    const [email, setEmail] = useState('');
    const [emailValido, setEmailValido] = useState('');
    const [confEmail, setConfEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confSenha, setConfSenha] = useState('');
    const [senhasIguais, setSenhasIguais] = useState('');
    const [texto, setTexto] = useState('');
    const [modalAberto, setModalAberto] = useState(false);
    const navigate = useNavigate();

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

    const cadastrarUsuario = async () => {
        const cpfNumeros = cpf.replace(/\D/g, '');
        const senhasSaoIguais = validarSenhas(senha, confSenha);
        const emailsSaoIguaisEValidos = email === confEmail && emailValido;

        console.log("CPF:", cpfNumeros.length);
        console.log("Email válido:", emailValido);
        console.log("Senhas são iguais?", senhasSaoIguais);
        console.log("E-mails são iguais e válidos?", emailsSaoIguaisEValidos);

        if (cpfNumeros.length !== 11) {
            setTexto('Cpf inválido!');
            mostrarModal();
        }
        if (!emailValido) {
            setTexto('Email inválido!');
            mostrarModal();
        }
        if (!senhasSaoIguais) {
            setTexto('Senhas não coincidem!');
            mostrarModal();
        }

        if (cpfNumeros.length === 11 && emailValido && senhasSaoIguais && emailsSaoIguaisEValidos) {
            try {
                let privilegio = 'normal';
                let body = {
                    nome: nome,
                    cpf: cpfNumeros,
                    email: email,
                    senha: senha,
                    privilegio: privilegio
                };

                console.log('Enviando requisição com body:', body);

                const response = await api.post('/usuario/', body);
                console.log('Resposta da requisição:', response);
                setTexto('Usuário cadastrado com sucesso!');
                mostrarModal();

                setTimeout(() => {
                    navigate('/login');
                }, 2000);
            } catch (error) {
                console.error('Erro ao cadastrar usuário:', error);

                if (error.response && error.response.status === 400) {
                    setTexto('O CPF ou E-mail já foi cadastrado no sistema!');
                }

                mostrarModal();
            }
        } else {
            if (nome === "" || cpf === "" || email === "" || senha === "") {
                setTexto('Preencha todos os campos corretamente!');
                mostrarModal();
            } else {
                setTexto('Verifique os campos e tente novamente.');
                mostrarModal();
            }
        }
    };

    const formatarCpf = (value) => {
        return value.replace(/\D/g, '').replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4').substr(0, 14);
    };

    const validarCpf = (cpf) => {
        cpf = cpf.replace(/\D/g, '');

        if (cpf.length !== 11 || /^(.)\1{10}$/.test(cpf)) return false;

        const calcularDigito = (slice) => {
            let soma = 0;
            for (let i = 0; i < slice; i++) {
                soma += parseInt(cpf.charAt(i)) * (slice + 1 - i);
            }
            return (soma * 10) % 11 % 10;
        };

        const digito1 = calcularDigito(9);
        const digito2 = calcularDigito(10);

        return digito1 === parseInt(cpf.charAt(9)) && digito2 === parseInt(cpf.charAt(10));
    };

    const validarEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };


    const identificarCpf = (e) => {
        const valor = e.target.value;
        const cpfFormatado = formatarCpf(valor);
        setCpf(cpfFormatado);

        setcpfValdio(!validarCpf(valor));
    };

    const validarSenhas = (senha, confirmacaoSenha) => {
        return senha === confirmacaoSenha && senha !== '' && confirmacaoSenha !== '';
    };

    const validarSenhasInput = (senha, confirmacaoSenha) => {
        if (senha === confirmacaoSenha && senha !== '' && confirmacaoSenha !== '') {
            setSenhasIguais(true);
        } else {
            setSenhasIguais(false);
        }
    };

    const enviarCadastro = (e) => {
        e.preventDefault();
        cadastrarUsuario();
    };

    return (
        <section className='CadastroEstilo'>

            <Cabecalho1 />

            <main>
                <section className="conteudoMain">
                    <dialog open={modalAberto} id="CaixaDeDialogo">
                        <p>{texto}</p>
                        <button id="botao" onClick={fecharModal}>
                            Ok
                        </button>
                    </dialog>
                    <div className="areaCadastro">
                        <div className="loginTexto">
                            <h1>Cadastro</h1>
                            <h2>★ Vem fazer parte do nosso time ★</h2>
                        </div>
                        <form action="">
                            <label for="">Nome completo:</label>
                            <input type="text" placeholder='Digite seu nome completo' value={nome} onChange={e => setNome(e.target.value)} />

                            <label for="">CPF:</label>
                            <input type="text" placeholder='Digite seu CPF' value={cpf} onChange={identificarCpf} style={cpfValdio ? { border: '2px solid red' } : validarCpf(cpf) ? { border: '2px solid green' } : null} />

                            <label>E-mail:</label>
                            <input type="text" placeholder='Digite seu e-mail' value={email} onChange={(e) => { setEmail(e.target.value); setEmailValido(validarEmail(e.target.value)); }} style={!email ? { border: 'none' } : emailValido ? { border: '2px solid green' } : { border: '2px solid red' }} />

                            <label>Confirmar E-mail:</label>
                            <input type="text" placeholder='Confirme seu e-mail' value={confEmail} onChange={(e) => setConfEmail(e.target.value)} onBlur={() => { setEmailValido(email === confEmail && validarEmail(confEmail)); }} style={!confEmail ? { border: 'none' } : email === confEmail && emailValido ? { border: '2px solid green' } : { border: '2px solid red' }} />

                            <label>Senha:</label>
                            <input type="password" placeholder='Digite uma senha' value={senha} onChange={(e) => setSenha(e.target.value)} onBlur={() => { validarSenhasInput(senha, confSenha); }} style={!senha ? { border: 'none' } : senhasIguais ? { border: '2px solid green' } : { border: '2px solid red' }} />

                            <label>Confirmar Senha:</label>
                            <input type="password" placeholder='Confirme sua senha' value={confSenha} onChange={(e) => setConfSenha(e.target.value)} onBlur={() => { validarSenhasInput(senha, confSenha); }} style={!confSenha ? { border: 'none' } : senhasIguais ? { border: '2px solid green' } : { border: '2px solid red' }} />
                            <button type="button" onClick={enviarCadastro}>Cadastrar-se</button>
                            <div className="possuiConta">
                            <p>
                                Já possui uma conta? <Link to="/login">Clique aqui</Link>
                            </p>
                        </div>
                        </form>
                    </div>
                </section>
            </main>

            <Rodape />

        </section>
    );
}