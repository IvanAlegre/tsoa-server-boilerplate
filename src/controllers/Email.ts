import { Route, Controller, Get, Post, Delete, Body, Path, Security } from 'tsoa'
import * as mailgun from 'mailgun-js'

const MAILGUN_DOMAIN = process.env.MAILGUN_DOMAIN
const FROM_EMAIL = `mailgun@${MAILGUN_DOMAIN}`

interface InputGeneralEmail {
  subject: string,
  body: string,
  recipients: string[]
}

interface BasicResponse {
  message: string
}

@Route('public/emails')
export class EmailsController extends Controller {

  @Post('')
  async postEmail (@Body() email: InputGeneralEmail): Promise<BasicResponse> {
    const messageSender = mailgun({
      apiKey: process.env.MAILGUN_API_KEY,
      domain: MAILGUN_DOMAIN
    }).messages()

    await messageSender.send({
      from: FROM_EMAIL,
      subject: email.subject,
      text: email.body,
      to: email.recipients.join(',')
    })
    return { message: `Email to ${email.recipients.join(', ')} sent` }
  }
}
