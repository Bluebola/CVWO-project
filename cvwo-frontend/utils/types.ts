// Type definitions for the functions in the utils folder
export type actionFunction = (
    prevState: unknown,
    formData: FormData
  ) => Promise<{ message: string }>;
  