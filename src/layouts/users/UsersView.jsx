import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { useUserContext } from '../../context/UserContext';
import { AuthContext } from '../../context/AuthContext';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';

export default function UsersView() {
  const { users, deleteUser } = useUserContext();
  const { user: currentUser } = useContext(AuthContext);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUsers = users.filter(user =>
    user.nombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.rol?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id) => {
    if (id === currentUser?.id) {
      alert('No puedes eliminar tu propia cuenta');
      return;
    }
    
    confirmDialog({
      message: '¿Estás seguro de que quieres eliminar este usuario?',
      header: 'Confirmar eliminación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => deleteUser(id),
      acceptClassName: 'btn btn-danger',
      rejectClassName: 'btn btn-secondary'
    });
  };

  const actionTemplate = (rowData) => {
    if (currentUser?.rol !== 'admin') return null;
    
    return (
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <Link to={`/usuarios/editar/${rowData.id}`}>
          <Button 
            icon="pi pi-pencil" 
            className="btn btn-warning" 
            size="small"
            tooltip="Editar"
          />
        </Link>
        {rowData.id !== currentUser?.id && (
          <Button 
            icon="pi pi-trash" 
            className="btn btn-danger" 
            size="small"
            onClick={() => handleDelete(rowData.id)}
            tooltip="Eliminar"
          />
        )}
      </div>
    );
  };

  const roleTemplate = (rowData) => {
    return (
      <span className={`badge badge-${rowData.rol}`}>
        {rowData.rol === 'admin' ? '👑 Admin' : 
         rowData.rol === 'moderador' ? '🛡️ Moderador' : '👤 Cliente'}
      </span>
    );
  };

  const dateTemplate = (rowData, field) => {
    return new Date(rowData[field]).toLocaleDateString();
  };

  return (
    <div className="container">
      <div className="card">
        <div className="card-header">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h2>Usuarios</h2>
              <p className="text-muted">Gestiona los usuarios del sistema</p>
            </div>
            
            {currentUser?.rol === 'admin' && (
              <Link to="/usuarios/crear">
                <Button 
                  label="Crear Usuario" 
                  icon="pi pi-plus" 
                  className="btn btn-success"
                />
              </Link>
            )}
          </div>
        </div>

        <div className="card-body">
          <div className="mb-3">
            <InputText
              placeholder="Buscar usuarios..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-input"
              style={{ maxWidth: '300px' }}
            />
          </div>

          <div className="table-container">
            <DataTable
              value={filteredUsers}
              paginator
              rows={10}
              rowsPerPageOptions={[5, 10, 25, 50]}
              paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
              currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} usuarios"
              emptyMessage="No se encontraron usuarios"
              className="table"
              stripedRows
              responsiveLayout="scroll"
            >
              <Column field="id" header="ID" sortable style={{ width: '80px' }} />
              <Column field="nombre" header="Nombre" sortable />
              <Column field="email" header="Email" sortable />
              <Column field="edad" header="Edad" sortable style={{ width: '80px' }} />
              <Column field="rol" header="Rol" sortable body={roleTemplate} />
              <Column field="createdAt" header="Fecha Creación" sortable 
                body={(rowData) => dateTemplate(rowData, 'createdAt')} />
              <Column field="updatedAt" header="Última Actualización" sortable 
                body={(rowData) => dateTemplate(rowData, 'updatedAt')} />
              {currentUser?.rol === 'admin' && (
                <Column header="Acciones" body={actionTemplate} style={{ width: '120px' }} />
              )}
            </DataTable>
          </div>
        </div>
      </div>

      <ConfirmDialog />
    </div>
  );
}