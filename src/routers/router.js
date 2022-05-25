import express from "express";
import Mentor from "../models/mentor.js";
import Student from "../models/student.js";

const router = new express.Router();

//create mentor
router.post("/mentor", async (req, res) => {
  const mentor = new Mentor({
    ...req.body,
  });
  try {
    await mentor.save();
    res.status(201).send(mentor);
  } catch (e) {
    res.status(400).send(e);
  }
});

//create student
router.post("/student", async (req, res) => {
  const student = new Student({
    ...req.body,
  });
  try {
    await student.save();
    res.status(201).send(student);
  } catch (e) {
    res.status(400).send(e);
  }
});

//get all students of a particular mentor
router.post("/mentor-getAllStudents", async (req, res) => {
  try {
    if (!req.body.Mentor_id) {
      return res.status(404).send("Mentor ID field not provided");
    }

    const students = await Student.find({mentor : req.body.Mentor_id})

    if (!students) {
      return res.status(404).send("nothing found");
    }

    res.status(201).send(students);
  } catch (e) {
    res.status(400).send(e);
  }
});

//assign/update mentor to student
router.patch("/student-updateMentor", async (req, res) => {
  try {
    if (!(req.body.Mentor_id && req.body.Student_id)) {
      return res.status(404).send("Please provided Studnet_id & Mentor_id");
    }

    const student = await Student.findOneAndUpdate({_id : req.body.Student_id}, {mentor : req.body.Mentor_id, hasMentor : true})

    if (!student) {
      return res.status(404).send("nothing found");
    }

    res.status(201).send("updated");
  } catch (e) {
    res.status(400).send(e);
  }
});

//assign/update mentor to students
router.patch("/student-updateMentor-multiStudent", async (req, res) => {
  try {
    if (!(req.body.Mentor_id && req.body.Student_ids)) {
      return res.status(404).send("Please provided Studnet_ids & Mentor_id");
    }

    req.body.Student_ids.map(async (id) => {
      const student = await Student.findOneAndUpdate({_id : id}, {mentor : req.body.Mentor_id, hasMentor : true})
      
      if (!student) {
        NA.push(id)
      }
    })

    res.status(201).send("updation succesfull")

  } catch (e) {
    res.status(400).send(e);
  }
});

//get all students who don't have a mentor
router.get("/student-noMentor", async (req, res) => {
  try {
    const students = await Student.find({hasMentor : false})

    if (!students) {
      return res.status(404).send("nothing found");
    }

    res.status(201).send(students);
  } catch (e) {
    res.status(400).send(e);
  }
});

export default router;
