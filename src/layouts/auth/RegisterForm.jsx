import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext"
import {Formik, Form, Field, ErrorMessage} from 'formik'
import * as Yup from 'yup'
import { InputText } from "primereact/inputtext"
import { InputNumber } from "primereact/inputnumber"
import { Password } from 'primereact/password';
import { Button } from "primereact/button"
import { Link } from "react-router-dom"

const RegisterForm = () => {
    const {register} = useContext(AuthContext)

    const initialValues = {
        nombre:'',
        email:'',
        password:'',
        edad:null,
    }

    const validationSchema= Yup.object({
        nombre: Yup.string().required('Campo requerido'),
        email: Yup.string().email('Email inválido').required('Campo requerido'),
        password: Yup.string().min(6,'Mínimo 6 caracteres').required('Campo requerido'),
        edad: Yup.string().min(1).required('Campo requerido')
    })

    const onSubmit = async (values) =>{
        console.log("llego");
        
        await register(values)
    }

    return(
        <div className="form-container">
            <div className="form-card">
                <div className="form-header">
                    <h1 className="form-title">Crear Cuenta</h1>
                    <p className="form-subtitle">
                        Completa el formulario para registrarte
                    </p>
                </div>

                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                    {({handleChange, values, setFieldValue})=>(
                        <Form>
                            <div className="form-group">
                                <label className="form-label">Nombre</label>
                                <InputText 
                                    name='nombre' 
                                    value={values.nombre} 
                                    onChange={handleChange}
                                    className="form-input"
                                    placeholder="Tu nombre completo"
                                />
                                <span className="form-error">
                                    <ErrorMessage name='nombre'/>
                                </span>
                            </div>

                            <div className="form-group">
                                <label className="form-label">Email</label>
                                <InputText 
                                    name='email' 
                                    value={values.email} 
                                    onChange={handleChange}
                                    className="form-input"
                                    placeholder="tu@email.com"
                                />
                                <span className="form-error">
                                    <ErrorMessage name='email'/>
                                </span>
                            </div>

                            <div className="form-group">
                                <label className="form-label">Contraseña</label>
                                <Password 
                                    name="password" 
                                    value={values.password}  
                                    onChange={handleChange}
                                    inputClassName="form-input"
                                    placeholder="Mínimo 6 caracteres"
                                />
                                <span className="form-error">
                                    <ErrorMessage name='password'/>
                                </span>
                            </div>

                            <div className="form-group">
                                <label className="form-label">Edad</label>
                                <InputNumber 
                                    name='edad' 
                                    value={values.edad} 
                                    onValueChange={(e)=>setFieldValue('edad',e.value)}  
                                    min={1} 
                                    max={90}
                                    className="form-input"
                                    placeholder="Tu edad"
                                />
                                <span className="form-error">
                                    <ErrorMessage name='edad'/>
                                </span>
                            </div>

                            <Button 
                                label="Registrarse" 
                                type='submit'
                                className="btn btn-success"
                                style={{ width: '100%' }}
                            />

                            <div className="text-center mt-3">
                                <p className="text-muted mb-1">
                                    ¿Ya tienes una cuenta?
                                </p>
                                <Link to="/inicio-sesion" className="text-primary">
                                    Inicia sesión aquí
                                </Link>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
}

export default RegisterForm