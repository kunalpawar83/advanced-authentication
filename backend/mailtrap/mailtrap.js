import { MailtrapClient } from "mailtrap";

const TOKEN = "4ba2e3650ca4867950a863e0d0cb385b";

export const client = new MailtrapClient({
  token: TOKEN,
});

export const sender = {
  email: "hello@demomailtrap.com",
  name: "Kunal pawar",
};
