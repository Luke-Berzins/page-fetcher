var fs = require('fs');
const request = require('request');

const myArgs = process.argv.slice(2);
const site = myArgs[0];
const downloadLoc = myArgs[1]

request(`${site}`, (error, response, body) => {
  if (error) {
    console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was 
  }
  fs.writeFile(downloadLoc, body, function (err) {
    if (err) {
      console.log(err)
    }
  })

})
.on('response', function(response) {
  // unmodified http.IncomingMessage object
  response.on('data', function(data) {
    // compressed data as it is received
    console.log(`Received and downloaded ${data.length} bytes of compressed data from ${site} and stored to ${downloadLoc}`)
  })
})

