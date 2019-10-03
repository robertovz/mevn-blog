const express = require("express");
const router = express.Router();
const Post = require("../../models/Post");

router.get("/posts", (req, res) => {
    Post.findAll()
        .then(post => {
            res.json(post)
        })
        .catch(err => {
            res.send("Error: w" + err)
        })
})

router.post("/posts", (req, res) => {
    const today = new Date();
    const postData = {
        user_id: req.body.user_id,
        name: req.body.name,
        last_name: req.body.last_name,
        description: req.body.description,
        created: today
    }
    if (!req.body.description) {
        res.status(400)
        res.json({
            error: "Error"
        })
    } else {
        Post.create(postData)
            .then((post) => {
                res.send("Post added")
            })
            .catch(err => {
                res.send("Error: " + err)
            })
    }
})

router.delete("/posts/:id", (req, res) => {
    Post.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(() => {
            res.send("Post Deleted!")
        })
        .catch(err => {
            res.send("Error: " + err)
        })
})

router.get("/posts/:id", (req, res) => {

    Post.findAll({
        where: {
            user_id: req.params.id
        }
    })
        .then(posts => {
            if (posts) {
                res.json(posts)
            } else {
                res.send('Posts does not exist')
            }
        })
        .catch(err => {
            res.send('error: ' + err)
        })
})


router.put("/posts/:id", (req, res) => {
    if (!req.body.title) {
        res.status(400)
        res.json({
            error: "Error"
        })
    } else {
        Post.update(
            {
                title: req.body.title,
                short_description: req.body.short_description,
                description: req.body.description,
                total_ratings: req.body.total_ratings,
                total_comments: req.body.total_comments,
            },
            { where: { id: req.body.id } }
        )
            .then(() => {
                res.send("Post Updated!")
            })
            .catch(err => {
                res.send("Error: " + err)
            })
    }
})

module.exports = router