import Router from '@koa/router';
import { User } from 'app-types';
import Koa, { Next, ParameterizedContext, Request } from 'koa';
import { Template } from 'mailer';

export * from 'app-types';

export interface AppKoaContextState {
  user: User;
  accessToken: string;
}

type JSONPrimitive = string | number | boolean;

export type CustomErrors = Record<string, JSONPrimitive>;

export interface AppKoaContext<T = unknown, R = unknown> extends ParameterizedContext<AppKoaContextState> {
  request: Request & R;
  validatedData: T & object;
  throwError: (message: string, status?: number) => never;
  assertError: (condition: unknown, message: string, status?: number) => asserts condition;
  throwClientError: (errors: CustomErrors, status?: number) => never;
  assertClientError: (condition: unknown, errors: CustomErrors, status?: number) => asserts condition;
  throwGlobalErrorWithRedirect: (message: string, redirectUrl?: string) => void;
}

export class AppRouter extends Router<AppKoaContextState, AppKoaContext> {}

export class AppKoa extends Koa<AppKoaContextState, AppKoaContext> {}

export type AppRouterMiddleware = Router.Middleware<AppKoaContextState, AppKoaContext>;

export type ValidationErrors = Record<string, JSONPrimitive | JSONPrimitive[]>;

export { Next, Template };
