import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button, Typography, Stack, TextField, IconButton, InputAdornment } from '@mui/material';
import { 
  Delete as DeleteIcon, 
  Add as AddIcon, 
  Edit as EditIcon, 
  Search as SearchIcon,
  Clear as ClearIcon 
} from '@mui/icons-material';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { wmsService } from "../api/wmsService.js";
import ProductModal from "../components/ProductModal.jsx";

const ProductsPage = () => {
  const queryClient = useQueryClient();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  
  const [searchTerm, setSearchTerm] = useState('');

  const { data, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: () => wmsService.getProducts(),
  });

  const deleteMutation = useMutation({
    mutationFn: wmsService.deleteProduct,
    onSuccess: () => queryClient.invalidateQueries(['products'])
  });

  const filteredRows = React.useMemo(() => {
    if (!data) return [];
    return data.filter((row) => 
      row.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.sku?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [data, searchTerm]);

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  const columns = [
    { field: 'sku', headerName: 'Артикул', width: 130 },
    { field: 'name', headerName: 'Название', flex: 1 },
    { 
      field: 'category', 
      headerName: 'Категория', 
      width: 180,
      valueGetter: (value, row) => row.category?.name || '—'
    },
    { 
      field: 'unitPrice', 
      headerName: 'Цена', 
      width: 130, 
      type: 'number',
      valueFormatter: (value) => value ? `${Number(value).toLocaleString()} ₽` : '—'
    },
    {
      field: 'actions',
      headerName: 'Действия',
      sortable: false,
      width: 120,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          <IconButton color="primary" onClick={() => handleEdit(params.row)} size="small">
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton color="error" onClick={() => {
            if (window.confirm('Удалить товар?')) deleteMutation.mutate(params.row.id);
          }} size="small">
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Stack>
      )
    }
  ];

  return (
    <Box sx={{ p: 4, height: '100vh', bgcolor: '#f5f5f5' }}>
      <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" fontWeight="bold">Товары на складе</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => { setSelectedProduct(null); setModalOpen(true); }}>
          Добавить товар
        </Button>
      </Stack>

      <Box sx={{ mb: 3, display: 'flex', gap: 2 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Поиск по названию или артикулу..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ bgcolor: 'white', borderRadius: 1 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
            endAdornment: searchTerm && (
              <InputAdornment position="end">
                <IconButton onClick={() => setSearchTerm('')} size="small">
                  <ClearIcon />
                </IconButton>
              </InputAdornment>
            )
          }}
        />
      </Box>

      <Box sx={{ height: 650, bgcolor: 'white', borderRadius: 2, boxShadow: 1 }}>
        <DataGrid
          rows={filteredRows}
          columns={columns}
          loading={isLoading}
          getRowId={(row) => row.id}
          sortingOrder={['asc', 'desc', null]}
          disableRowSelectionOnClick
          localeText={{ noRowsLabel: 'Ничего не найдено' }}
        />
      </Box>

      <ProductModal 
        open={modalOpen} 
        onClose={() => setModalOpen(false)} 
        initialData={selectedProduct} 
      />
    </Box>
  );
};

export default ProductsPage;