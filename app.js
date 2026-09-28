const express = require('express');
const app = express();
app.use(express.json());
let students = [
    {   id: 1, 
        name: 'Anthony Cherish',
         age: 21,
         course: 'Nursing'
    },
    {   id: 2,
        name: 'Wada Ibrahim',
         age: 28,
         course: 'Medicine'
    }
];
app.get('/students', (req, res) => {
    res.json(students);
});
app.get('/students/:id', (req, res) => {
    const studentId = parseInt(req.params.id);
    const student = students.find(s => s.id === studentId);
    if (!student) {
        return res.status(404).json({ error: 'Student not found' });
    }   
    res.json(student);
});
app.post('/students', (req, res) => {
    const newStudent = {
        id: students.length + 1,
        name: req.body.name,
        age: req.body.age,
        course: req.body.course             
    };
    students.push(newStudent);
    res.status(201).json(newStudent);
});
app.put('/students/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const student = students.find(s => s.id === id);
    if (!student) {
        return res.status(404).json({ error: 'Student not found' });
    }
    student.name = req.body.name;
    student.age = req.body.age;
    student.course = req.body.course;
    res.json(student);
});
app.delete('/students/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const studentIndex = students.findIndex(s => s.id === id);
    if (studentIndex === -1) {
        return res.status(404).json({ error: 'Student not found' });
    }
    const deletedStudent = students.splice(studentIndex, 1);
    res.json({
        message: 'Student deleted successfully',
        student: deletedStudent[0]
    });
});
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});