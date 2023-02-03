//const fs = require('fs');

//reading files
/**
  fs.readFile("./docs/test.txt", (err, data)=>{
    if(err){
        console.log(err)
    }
    console.log(data.toString())
});
 */

//writing files

/**
fs.writeFile("./docs/test.txt", "Hello from Node", ()=>{
    console.log("I wrote something")
})
 */

//directories

/**
 if(!fs.existsSync("./assets")) {
    fs.mkdir("./assets", (err)=>{
        if(err) {
            console.log(err)
        }
        console.log("folder created")
    })
} else {
    fs.rmdir("./assets", (err)=>{
        if(err) {
            console.log(err)
        }
        console.log("folder deleted")
    })
}
 */

//deleting file

/**
if(fs.existsSync("./docs/deleteThis.txt")) {
    fs.unlink("./docs/deleteThis.txt", (err)=>{
        if(err) {
            console.log(err)
        }
        console.log("file deleted")
    })
}
*/
