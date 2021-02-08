export const SENDGRID_API_KEY =
  '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';
export const SENDGRID_USERNAME = 'apikey';
export const SENDGRID_SERVER = 'smtp.sendgrid.net';

export const IS_DEV = process.env.IS_DEV || false;
export const BASE_URL = IS_DEV
  ? 'http://localhost:3000/'
  : 'http://www.associacaovillageipanema.com.br/';
