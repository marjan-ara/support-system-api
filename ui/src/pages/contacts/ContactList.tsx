import React, { useState } from 'react';
import { useGetContactsQuery } from '../../api/queries/useGetContactsQuery';
import { Box, Button, Modal, Stack, TextField, Typography } from '@mui/material';
import ContactCard from './ContactCard';
import useCreateContactMutation from '../../api/mutations/useCreateContactMutation';

const ContactList = () => {
  const { data, isLoading, error } = useGetContactsQuery();
  const createContact = useCreateContactMutation();

  const [openModal, setOpenModal] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  const createContactHandler = () => {
    if (!name || !email) {
      alert('Name and Email are required');
      return;
    }
    createContact.mutate(
      { name, email, phone, address },
      {
        onSuccess: () => {
          setOpenModal(false);
          setName('');
          setEmail('');
          setPhone('');
          setAddress('');
        },
        onError: (error) => {
          console.error('Error creating contact:', error);
          alert('Failed to create contact');
        },
      }
    );
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setName('');
    setEmail('');
    setPhone('');
    setAddress('');
  };

  return (
    <Stack spacing={2} width="100%" height="100%">
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <TextField id="search" placeholder="Search" size="small" />
        <Button variant="contained" color="primary" onClick={() => setOpenModal(true)}>
          Add Contact
        </Button>
      </Box>
      <Box
        sx={{
          flexGrow: '1',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
          gridTemplateRows: 'repeat(auto-fill, minmax(150px, 1fr))',
          gap: '1rem',
          overflowY: 'auto',
        }}
      >
        {isLoading && <div>Loading...</div>}
        {!!error && <div>Error loading contacts</div>}
        {data &&
          data.map((contact) => (
            <ContactCard
              key={contact.id}
              name={contact.name}
              email={contact.email}
              phone={contact.phone}
            />
          ))}
      </Box>

      <Modal open={openModal} onClose={handleCloseModal}>
        <Stack
          spacing={2}
          width="400px"
          height="300px"
          padding={2}
          sx={{ backgroundColor: 'white', margin: 'auto', marginTop: '10%' }}
        >
          <Typography variant="h6" component="h2">
            Add Contact
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            gap={2}
            flexGrow={1}
            alignItems="center"
            justifyContent="center"
          >
            <Box display="flex" justifyContent="space-between" alignItems="center" gap={2}>
              <TextField
                size="small"
                id="name"
                label="Name"
                variant="outlined"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <TextField
                size="small"
                id="email"
                label="Email"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Box>
            <Box display="flex" justifyContent="space-between" alignItems="center" gap={2}>
              <TextField
                size="small"
                id="phone"
                label="Phone"
                variant="outlined"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <TextField
                size="small"
                id="address"
                label="Address"
                variant="outlined"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </Box>
          </Box>
          <Stack spacing={1}>
            <Button variant="contained" color="primary" onClick={createContactHandler}>
              Save
            </Button>
            <Button variant="outlined" color="secondary" onClick={handleCloseModal}>
              Cancel
            </Button>
          </Stack>
        </Stack>
      </Modal>
    </Stack>
  );
};

export default ContactList;
