const { default: mongoose } = require("mongoose");
const mongodb = require("mongoose");

const UserSchema = new mongodb.Schema(
  {
    title: { type: String,required:true  },
    content: { type: String, required: true },
    image:{type:String,},
    userid:{type:String,required:true}
},
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Post", UserSchema);
