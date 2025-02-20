const { Router } = require('express')
const { Identification } = require('../../models/user')
const { getPresetDict, getCards, updatePresetDict, addToCards, delFromCards,addUser } = require('./manager')

const router = new Router()
// obtenir id nom et prenom de chaque patient
router.get('/', (req, res) => {
  res.status(200).json(Identification.get())
})
// obtenir les infos d'un user
router.get('/:id', (req, res) => {
  res.status(200).json(Identification.get().filter((item) => {return item.userId == req.params.id})[0])
})

//ajouter un user
router.post('/', (req, res) => {
  addUser(req, res)
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
//ajouter une carte aux cartes d'un user
router.post('/:id/cards', (req, res) => {
  addToCards(req, res, req.params.id)
})

router.delete('/:id/cards/:idCard', (req,res)=>{
  delFromCards(req,res)
})
module.exports = router

