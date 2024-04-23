import { styled } from '@mui/material/styles';
import Button, { ButtonProps } from '@mui/material/Button';
import { orange } from '@mui/material/colors';

export const ColorButton = styled(Button)<ButtonProps>(() => ({
    color: orange[50],
    backgroundColor: orange[600],
    padding: '1rem',
    borderRadius: '.375rem',
    fontSize: '1rem',
    textTransform: 'none',
    '&:hover': {
        backgroundColor: orange[800],
    },
}));
