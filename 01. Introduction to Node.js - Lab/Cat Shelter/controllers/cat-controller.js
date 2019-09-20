const url = require('url');
const fs = require('fs');
const path = require('path');
const qs = require('querystring');
const formidable = require('formidable');
const rootPath = path.normalize(path.join(__dirname, '../views/cat/'));
const catService = require('../services/cat-service');
const cats = require('../data/cats.json');
const globalPath = require('global-path');

module.exports = (req, res) => {
    const pathname = url.parse(req.url).pathname;

    if (pathname === '/cats/add-cat' && req.method === 'GET') {        
        const stream = fs.createReadStream(rootPath + 'addCat.html');

        stream.on('data', (data) => {
            res.write(catService.readBreeds(data));
        });

        stream.on('end', () => {
            res.end();
        });

        stream.on('error', (err) => {
            console.log(err);
        });
    } else if (pathname === '/cats/add-cat' && req.method === 'POST') {
        let form = new formidable.IncomingForm();

        form.parse(req, (err, fields, files) => {
            if (err) {
                throw err;
            }

            console.log(files.upload.path);
            
            let oldPath = files.upload.path;
            let newPath = path.normalize(path.join(__dirname, '/public/images/' + files.upload.name));

            

            fs.rename(oldPath, newPath, (err) => {
                if (err) {
                    throw err;
                }
                console.log('File uploaded successfully');
            });

            fs.readFile('../Cat Shelter/data/cats.json', 'utf-8', (err, data) => {
                if (err) {
                    throw err;
                }

                let allCats = JSON.parse(data);
                allCats.push({ Id: cats.length + 1, ...fields, Image: files.upload.name });
                let json = JSON.stringify(allCats);

                fs.writeFile('../Cat Shelter/data/cats.json', json, () => {
                    res.writeHead(302, { Location: '/' });
                    res.end();
                });
            });
        });


    } else if (pathname === '/cats/add-breed' && req.method === 'GET') {
        const stream = fs.createReadStream(rootPath + 'addBreed.html');

        stream.on('data', (data) => {
            res.write(data);
        });

        stream.on('end', () => {
            res.end();
        });

        stream.on('error', (err) => {
            console.log(err);
        });
    } else if (pathname === '/cats/add-breed' && req.method === 'POST') {
        let formData = '';

        req.on('data', (data) => {
            formData += data;
        });

        req.on('end', () => {
            let body = qs.parse(formData);

            catService.writeBreed(body);            

            res.writeHead(302, { Location: '/' });
            res.end();            
        });        
    } else {
        return true;
    }
}