const fs = require('fs')
const chalk = require('chalk')


const addNote = (title, body)=>{

    const notes = loadNotes()

    const duplicateNotes = notes.filter((note)=>{
        return note.title === title
    })

    if(duplicateNotes.length === 0){
        //add notes to the JSON array file
        notes.push({
            title: title,
            body: body
        })
        console.log(chalk.green('Note added successfully'))
    }else{
        console.log(chalk.red("Note title already exists"))
    }

   //We now need to save these notes into the JSON file after 
    //they have been added
    saveNotes(notes)
    
}

//Remove a note
const removeNote =(title)=>{
    const notes = loadNotes()
    const finalNotes = notes.filter((note)=>{
        return note.title !== title
    })

    if(notes.length > finalNotes.length){
        console.log(chalk.green('Note succcessfully removed'))
        saveNotes(finalNotes)
    }else{
        console.log(chalk.red('Note not found'))
    }    
}
//List all the notes
const listNotes = ()=>{
    console.log(chalk.inverse("Your notes"))
    const notes = loadNotes()
    notes.forEach((note)=>{
        console.log(note.title, note.body)
    })
    
}
//read all the notes by title
const readNotes = (title)=>{
    const notes = loadNotes()
    const note = notes.find((note)=>note.title === title)

    console.log(note.title, chalk.green(note.body))
}

//save notes
const saveNotes = (note)=>{
    const notes = JSON.stringify(note)
    fs.writeFileSync('notes.json', notes)
}

//load notes in the Json file
const loadNotes = ()=>{
    try{
        const bufferData = fs.readFileSync('notes.json')
    const data = bufferData.toString()
    return JSON.parse(data)
    }
    catch(e){
        return []
    }
}

module.exports ={
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNotes: readNotes
}