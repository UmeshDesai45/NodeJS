const fs= require('fs');
const path= require('path');
const bodyParser = require('body-parser');

const filePath= path.join(__dirname, '../data/items.json');

class Items{
    all() {
        return new Promise((resolve, reject) => {
          fs.readFile(filePath, 'utf-8', (err, data) => {
            if (err) {
              reject(err);
            } else {
              resolve(data);
            }
          });
        });
    }

    creat(newData) {
        try{
            return new Promise((resolve, reject) => {
                // Parse the incoming JSON data
                //const jsObjnew = JSON.parse(newData);
            
                // Read the existing data from the file
                fs.readFile(filePath, 'utf-8', (err, data) => {
                  if (err) {
                    console.error(err);
                    reject(err);
                  } else {
                    // Parse the existing JSON data
                    const jsObjOld = JSON.parse(data);
            
                    // Add the new data to the existing data array
                    jsObjOld.push(newData);
            
                    // Write the updated data back to the file
                    fs.writeFile(filePath, JSON.stringify(jsObjOld), (err) => {
                      if (err) {
                        console.error(err);
                        reject(err);
                      } else {
                        console.log(jsObjOld);
                        resolve('Data updated');
                      }
                    });
                  }
                });
            });
        }
        catch(error){
            console.log(error);
            reject(error);
        } 
    }
}

module.exports= Items;


