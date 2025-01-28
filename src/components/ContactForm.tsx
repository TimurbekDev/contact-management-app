import React, { useState, useEffect } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from "@mui/material";
import { IContact } from "../types/ContactType";

interface ContactFormProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (contact: IContact) => void;
    editContact?: IContact | null;
}

export const ContactForm: React.FC<ContactFormProps> = ({
    open,
    onClose,
    onSubmit,
    editContact,
}) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    useEffect(() => {
        if (editContact) {
            setName(editContact.name);
            setEmail(editContact.email);
            setPhone(editContact.phone);
        } else {
            setName("");
            setEmail("");
            setPhone("");
        }
    }, [editContact]);

    const handleSubmit = () => {
        const newContact: IContact = {
            id: editContact?.id || Date.now().toString(),
            name,
            email,
            phone,
        };
        onSubmit(newContact);
        onClose();
        setName("");
        setEmail("");
        setPhone("");
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{editContact ? "Edit Contact" : "Add Contact"}</DialogTitle>
            <DialogContent>
                <TextField
                    fullWidth
                    label="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    margin="dense"
                />
                <TextField
                    fullWidth
                    label="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    margin="dense"
                />
                <TextField
                    fullWidth
                    label="Phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    margin="dense"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleSubmit} variant="contained">
                    {editContact ? "Update" : "Add"}
                </Button>
            </DialogActions>
        </Dialog>
    );
};
