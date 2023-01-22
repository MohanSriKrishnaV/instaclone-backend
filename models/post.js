const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const BlogPost = new Schema({
  creator: ObjectId,
  author: { type: String, require: true },
  location: { type: String, require: true },
  description: { type: String, require: true },
  image_file: { type: String, require: true }
}, { timestamps: true });

const MyModel = mongoose.model('blog', BlogPost);

module.exports = MyModel;