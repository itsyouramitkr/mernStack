const mongoose = require('mongoose');
const {Schema} = mongoose;
const NotesSchema = new Schema({
  user :{ /// ek user hai usne koi notes daala to koi dusra user na dekh paye 
    /// notes ko users se associate krna padega(link karna padega)
    type : mongoose.Schema.Types.ObjectId,
    ref : "user"
    //(important)/// It stores the actual _id of the user (from the users collection).
  },
  title:{
    type:String,
    required : true
  },
  description:{
    type:String,
    required : true
  },
  tag:{
    type:String,
    default : "General"
  },
  date:{
    type:Date,
    default : Date.now
  }
});

module.exports = mongoose.model('notes',NotesSchema)