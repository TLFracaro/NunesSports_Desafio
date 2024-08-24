import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import App from "./pages/Home/App.js";
import Cadastro from "./pages/Cadastro/index.js";
import CadastroDeProdutos from "./pages/CadastroDeProdutos/index.js";
import GerenciamentoUsuario from "./pages/GerenciamentoUsuario/index.js";
import Menu from "./pages/Menu/index.js";
import Produtos from "./pages/Produtos/index.js";
import VizualizarProdutos from "./pages/VizualizarProdutos/index.js";
import Login from './pages/Login/index.js';
import Alterar from './pages/AlterarProduto/index.js';
import Vizualizar from './pages/VizualizacaoCliente/index.js';

const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    return !!token;
};

const isUserAdmin = () => {
    const token = localStorage.getItem('token');
    if (token) {
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        const privilegio = decodedToken.privilegio;
        return privilegio === 'ADMIN';
    }
    return false;
};

const PrivateRoute = ({ element, ...props }) => {
    return isAuthenticated() ? element : <Navigate to="/login" />;
};

const AdminRoute = ({ element, ...props }) => {
    return isUserAdmin() ? element : <Navigate to="/login" />;
};

export default function Rotas() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<App />} />
                <Route path="/cadastro" element={<Cadastro />} />
                <Route path="/login" element={<Login />} />
                <Route path="/cadastrodeprodutos" element={<AdminRoute element={<CadastroDeProdutos />} />} />
                <Route path="/gerenciamentousuario" element={<AdminRoute element={<GerenciamentoUsuario />} />} />
                <Route path="/menu" element={<PrivateRoute element={<Menu />} />} />
                <Route path="/produtos" element={<AdminRoute element={<Produtos />} />} />
                <Route path="/vizualizarprodutos" element={<AdminRoute element={<VizualizarProdutos />} />} />
                <Route path="/alterarproduto" element={<AdminRoute element={<Alterar />} />} />
                <Route path='/vizualizar' element={<Vizualizar />} />
            </Routes>
        </BrowserRouter>
    );
}
