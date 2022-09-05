const express = require('express');
const router = express.Router();
const User = require('../models/user');


router.post("/register", (req, res) => {
    console.log('req.body------>', req?.body)
    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
    });

  newUser.save().then(document => {
    res.send({ state: true, msg: "data inserted successully", document: document })
  }).catch(err => {
    res.send(err);
  });
});




router.get("/getuser", (req, res) => {
    console.log('Here------')
    User.find().then(document => {
        console.log('Docuent----->', document)
        res.send({ status: 200, message: 'User data fetched Successfully', Userdata: document });

    });

});


router.put('/update/:id', (req, res, next) => {
  const newuser = { _id: req.params.id };
  User.updateOne(newuser, {
    name: req.body.name,
    email: req.body.email
  }).then(doc => {
    if (!doc) {
      return res.st(404).end();
    }
    return res.status(200).json(doc);
  })
    .catch(err => next(err));
})



router.delete('/delete/:id', (req, res, next) => {
  User.deleteOne({ _id: req.params.id }).then(document => {
    res.json({ status: 200, message: 'Users data deleted Successfully', document: document });
  })
    .catch(err => next(err));
})


router.get("/:id", (req, res, next) => {
  User.findById(req.params.id).then(documents => {
    if (documents) {
      res.status(200).json(documents);
    } else {
      res.status(404).json({ message: 'data not found' });
    }
  });
});


module.exports = router;
