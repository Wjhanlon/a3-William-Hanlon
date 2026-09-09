const express = require('express')
const app = express()
const port = 3000
const dir = '/public'

let appdata = []
let nextId = 1

function computePriority( item ) {
  if( item.urgent ) {
    return 'High'
  }

  let today = new Date()
  let due = new Date( item.date )
  let diffDays = ( due - today ) / ( 1000 * 60 * 60 * 24 )

  if( diffDays <= 3 ) return 'High'
  if( diffDays <= 7 ) return 'Medium'
  return 'Low'
}


app.use( express.json() )
app.use( express.static( dir ) )

app.get('/data', function(request, response){
  response.json(appdata)
})

app.post('/data', function(request, response){
  const item = request.body

  item.id = nextId
  nextId = nextId + 1
  item.priority = computePriority( item )

  appdata.push(item)

  response.json(appdata)
})

app.put( '/data', function(request, response){
  const updated = request.body

  for( let i = 0; i < appdata.length; i++ ) {
      if( appdata[i].id === updated.id ) {
        updated.priority = computePriority( updated )   // recompute derived field
        appdata[i] = updated
      }
    }
  
  response.json(appdata)
})

app.delete('/data', function(request, response){
  const idToDelete = request.body
  const newData = []

  for( let i = 0; i < appdata.length; i++ ) {
    if( appdata[ i ].id !== idToDelete ) {
      newData.push( appdata[ i ] )
    }
  }

  appdata = newData

  response.json(appdata)
})

app.use(function(request, response){
  response.status(404).send('404 Error: File Not Found')
})

server.listen( process.env.PORT || port )