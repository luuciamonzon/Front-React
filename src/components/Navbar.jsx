import { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from 'primereact/button';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  if (!user) {
    return (
      <nav className="navbar">
        <div className="container">
          <div className="navbar-content">
            <Link to="/" className="navbar-brand">
              🏢 CRUD Enterprise
            </Link>
            
            <div style={{ display: 'flex', gap: '1rem' }}>
              <Link to="/inicio-sesion">
                <Button 
                  label="Iniciar Sesión" 
                  className="btn btn-outline"
                />
              </Link>
              <Link to="/registro">
                <Button 
                  label="Registrarse" 
                  className="btn btn-primary"
                />
              </Link>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-content">
          <Link to="/" className="navbar-brand">
            🏢 CRUD Enterprise
          </Link>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '1rem',
              padding: '0.5rem 1rem',
              backgroundColor: 'var(--gray-100)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--gray-200)'
            }}>
              <span style={{ color: 'var(--gray-700)', fontSize: '0.875rem' }}>
                👋 <strong>{user.nombre}</strong>
              </span>
              <span className={`badge badge-${user.rol}`}>
                {user.rol === 'admin' ? '👑 Admin' : 
                 user.rol === 'moderador' ? '🛡️ Moderador' : '👤 Cliente'}
              </span>
            </div>
            
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <Link to="/">
                <Button 
                  label="Inicio" 
                  className={`btn ${isActive('/') ? 'btn-primary' : 'btn-outline'}`}
                />
              </Link>
              
              <Link to="/productos">
                <Button 
                  label="Productos" 
                  className={`btn ${isActive('/productos') ? 'btn-primary' : 'btn-outline'}`}
                />
              </Link>
              
              {user.rol === 'admin' && (
                <Link to="/usuarios">
                  <Button 
                    label="Panel Admin" 
                    className={`btn ${isActive('/usuarios') ? 'btn-warning' : 'btn-outline'}`}
                  />
                </Link>
              )}
              
              <Button 
                label="Cerrar Sesión" 
                icon="pi pi-sign-out"
                className="btn btn-danger" 
                onClick={logout}
              />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;