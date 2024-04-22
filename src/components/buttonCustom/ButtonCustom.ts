import { styled } from '@mui/material/styles';
import Button, { ButtonProps } from '@mui/material/Button';
import { grey } from '@mui/material/colors';

export const ColorButton = styled(Button)<ButtonProps>(() => ({
    color: grey[50],
    backgroundColor: grey[600],
    padding: '1rem',
    borderRadius: '.375rem',
    fontSize: '1rem',
    textTransform: 'none',
    '&:hover': {
        backgroundColor: grey[800],
    },
}));