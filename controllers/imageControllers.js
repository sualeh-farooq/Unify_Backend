const storeImg = async  (req, res) => {
    if (!req.file) {
        return res.status(400).send({ message: 'Please upload a file.' });
    }
    console.log(req.file);
    res.send({ message: 'File uploaded successfully.', file: req.file });
}

module.exports = {storeImg}