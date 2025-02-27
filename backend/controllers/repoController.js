const mongoose = require("mongoose");
const Repository = require("../models/repoModel");
const User = require("../models/userModel");
const Issue = require("../models/issueModel");

// Create Repository
async function createRepository(req, res) {
    const { owner, name, issues, content, description, visibility } = req.body;
  
    try {
        if (!name) {
            return res.status(400).json({ error: "Repository name is required!" });
        }
  
        if (!mongoose.Types.ObjectId.isValid(owner)) {
            return res.status(400).json({ error: "Invalid User ID!" });
        }
  
        const newRepository = new Repository({
            name,
            description,
            visibility,
            owner,
            content,
            issues,
        });
  
        const result = await newRepository.save();
  
        res.status(201).json({
            message: "Repository created!",
            repositoryID: result._id,
        });
    } catch (err) {
        console.error("Error during repository creation : ", err.message);
        res.status(500).send("Server error");
    }
};

// Get All Repository
async function getAllRepositories(req, res) {

    try {
      const repositories = await Repository.find({})
        .populate("owner")
        .populate("issues");
  
      res.json(repositories);
    } catch (err) {
      console.error("Error during fetching repositories : ", err.message);
      res.status(500).send("Server error");
    }
};

// Fetch Repo by ID
async function fetchRepositoryById(req, res) {
    const { id } = req.params;

    try {
      const repository = await Repository.find({ _id: id })
        .populate("owner")
        .populate("issues");
  
      res.json(repository);
    } catch (err) {
      console.error("Error during fetching repository : ", err.message);
      res.status(500).send("Server error");
    }
};

// Fetch Repo by Name
async function fetchRepositoryByName(req, res) {
    const { name } = req.params;

    try {
      const repository = await Repository.find({ name })
        .populate("owner")
        .populate("issues");
  
      res.json(repository);
    } catch (err) {
      console.error("Error during fetching repository : ", err.message);
      res.status(500).send("Server error");
    }
};

// Fetch Repos for Current User
async function fetchRepositoriesForCurrentUser(req, res) {
    console.log(req.params);
    const { userID } = req.params;
    
    try {
      const repositories = await Repository.find({ owner: userID });
  
      if (!repositories || repositories.length == 0) {
        return res.status(404).json({ error: "User Repositories not found!" });
      }
      console.log(repositories);
      res.json({ message: "Repositories found!", repositories });
    } catch (err) {
      console.error("Error during fetching user repositories : ", err.message);
      res.status(500).send("Server error");
    }
};

const updateRepositoryById = (req, res) => {
    res.send("Repo updated!");
};

const toggleVisibilityById = (req, res) => {
    res.send("Visibility Toggled!");
};

const deleteRepositoryById = (req, res) => {
    res.send("Repo deleted!");
};

module.exports = {
    createRepository,
    getAllRepositories,
    fetchRepositoryById,
    fetchRepositoryByName,
    fetchRepositoriesForCurrentUser,
    updateRepositoryById,
    toggleVisibilityById,
    deleteRepositoryById,
};