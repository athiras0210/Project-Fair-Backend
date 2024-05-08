const projects = require('../Models/projectSchema');

//Add Project Logic
exports.addProject = async (req, res) => {
    console.log("Inside the addProject method");
    const { title, language, github, livelink, overview } = req.body
    const projectImage = req.file.filename
    const userId = req.payload
    console.log(title, language, github, livelink, overview, projectImage);
    console.log(userId);

    try {
        const existingProject = await projects.findOne({ github })
        if (existingProject) {
            res.status(404).json("Project already exists")
        }
        else {
            const newProject = new projects({ title, language, github, livelink, overview, projectImage, userId })
            await newProject.save()
            res.status(200).json(newProject)
        }
    }
    catch (err) {
        res.status(401).json({ message: err.message })
    }
};

//Get a particular project details
exports.getAProject = async (req, res) => {
    //get userId
    const userId = req.payload
    try {
        const AProject = await projects.find({ userId })
        if (AProject) {
            res.status(200).json(AProject)
        }
        else {
            res.status(401).json("Can't find Project");
        }
    }
    catch (err) {
        res.status(401).json({ message: err.message });
    }
}

//Get 3 project details details for home project
exports.getHomeProjects = async (req, res) => {
    try {
        const HomeProject = await projects.find().limit(3)
        if (HomeProject) {
            res.status(200).json(HomeProject)
        }
        else {
            res.status(401).json("Can't find projects")
        }
    }
    catch (err) {
        res.status(401).json({ message: err.message });
    }
}

//Get all project details 
exports.getAllUserProjects = async (req, res) => {

    const searchKey = req.query.search
    console.log(searchKey);

    //cae sensitive
    const query = {
        language: { $regex: searchKey, $options: "i" }
    }

    try {
        const AllUserProject = await projects.find(query)
        if (AllUserProject) {
            res.status(200).json(AllUserProject)
        }
        else {
            res.status(401).json("Can't find Project");
        }
    }
    catch (err) {
        res.status(401).json({ message: err.message });
    }
}



//Delete user project
exports.deleteUserProject = async (req, res) => {
    console.log(req);
    const { pid } = req.params; //project id
    try {
        // Creates a findOneAndDelete query: atomically finds the given document, deletes it, 
        // and returns the document as it was before deletion.
        const deleteUserProject = await projects.findOneAndDelete({ _id: pid })
        res.status(200).json(deleteUserProject);
    }
    catch (err) {
        res.status(401).json({ message: err.message });
    }
}

//Update user project
exports.updateUserProject = async (req,res) =>{
    console.log(req.body);
    const {title,language,github,livelink,overview,projectImage} = req.body;
    userId = req.payload;
    const {pid} = req.params;
    const uploadImage = req.file?req.file.filename:projectImage;
    try{
        //FIND PARTICULAR PROJECT, UPDATE AND SAVE THE CHANGES
        const updateProject = await projects.findByIdAndUpdate({_id:pid},{title,language,github,
            livelink,overview,projectImage:uploadImage,userId});
            await updateProject.save();
            res.status(200).json(updateProject);
    }
    catch(err){
        res.status(401).json({message:err.message});
    }
}