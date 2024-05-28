const express = require("express");
const Doctor = require("../models/doctors");
const router = express.Router();

const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;
router.post("/post", async (req, res) => {

 
  try {
    const doctorData = req.body;
    const newDoctor = new Doctor(doctorData);
    const doctor = await Doctor.findOne({ email: newDoctor.email });
    if (doctor) {
      return res.status(409).json({ message: "Doctor already exists with this account, plz use different account" });
    }
    await newDoctor.save();
    res.status(201).send({ message: 'Doctor Application Sent successfully', doctor: newDoctor });
  } catch (error) {
    console.error('Error registering doctor:', error);
    res.status(500).send({ message: 'Failed to register doctor', error });
  }
});


router.get("/get", async (req, res) => {
  const doctors = await Doctor.find();
  res.json(doctors);
});


router.put("/:id", async (req, res) => {
  try {
    const doctorId = req.params.id;
    const update = req.body;
    const updatedDoctor = await Doctor.findByIdAndUpdate(doctorId, update, { new: true });

    if (!updatedDoctor) {
      return res.status(404).json({ error: "Doctor not found" });
    }

    res.json({ message: "Doctor updated successfully", updatedDoctor });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong!" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const doctorId = req.params.id;
    const deletedDoctor = await Doctor.findByIdAndDelete(doctorId);

    if (!deletedDoctor) {
      return res.status(404).json({ error: "Doctor not found" });
    }
    res.json({ message: "Doctor deleted successfully", deletedDoctor });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong!" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const doctorId = req.params.id;
    console.log("🚀 ~ router.get ~ doctorId:", doctorId)
    const doctor = await Doctor.findOne({userId:doctorId})
    if (!doctor) {
      return res.status(404).json({ error: "Doctor not found" });
    }
    res.json({ doctor });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong!" });
  }
});

module.exports = router;

