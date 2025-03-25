import { NextPage } from 'next';
import { AppProps } from 'next/app';
import { ReactElement, ReactNode } from 'react';

// Layout Types
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

// Route Types
export type DynamicRoute = {
  params: { [key: string]: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

// API Types
export type NextApiHandler<T = any> = (
  req: NextApiRequest,
  res: NextApiResponse<T>
) => void | Promise<void>;

export type NextApiConfig = {
  api?: {
    bodyParser?: boolean | { sizeLimit?: string };
    externalResolver?: boolean;
  };
}; 