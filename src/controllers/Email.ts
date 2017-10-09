import { Route, Controller, Get, Post, Delete, Body, Path, Security } from 'tsoa'
import * as mailgun from 'mailgun-js'
import * as mailgen from 'mailgen'

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

  private generateMailBody(inputBody: string): string {
    const mailGenerator = new mailgen({
      theme: 'default',
      product: { name: 'Apiaddicts', link: 'http://apidaysmadrid.es' }
    })

    return mailGenerator.generate({
      body: {
        name: 'Stranger',
        intro: inputBody,
        action: {
          instructions: 'hola!!',
          button: {
            color: '#FF0000',
            text: 'Recoge tus entradas',
            link: 'http://apidaysmadrid.es'
          }
        }
      }
    })
  }

  @Post('')
  async postEmail (@Body() email: InputGeneralEmail): Promise<BasicResponse> {
    const messageSender = mailgun({
      apiKey: process.env.MAILGUN_API_KEY,
      domain: MAILGUN_DOMAIN
    }).messages()

    await messageSender.send({
      from: FROM_EMAIL,
      subject: email.subject,
      html: this.generateMailBody(email.body),
      to: email.recipients.join(',')
    })
    return { message: `Email to ${email.recipients.join(', ')} sent` }
  }
}
