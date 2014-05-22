var mongoose = require('mongoose');

var instanceSchema = mongoose.Schema({
  name: {type: String, required: "{PATH} is required"},
  user: {type: String, required: "{PATH} is required"},
  status: String,
  ipAddress: String,
  loginName: {type: String},
  loginPassword: {type: String},
  dropped: {type:Boolean, default: false}
});
instanceSchema.methods = {
};
var Instance = mongoose.model('Instance', instanceSchema);
