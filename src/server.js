require('dotenv').config()
const Hapi = require('@hapi/hapi')

const { Note } = require('./api/note')
const { NoteValidator } = require('./validator/note')
const { NoteServices } = require('./services/postgre/NoteServices')

const { User } = require('./api/user')
const { UserValidator } = require('./validator/user')
const { UserServices } = require('./services/postgre/UserServices')

const { Authentication } = require('./api/authentication')
const { AuthenticationValidator } = require('./validator/authentication')
const {
  AuthenticationServices
} = require('./services/postgre/AuthenticationServices')
const TokenManager = require('./tokenize/TokenManager')

const { ClientError } = require('./exceptions')

const init = async () => {
  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0',
    routes: {
      cors: {
        origin: ['*']
      }
    }
  })

  await server.register([
    {
      plugin: Note,
      options: {
        service: NoteServices(),
        validator: NoteValidator
      }
    },
    {
      plugin: User,
      options: {
        service: UserServices(),
        validator: UserValidator
      }
    },
    {
      plugin: Authentication,
      options: {
        authenticationService: AuthenticationServices(),
        userService: UserServices(),
        tokenManager: TokenManager,
        validator: AuthenticationValidator
      }
    }
  ])

  server.ext('onPreResponse', (req, h) => {
    const { response } = req

    if (response instanceof Error) {
      if (response instanceof ClientError) {
        return h
          .response({
            status: 'fail',
            message: response.message
          })
          .code(response.statusCode)
      }

      if (!response.isServer) {
        return h.continue
      }

      return h
        .response({
          status: 'error',
          message: 'terjadi kegagalan pada server kami'
        })
        .code(500)
    }

    return h.continue
  })

  await server.start()
}

init()
