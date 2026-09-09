const http = require( 'http' ),
      fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library if you're testing this on your local machine.
      // On Render, make sure `npm install` is your build command.
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000

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

const server = http.createServer( function( request, response ) {
  if( request.method === 'GET' ) {
    handleGet( request, response )
  }else if( request.method === 'POST' ) {
    handlePost( request, response )
  }else if( request.method === 'PUT' ) {
    handlePut( request, response )
  }else if( request.method === 'DELETE' ) {
    handleDelete( request, response )
  }
})

const handleGet = function( request, response ) {
  if( request.url === '/data' ) {
    response.writeHead( 200, { 'Content-Type': 'application/json' })
    response.end( JSON.stringify( appdata ) )
    return
  }

  const filename = request.url === '/' ? 'public/index.html' : dir + request.url.slice( 1 )
  sendFile( response, filename )
}

const handlePost = function( request, response ) {
  let dataString = ''

  request.on( 'data', function( data ) {
    dataString += data
  })

  request.on( 'end', function() {
    const item = JSON.parse( dataString )

    item.id = nextId
    nextId = nextId + 1
    item.priority = computePriority( item )   // derived field

    appdata.push( item )

    response.writeHead( 200, { 'Content-Type': 'application/json' })
    response.end( JSON.stringify( appdata ) )
  })
}

const handlePut = function( request, response ) {
  let dataString = ''

  request.on( 'data', function( data ) {
    dataString += data
  })

  request.on( 'end', function() {
    const updated = JSON.parse( dataString )

    for( let i = 0; i < appdata.length; i++ ) {
      if( appdata[ i ].id === updated.id ) {
        updated.priority = computePriority( updated )   // recompute derived field
        appdata[ i ] = updated
      }
    }

    response.writeHead( 200, { 'Content-Type': 'application/json' })
    response.end( JSON.stringify( appdata ) )
  })
}

const handleDelete = function( request, response ) {
  let dataString = ''

  request.on( 'data', function( data ) {
    dataString += data
  })

  request.on( 'end', function() {
    const idToDelete = JSON.parse( dataString ).id
    const newData = []

    for( let i = 0; i < appdata.length; i++ ) {
      if( appdata[ i ].id !== idToDelete ) {
        newData.push( appdata[ i ] )
      }
    }

    appdata = newData

    response.writeHead( 200, { 'Content-Type': 'application/json' })
    response.end( JSON.stringify( appdata ) )
  })
}

const sendFile = function( response, filename ) {
   const type = mime.getType( filename ) 

   fs.readFile( filename, function( err, content ) {

     // if the error = null, then we've loaded the file successfully
     if( err === null ) {

       // status code: https://httpstatuses.com
       response.writeHeader( 200, { 'Content-Type': type })
       response.end( content )

     }else{

       // file not found, error code 404
       response.writeHeader( 404 )
       response.end( '404 Error: File Not Found' )

     }
   })
}

server.listen( process.env.PORT || port )
