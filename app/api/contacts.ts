import fs from "fs/promises";
import path from "path";
import { ContactType } from "../_types/contact";

type DbShape = {
    contact: ContactType[];
};

const dbPath = path.join(process.cwd(), "app", "_data", "db.json");

const readDb = async (): Promise<DbShape> => {
    const raw = await fs.readFile(dbPath, "utf-8");
    return JSON.parse(raw) as DbShape;
};

const writeDb = async (db: DbShape): Promise<void> => {
    await fs.writeFile(dbPath, JSON.stringify(db, null, 4), "utf-8");
};

const getContactUserId = (contact: ContactType) => String(contact.userID ?? contact.userId ?? "");

export const getContacts = async (userID:string) => {
    const db = await readDb();
    return db.contact.filter((contact) => String(contact.userID ?? contact.userId ?? "") === String(userID));
};

export const getContactsById = async (id:string) => {
    const db = await readDb();
    return db.contact.find((contact) => String(contact.id) === String(id)) ?? null;
};

export const createContact = async (contact :ContactType) => {
    const db = await readDb();
    const nextContact = {
        ...contact,
        id: contact.id ?? Date.now().toString(),
        userID: getContactUserId(contact),
    };
    db.contact.push(nextContact);
    await writeDb(db);
    return nextContact;
};

export const deteleContact = async (id:string) => {
    const db = await readDb();
    const removed = db.contact.find((item) => String(item.id) === String(id)) ?? null;
    db.contact = db.contact.filter((item) => String(item.id) !== String(id));
    await writeDb(db);
    return removed;
};

export const updateContact = async (id:string, contact:ContactType) => {
    const db = await readDb();
    const index = db.contact.findIndex((item) => String(item.id) === String(id));
    const updatedContact = {
        ...contact,
        id,
        userID: getContactUserId(contact),
    };

    if (index === -1) {
        db.contact.push(updatedContact);
    } else {
        db.contact[index] = updatedContact;
    }

    await writeDb(db);
    return updatedContact;
};