import { Avatar, IconButton, Paper, Stack, Typography } from '@mui/material';
import React from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { grey } from '@mui/material/colors';

interface ContactCardProps {
  name: string;
  email: string;
  phone?: string;
}

const ContactCard: React.FC<ContactCardProps> = ({ name, email, phone }) => {
  return (
    <Paper
      elevation={1}
      sx={{
        // width: '100%',
        height: '150px',
        display: 'flex',
        alignItems: 'center',
        border: '1px solid #E8E8E8',
        position: 'relative',
      }}
    >
      <IconButton sx={{ position: 'absolute', top: 6, right: 6 }} size="small">
        <MoreVertIcon />
      </IconButton>
      <Stack direction="row" spacing={2} padding={2} width="100%">
        <Avatar sx={{ height: '4rem', width: '4rem' }}>{name.substring(0, 1)}</Avatar>
        <Stack spacing={0.5} width="100%">
          <Typography variant="h6">{name}</Typography>
          <Typography variant="body1" color="primary">
            {email}
          </Typography>
          <Typography variant="body1" color={grey[600]}>
            {phone ? phone : 'No phone number provided'}
          </Typography>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default ContactCard;
