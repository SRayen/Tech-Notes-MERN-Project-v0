const User = require("../models/User");
const Note = require("../models/Note");
const bcrypt = require("bcrypt");
//@desc Get all users
//@route GET /users
//@access Private
const getAllUsers = async (req, res) => {
  //select(-password) : do not return the password
  /* lean() : the returned results are regular JavaScript objects rather than
   Mongoose documents, which provides better performance and reduces memory consumption. */
  const users = await User.find().select("-password").lean();
  // If no users
  if (!users?.length) {
    return res.status(400).json({ message: "No users found" });
  }
  res.json(users);
};

//@desc Create new user
//@route POST /users
//@access Private
const createNewUser = async (req, res) => {
  const { username, password, roles } = req.body;

  //confirm data
  if (!username || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  //check for duplicate
  /* The strength parameter indicates the level of comparison, where 1 is the most lenient and 5 is the strictest. 
  A strength of 2 is commonly used for case-insensitive comparisons. */
  const duplicate = await User.findOne({ username })
    .collation({ locale: "en", strength: 2 })
    .lean()
    .exec();

  if (duplicate) {
    return res.status(409).json({ message: "Duplicate username" });
  }
  //Hash password
  const hashedPwd = await bcrypt.hash(password, 10); //salt rounds

  // const userObject = { username, password: hashedPwd, roles };
  const userObject =
    !Array.isArray(roles) || !roles.length
      ? { username, password: hashedPwd }
      : { username, password: hashedPwd, roles };

  //Create and store new User
  const user = await User.create(userObject);
  if (user) {
    //created
    res.status(201).json({ message: `New user ${username} created` });
  } else {
    res.status(400).json({ message: `Invalid user data received` });
  }
};

//@desc Update a user
//@route PATCH /users
//@access Private
const updateUser = async (req, res) => {
  const { id, username, roles, password, active } = req.body;
  //Confirm data
  if (
    !id ||
    !username ||
    !Array.isArray(roles) ||
    !roles.length ||
    typeof active !== "boolean"
  ) {
    return res
      .status(400)
      .json({ message: "All fields except password are required" });
  }
  //Here we don't use lean() : to have save and other methods attached (in the result)
  const user = await User.findById(id).exec();

  if (!user) {
    return res.status(400).json({ message: "User not found !" });
  }
  //Check for duplicate
  //Here we use lean() :  we do not need the methods returned with this
  /* The strength parameter indicates the level of comparison, where 1 is the most lenient and 5 is the strictest. 
  A strength of 2 is commonly used for case-insensitive comparisons. */
  const duplicate = await User.findOne({ username })
    .collation({ locale: "en", strength: 2 })
    .lean()
    .exec();
  //Allow updates to the original user
  if (duplicate && duplicate?._id.toString() !== id) {
    //Case where the username from the req (update) already exist in the DB !
    return res.status(409).json({ message: "Duplicate username" });
  }
  user.username = username;
  user.roles = roles;
  user.active = active;
  if (password) {
    //Hash password
    user.password = await bcrypt.hash(password, 10); //salt rounds
  }
  const updatedUser = await user.save();
  res.json({ message: `${updatedUser.username} updated` });
};

//@desc Delete a user
//@route DELTE /users
//@access Private
const deleteUser = async (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(400).json({ message: "User ID Required" });
  }
  //Check if the user has notes
  const note = await Note.findOne({ user: id }).lean().exec();
  if (note) {
    return res.status(400).json({ message: "User has assigned notes" });
  }
  const user = await User.findById(id).exec();
  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }
  const result = await user.deleteOne();
  const reply = `Username ${result.username} with ID ${result._id} deleted`;
  res.json(reply);
};

module.exports = {
  getAllUsers,
  createNewUser,
  updateUser,
  deleteUser,
};
