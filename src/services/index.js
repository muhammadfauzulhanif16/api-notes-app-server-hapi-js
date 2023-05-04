const { AuthenticationServices } = require('./postgre/AuthenticationServices')
const { CollaborationServices } = require('./postgre/CollaborationServices')
const { UserServices } = require('./postgre/UserServices')
const { NoteServices } = require('./postgre/NoteServices')
const { ProducerServices } = require('./rabbitmq/ProducerServices')
const { StorageServices } = require('./s3/StorageServices')
const { CacheServices } = require('./redis/CacheServices')

module.exports = {
  AuthenticationServices,
  CollaborationServices,
  UserServices,
  NoteServices,
  ProducerServices,
  StorageServices,
  CacheServices
}
