import { IContact } from "./ContactType";

export interface IContactFormProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (contact: IContact) => void;
    editContact?: IContact | null;
}