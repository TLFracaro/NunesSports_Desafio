import React, { useState, useEffect } from "react";
import axios from "axios";
import cartaz1 from '../../assets/image/cartaz1.svg';
import cartaz2 from '../../assets/image/cartaz2.svg';
import cartaz3 from '../../assets/image/cartaz3.svg';
import estrela from '../../assets/image/estrela.svg';
import Cabecalho1 from "../../components/Cabecalho1";
import Rodape from "../../components/Rodape";
import Produto from "../../components/Produto";
import '../../css/global.css';
import './App.scss';
import api from "../../api";

const imagens = [cartaz1, cartaz2, cartaz3];

export default function Home() {
    const [produtos, setProdutos] = useState([]);
    const [imagemAtual, setImagemAtual] = useState(0);

    const proximaImagem = () => {
        setImagemAtual((prev) => (prev + 1) % imagens.length);
    };

    const imagemAnterior = () => {
        setImagemAtual((prev) => (prev - 1 + imagens.length) % imagens.length);
    };

    useEffect(() => {
        const intervalo = setInterval(proximaImagem, 5000);
        return () => clearInterval(intervalo);
    }, []);

    async function listarProduto() {
        try {
            let r = await api.get('/produto/listar/home');
            setProdutos(r.data);
        } catch (error) {
            console.error("Erro ao buscar produtos:", error);
        }
    }

    useEffect(() => {
        listarProduto();
    }, []);

    useEffect(() => {
        listarProduto();
    }, []);


    return (
        <section className="HomeEstilo">
            <Cabecalho1 />
            <main>
                <div className='conteudoMain'>
                    <div className="carrossel">
                        <button className="btn-carrossel" onClick={imagemAnterior}>‹</button>
                        <div className="carrossel-inner">
                            {imagens.map((imagem, index) => (
                                <img
                                    key={index}
                                    src={imagem}
                                    alt={`Imagem ${index + 1}`}
                                    className={index === imagemAtual ? "active" : ""}
                                />
                            ))}
                        </div>
                        <button className="btn-carrossel" onClick={proximaImagem}>›</button>
                    </div>
                    <div className='produtosExibir'>
                        <h2><img src={estrela} alt="Estrela" />Nossos produtos:</h2>
                    </div>
                    <div className="produto">
                        {produtos.length === 0 ? (
                            <p>Não há nenhum produto cadastrado no sistema =&#40;</p>
                        ) : (
                            produtos.map(produto => (
                                <Produto
                                    key={produto.sku}
                                    imgURL={produto.imagem_base64}
                                    nome={produto.nome}
                                    preco={`R$ ${produto.preco}`}
                                />
                            ))
                        )}
                    </div>
                </div>
            </main>
            <Rodape />
        </section>
    );
}
