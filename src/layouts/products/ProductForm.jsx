import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useProductContext } from '../../context/ProductContext';
import { AuthContext } from '../../context/AuthContext';
import { Button } from 'primereact/button';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  nombre: Yup.string()
    .trim()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .required('El nombre es requerido'),
  precio: Yup.number()
    .typeError('El precio debe ser un número')
    .positive('El precio debe ser mayor que 0')
    .required('El precio es requerido'),
});

export default function ProductForm() {
  const { products, addProduct, editProduct, loading, error } = useProductContext();
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const isEdit = Boolean(id);

  const [initialValues, setInitialValues] = useState({
    nombre: '',
    precio: 0,
  });

  // Restringir acceso a admin
  useEffect(() => {
    if (user && user.rol !== 'admin') {
      alert('Acceso denegado. Solo los administradores pueden modificar productos.');
      navigate('/productos');
    }
  }, [user, navigate]);

  // Cargar valores iniciales desde el contexto
  useEffect(() => {
    if (isEdit && Array.isArray(products)) {
      const product = products.find((p) => p.id === Number(id));
      if (product) {
        setInitialValues({
          nombre: product.nombre || '',
          precio: product.precio || 0,
        });
      }
    }
  }, [isEdit, id, products]);

  const handleSubmit = async (values) => {
    if (isEdit) {
      await editProduct(Number(id), values);
    } else {
      await addProduct(values);
    }
    navigate('/productos');
  };

  if (user && user.rol !== 'admin') {
    return null;
  }

  return (
    <div className="p-d-flex p-flex-column p-align-center p-mt-3">
      <h2>{isEdit ? 'Editar' : 'Crear'} Producto</h2>
      <Formik
        initialValues={initialValues}
        enableReinitialize
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form
          className="p-d-flex p-flex-column p-gap-3"
          style={{ width: '100%', maxWidth: '400px' }}
        >
          <div>
            <label>Nombre:</label>
            <Field
              name="nombre"
              className="p-inputtext p-component p-mb-3"
              placeholder="Nombre del producto"
            />
            <ErrorMessage
              name="nombre"
              component="div"
              className="p-text-danger"
            />
          </div>

          <div>
            <label>Precio:</label>
            <Field
              name="precio"
              type="number"
              className="p-inputtext p-component p-mb-3"
              placeholder="Precio"
            />
            <ErrorMessage
              name="precio"
              component="div"
              className="p-text-danger"
            />
          </div>

          <div className="p-d-flex p-gap-3">
            <Button
              type="submit"
              label={isEdit ? 'Actualizar' : 'Crear'}
              className="p-button-success p-button-rounded"
              loading={loading}
            />
            <Button
              label="Volver"
              className="p-button-secondary p-button-rounded"
              onClick={() => navigate('/productos')}
              type="button"
            />
          </div>

          {error && (
            <div className="p-text-danger" style={{ marginTop: '0.5rem' }}>{error}</div>
          )}
        </Form>
      </Formik>
    </div>
  );
}
