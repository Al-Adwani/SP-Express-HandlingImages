const mongoose = require("mongoose");
const mongooseSlugPlugin = require("mongoose-slug-plugin");

const CatagorySchema = mongoose.Schema({
  name: String,
  image: String,
  product: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
});

CatagorySchema.plugin(mongooseSlugPlugin, { tmpl: "<%=name%>" });

module.exports = mongoose.model("Catagory", CatagorySchema);
