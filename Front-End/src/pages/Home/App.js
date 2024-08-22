import React, { useState, useEffect } from "react";
import cartaz1 from '../../assets/image/cartaz1.svg';
import cartaz2 from '../../assets/image/cartaz2.svg';
import cartaz3 from '../../assets/image/cartaz3.svg';
import estrela from '../../assets/image/estrela.svg';
import Cabecalho1 from "../../components/Cabecalho1";
import Rodape from "../../components/Rodape";
import '../../css/global.css';
import './App.scss'; 

const imagens = [cartaz1, cartaz2, cartaz3];

export default function Home() {
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
                        <h2><img src={estrela}/>Nossos produtos:</h2>
                    </div>
                </div>
            </main>
            <Rodape />
        </section>
    );
}
