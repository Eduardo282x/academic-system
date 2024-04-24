import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#3b82f6',
        color: theme.palette.common.white,
        fontWeight: 'semi-bold'
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: '18px', // Tamaño de letra
        fontWeight: 'bold', // Tipo de letra en negrita
    },
}));

export type Actions = 'edit' | 'delete';