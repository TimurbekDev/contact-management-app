import React, { useState, useCallback } from "react";
import { Container, Button, Box, Paper, InputBase, debounce } from "@mui/material";
import { ContactForm } from "./components/ContactForm";
import { ContactTable } from "./components/ContactTable";
import { IContact } from "./types/ContactType";

const App: React.FC = () => {
  const [contacts, setContacts] = useState<IContact[]>(
    JSON.parse(localStorage.getItem("contacts") || "[]")
  );
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editContact, setEditContact] = useState<IContact | null>(null);

  const updateLocalStorage = useCallback((updatedContacts: IContact[]) => {
    localStorage.setItem("contacts", JSON.stringify(updatedContacts));
  }, []);

  const handleAddContact = (contact: IContact) => {
    const updatedContacts = [...contacts, contact];
    setContacts(updatedContacts);
    updateLocalStorage(updatedContacts);
  };

  const handleUpdateContact = (updatedContact: IContact) => {
    const updatedContacts = contacts.map((contact: IContact) =>
      contact.id == updatedContact.id ? updatedContact : contact
    );
    setContacts(updatedContacts);
    updateLocalStorage(updatedContacts);
  };

  const handleDeleteContact = (id: string) => {
    const updatedContacts = contacts.filter((contact: IContact) => contact.id !== id);
    setContacts(updatedContacts);
    updateLocalStorage(updatedContacts);
  };

  const handleEditClick = (contact: IContact) => {
    setEditContact(contact);
    setIsModalOpen(true);
  };

  const handleSearch = debounce((searchTerm: string) => {
    const filteredContacts = JSON.parse(localStorage.getItem("contacts") || "[]").filter(
      (contact: IContact) => contact.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setContacts(filteredContacts);
  }, 300);

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
            onChange={(e) => handleSearch(e.target.value)}
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
      <ContactTable
        contacts={contacts}
        onDelete={handleDeleteContact}
        onEdit={handleEditClick}
      />
      <ContactForm
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={editContact ? handleUpdateContact : handleAddContact}
        editContact={editContact}
      />
    </Container>
  );
};

export default App;
