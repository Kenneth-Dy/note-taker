const router = require('express').Router()
const path = require('path')
const fs = require('fs')

router.get('/notes', (req, res) => {
  fs.readFile(path.join(__dirname, '..', 'db', 'db.json'), 'utf8', (err, db) => {
    if(err) {console.log(err)}

    res.json(JSON.parse(db))
  })
})

router.post('/notes', (req, res) => {
  let randomId = Date.now() * Math.floor(Math.random() * 100)
  fs.readFile(path.join(__dirname, '..', 'db', 'db.json'), 'utf8', (err, db) => {
    if (err) { console.log(err) }

    let  newNote = {
      id: randomId,
      title: req.body.title,
      text: req.body.text
    }
    let notesDB = JSON.parse(db)
    notesDB.push(newNote)

    fs.writeFile(path.join(__dirname, '..', 'db', 'db.json'), JSON.stringify(notesDB), err => {
      if(err) { console.log(err) }

      res.json(req.body)
    })
  })
})

router.delete('/notes/:id', (req, res) => {
  let id = req.params.id
  fs.readFile(path.join(__dirname, '..', 'db', 'db.json'), 'utf8', (err, db) => {
    if (err) { console.log(err) }

    let notesDB = JSON.parse(db)
    let newNotesDB = []

    notesDB.forEach(elem => {
      if(parseInt(elem.id) !== parseInt(id)) { 
        newNotesDB.push(elem)}
    })

    fs.writeFile(path.join(__dirname, '..', 'db', 'db.json'), JSON.stringify(newNotesDB), err => {
      if (err) { console.log(err) }

      res.sendStatus(200)
    })
  })   
})

module.exports = router