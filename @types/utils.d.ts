// Utility Types
type Nullable<T> = T | null;
type Optional<T> = T | undefined;
type ValueOf<T> = T[keyof T];
type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

// Function Types
type AsyncFunction<T = any> = (...args: any[]) => Promise<T>;
type SyncFunction<T = any> = (...args: any[]) => T;

// React Specific Types
type ReactChildren = {
  children: React.ReactNode;
};

type WithClassName<T = {}> = T & {
  className?: string;
};

// Form Types
type FormEvent = React.FormEvent<HTMLFormElement>;
type InputEvent = React.ChangeEvent<HTMLInputElement>;
type TextareaEvent = React.ChangeEvent<HTMLTextAreaElement>;
type SelectEvent = React.ChangeEvent<HTMLSelectElement>; 