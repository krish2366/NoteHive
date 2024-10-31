const express = require("express")
const fetchuser = require("../middleware/fetchuser")
const Notes = require("../models/Notes")
const router = express.Router()
const { body, validationResult } = require("express-validator")

// Get all the notes using domain "/api/notes/fetchall"
router.get("/fetchall" ,fetchuser,async (req,res)=>{
    try{
        const notes = await Notes.find({user : req.user.id})
        res.json(notes)
    }catch(error){
        console.log(error.message)
        res.status(500).send("something went wrong")
    }
})

// Adding a note using domain "/api/notes/addnote"
const validNote = [
    body("title","Enter a valid title").isLength({min : 3}),
    body("description","Enter a valid description").isLength({min : 5}),
]
router.post("/addnote" ,fetchuser, validNote ,async (req,res)=>{
    try {
        const {title , description , tag} = req.body
        const error = validationResult(req)
        if(!error.isEmpty()){
            return res.status(500).json({error : error.array()})
        }
        const note = new Notes({
            title ,description ,tag , user : req.user.id
        })
        const savedNote = await note.save()
        res.json({savedNote})
        
    } catch (error) {
        console.log(error.message)
        res.status(500).send("something went wrong")
    }

})


// Updating a note using domain "/api/notes/update"
router.put("/update/:id",fetchuser,validNote,async (req,res) =>{
    try {
        const {title , description , tag} = req.body
        const noteId = req.params.id
        const updatedNote = {}
    
        if(title){ updatedNote.title = title}
        if(description){ updatedNote.description = description}
        if(tag){ updatedNote.tag = tag}
    
        let orignalNote = await Notes.findById(noteId)
    
        // if note is not present
        if(!orignalNote){
            return res.status(404).send("Not Found")
        }
        // checking if the note is of the logged in user
        if(orignalNote.user.toString() !== req.user.id){
            return res.status(401).json({message : "Access Denied"})
        }
        // updating the note
        orignalNote = await Notes.findByIdAndUpdate(noteId , {$set : updatedNote} , {new : true})
        res.json({orignalNote})

    } catch (error) {
        console.log(error.message)
        res.status(500).send("something went wrong")
    }
})


// deleting a note using domain "/api/notes/delete"
router.delete("/delete/:id" , fetchuser , async (req,res) =>{
    try {
        const noteId = req.params.id
        
        // finding the note to be deleted
        let note = await Notes.findById(noteId)

        if(!note){return res.status(404).send("Not Found")}

        if(note.user.toString() !== req.user.id){
            return res.status(401).send("Access Denied")
        } 
        note = await Notes.findByIdAndDelete(noteId)
        res.json({note,success : true})

    } catch (error) {
        console.log(error.message)
        res.status(500).send("something went wrong")
    }
})

module.exports = router 