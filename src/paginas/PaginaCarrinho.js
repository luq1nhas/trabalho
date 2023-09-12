import React, { useEffect, useState } from "react";
import Menu from "../componentes/Menu";
import { useNavigate,Link } from "react-router-dom";
import { Button,Layout,Image, Table} from "antd";
import { Content } from "antd/lib/layout/layout";
import { Footer } from "antd/es/layout/layout";

export default function PaginaCarrinho({ }) { 
    const [carrinho, setCarrinho] = useState([]);
    useEffect(() => {
        const carrinhoAtual = JSON.parse(localStorage.getItem("carrinho")) || [];
        setCarrinho(carrinhoAtual);
    }, []);

    const limparCarrinho = () => {
        localStorage.removeItem("carrinho");
        setCarrinho([]);
        window.location.reload();
    };

    const calcularTotal = () => {
        const total = data.reduce((acc, item) => acc + item.price, 0);
        return (
          <div>
            <span style={{ fontWeight: "bold" }}>Total: $ {total.toFixed(2)}</span>
          </div>
        );
      };
    const columns = [
        {
            title: 'Imagem',
            dataIndex: 'image',
            key: 'image',
            render: (image) => <Image src={image} width={50} />
        },
        {
            title: 'Produto',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Preço',
            dataIndex: 'price',
            key: 'price',
        }
    ];
    const data = carrinho.map((produto) => ({
        key: produto.id,
        image: produto.image,
        title: produto.title,
        price: produto.price
    }));
    return (
        <div>
            <Menu />
            {carrinho.length > 0 ? (
                <>
                <Content
                style={{
                  margin: '24px 16px',
                  padding: 24,
                  minHeight: 280,
                }}
              >
                <h2>Produtos no Carrinho</h2>
                    <ul>
                        <Table columns={columns} dataSource={data} footer={calcularTotal}/>
                    </ul>
                    <Button onClick={limparCarrinho}>Limpar Carrinho</Button>
                    <Button type="primary">Finalizar Compra</Button>
                </Content>
                </>
            ) : (
                <div>
                    <h1>Carrinho vazio</h1>
                    <Button type="primary"><Link to='/'>Voltar para Home</Link></Button>
                </div>
            )}
            
        </div>
    );
}
