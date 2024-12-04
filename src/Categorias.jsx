import { useEffect, useState } from "react";
import NoCategorias from "./NoCategorias";
import TableCategorias from "./TableCategorias";
import api from "./axiosApi";
import Loading from "./Loading";
import ModalConfirm from "./ModalConfirm";

const Categorias = () => {
    const [categorias, setCategorias] = useState([]);
    const [selectedCategoriaId, setSelectedCategoriaId] = useState(0);
    const [loading, setLoading] = useState(true);

    const loadCategorias = () => {
        setLoading(true);
        const categoriasEndpoint = "admin/obter_categorias";
        api.get(categoriasEndpoint)
            .then((response) => {
                setCategorias(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setLoading(false);
            });
    }

    const deleteCategoria = (categoriaId) => {
        setLoading(true);
        api.postForm("admin/excluir_categoria", {"id_categoria": categoriaId})
            .then(response => {
                if (response.status === 204)
                    loadCategorias();
            })
            .catch(error => {
                console.error('Erro ao excluir categoria:', error);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const handleDeleteCategoria = (categoriaId) => {
        setSelectedCategoriaId(categoriaId);
        const modal = new bootstrap.Modal(document.getElementById('modalDeleteCategoria'));
        modal.show();
    }

    useEffect(() => {
        loadCategorias();
    }, []);

    return (
        <>
            {categorias.length > 0 ?
                <>
                    <ModalConfirm modalId="modalDeleteCategoria" question="Deseja realmente excluir o categoria?" confirmAction={() => deleteCategoria(selectedCategoriaId)} />
                    <TableCategorias items={categorias} handleDeleteCategoria={handleDeleteCategoria}/> 
                </> :
                (!loading && <NoCategorias />)
            }
            {loading && <Loading />}
        </>
    );
}

export default Categorias;