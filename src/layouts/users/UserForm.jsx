import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useUserContext } from "../../context/UserContext"; 
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Dropdown } from 'primereact/dropdown';

// El schema se construirá dentro del componente para poder usar isEdit


export default function UserForm() {
  const { users, addUser, editUser } = useUserContext();
  const [showPassword, setShowPassword] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState({
    nombre: "",
    email: "",
    contrasenia: "",
    edad: 0,
    rol: 'cliente',
  });
  const { user: currentUser } = useContext(AuthContext);

  const isEdit = Boolean(id);
  const validationSchema = Yup.object({
    nombre: Yup.string().required("El nombre es requerido"),
    email: Yup.string().email("Debe ser un email válido").required("El email es requerido"),
    edad: Yup.number().typeError("La edad debe ser un número").integer("La edad debe ser un número entero").positive("La edad debe ser mayor que 0").required("La edad es requerida"),
    contrasenia: isEdit ? Yup.string().notRequired() : Yup.string().required("La contraseña es requerida").min(6, "La contraseña debe tener al menos 6 caracteres"),
    rol: Yup.mixed().oneOf(['cliente','moderador','admin']).required('El rol es requerido')
  });

  useEffect(() => {
    if (isEdit) {
      const user = users.find((p) => p.id === Number(id));
      if (user) {
        setInitialValues({
          nombre: user.nombre || "",
          email: user.email || "",
          contrasenia: user.contrasenia || "",
          edad: user.edad || 0,
          rol: user.rol || 'cliente',
        });
      }
    }
  }, [id, users]);

  const handleSubmit = async (values) => {
    if (isEdit) {
      const payload = {
        nombre: values.nombre,
        email: values.email,
        edad: Number(values.edad),
        rol: values.rol || 'cliente',
      };
      await editUser(Number(id), payload);
    } else {
      const payload = {
        nombre: values.nombre,
        email: values.email,
        password: values.contrasenia, // backend espera "password"
        edad: Number(values.edad),
        rol: values.rol || 'cliente',
      };
      await addUser(payload);
    }
    navigate("/usuarios");
  };

  // Verificar que solo los admins puedan acceder
  useEffect(() => {
    if (currentUser && currentUser.rol !== 'admin') {
      alert('Acceso denegado. Solo los administradores pueden gestionar usuarios.');
      navigate('/');
      return;
    }
  }, [currentUser, navigate]);

  // Si no es admin, mostrar mensaje de acceso denegado
  if (currentUser && currentUser.rol !== 'admin') {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <h2> Acceso Denegado</h2>
        <p>No tienes permisos para acceder a esta funcionalidad.</p>
        <p>Solo los administradores pueden gestionar usuarios.</p>
        <Button label="Volver al Inicio" onClick={() => navigate('/')} />
      </div>
    );
  }

  const roleOptions = [
    { label: 'Cliente', value: 'cliente' },
    { label: 'Moderador', value: 'moderador' },
    { label: 'Administrador', value: 'admin' }
  ];

  return (
    <div className="p-d-flex p-flex-column p-align-center p-mt-3">
      <h2>{isEdit ? "Editar" : "Crear"} Usuario</h2>
      <Formik
        initialValues={initialValues}
        enableReinitialize
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue }) => (
        <Form
          className="p-d-flex p-flex-column p-gap-3"
          style={{ width: "100%", maxWidth: "400px" }}
        >
          <div>
            <label>Nombre:</label>
            <Field
              name="nombre"
              className="p-inputtext p-component p-mb-3"
              placeholder="Nombre del usuario"
            />
            <ErrorMessage
              name="nombre"
              component="div"
              className="p-text-danger"
            />
          </div>

          <div>
            <label>Email:</label>
            <Field
              name="email"
              type="email"
              className="p-inputtext p-component p-mb-3"
              placeholder="email del usuario"
            />
            <ErrorMessage
              name="email"
              component="div"
              className="p-text-danger"
            />
          </div>
          {!isEdit&&(
          <div>
            <label>Contraseña:</label>
            <div className="p-inputgroup p-mb-1">
              <Field
                name="contrasenia"
                type={showPassword ? "text" : "password"}
                placeholder="Contraseña del usuario"
                className="p-inputtext p-component"
              />
              <span
                className="p-inputgroup-addon"
                style={{ cursor: "pointer" }}
                onClick={() => setShowPassword((prev) => !prev)}
              >
                <i className={`pi ${showPassword ? "pi-eye-slash" : "pi-eye"}`} />
              </span>
            </div>
            <ErrorMessage
              name="contrasenia"
              component="div"
              className="p-text-danger"
            />
          </div>
          )}
          <div>
            <label>Edad:</label>
            <Field
              name="edad"
              type="number"
              className="p-inputtext p-component p-mb-3"
              placeholder="Edad"
            />
            <ErrorMessage
              name="edad"
              component="div"
              className="p-text-danger"
            />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="rol" style={{ display: 'block', marginBottom: '0.5rem' }}>
              Rol:
            </label>
            <Dropdown
              id="rol"
              value={values.rol}
              options={roleOptions}
              onChange={(e) => setFieldValue('rol', e.value)}
              placeholder="Seleccionar rol"
              style={{ width: '100%' }}
            />
          </div>

          <div className="p-d-flex p-gap-3">
            <Button
              type="submit"
              label={isEdit ? "Actualizar" : "Crear"}
              className="p-button-success p-button-rounded"
            />
            <Button
              label="Volver"
              className="p-button-secondary p-button-rounded"
              onClick={() => navigate("/usuarios")}
              type="button"
            />
          </div>
        </Form>
        )}
      </Formik>
    </div>
  );
}
