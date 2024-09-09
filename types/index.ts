import { ReactElement, ReactPortal } from 'react';

export interface User {
  email: string;
  password: string;
  passwordConfirm: string;
  name: string;
};

type ReactText = string | number;
type ReactChild = ReactElement | ReactText;

interface ReactNodeArray extends Array<ReactNode> { }
type ReactFragment = ReactNodeArray;
type ReactNode = ReactChild | ReactFragment | ReactPortal | boolean | null | undefined;

export type Auth = {
  children: ReactNode
}
