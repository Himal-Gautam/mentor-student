import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    default: "",
    required: true,
    trim: true,
  },
  hasMentor: {
    type: Boolean,
    default: false,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  mentor:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Mentor'
  }
});

// const Student = mongoose.model("Student", studentSchema);

export default mongoose.model("Student", studentSchema);;
