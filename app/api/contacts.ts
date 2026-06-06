import axios from "axios";
import { ContactType } from "../_types/contact";

const API_URL = "http://localhost:3001";

export const getContacts = async (userID:string) => {
    const response = await axios.get(`${API_URL}/contacts?userID=${userID}`);
    return response.data;
};

export const getContactsById = async (id:string) => {
    const response = await axios.get(`${API_URL}/contacts/${id}`);
    return response.data;
};

export const createContact = async (contact :ContactType) => {
    const response = await axios.post(`${API_URL}/contacts`,contact);
    return response.data;
};

export const deteleContact = async (id:string, contact:ContactType) => {
    const response = await axios.delete(`${API_URL}/contacts/${id}`, { data: contact });
    return response.data;
};

export const updateContact = async (id:string, contact:ContactType) => {
    const response = await axios.put(`${API_URL}/contacts/${id}`,contact);
    return response.data;
};