const { Router } = require('express')
const { Identification } = require('../../models/user')
const { getPresetDict, getCards, updatePresetDict } = require('./manager')

const router = new Router()
// obtenir id nom et prenom de chaque patient
router.get('/', (req, res) => {
  res.status(200).json(Identification.get())
})
// obtenir les infos d'un user
router.get('/:id', (req, res) => {
  res.status(200).json(Identification.getById(req.params.id))
})
// obtenir les presetDict d'un user
router.get('/:id/presetDict', (req, res) => {
  res.status(200).json(getPresetDict(req.params.id))
})
// changer les presetDict d'un user
router.put('/:id/presetDict', (req, res) => {
  res.status(200).json(updatePresetDict(req.body));
})
// obtenir les cartes d'un user
router.get('/:id/cards', (req, res) => {
  res.status(200).json(getCards(req.params.id))
})
module.exports = router

