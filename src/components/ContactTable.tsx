import React, { useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Paper, Dialog, DialogTitle, Button } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { IContactTableProps } from "../types/ContactTableProps";

export const ContactTable: React.FC<IContactTableProps> = ({ contacts, onDelete, onEdit }) => {
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [selectedContact, setSelectedContact] = useState<string | null>(null);

  return (
    <div className="overflow-x-auto w-full p-4">
      <TableContainer component={Paper} className="shadow-md">
        <Table className="min-w-full">
          <TableHead>
            <TableRow className="bg-gray-200">
              <TableCell className="text-sm font-semibold">Name</TableCell>
              <TableCell className="text-sm font-semibold hidden md:table-cell">Email</TableCell>
              <TableCell className="text-sm font-semibold hidden md:table-cell">Phone</TableCell>
              <TableCell className="text-sm font-semibold">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {contacts.map((contact) => (
              <TableRow key={contact.id} className="border-b">
                <TableCell className="py-2">{contact.name}</TableCell>
                <TableCell className="py-2 hidden md:table-cell">{contact.email}</TableCell>
                <TableCell className="py-2 hidden md:table-cell">{contact.phone}</TableCell>
                <TableCell className="py-2 flex space-x-2">
                  <IconButton onClick={() => onEdit(contact)} size="small">
                    <Edit className="text-yellow-500" />
                  </IconButton>
                  <IconButton
                    onClick={() => {
                      setSelectedContact(contact.id);
                      setDeleteModal(true);
                    }}
                    size="small"
                  >
                    <Delete className="text-red-500" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={deleteModal} onClose={() => setDeleteModal(false)}>
        <DialogTitle>Are you sure you want to delete?</DialogTitle>
        <div className="flex gap-3 justify-end px-4 py-3">
          <Button onClick={() => setDeleteModal(false)} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              if (selectedContact !== null) onDelete(selectedContact);
              setDeleteModal(false);
            }}
            color="error"
          >
            Delete
          </Button>
        </div>
      </Dialog>
    </div>
  );
};
