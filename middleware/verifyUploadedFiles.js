const fs = require('fs/promises');
const path = require('path');
const magic = require('magic-bytes.js');

const ALLOWED_MIME_TYPES = ['image/webp'];

async function verifyAndMoveUploads(req, res, next) {
  const uploadedFiles = req.files || [];

  // Ensure verified_uploads folder exists
  const verifiedDir = path.join(__dirname, '..', 'verified_uploads');
  await fs.mkdir(verifiedDir, { recursive: true });

  for (const file of uploadedFiles) {
    const buffer = await fs.readFile(file.path);

    // There are more useful functions in the magic-bytes.js library
    // I am using this and not file-type, because file-type is ESM and loadESM package
    // is not a good long term solution.
    // Why not use ESM?
    // I guess I like confusing myself between frontend and backend with const/import and require/from
    const matches = magic.filetypemime(buffer);

    const mime = matches?.[0] || null;

    if (!mime || !ALLOWED_MIME_TYPES.includes(mime)) {
      await fs.unlink(file.path);
      return res.status(400).json({ success: false, error: `Invalid or unsupported file type: ${file.originalname}`, code: '' });
    }

    // Move file to verified_uploads folder
    const newPath = path.join(verifiedDir, file.filename);
    try {
      await fs.rename(file.path, newPath);
      // Optional: update the file's path in req.files
      file.path = newPath;
      file.verified = true;
      file.mime = mime;

    } catch (err) {
      return res.status(500).json({ success: false, error: `Failed to move file: ${file.originalname}`, code: '' });
    }
  }

  next();
}

module.exports = verifyAndMoveUploads;