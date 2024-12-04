import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { NumberFormatter } from './formatters';

const TableCategoriasLine = ({ item, handleDeleteCategoria }) => {
    return (
        <tr>
            <td>{NumberFormatter.format(item.id, 6)}</td>
            <td>{item.nome}</td>
            <td>
                <button className="btn btn-outline-danger btn-sm" title="Excluir" onClick={() => handleDeleteCategoria(item.id)}>
                    <i className="bi bi-trash"></i>
                </button>
                <Link to={`/categoria/${item.id}`} className="btn btn-outline-primary btn-sm ms-2" title="Alterar">
                    <i className="bi bi-pencil"></i>
                </Link>
            </td>
        </tr>
    );
}

TableCategoriasLine.propTypes = {
    item: PropTypes.object.isRequired,
    handleDeleteCategoria: PropTypes.func.isRequired
};

export default TableCategoriasLine;