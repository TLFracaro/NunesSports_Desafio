/*Import Estilo*/
import './index.scss';
import '../../css/global.css';

/*Import Bibliotecas*/
import { useNavigate } from "react-router-dom";

/*Import Imagens*/
import carrinho from '../../assets/image/carrinho.svg';

export default function Produto(props) {
    const navigate = useNavigate();

    async function vizualizarproduto(produto) {
        navigate("/vizualizar", { state: produto.sku });
    }

    return (
        <button className='container' onClick={() => vizualizarproduto(props.produto)}>
            <div className="conteudoProduto">
                <img src={props.imgURL} alt={props.nome} />
                <h3>{props.nome}</h3>
                <p>{props.preco}</p>
                <div className="buttonGroup">
                    <button className="buttonCarrinho">
                        Adicionar ao Carrinho<img id='carrinhoImg' src={carrinho} alt="Carrinho" />
                    </button>
                </div>
            </div>
        </button>
    );
}
