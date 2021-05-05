const { login } = require('pronote-api')
const express = require('express')
const app = express()

async function GetNotes() {
    const session = await login('url', 'name', 'pawword', 'academie')
    const notes = await session.marks()

    let table = []
    await notes.subjects.forEach(note => {
        table.push({
            value: note.averages.student,
            min: note.averages.min,
            max: note.averages.max,
            class: note.averages.studentClass,
            name: note.name
        })
    })

    console.log(table)
    return table
}

app.get('/', async (req, res) => {
    res.render("notes.ejs", {
        notes: await GetNotes()
    })
})

app.listen(3000, () => { console.log(`http://localhost:3000`) })
