import mongoose from "mongoose";

const friendSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: Date,
        required: true
    },

    phone: {
        type: String,
        required: true
    }

    
});

// friendSchema.pre('save', function(next) {
//     // Ensure the date is in the desired format (yyyy-mm-dd)
//     this.dateOfBirth = this.dateOfBirth.toISOString().split('T')[0];
//     next();
//   });

export default mongoose.model("Friend", friendSchema);