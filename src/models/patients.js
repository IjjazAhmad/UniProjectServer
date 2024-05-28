const mongoose = require("mongoose");

const patientsSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    age: { type: String, required: true },
    patientCNIC: { type: String, required: true, validate: /^\d{13}$/ },
    gender: { type: String, required: true },
    phoneNumber: { type: String, required: true, validate: /^\d{12}$/ },
    email: { type: String, required: true, validate: /\S+@\S+\.\S+/ },
    city: { type: String, required: true },
    address: { type: String, required: true },
    availabilityHour: { type: String, required: true },
    medicalHistory: { type: String },
    consent: { type: Boolean, required: true },
    drId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
    drName: { type: String, required: true },
    selectedDate: { type: Date, default: Date.now },
    prescriptions: [
      {
        drName: { type: String, required: true },
        presDate: { type: String, required: true },
        prescription: { type: String, required: true },
      },
    ],
  },
  { collection: "patients", versionKey: false }
);

const Patient = mongoose.model("patients", patientsSchema);

module.exports = Patient;
