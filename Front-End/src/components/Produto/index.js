import './index.scss';
import carrinho from '../../assets/image/carrinho.svg';
import '../../css/global.css';

export default function Produto(props) {
    return (
        <button className='container'>
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