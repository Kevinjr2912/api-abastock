import { Request } from "express";
import multer from "multer";
import path from "path";

// Asegurarnos que el directorio existe
const uploadDir = path.join(__dirname, "..", "uploads");
if (!require("fs").existsSync(uploadDir)) {
    require("fs").mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage ({
    destination: function (req, file, cb) {
        // Directorio temporal en donde se va a almacenar cada imagen
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        // Nombre del archivo en el directorio destino
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Only image files are allowed'));
    }
};

export const upload = multer({ storage: storage, fileFilter: fileFilter }).single('image');