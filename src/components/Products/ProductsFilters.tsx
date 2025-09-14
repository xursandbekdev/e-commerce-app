import React from 'react';
import { TextField, Button, IconButton, InputAdornment, FormControl, Select, MenuItem, InputLabel } from '@mui/material';
import { Add as AddIcon, Search as SearchIcon } from '@mui/icons-material';
import { useTranslation } from 'react-i18next'; // i18next hook

interface ProductsFiltersProps {
  searchName: string;
  setSearchName: React.Dispatch<React.SetStateAction<string>>;
  searchCategory: string;
  setSearchCategory: React.Dispatch<React.SetStateAction<string>>;
  viewMode: 'grid' | 'list';
  setViewMode: React.Dispatch<React.SetStateAction<'grid' | 'list'>>;
  isAdmin: boolean;
  onAddOpen: () => void;
}

const ProductsFilters: React.FC<ProductsFiltersProps> = ({
  searchName,
  setSearchName,
  searchCategory,
  setSearchCategory,
  viewMode,
  setViewMode,
  isAdmin,
  onAddOpen,
}) => {
  const { t } = useTranslation(); // Tarjima uchun hook

  return (
    <div className="mb-6 rounded-xl bg-white dark:bg-gray-800 p-5 shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
        <TextField
          fullWidth
          size="small"
          label={t('searchByName')}
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          className="bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton edge="end" className="text-gray-600 dark:text-gray-300">
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <FormControl fullWidth size="small">
          <InputLabel>{t('category')}</InputLabel>
          <Select
            value={searchCategory}
            label={t('category')}
            onChange={(e) => setSearchCategory(e.target.value)}
            className="bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          >
            <MenuItem value="">{t('allCategories')}</MenuItem>
            <MenuItem value="Laptop">{t('laptop')}</MenuItem>
            <MenuItem value="Phone">{t('phone')}</MenuItem>
            <MenuItem value="Moto">{t('moto')}</MenuItem>
            <MenuItem value="MacBook">{t('macbook')}</MenuItem>
          </Select>
        </FormControl>

        <div className="flex items-center justify-end gap-3">
          {isAdmin && (
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={onAddOpen}
              className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white"
            >
              {t('add')}
            </Button>
          )}
          <Button
            variant="outlined"
            onClick={() => setViewMode(viewMode === 'list' ? 'grid' : 'list')}
            className="text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400"
          >
            {viewMode === 'list' ? t('gridView') : t('listView')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductsFilters;
