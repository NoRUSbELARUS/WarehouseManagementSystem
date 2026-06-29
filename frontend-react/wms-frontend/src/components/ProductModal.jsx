import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, TextField, Button, Stack, MenuItem } from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { wmsService } from '../api/wmsService.js';

const modalStyle = {
  position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
  width: 450, bgcolor: 'background.paper', boxShadow: 24, p: 4, borderRadius: 3
};

const ProductModal = ({ open, onClose, initialData }) => {
  const queryClient = useQueryClient();
  const [form, setForm] = useState({ sku: '', name: '', unitPrice: '', categoryId: '', supplierId: '' });

  useEffect(() => {
    if (initialData) {
      setForm({
        sku: initialData.sku,
        name: initialData.name,
        unitPrice: initialData.unitPrice,
        categoryId: initialData.category?.id || '',
        supplierId: initialData.supplier?.id || ''
      });
    } else {
      setForm({ sku: '', name: '', unitPrice: '', categoryId: '', supplierId: '' });
    }
  }, [initialData, open]);

  const { data: categories } = useQuery({ queryKey: ['categories'], queryFn: wmsService.getCategories });
  const { data: suppliers } = useQuery({ queryKey: ['suppliers'], queryFn: wmsService.getSuppliers });

  const mutation = useMutation({
    mutationFn: (data) => initialData 
      ? wmsService.updateProduct(initialData.id, data) 
      : wmsService.createProduct(data),
    onSuccess: () => {
      queryClient.invalidateQueries(['products']);
      onClose();
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(form);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle}>
        <Typography variant="h6" mb={3} fontWeight="bold">
          {initialData ? 'Редактировать товар' : 'Новый товар'}
        </Typography>
        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField label="SKU" fullWidth required value={form.sku} onChange={(e) => setForm({...form, sku: e.target.value})} />
            <TextField label="Название" fullWidth required value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} />
            <TextField label="Цена" type="number" fullWidth required value={form.unitPrice} onChange={(e) => setForm({...form, unitPrice: e.target.value})} />
            <TextField select label="Категория" fullWidth required value={form.categoryId} onChange={(e) => setForm({...form, categoryId: e.target.value})}>
              {categories?.map(c => <MenuItem key={c.id} value={c.id}>{c.name}</MenuItem>)}
            </TextField>
            <TextField select label="Поставщик" fullWidth required value={form.supplierId} onChange={(e) => setForm({...form, supplierId: e.target.value})}>
              {suppliers?.map(s => <MenuItem key={s.id} value={s.id}>{s.name}</MenuItem>)}
            </TextField>
            <Button type="submit" variant="contained" fullWidth size="large">
              {initialData ? 'Сохранить изменения' : 'Создать'}
            </Button>
          </Stack>
        </form>
      </Box>
    </Modal>
  );
};

export default ProductModal;