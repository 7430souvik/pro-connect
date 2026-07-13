import {Router} from "express";
import {activeCheck,commentPosts,createPost, delete_comment_by_post, deletePost, increment_likes} from "../controllers/post.controller.js";
import multer from "multer";
import { getAllPosts,get_comments_by_posts} from "../controllers/post.controller.js";


const router = Router();

const storage=multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, 'uploads/')
    },
    filename: (req, file, cb)=>{
        cb(null, file.originalname)
    },

});

const upload= multer({storage: storage});



router.route("/").get(activeCheck);

router.route("/post").post(upload.single('media'), createPost)
router.route("/posts").get(getAllPosts);
router.route("/delete_post").delete(deletePost);
router.route("/comment").post(commentPosts);
router.route("/get_comments").get(get_comments_by_posts);
router.route("/delete_comment").delete(delete_comment_by_post);
router.route("/increment_post_like").post(increment_likes);






export default router;