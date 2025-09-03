import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext"
import {Formik, Form, Field, ErrorMessage} from 'formik'
import * as Yup from 'yup'
import { InputText } from "primereact/inputtext"
import { Password } from 'primereact/password';
import { Button } from "primereact/button"
import { Link } from "react-router-dom"
         
const LoginForm = () => {
    const {login} = useContext(AuthContext)

    const initialValuesUser = {
        email:'',
        password:''
    }

    const validationSchemaUser = Yup.object({
        email: Yup.string().email('Email inválido').required('Campo requerido'),
        password: Yup.string().required('Campo requerido')
    }) 

    const onSubmitLogin = async (values) =>{
        await login(values)
    }

    return(
        <div className="form-container">
            <div className="form-card">
                <div className="form-header">
                    <h1 className="form-title">Iniciar Sesión</h1>
                    <p className="form-subtitle">
                        Accede a tu cuenta para continuar
                    </p>
                </div>

                <Formik initialValues={initialValuesUser} validationSchema={validationSchemaUser} onSubmit={onSubmitLogin}>
                    {({handleChange, values})=>(
                        <Form>
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
                                    <ErrorMessage name='email' />
                                </span>
                            </div>
                            
                            <div className="form-group">
                                <label className="form-label">Contraseña</label> 
                                <Password 
                                    name="password" 
                                    value={values.password} 
                                    onChange={handleChange}
                                    inputClassName="form-input"
                                    placeholder="Tu contraseña"
                                />
                                <span className="form-error">
                                    <ErrorMessage name='password' />
                                </span>
                            </div>
                            
                            <Button 
                                label='Iniciar Sesión' 
                                type='submit'
                                className="btn btn-primary"
                                style={{ width: '100%' }}
                            />

                            <div className="text-center mt-3">
                                <p className="text-muted mb-1">
                                    ¿No tienes una cuenta?
                                </p>
                                <Link to="/registro" className="text-primary">
                                    Regístrate aquí
                                </Link>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
}

export default LoginForm