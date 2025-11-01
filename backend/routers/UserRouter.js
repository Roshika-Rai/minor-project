const express = require('express');
const Model = require('../models/UserModel');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const router = express.Router();

router.post('/add', (req, res) => {
    console.log(req.body);

    new Model(req.body).save()
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});


router.get('/getall', (req, res) => {
    Model.find()
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            res.status(500).json(err);
        });
});

router.get('/getbyemail/:email', (req, res) => {
    Model.findOne({ email: req.params.email })
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });

})
router.get('/getbyid/:id', (req, res) => {
    Model.findById(req.params.id)
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
})

router.delete('/delete/:id', (req, res) => {
    Model.findByIdAndDelete(req.params.id)
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
})


router.put('/update/:id', (req, res) => {
    Model.findByIdAndUpdate(req.params.id, req.body)
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            console.log(err);
            res.status(500).json(result);
        });
});

router.post('/authenticate', (req, res) => {
    console.log(req.body);
    
    const { email, password } = req.body;
    Model.findOne({ email, password })
        .then((result) => {
            console.log(result);
            
            if (result) {
                //create token
                const { _id, name } = result;
                jwt.sign(
                    { _id, name },
                    process.env.JWT_SECRET,
                    { expiresIn: '1h' },

                    (err, token) => {
                        if (err) {
                            console.log(err);
                            res.status(500).json(err);
                        } else {
                            res.status(200).json({ token, _id, name });
                        }
                    }

                )
            } else {
                res.status(401).json({ message: 'Invalid credentials' });
            }



        }).catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
})

module.exports = router;

