const mongoose = require("mongoose");

const DrSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    gender: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    email: { type: String, required: true },
    city: { type: String, required: true },
    address: { type: String, required: true },
    profilePicture: { type: String, required: true },
    medicalLicenseNumber: { type: String, required: true },
    specialty: { type: String, required: true },
    yearsOfExperience: { type: Number, required: true },
    currentPracticeLocation: { type: String, required: true },
    professionalAffiliations: { type: String, required: true },
    languagesSpoken: { type: String, required: true },
    medicalSchool: { type: String, required: true },
    graduationYear: { type: Number, required: true },
    residencyPrograms: { type: String, required: true },
    fellowships: { type: String, required: true },
    certifications: { type: String, required: true },
    previousEmployment: { type: String, required: true },
    currentEmployment: { type: String, required: true },
    checkUpFee: { type: String, required: true },
    healthConditions: { type: String },
    previousSurgeries: { type: String },
    allergies: { type: String },
    medications: { type: String },
    references: { type: String },
    publications: { type: String },
    statementOfPurpose: { type: String },
    role: { type: String, require:true },
    consent: { type: Boolean, required: true },
    userId: { type: String, required: true }, // Updated to reference User model
    patients: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Patient' }] // Adjust reference as needed
  },
  { collection: "doctors", versionKey: false }
);

const Doctor = mongoose.model("Doctor", DrSchema);

module.exports = Doctor;
