# Inquiry email alerts

The Pages inquiry function saves validated inquiries in the D1 database first. The email alert includes the inquiry ID, service, and private inbox link. Open the private inbox to read the visitor's details.

Configure one delivery option on the production Pages project.

- For an existing compatible `EMAIL` binding, set `INQUIRY_DESTINATION` to the verified alert inbox. Set `INQUIRY_NOTIFICATION_FROM` if the sender differs from the binding's existing sender.
- For Cloudflare Email Sending REST, set `INQUIRY_EMAIL_ACCOUNT_ID`, `INQUIRY_NOTIFICATION_FROM` and `INQUIRY_DESTINATION`. The sender must belong to an onboarded sending domain and the destination must be verified. Add `INQUIRY_EMAIL_API_TOKEN` as an encrypted Pages secret with the account's Email Sending permission.

Deploy with the production Turnstile key and active D1 binding. Submit one labeled test through the public Contact page and confirm that the private inbox and destination email show the same inquiry ID. A saved inquiry remains accessible if the email provider denies or times out on an alert.

[Cloudflare setup](https://developers.cloudflare.com/email-service/get-started/send-emails/) · [Verified destinations](https://developers.cloudflare.com/email-service/configuration/destination-addresses/)
