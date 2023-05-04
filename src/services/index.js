const { AuthenticationServices } = require('./postgre/AuthenticationServices')
const { CollaborationServices } = require('./postgre/CollaborationServices')
const { UserServices } = require('./postgre/UserServices')
const { NoteServices } = require('./postgre/NoteServices')
const { ProducerServices } = require('./rabbitmq/ProducerServices')
const { StorageServices } = require('./storage/StorageServices')

module.exports = {
  AuthenticationServices,
  CollaborationServices,
  UserServices,
  NoteServices,
  ProducerServices,
  StorageServices
}
