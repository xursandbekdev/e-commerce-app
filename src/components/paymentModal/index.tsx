import React from 'react';
import {
  Modal,
  Box,
  Typography,
  Button,
  IconButton,
  Backdrop,
  Fade,
} from '@mui/material';
import { Close } from '@mui/icons-material';
import { useTranslation } from 'react-i18next'; 

interface PaymentModalProps {
  open: boolean;
  onClose: () => void;
  total: number;
  contractNumber: string;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ open, onClose, total, contractNumber }) => {
  const { t, i18n } = useTranslation(); 
  const handlePaymentSubmit = () => {
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = 'https://checkout.paycom.uz';

    const merchantInput = document.createElement('input');
    merchantInput.type = 'hidden';
    merchantInput.name = 'merchant';
    merchantInput.value = '681493f861dd3eed7be05940';

    const contractInput = document.createElement('input');
    contractInput.type = 'hidden';
    contractInput.name = 'account[contract_number]';
    contractInput.value = contractNumber;

    const amountInput = document.createElement('input');
    amountInput.type = 'hidden';
    amountInput.name = 'amount';
    amountInput.value = (total * 100).toString(); 

    form.appendChild(merchantInput);
    form.appendChild(contractInput);
    form.appendChild(amountInput);

    document.body.appendChild(form);
    form.submit();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-bg p-4 sm:p-6 rounded-lg shadow-xl w-[90%] max-w-md">
          <div className="flex justify-between items-center mb-4">
            <Typography variant="h6" className="text-sm sm:text-base">
              {t('payment')} {/* Tarjima */}
            </Typography>
            <IconButton onClick={onClose} size="small">
              <Close fontSize="small" />
            </IconButton>
          </div>
          <Typography variant="body2" className="mb-4 text-xs sm:text-sm">
            {t('totalPayment')}: {new Intl.NumberFormat(i18n.language === 'uz' ? 'uz-UZ' : 'en-US').format(total)} {t('currency')} {/* Tarjima */}
          </Typography>
          <Typography variant="body2" className="mb-4 text-xs sm:text-sm">
            {t('orderNumber')}: {contractNumber} {/* Tarjima */}
          </Typography>
          <Button
            variant="contained"
            fullWidth
            onClick={handlePaymentSubmit}
            className="bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm"
          >
            {t('payWithPayme')} {/* Tarjima */}
          </Button>
        </Box>
      </Fade>
    </Modal>
  );
};

export default PaymentModal;
