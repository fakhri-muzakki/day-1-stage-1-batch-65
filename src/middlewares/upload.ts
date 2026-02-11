import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(process.cwd(), 'src/public/uploads'));
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.replace(/\s+/g, '-');
    const uniqueName = `${Date.now()}-${fileName}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

export default upload;
