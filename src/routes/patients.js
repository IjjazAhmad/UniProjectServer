const express = require('express');
const Patient = require('../models/patients');
const router = express.Router();

router.post("/post", async (req, res) => {
  console.log("🚀 ~ router.post ~ req:", req.body);
  
  try {
    // Check if the phone number already exists
    const existingPatient = await Patient.findOne({ phoneNumber: req.body.phoneNumber });
    if (existingPatient) {
      return res.status(400).json({ error: "Phone number already exists, plz change phone number" });
    }

    const userData = new Patient({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      age: req.body.age,
      patientCNIC: req.body.patientCNIC,
      gender: req.body.gender,
      phoneNumber: req.body.phoneNumber,
      email: req.body.email,
      city: req.body.city,
      address: req.body.address,
      availabilityHour: req.body.availabilityHour,
      medicalHistory: req.body.medicalHistory,
      consent: req.body.consent,
      drId: req.body.drId,
      drName: req.body.drName,
      selectedDate: req.body.selectedDate || Date.now(),
    });

    const result = await userData.save();
    console.log("🚀 ~ router.post ~ result:", result);
    res.json(result);
  } catch (error) {
    console.log("🚀 ~ router.post ~ error:", error);
    res.status(500).json({ error: "Something went wrong!", error });
  }
});

module.exports = router;

router.get("/get", async (req, res) => {
  const usersData = await Patient.find();
  res.json(usersData);
});

router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const update = req.body;

    if (update.prescriptionData) {
      if (
        !update.prescriptionData.presDate &&
        !update.prescriptionData.drName &&
        !update.prescriptionData.prescription
      ) {
        return res
          .status(400)
          .json({ error: "all fields are required for the prescription" });
      }

      let patient = await Patient.findById(id);

      if (!patient) {
        return res.status(404).json({ error: "Patient not found" });
      }

      patient.prescriptions.push(update.prescriptionData);

      const updatedPatient = await patient.save();
      return res.json({
        message: "Prescription added successfully",
        updatedPatient,
      });
    }

    const updatedPatients = await Patient.findByIdAndUpdate(id, update, {
      new: true,
    });

    if (!updatedPatients) {
      return res.status(404).json({ error: "Patient not found" });
    }

    res.json({ message: "Patient updated successfully", updatedPatients });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong!" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deletedPatients = await Patient.findByIdAndDelete(id);

    if (!deletedPatients) {
      return res.status(404).json({ error: "Patient not found" });
    }
    res.json({ message: "Patient deleted successfully", deletedPatients });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong!" });
  }
});


router.get("/:patientCNIC", async (req, res) => {
  try {
    const patientCNIC = req.params.patientCNIC;
    const patient = await Patient.findOne({ patientCNIC:patientCNIC})
    if (!patient) {
      return res.status(404).json({ error: "Patients not found" });
    }
    res.json({ patient });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong!" });
  }
});

module.exports = router;

// JWT ----> Advanced form ----> JWE
