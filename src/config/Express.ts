import * as express  from 'express'
import * as morgan from 'morgan'
import * as bodyParser  from 'body-parser'
import { serve, setup } from 'swagger-ui-express'
import { Logger } from './Logger'
import '../controllers'
import { RegisterRoutes } from '../../build/routes'
import { ErrorHandler } from './ErrorHandler'

export class Express {

  private app
  private server

  constructor () {
    const app = this.app = express()

    app.disable('x-powered-by')
    app.enable('trust proxy')

    if (process.env.NODE_ENV === 'development') {
      app.use('/docs', serve, setup(require('../../build/swagger.json')))
      app.use(morgan('combined'))
    }

    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(bodyParser.json())
    app.get('/status', (req, res) => res.sendStatus(200))
    RegisterRoutes(app)

    app.use(ErrorHandler.getMiddleware())
  }

  getExpressApp () {
    return this.app
  }

  listen (port) {
    return new Promise((res) => {
      this.server = this.app.listen(port, res)
    })
  }
}
