const multer = require('multer');

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, './uploads');
	},
	filename: (req, file, cb) => {
		cb(null, Date.now() + "--" + file.orignalname);
	}
});

const fileFilter = (req, file, cb) => {
	if ((file.mimteype).includes('jpeg')) {
		cb(null, true);
	} else {
		cb(null, false);
	}
}

let uplaod = multer({ 
	storage: storage,
	fileFilter: fileFilter 
});

module.exports = upload.single('image');