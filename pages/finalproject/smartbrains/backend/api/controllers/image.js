
const handleImage = (req, resp, database) => {
    const { id } = req.body;
    
    database("users").where("id", "=", id)
    .increment("entries", 1)
    .returning("entries")
    .then(entries => {
        resp.json(entries[0]);
    })
    .catch(() => resp.status(400).json("Error while trying to do the operation on db."));
};

module.exports = {
    handleImage: handleImage
}
