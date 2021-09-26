const fs = require('fs')
const validator = require('validator')
const yargs = require('yargs')
const chalk = require('chalk')
const notes = require('./notes.js')



//COmmand to add a note
yargs.command({
    command: 'add',
    describe: 'Add a note',
    builder:{
        title:{
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body:{
            describe: 'Note body',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        notes.addNote(argv.title, argv.body)
    }
})
//Command to remove a note
yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    builder: {
        title:{
            describe: 'Remove note',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        notes.removeNote(argv.title)
    }
})
//Command to read a note
yargs.command({
    command: 'read',
    describe: 'Read a note',
    builder: {
        title:{
            type: 'string',
            demandOption: true
        }
    },
    handler(argv){
        notes.readNotes(argv.title)
    }
})
//Command to list all the notes
yargs.command({
    command: 'list',
    describe: 'List notes',
    handler: ()=>{
        notes.listNotes()
    }
})

yargs.parse()