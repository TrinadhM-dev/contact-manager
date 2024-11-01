const mongoose = require("mongoose");
const contactSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    name: {
        type: String,
        required: [true, "please add the contact name"],
    },
    mail: {
        type: String,
        required: [true, "please add the email address"]
    },
    phone: {
        type: String,
        required: [true, "please add the contact number"]
    }
}, {
    timestamps: true,
})

module.exports = mongoose.model("Contact", contactSchema);