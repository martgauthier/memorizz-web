const { Router } = require('express')
const fs = require("fs");
const path = require('path');

const router = new Router();

router.get("/:idUser/:imageName", (req,res)=>{
    // Checking if the path exists
    
    if(!fs.existsSync("./database/Images/"+req.params.idUser+"/"+req.params.imageName)){
        res.writeHead(404, {
            "Content-Type": "text/plain"
        });
        res.end("404 Not Found");
        return;
    }
    res.writeHead(200, {
        "Content-Type": "image/png"
    });

    // const imagePath = path.join('database', 'Images', req.params.idUser, 're', '..');

    fs.readFile("./database/Images/"+req.params.idUser+"/"+req.params.imageName,
        function (err, content) {
            // Serving the image
            res.end(content);
        });
})


module.exports = router