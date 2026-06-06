export type ContactFormState = {
  success: boolean;
  message: string;
  errors: {
    name?: string;
    email?: string;
    id?: string;
    form?: string;
  };
};

export const initialContactFormState: ContactFormState = {
  success: false,
  message: "",
  errors: {},
};
