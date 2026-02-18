const multer = require('multer');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs').promises;
const { v4: uuidv4 } = require('uuid');

const uploadDir = path.join(__dirname, '../../public/uploads');

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only JPEG, PNG, WebP and GIF files are allowed.'), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

const processImage = async (req, res, next) => {
  if (!req.file) {
    return next();
  }

  try {
    const filename = uuidv4() + '.webp';

    await sharp(req.file.buffer)
      .resize(400, 600, { fit: 'cover' })
      .webp({ quality: 80 })
      .toFile(path.join(uploadDir, filename));

    req.file.filename = filename;
    next();
  } catch (err) {
    next(err);
  }
};

const deleteImage = async (imagePath) => {
  if (!imagePath || !imagePath.startsWith('/uploads/')) {
    return;
  }

  try {
    const fullPath = path.join(uploadDir, path.basename(imagePath));
    await fs.unlink(fullPath);
  } catch (err) {
    if (err.code !== 'ENOENT') {
      console.error('Error deleting image:', err);
    }
  }
};

module.exports = { upload, processImage, deleteImage };
