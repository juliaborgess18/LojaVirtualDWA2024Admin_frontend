import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from "./axiosApi";
import FormButtons from './FormButtons';
import handleChange from './handleChange';
import parseErrors from './parseErrors';
import Loading from './Loading';
import CategoryForm from './CategoryForm';

const EditCategory = () => {
    const [inputs, setInputs] = useState({});
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { id: idCategoria } = useParams();

    if (!idCategoria) {
        navigate("/categories");
    }

    async function loadData(id) {
        setLoading(true);
        try {
            const getCategoryEndpoint = `admin/obter_categoria/${id}`;
            api.get(getCategoryEndpoint)
                .then(response => {
                    setInputs(response.data);
                })
                .catch(error => {
                    console.error('Erro ao carregar categoria:', error);
                })
                .finally(() => {
                    setLoading(false);
                });
        } catch (error) {
            console.error('Erro ao carregar dados:', error);
        } finally {
            setLoading(false);
        }
    }

    async function handleSubmit(event) {
        event.preventDefault();
        setLoading(true);
        const editCategoryEndpoint = "admin/alterar_categoria";
        try {
            console.log(inputs)
            const response = await api.post(editCategoryEndpoint, inputs);
            if (response.status === 204) {
                navigate('/categories');
            } else {
                console.log(response);
            }
        } catch (error) {
            if (error?.response?.data) {
                setErrors(parseErrors(error.response.data));
            }
        } finally {
            setLoading(false);
        }
    }

    function localHandleChange(event) {
        handleChange(event, inputs, setInputs);
    }

    useEffect(() => {
        if(idCategoria)
        {
            loadData(idCategoria);
        }
    }, [idCategoria]);

    return (
        <>
            <div className="d-flex justify-content-between align-items-center">
                <h1>Alteração de Categoria</h1>
            </div>
            <form onSubmit={handleSubmit} noValidate autoComplete='off' className='mb-3'>
                <CategoryForm 
                    handleChange={localHandleChange} 
                    inputs={inputs} 
                    errors={errors} 
                    isNew={false} 
                />
                <FormButtons cancelTarget="/categories" />
            </form>
            {loading && <Loading />}
        </>
    );
}

export default EditCategory;