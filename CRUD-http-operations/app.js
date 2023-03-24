    const http= require('http');
    const fs= require('fs');
    const url= require('url');

    let first= fs.readFileSync('./apiData.json', 'utf-8');
    console.log(JSON.parse(first));

    const server= http.createServer((req, res)=>{
        if(req.method=== 'GET' && req.url==='/'){
            res.end("Home Page");
        }
        //Get all data
        else if(req.method=== 'GET' && req.url==='/employee'){
            //read json file and return
            fs.readFile('./apiData.json', 'utf-8', (err, data)=>{
                let jsObj= JSON.parse(data);
                res.end(data);
            });
        }
        //GET employee data by ID
        else if(req.method=== 'GET' && req.url==='/employee/1'){
            //read json file and return
            fs.readFile('./apiData.json', 'utf-8', (err, data)=>{
                let jsObj= JSON.parse(data);
                let dataID= jsObj[0];
                res.end(JSON.stringify(dataID));
            });
        } 

        //POST new employee data to json DB
        else if(req.method=== 'POST' && req.url==='/employee'){
            let body= '';

            //Reading request body
            req.on('data',(chunk)=>{
                body+= chunk.toString();
            });

            //After completion of body data reading
            req.on('end', ()=>{
                let newEmp= JSON.parse(body);
                fs.readFile('./apiData.json', 'utf-8', (err,data)=>{
                    //Creating JS object of json data
                    let jsObj= JSON.parse(data);
                    //Adding new employee data to JS object 
                    jsObj.push(newEmp);
                    //Convert JS object to json
                    let jdata= JSON.stringify(jsObj);
                    //Edit/write existing json file
                    fs.writeFile('./apiData.json', jdata, ()=>{
                        console.log('Appended received data');
                        console.log(jsObj);
                        res.writeHead(201, {'Content-Type': 'application/json'});
                        res.end('Details added succesfully');
                    });
                });
            });

        }
        //DELETE employee data by id
        else if(req.method=== 'DELETE' && req.url.startsWith('/employee/')){
            let id = req.url.split('/')[2];
            fs.readFile('./apiData.json','utf-8', (err, data)=>{
                let ob= JSON.parse(data);
                ob.splice(id-1, 1);
                
                let jdata= JSON.stringify(ob);

                fs.writeFile('./apiData.json',jdata, ()=>{
                    console.log('Deleted data');
                    console.log(ob);
                    res.writeHead(204, {'Content-Type': 'application/json'});
                    res.end("Deleted data");
                });
            });
        }
        
        else{
            res.writeHead(404, {'Content-Type': 'text/html'});
            res.end('404 error \nUse correct URL');
        }


    });

    server.listen(8000,()=>{
        console.log('Server running on http://localhost:8000');
    });

