import { Route, Controller, Get, Post, Delete, Body, Path, Security } from 'tsoa'
import { MessageModel } from '../models/Message'

interface BasicResponse { message: string }

@Route('public/messages')
export class MessagesController extends Controller {

  @Get('{sender}')
  async getMessages (@Path('sender') sender: string): Promise<BasicResponse> {
    return { message: 'Hello!' }
  }

  @Post('')
  async postMessage (@Body() message: MessageModel): Promise<BasicResponse> {
    return { message: 'OK' }
  }
}
