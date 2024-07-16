import multer, { FileFilterCallback } from "multer";
import path from "path";

export const upload = multer({
    dest: 'uploads/',
    fileFilter: (req: Express.Request, file: Express.Multer.File, cb: FileFilterCallback) => {
        const filetypes = /csv/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb(new Error('File upload only supports CSV files'));
        }
    },
});

