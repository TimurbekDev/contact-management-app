import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Paper,
} from "@mui/material";
import { IContact } from "../types/ContactType";
import { Edit, Delete } from "@mui/icons-material";

interface ContactTableProps {
  contacts: IContact[];
  onDelete: (id: string) => void;
  onEdit: (contact: IContact) => void;
}

export const ContactTable: React.FC<ContactTableProps> = ({
  contacts,
  onDelete,
  onEdit,
}) => {
  return (
    <TableContainer component={Paper} sx={{ marginTop: 2 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {contacts.map((contact) => (
            <TableRow key={contact.id}>
              <TableCell>{contact.name}</TableCell>
              <TableCell>{contact.email}</TableCell>
              <TableCell>{contact.phone}</TableCell>
              <TableCell>
                <IconButton onClick={() => onEdit(contact)}>
                  <Edit color='warning' />
                </IconButton>
                <IconButton onClick={() => onDelete(contact.id)}>
                  <Delete color="error" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
