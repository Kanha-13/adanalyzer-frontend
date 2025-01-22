import express, { Request, Response } from "express";
import multer from "multer";
import path from "path";

const router = express.Router();

const upload = multer({
  dest: path.join(__dirname, "../../uploads"),
  limits: { fileSize: 2 * 1024 * 1024 }, // initially accepting upto 2mb only
});

interface MulterRequest extends Request {
  file?: Express.Multer.File;
}

router.post("/", upload.single("file"), (req: MulterRequest, res: Response): void => {
  if (!req.file) {
    res.status(400).json({ error: "No file uploaded" });
    return;
  }

  const filePath = req.file.path;

  res.status(200).json({
    message: "File uploaded successfully",
    filePath,
  });
});

export default router;
