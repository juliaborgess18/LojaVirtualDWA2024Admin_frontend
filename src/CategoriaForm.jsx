import PropTypes from 'prop-types';
import FormInput from "./FormInput"

const CategoriaForm = ({ handleChange, inputs, errors }) => {
    return (
        <>
            <div className="row">
                <div className="col-12 mb-3">
                    <FormInput type="text" field="nome" label="Nome" value={inputs?.nome} onChange={handleChange} error={errors?.nome} autofocus={true} />
                </div>
            </div>
        </>
    );
}

CategoriaForm.propTypes = {
    handleChange: PropTypes.func.isRequired,
    inputs: PropTypes.object.isRequired,
    errors: PropTypes.object
};

export default CategoriaForm;