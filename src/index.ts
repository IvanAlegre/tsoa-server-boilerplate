import { Express } from './config/Express'
import * as log from './config/Logger'

class Main {
  constructor () {
    this.main()
      .catch(log.error)
  }

  private async main () {
    const express = new Express()
    const server = await express.listen(3000)

    // Store reference to server
    log.info('App is listening on 3000')
  }
}

new Main()