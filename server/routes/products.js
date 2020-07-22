var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var multer = require('multer');
var assert = require('assert');
var fs = require('fs');

var path = require('path');
var appDir = path.dirname(require.main.filename);

var globalVar = require('./../configs/global.json');

var Product = require('./../models/Product');

// var helpers = require('./../configs/helper');

var getImageFile = (fileUrl) => {
    const data = fileUrl.split('/');
    const imageFile = data[data.length - 1];
    return imageFile;
}

// Function that saves the uploaded file to the server storage
var imgStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images/uploads');
    },
    filename: (req, file, cb) => {
        console.log('File: '+file);
        var filetype = '';
        if (file.mimetype === 'image/gif') {
            filetype = 'gif';
        }
        if (file.mimetype === 'image/png') {
            filetype = 'png';
        }
        if (file.mimetype === 'image/jpeg') {
            filetype = 'jpg';
        }
        cb(null, `image-${Date.now()}.${filetype}`);
    }
});



var imgUpload = multer({storage: imgStorage});

/*
 * GET: all products
 */
router.get('/', (req, res, next) => {
    Product.find((err, data) => {
        if (err) return next(err);
        res.json({
            message: 'fetched all data successfully',
            data
        });
    });
});

// router.get('/test', (req, res, next) => {

//     // const getFile = getImageFile("http://localhost:3000/images/uploads/image-1594707635068.jpg")
    
//     const getFile = helpers.getImageFile("http://localhost:3000/images/uploads/image-1594707635068.jpg");
//     var basePath = process.cwd();
//     var prePath = '/public/images/uploads/';

//     var path = basePath + prePath + getFile;
//         fs.unlink(path, (err) => {
//             if (err) {
//               console.error(err)
//               return
//             }
          
//             //file removed
//           })

//     res.send('File deleted successfully');
// })

/*
 * GET: single product by :slug
 */
router.get('/:slug', (req, res, next) => {
    Product.findOne({
        slug: req.params.slug
    }, (err, data) => {
        if (err) return next(err);
        res.json({
            message: `fetched data by slug=${req.params.slug} successfully`,
            data
        });
    });
});

/*
 * POST: save product
 */
router.post('/', imgUpload.single('image'), (req, res, next) => {
    if (!req.file) {
        // console.log(`file name: ${req.file}`);
        return res.status(500).send({ message: 'Image upload failed' });
    } else {
        // req.body.imageUrl = `http://localhost:3000/images/${req.file.filename}`;
        Product.create({
            name: req.body.name,
            description: req.body.description,
            content: req.body.content,
            slug: req.body.slug,
            imageUrl: `${globalVar.serverUrl}/images/uploads/${req.file.filename}`
        }, (err, data) => {
            if (err) {
                console.log(err);
                return next(err);
            }
            res.json({
                message: 'saved data successfully',
                data: data
            });
        })
    }
});

/*
 * PUT: update product
 */
router.put('/:_id', imgUpload.single('image'), (req, res, next) => {
    if (!req.file) {
        // console.log(`file name: ${req.file}`);
        // res.send({
        //     message: 'Upload without image here'
        // })
        Product.findByIdAndUpdate(req.params._id, req.body, (err, data) => {
            if (err) return next(err);
            res.json({
                message: `updated data by id=${req.params._id} successfully`,
                data: req.body
            });
        });
        
        // return res.status(200).send({ message: 'Updated data' });
    } else {
        // res.send({
        //     message: 'Upload with image here'
        // })
        Product.findByIdAndUpdate(req.params._id, {
            name: req.body.name,
            description: req.body.description,
            content: req.body.content,
            slug: req.body.slug,
            imageUrl: `${globalVar.serverUrl}/images/uploads/${req.file.filename}`
        }, (err, data) => {
            if (err) {
                console.log(err);
                return next(err);
            }

            var getFile = getImageFile(data.imageUrl);
            var basePath = process.cwd();
            var prePath = '/public/images/uploads/';

            var path = basePath + prePath + getFile;

            fs.unlink(path, (err) => {
                if (err) {
                console.error(err)
                return
                }
                //file removed
            })

            res.json({
                message: `updated data by id=${req.params._id} successfully`,
                data: req.body
            })
        })
    }
    
});

/*
 * DELETE: single product
 */
router.delete('/:_id', (req, res, next) => {

    Product.findByIdAndRemove(req.params._id, req.body, (err, data) => {
        if (err) return next(err);

        var getFile = getImageFile(data.imageUrl);
        var basePath = process.cwd();
        var prePath = '/public/images/uploads/';

        var path = basePath + prePath + getFile;

        fs.unlink(path, (err) => {
            if (err) {
              console.error(err)
              return
            }
            //file removed
          })

        res.json({
            message: `deleted data by id=${req.params._id} successfully`
        });
        
    })

    

    
});

/* 
 * REMOVE: all objects
 */
router.delete('/', (req, res, next) => {
    Product.deleteMany({}, (err, data) => {
        if (err) return next(err);
        res.json({
            message: 'deleted all rows'
        })
    }) 
})

module.exports = router;