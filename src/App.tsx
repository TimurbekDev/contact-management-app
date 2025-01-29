import React, { useState, useEffect } from "react";
import { Container, Button, Box, Paper, InputBase } from "@mui/material";
import { ContactForm } from "./components/ContactForm";
import { ContactTable } from "./components/ContactTable";
import { IContact } from "./types/ContactType";
import { addContact, deleteContact, getAllContacts, updateContact } from "./services";

const App: React.FC = () => {

  const [contacts, setContacts] = useState<IContact[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editContact, setEditContact] = useState<IContact | null>(null);

  const fetchContacts = async () => {
    const contacts = await getAllContacts()
    setContacts(contacts);
  };


  useEffect(() => {
    fetchContacts();
  }, []);

  const handleAddContact = async (payload: IContact) => {
    await addContact(payload);
    fetchContacts()
  };

  const handleUpdateContact = async (payload: IContact) => {
    await updateContact(payload)
    fetchContacts()
  };

  const handleDeleteContact = async (id: string) => {
    await deleteContact(id);
    fetchContacts()
  };



  const handleSearchChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();

    if (value == '') fetchContacts()
    else {
      setContacts((await getAllContacts()).filter((contact: IContact) => contact.name.includes(value)))
    }
  };


  const handleEditClick = (contact: IContact) => {
    setEditContact(contact);
    setIsModalOpen(true);
  };

  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          gap: "10px",
          marginBlock: "10px",
          justifyContent: "center",
        }}
      >
        <Paper>
          <InputBase
            sx={{ ml: 1, flex: 1, padding: "3px", textAlign: "center" }}
            placeholder="Search contact"
            onChange={handleSearchChange}
          />
        </Paper>
        <Button
          style={{ backgroundColor: "blue", color: "white" }}
          onClick={() => {
            setEditContact(null);
            setIsModalOpen(true);
          }}
        >
          Add
        </Button>
      </Box>
      <ContactTable contacts={contacts} onDelete={handleDeleteContact} onEdit={handleEditClick} />
      <ContactForm open={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={editContact ? handleUpdateContact : handleAddContact} editContact={editContact} />
    </Container>
  );
};

export default App;
