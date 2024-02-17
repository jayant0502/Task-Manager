const Task = require('../models/Task');


const getTask = async (req, res, next) => {
    try {
        res.status(200).send({ user: req.user,message: "success" });
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
}

const addTask = async (req, res, next) => {

   try{
        const task = new Task(
            {
                ...req.body,
                owner: req.user._id
            }
        )

        await task.save();

        res.status(200).send({ task, message: "Task saved successfully" });
   }
   catch(error){
    res.status(400).send({ message: error.message });
   }
}

module.exports = {
    getTask,
    addTask
};
