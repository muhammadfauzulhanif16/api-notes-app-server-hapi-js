require('dotenv').config()
const Hapi = require('@hapi/hapi')
const Jwt = require('@hapi/jwt')
const Inert = require('@hapi/inert')

const {
  Note,
  User,
  Collaboration,
  Authentication,
  Export,
  Upload
} = require('./api')
const {
  NoteValidator,
  UserValidator,
  AuthenticationValidator,
  CollaborationValidator,
  ExportValidator,
  UploadValidator
} = require('./validator')
const {
  NoteServices,
  AuthenticationServices,
  CollaborationServices,
  UserServices,
  ProducerServices,
  StorageServices,
  CacheServices
} = require('./services')

const { TokenManager } = require('./tokenize/TokenManager')
const { ClientError } = require('./exceptions')

const init = async () => {
  const cacheServices = CacheServices()
  const userServices = UserServices()
  const authenticationServices = AuthenticationServices()
  const collaborationServices = CollaborationServices(cacheServices)
  const noteServices = NoteServices(collaborationServices, cacheServices)
  const storageServices = StorageServices()

  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
      cors: {
        origin: ['*']
      }
    }
  })

  await server.register([
    {
      plugin: Jwt.plugin
    },
    {
      plugin: Inert.plugin
    }
  ])

  server.auth.strategy('notes', 'jwt', {
    keys: process.env.ACCESS_TOKEN_KEY,
    verify: {
      aud: false,
      iss: false,
      sub: false,
      maxAgeSec: process.env.ACCESS_TOKEN_AGE
    },
    validate: (artifacts) => ({
      isValid: true,
      credentials: {
        id: artifacts.decoded.payload.id
      }
    })
  })

  await server.register([
    {
      plugin: User,
      options: {
        services: userServices,
        validator: UserValidator
      }
    },
    {
      plugin: Authentication,
      options: {
        authenticationServices,
        userServices,
        tokenManager: TokenManager,
        validator: AuthenticationValidator
      }
    },
    {
      plugin: Collaboration,
      options: {
        collaborationServices,
        noteServices,
        validator: CollaborationValidator
      }
    },
    {
      plugin: Note,
      options: {
        services: noteServices,
        validator: NoteValidator
      }
    },
    {
      plugin: Export,
      options: {
        services: ProducerServices,
        validator: ExportValidator
      }
    },
    {
      plugin: Upload,
      options: {
        services: storageServices,
        validator: UploadValidator
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
  console.log(`Server berjalan pada ${server.info.uri}`)
}

init()
