import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Typography,
} from '@mui/material';
import { useTranslation } from 'react-i18next'; // i18next hook
import { type SelectChangeEvent } from '@mui/material/Select';
import type { Order, UpdateStatusRequest } from '../../interface';

interface StatusUpdateDialogProps {
  open: boolean;
  onClose: () => void;
  selectedOrder: Order | null;
  statusForm: UpdateStatusRequest;
  onStatusChange: (e: SelectChangeEvent) => void;
  onSubmit: () => void;
}

const StatusUpdateDialog: React.FC<StatusUpdateDialogProps> = ({
  open,
  onClose,
  selectedOrder,
  statusForm,
  onStatusChange,
  onSubmit,
}) => {
  const { t } = useTranslation(); // Tarjima uchun hook

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{t('updateStatus')}</DialogTitle>
      <DialogContent>
        <Typography>
          {t('orderDetails')}: {selectedOrder?.id}
        </Typography>
        <Typography>
          {t('customer')}: {selectedOrder?.customerName}
        </Typography>
        <FormControl fullWidth margin="normal">
          <InputLabel>{t('status')}</InputLabel>
          <Select value={statusForm.status} label={t('status')} onChange={onStatusChange}>
            <MenuItem value="PENDING">{t('pending')}</MenuItem>
            <MenuItem value="DELIVERED">{t('delivered')}</MenuItem>
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>{t('cancel')}</Button>
        <Button onClick={onSubmit} variant="contained" className="bg-primary text-white">
          {t('update')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default StatusUpdateDialog;