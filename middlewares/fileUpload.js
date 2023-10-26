const multer = require('multer');
const path = require('path')
const fs = require('fs')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadPath = 'images';
        fs.mkdir(uploadPath, function () {
            cb(null, uploadPath);
        });
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});
const fuleUpload = multer({
    storage: storage,
    // limits: {
    //     fieldNameSize: 300,
    //     fileSize: 10485760, // 10 Mb
    // },
    limits: {
        fieldNameSize: 300, // Limit the field name size
        fileSize: {
            min: 10240,      // Minimum file size (10 in KB)
            max: 10485760,  // Maximum file size (10 MB in bytes)
        },
    },
    fileFilter: (req, file, cb) => {
        const acceptableExtensions = ['.png', '.PNG', '.jpg', '.JPG', '.JPEG', '.gif', '.pdf', '.csv', '.xls', '.doc', '.xlsx', '.docx'];
        let ext = path.extname(file.originalname);
        if (!(acceptableExtensions.includes(ext))) {
            req.fileValidationError = "File type not allowed";
            return cb(null, false, req.fileValidationError);
        }

        // added this
        const fileSize = parseInt(req.headers['content-length']);
        if (fileSize > 10485760) {
            req.fileValidationError = "Please upload file below 10 MB";
            return cb(null, false, req.fileValidationError);
        }
        cb(null, true);
    }
})
// const updateFileTarget = (dest, field) => (req, res, next) => {
//     if (req.body[field]) {
//         let oldPath = process.env.UPLOAD_DIR;
//         let dest_dir = process.env.UPLOAD_DIR + (dest ? (dest + '/') : '');
//         let newPath = dest_dir + req.body[field] + '/';
//         if (!fs.existsSync(dest_dir)) {
//             fs.mkdirSync(dest_dir);
//         }
//         if (!fs.existsSync(newPath)) {
//             fs.mkdirSync(newPath);
//         }
//         if (req.files && req.files.length > 0) {
//             for (let i = 0; i < req.files.length; i++) {
//                 let file_name = req.files[i].filename;
//                 fs.renameSync(oldPath + file_name, newPath + file_name)
//                 req.files[i].path = newPath + file_name;
//             }
//         }
//     }
//     next()
// }
module.exports = {
    fuleUpload,
}