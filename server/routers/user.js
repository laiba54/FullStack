const express = require('express');
const { handlesignupFunction, getUsers, handleUpdateFunction } = require('../controllers/user');
const multer = require('multer');
const {restrictLoginUser} = require('../middleware/auth')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

const router = express.Router();

router.post('/signup', upload.single('profile'), handlesignupFunction);

router.get('/signup', getUsers);

router.patch('/updateusers/:id', upload.single('profile'), handleUpdateFunction);

router.post('/logout', async(req, res) => {
  res.clearCookie('uid');
  res.clearCookie('session');
  res.status(200).send({ msg: 'Logout successfully' });
});

module.exports = router;
