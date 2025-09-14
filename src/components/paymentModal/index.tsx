import {
    Modal,
    Box,
    Typography,
    Button,
    IconButton,
    Backdrop,
    Fade,
} from "@mui/material";
import { Close } from "@mui/icons-material";
//@ts-ignore
const PaymentModal = ({ open, onClose, total, contractNumber }) => {
    const handlePaymentSubmit = () => {
        const form = document.createElement("form");
        form.method = "POST";
        form.action = "https://checkout.paycom.uz";

        const merchantInput = document.createElement("input");
        merchantInput.type = "hidden";
        merchantInput.name = "merchant";
        merchantInput.value = "681493f861dd3eed7be05940";

        const contractInput = document.createElement("input");
        contractInput.type = "hidden";
        contractInput.name = "account[contract_number]";
        contractInput.value = contractNumber;

        const amountInput = document.createElement("input");
        amountInput.type = "hidden";
        amountInput.name = "amount";
        amountInput.value = (total * 100).toString(); // Convert to tiyin

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
                <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 sm:p-6 rounded-lg shadow-xl w-[90%] max-w-md">
                    <div className="flex justify-between items-center mb-4">
                        <Typography variant="h6" className="text-sm sm:text-base">
                            To'lovni amalga oshirish
                        </Typography>
                        <IconButton onClick={onClose} size="small">
                            <Close fontSize="small" />
                        </IconButton>
                    </div>
                    <Typography variant="body2" className="mb-4 text-xs sm:text-sm">
                        Jami to'lov: {new Intl.NumberFormat("uz-UZ").format(total)} so'm
                    </Typography>
                    <Typography variant="body2" className="mb-4 text-xs sm:text-sm">
                        Buyurtma raqami: {contractNumber}
                    </Typography>
                    <Button
                        variant="contained"
                        fullWidth
                        onClick={handlePaymentSubmit}
                        className="bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm"
                    >
                        Payme orqali to'lash
                    </Button>
                </Box>
            </Fade>
        </Modal>
    );
};

export default PaymentModal;