import { Route, Controller, Get, Post, Delete, Body, Path, Security } from 'tsoa'

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
    return { message: `Email to ${email.recipients.join(', ')} sent` }
  }
}
