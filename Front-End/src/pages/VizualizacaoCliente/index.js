/*Import Estilo*/
import "./index.scss";
import '../../css/global.css';

/*Import Bibliotecas*/
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

/*Import Componentes*/
import Cabecalho1 from "../../components/Cabecalho1";
import Rodape from "../../components/Rodape";

/*Import Imagens*/
import carrinho from "../../assets/image/carrinho.svg";
import cincoEstrelas from "../../assets/image/cincoEstrelas.svg";

/*Import Requisição API*/
import api from "../../api";

export default function VizualizarProdutos() {
    const location = useLocation();
    const sku = location.state || {};
    const [produto, setProduto] = useState({});
    const [imagensBase64, setImagemBase64] = useState([]);
    const [indiceAtual, setIndiceAtual] = useState(0);

    const imagemAnterior = () => {
        setIndiceAtual((prevIndex) =>
            prevIndex === 0 ? imagensBase64.length - 1 : prevIndex - 1
        );
    };

    const proximaImagem = () => {
        setIndiceAtual((prevIndex) =>
            prevIndex === imagensBase64.length - 1 ? 0 : prevIndex + 1
        );
    };

    useEffect(() => {
        async function fetchData() {
            try {
                let r = await api.get(`/produto/${sku}`);
                setProduto(r.data);

                const imagensBase64 = r.data.imagens.map((imagem) => {
                    return imagem.imagem_base64;
                });

                console.log('Dados do Produto:', r.data);
                console.log('Imagens Base64:', imagensBase64);

                setImagemBase64(imagensBase64);
            } catch (error) {
                console.error(error);
            }
        }
        fetchData();
    }, [sku]);

    return (
        <section className="VizualizarProdutoEstilo">
            <Cabecalho1 />

            <main>
                <div className="mainConteudo">
                    <div className="conteudo">
                        <div className="carrossel">
                            <button onClick={imagemAnterior} className="botaoAnterior">
                                &#8249;
                            </button>
                            <div className="imagemAtual">
                                {imagensBase64[indiceAtual] && imagensBase64[indiceAtual].toLowerCase().includes('image/png') ? (
                                    <img
                                        src={imagensBase64[indiceAtual]}
                                        alt={`Imagem ${indiceAtual + 1}`}
                                        style={{ objectFit: 'cover' }}
                                    />
                                ) : (
                                    <p>Imagem não suportada</p>
                                )}
                            </div>
                            <button onClick={proximaImagem} className="botaoProximo">
                                &#8250;
                            </button>
                        </div>

                        <div className="infos">
                            <h4 id="nomeProd">{produto.item?.nome}</h4>
                            <p className="avaliacao"><img className="estrelas" src={cincoEstrelas}/>5.0</p>
                            <h4 id="precoProd">R$ {produto.item?.preco}</h4>
                            <h4>Categoria:⠀<p>{produto.item?.categoria}</p></h4>
                            <h4>Marca:⠀<p>{produto.item?.marca}</p></h4>
                            <h4 id="descricaoProd">Descrição do produto:⠀<p>{produto.item?.descricao}</p></h4>

                            <div className="variacoes">
                                <table>
                                    <tr>
                                        <th>Tamanho</th>
                                        <th>Cor</th>
                                        <th>Quantidade</th>
                                    </tr>
                                    {produto.variacao?.map((variacao) => (
                                        <tr className='Conteudo'>
                                            <td className="primeiro">Tamanho: {variacao.tamanho}</td>
                                            <td>Cor: {variacao.cor}</td>
                                            <td className="final">Quantidade: {variacao.quantidade}</td>
                                        </tr>
                                    ))}
                                </table>
                            </div>
                            <div className="buttonGroup">
                                <button className="buttonCarrinho">
                                    Adicionar ao Carrinho<img id='carrinhoImg' src={carrinho} alt="Carrinho" />
                                </button>
                                <button className="buttonCompra">Comprar Agora</button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Rodape />

        </section>
    );
}