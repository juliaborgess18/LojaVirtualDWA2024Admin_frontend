import { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import api from "./axiosApi";
import { Link } from 'react-router-dom';
import { NumberFormatter, CurrencyFormatter } from './formatters';

const TableProductsLine = ({ item, handleDeleteProduct }) => {
    const [category, setCategory] = useState();
    const loadCategory = () => {
        const categoriesEndpoint = `admin/obter_categoria/${item.id_categoria}`;
        api.get(categoriesEndpoint)
            .then((response) => {
                console.log(response.data);
                setCategory(response.data);
            })
            .catch((error) => {
                console.error("Erro ao carregar a categoria:", error);
            });
    };

    useEffect(() => {
        if (item.id_categoria) { 
            loadCategory();
        }
    }, [item.id_categoria]);


    return (
        <tr>
            <td>{NumberFormatter.format(item.id, 6)}</td>
            <td>{item.nome}</td>
            <td>{item.id_categoria && category ? category.nome : "Sem Categoria"}</td>
            <td>{CurrencyFormatter.format(item.preco)}</td>
            <td>{NumberFormatter.format(item.estoque, 6)}</td>
            <td>
                <button className="btn btn-outline-danger btn-sm" title="Excluir" onClick={() => handleDeleteProduct(item.id)}>
                    <i className="bi bi-trash"></i>
                </button>
                <Link to={`/products/${item.id}`} className="btn btn-outline-primary btn-sm ms-2" title="Alterar">
                    <i className="bi bi-pencil"></i>
                </Link>
            </td>
        </tr>
    );
}

TableProductsLine.propTypes = {
    item: PropTypes.object.isRequired,
    handleDeleteProduct: PropTypes.func.isRequired
};

export default TableProductsLine;