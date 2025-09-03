import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { useProductContext } from '../../context/ProductContext';
import { AuthContext } from '../../context/AuthContext';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';

export default function ProductsView() {
  const { products, deleteProduct } = useProductContext();
  const { user } = useContext(AuthContext);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = products.filter(product =>
    product.nombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.precio?.toString().includes(searchTerm)
  );

  const handleDelete = (id) => {
    confirmDialog({
      message: '¿Estás seguro de que quieres eliminar este producto?',
      header: 'Confirmar eliminación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => deleteProduct(id),
      acceptClassName: 'btn btn-danger',
      rejectClassName: 'btn btn-secondary'
    });
  };

  const actionTemplate = (rowData) => {
    if (user?.rol !== 'admin') return null;
    
    return (
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <Link to={`/productos/editar/${rowData.id}`}>
          <Button 
            icon="pi pi-pencil" 
            className="btn btn-warning" 
            size="small"
            tooltip="Editar"
          />
        </Link>
        <Button 
          icon="pi pi-trash" 
          className="btn btn-danger" 
          size="small"
          onClick={() => handleDelete(rowData.id)}
          tooltip="Eliminar"
        />
      </div>
    );
  };

  const priceTemplate = (rowData) => {
    return `$${rowData.precio?.toFixed(2) || '0.00'}`;
  };

  return (
    <div className="container">
      <div className="card">
        <div className="card-header">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h2>Productos</h2>
              <p className="text-muted">Gestiona el catálogo de productos</p>
            </div>
            
            {user?.rol === 'admin' && (
              <Link to="/productos/crear">
                <Button 
                  label="Crear Producto" 
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
              placeholder="Buscar productos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-input"
              style={{ maxWidth: '300px' }}
            />
          </div>

          <div className="table-container">
            <DataTable
              value={filteredProducts}
              paginator
              rows={10}
              rowsPerPageOptions={[5, 10, 25, 50]}
              paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
              currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} productos"
              emptyMessage="No se encontraron productos"
              className="table"
              stripedRows
              responsiveLayout="scroll"
            >
              <Column field="id" header="ID" sortable style={{ width: '80px' }} />
              <Column field="nombre" header="Nombre" sortable />
              <Column field="precio" header="Precio" sortable body={priceTemplate} />
              <Column field="createdAt" header="Fecha Creación" sortable 
                body={(rowData) => new Date(rowData.createdAt).toLocaleDateString()} />
              <Column field="updatedAt" header="Última Actualización" sortable 
                body={(rowData) => new Date(rowData.updatedAt).toLocaleDateString()} />
              {user?.rol === 'admin' && (
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