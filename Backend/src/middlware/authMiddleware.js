import jwt from "jsonwebtoken";

import User from "../models/User.js";

export const protect = async (
req,
res,
next
) => {

let token;

try {


if (
  req.headers.authorization &&
  req.headers.authorization.startsWith(
    "Bearer"
  )
) {

  token =
    req.headers.authorization.split(
      " "
    )[1];

  const decoded = jwt.verify(
    token,
    process.env.JWT_SECRET
  );

  req.user = await User.findById(
    decoded.id
  ).select("-password")
  
  if (
  req.user.subscriptionExpiry &&
  new Date() >
    req.user.subscriptionExpiry
) {

  req.user.subscriptionActive =
    false;

  req.user.subscriptionType =
    "none";

  await req.user.save();

}


  next();

} else {

  return res.status(401).json({
    message:
      "Not authorized, no token",
  });

}


} catch (error) {


return res.status(401).json({
  message: "Token failed",
});


}

};

// ADMIN ONLY
export const adminOnly = (
req,
res,
next
) => {

if (
req.user &&
req.user.role === "admin"
) {


next();


} else {


return res.status(403).json({
  message:
    "Admin access only",
});


}

};
