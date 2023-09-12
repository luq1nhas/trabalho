import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Menu from '../componentes/Menu';
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Drawer, Image, Col, Row } from 'antd';
import './style.css';
function DetalhesProduto() {
    const { id } = useParams();
    const [produto, setProduto] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`https://fakestoreapi.com/products/${id}`).then((response) => {
            setProduto(response.data);
        });
    }, [id]);

    const adicionarAoCarrinho = (produto) => {
        const carrinhoAtual = JSON.parse(localStorage.getItem("carrinho")) || [];
        const novoCarrinho = [...carrinhoAtual, produto];
        localStorage.setItem("carrinho", JSON.stringify(novoCarrinho));
        navigate('/carrinho'); // Redirecione para a página do carrinho após adicionar ao carrinho
    };

    if (!produto) {
        return <div>Carregando...</div>;
    }
    
    return (
        <>
            <Menu />
            <Row>
                <Col span={8} offset={8}>
                    <h2>{produto.title}</h2>
                    <Image src={produto.image} width={300} content='center' />
                </Col>
                <Col span={8} offset={8}>
                    <h2>Descrição</h2>
                    <p>{produto.description}</p>
                    <h3>Preço: ${produto.price}</h3>
                    <Button
                        type="text"
                        style={{ margin: '2px' }}
                        onClick={() => adicionarAoCarrinho(produto)}
                    >
                        Comprar
                    </Button>
                </Col>
            </Row>
        </>
    );
}

export default DetalhesProduto;
