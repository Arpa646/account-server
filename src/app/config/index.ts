import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join((process.cwd(), '.env')) });

export default {
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  email_sender: process.env.EMAIL_SENDER,
  eamil_pass: process.env.EMAIL_PASS,
  url: process.env.URL,

};
