const router = require("express").Router();
const List = require("../models/List");
const verify = require("../verifyToken");

//CREATE : LIST : 
router.post("/", verify, async (req, res) => {
    if (req.user.isAdmin) {
        const newList = new List(req.body);

        try {
            //saving list in DB : 
            const savedList = await newList.save();
            res.status(200).send(savedList);
        } catch (err) {
            res.send(500).send(err)
        }
    } else {
        res.status(403).json("you are not allowed to create new movies!!");
    }
});

//DELETE LIST : 
router.delete("/:id", verify, async (req, res) => {
    if (req.user.isAdmin) {
        const deleteList = await List.findByIdAndDelete(req.params.id);

        try {
            res.status(200).send(deleteList);
        } catch (err) {
            res.send(500).send(err)
        }
    } else {
        res.status(403).json("you are not allowed to delete the Lists!!");
    }
});

// GET ONE LIST : 
router.get("/find/:id", async (req, res) => {
    try {
        const list = await List.findById(req.params.id)
        res.status(200).send(list)
    } catch (err) {
        res.status(500).send(err)
    }
})

// GET MANY LIST : 
router.get("/", verify, async (req, res) => {
    const typeQuery = req.query.type;
    const genreQuery = req.query.genre;
    let list = [];

    try {
        if (typeQuery) {
            //send specific data | movies or series
            if (genreQuery) {
                list = await List.aggregate([

                    { $sample: { size: 10 } },
                    { $match: { type: typeQuery, genre: genreQuery } }

                ])
            }
            else {
                list = await List.aggregate([

                    { $sample: { size: 10 } },
                    { $match: { type: typeQuery } }
                ])
            }
        } else {
            //send random list : 
            list = await List.aggregate([
                {
                    $sample: { size: 10 }
                }
            ])
        }
        res.status(200).send(list)
    } catch (err) {
        res.status(500).send(err)
    }

})

module.exports = router;
