// // auth.js
// const jwt = require("jsonwebtoken");

// // Middleware for authentication
// const authMiddleware = (req, res, next) => {
//   // Get token from the headers
//   const token = req.headers["authorization"]?.split(" ")[1];

//   if (!token) {
//     return res
//       .status(401)
//       .json({ message: "No token provided, authorization denied." });
//   }

//   try {
//     // Verify the token
//     const decoded = jwt.verify(token, process.env.JWT_SECRET); // Make sure to set your JWT secret in an env variable
//     req.user = decoded; // Attach user info to request object
//     next(); // Move to the next middleware or route handler
//   } catch (error) {
//     return res.status(401).json({ message: "Token is not valid." });
//   }
// };

// // Middleware for checking if user is the author
// const authorizeAuthor = (req, res, next) => {
//   const { userId } = req.user; // Get the user ID from the token
//   const postId = req.params.id; // Assume post ID is passed in the URL

//   // Assuming you have a function to get post by ID
//   // Replace this with your actual implementation
//   Post.findById(postId, (err, post) => {
//     if (err || !post) {
//       return res.status(404).json({ message: "Post not found." });
//     }

//     // Check if the logged-in user is the author of the post
//     if (post.authorId.toString() !== userId) {
//       return res
//         .status(403)
//         .json({ message: "Unauthorized. You cannot delete this post." });
//     }

//     next(); // User is authorized, proceed to the next middleware or route handler
//   });
// };

// module.exports = {
//   authMiddleware,
//   authorizeAuthor,
// };
