import { IContact } from "./ContactType";

export interface IContactTableProps {
    contacts: IContact[];
    onDelete: (id: string) => void;
    onEdit: (contact: IContact) => void;
}