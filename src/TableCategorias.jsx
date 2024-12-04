import PropTypes from 'prop-types';
import TableCategoriasLine from "./TableCategoriasLine"

const TableCategorias = ({ items, handleDeleteCategoria }) => {
    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>Código</th>
                    <th>Nome</th>
                </tr>
            </thead>
            <tbody>
                {items.map(p => <TableCategoriasLine item={p} key={p.id} handleDeleteCategoria={handleDeleteCategoria} />)}
            </tbody>
        </table>
    );
}

TableCategorias.propTypes = {
    items: PropTypes.array.isRequired,
    handleDeleteCategoria: PropTypes.func.isRequired
};

export default TableCategorias;