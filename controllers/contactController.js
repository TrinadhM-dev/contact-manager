
const asyncHandler = require("express-async-handler");
const Contact = require('../models/contactModel');
//@desc Get all Contacts
//@route GET /api/contacts
//@access private

const getContacts = asyncHandler(async (req, res) => {
    const contacts = await Contact.find({user_id:req?.user?.id});
    res.status(200).json(contacts);
})
//@desc Post all Contacts
//@route POST /api/contacts
//@access private

//asyncHandler is for catch errors
const createContact = asyncHandler(async (req, res) => {
    const { name, mail, phone } = req.body;
    if (!name || !mail || !phone) {
        res.status(400);
        throw new Error("All fields are mandatory")
    }
    const contacts = await Contact.create({
        name, mail, phone,
        user_id:req?.user.id
    });
    res.status(201).json(contacts);
})

//@desc PUT all Contacts
//@route PUT /api/contacts/:id
//@access private
const putContact = asyncHandler(async (req, res) => {

        const contact = await Contact.findById(req.params.id);
        if(!contact){
            res.status(404).json({message:"Contact Not Found"});
        }

        if(contact.user_id.toString() !== req.user.id){
            res.status(403);
            throw new Error("User donot have permission");
        }


    const updateContact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true })


    //res.send
    res.json({ message: `Update Contact ${updateContact}` });
})


//@desc Get one Contact 
//@route GET /api/contacts/:id
//@access private
const getContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (contact) {
        res.status(200).json(contact);
    }
    else {
        res.status(404);
        throw new Error("Not Found");
    }
})


//@desc Delete One Contacts
//@route PUT /api/contacts/:id
//@access private

const deleteContact = asyncHandler(async (req, res) => {
    // Find the contact by ID
    const contact = await Contact.findById(req.params.id);
    
    // Check if the contact exists
    if (!contact) {
        return res.status(404).json({ message: "Not Found contact" });
    }
    if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("User donot have permission");
    }


    // Delete the contact
    await Contact.findByIdAndDelete(req.params.id);

    // Respond with a success message
    res.status(200).json({ message: "Contact deleted successfully", contact });
});


module.exports = { getContact, createContact, putContact, deleteContact, getContacts };