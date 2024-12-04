import { useNavigate, useParams } from 'react-router-dom';
import CategoriaForm from './CategoriaForm';
import { useEffect, useState } from 'react';
import api from "./axiosApi";
import FormButtons from './FormButtons';
import handleChange from './handleChange';
import parseErrors from './parseErrors';
import Loading from './Loading';

const EditCategoria = () => {
    const [inputs, setInputs] = useState({});
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const idCategoria = useParams().id;
    if (!idCategoria) {
        navigate("/categorias");
    }

    function loadCategoriaById(id) {
        setLoading(true);
        const getCategoriaEndpoint = `admin/obter_categoria/${id}`;
        api.get(getCategoriaEndpoint)
            .then(response => {
                setInputs(response.data);
            })
            .catch(error => {
                console.error('Erro ao carregar categoria:', error);
            })
            .finally(() => {
                setLoading(false);
            });
    }

    async function handleSubmit(event) {
        event.preventDefault();
        setLoading(true);
        const editCategoriaEndpoint = "admin/alterar_categoria";
        await api.post(editCategoriaEndpoint, inputs)
            .then((response) => {
                if (response.status === 204) {
                    navigate("/categorias");
                } else {
                    console.log(response);
                }
            })
            .catch((error) => {
                if (error && error.response && error.response.data)
                    setErrors(parseErrors(error.response.data));
            })
            .finally(() => {
                setLoading(false);
            });
    }

    function localHandleChange(event) {
        handleChange(event, inputs, setInputs);
    }

    useEffect(() => {
        setInputs({ ...inputs, id: idCategoria });
        loadCategoriaById(idCategoria);
    }, [idCategoria]);

    return (
        <>
            <div className="d-flex justify-content-between align-items-center">
                <h1>Alteração de Categoria</h1>
            </div>
            <form onSubmit={handleSubmit} noValidate autoComplete='off'>
                <CategoriaForm handleChange={localHandleChange} inputs={inputs} errors={errors} isNew={false} />
                <FormButtons cancelTarget="/categorias" />
            </form>
            {loading && <Loading />}
        </>
    );
}

export default EditCategoria;