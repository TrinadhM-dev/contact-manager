const express = require('express');
const router = express.Router();
const {getContacts,getContact , createContact,putContact,deleteContact} = require('../controllers/contactController');
const validateToken = require('../middleware/validateTokenHandler');

//Get Contact Data

router.use(validateToken);
router.route('/').get(getContacts).post(createContact);

// //Create Contact Data
// router.route('/').post(postContact);

//Update Contact
router.route('/:id').put(putContact).get(getContact).delete(deleteContact)


// router.route('/:id').get(getContact)
// //deleting
// router.route('/:id').delete(deleteContact)

module.exports = router;