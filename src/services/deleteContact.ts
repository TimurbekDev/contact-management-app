import { customAxios } from "../utils/customAxios"

export const deleteContact = async (id: string | number) => {
    try {
        await customAxios.delete(`/contacts/${id}`)
    } catch (error) {
        console.error('Error deleting', error)
    }
}