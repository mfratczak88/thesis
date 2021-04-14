import { Repositories, QueryHandlers, OtherProviders } from './setup';

export const providers = [
  ...Repositories,
  ...QueryHandlers,
  ...OtherProviders
]