const router = require("express").Router();
const Movie = require("../models/Movie");
const verify = require("../verifyToken");

//CREATE : MOVIE : 
router.post("/", verify, async (req, res) => {
  if (req.user.isAdmin) {
    const newMovie = new Movie(req.body);

    try{
        //saving movie in DB : 
        const savedMovie = await newMovie.save();
        res.status(200).send(savedMovie);
    }catch(err){
        res.send(500).send(err)
    }
  } else {
    res.status(403).json("you are not allowed to create new movies!!");
  }
});

//UPDATE : MOVIE : 
router.put("/:id", verify, async (req, res) => {
    if (req.user.isAdmin) { 
      try{
          //saving movie in DB : 
          const updatedMovie = await Movie.findByIdAndUpdate(
              req.params.id,
              {
                  $set : req.body,
              },
              {
                  new : true,
              }
          );
          res.status(200).send(updatedMovie);
      }catch(err){
          res.send(500).send(err)
      }
    } else {
      res.status(403).json("you are not allowed to create new movies!!");
    }
  });

//DELETE : MOVIE : 
router.delete("/:id", verify, async (req, res) => {
    if (req.user.isAdmin) { 
      try{
          //deleting movie from DB : 
          const deletedMovie = await Movie.findByIdAndDelete(
              req.params.id,
          );
          res.status(200).send(deletedMovie);
      }catch(err){
          res.send(500).send(err)
      }
    } else {
      res.status(403).json("you are not allowed to create new movies!!");
    }
  });

//GET ONE : MOVIE : 
router.get("/find/:id", verify, async (req, res) => {
    if ( req.body.id === req.params.id || req.user.isAdmin) { 
      try{
          //Getting movie from DB : 
          const movie = await Movie.findById(
              req.params.id,
          );
          res.status(200).send(movie);
      }catch(err){
          res.send(500).send(err)
      }
    } else {
      res.status(403).json("you are not allowed to create new movies!!");
    }
  });

//GET MANY : MOVIES : 
router.get("/", verify, async (req, res) => {
    if (req.user.isAdmin) { 
      try{
          //Getting movie from DB : 
          const movie = await Movie.find();
          res.status(200).send(movie.reverse()); //.reverse = modt recent
      }catch(err){
          res.send(500).send(err)
      }
    } else {
      res.status(403).json("you are not allowed to create new movies!!");
    }
  });

//GET RANDOM : MOVIE : 
router.get("/random", verify, async (req, res) => {
    const type = req.query.type;
    let movie;
      try{
          if(type === "series"){
            //show random series : 
            movie = await Movie.aggregate([
                { $match : {isSeries : true}},
                {$sample : {size : 1}},
            ])
          }else{
            //show random movies : 
            movie = await Movie.aggregate([
                { $match : {isMovies : true}},
                {$sample : {size : 1}},
            ])
          }
          res.status(200).send(movie)
      }catch(err){
          res.send(500).send(err)
      }
    });

module.exports = router;
