const { Book, User } = require("../models");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    if (!users || users.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No users found" });
    }
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json({ success: false, message: "Internal server error", error });
  }
};

exports.getSingleUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: `User not found for Id: ${id}` });
    }
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json({ success: false, message: "Internal server error", error });
  }
};

exports.createNewUser = async (req, res) => {
  try {
    const data = req.body;
    if (!data || Object.keys(data).length === 0) {
      return res.status(400).json({
        success: false,
        message: "Please provide the data to create a new user",
      });
    }
    const newUser = new User(data);
    const response = await newUser.save();
    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: response,
    });
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json({ success: false, message: "Internal server error", error });
  }
};

exports.updateUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    if (!data || Object.keys(data).length === 0) {
      return res.status(400).json({
        success: false,
        message: "Please provide the data to update the user",
      });
    }
    const response = await User.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
    if (!response) {
      return res
        .status(404)
        .json({ success: false, message: `User not found for Id: ${id}` });
    }
    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: response,
    });
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json({ success: false, message: "Internal server error", error });
  }
};

exports.deleteUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await User.findByIdAndDelete(id);
    if (!response) {
      return res
        .status(404)
        .json({ success: false, message: `User not found for Id: ${id}` });
    }
    res
      .status(200)
      .json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json({ success: false, message: "Internal server error", error });
  }
};

exports.getSubscriptionDetailsById = async (req, res) => {
  const SUBSCRIPTION_DAYS = {
    basic: 90,
    standard: 180,
    premium: 365,
  };
  const MS_PER_DAY = 1000 * 60 * 60 * 24;
  // convert date to day number
  const toDays = (date = new Date()) =>
    Math.floor(new Date(date).getTime() / MS_PER_DAY);
  try {
    const { id } = req.params;
    // Find user by their ID
    // .lean() avoids creating a Mongoose document when not needed.
    const user = await User.findById(id).lean();
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: `User not found for Id: ${id}` });
    }
    const today = toDays();
    const subscriptionStart = toDays(user.subscriptionDate);
    const returnDate = toDays(user.returnDate);

    const subscriptionDuration = SUBSCRIPTION_DAYS[user.subscriptionType] || 0;
    const subscriptionExpiry = subscriptionStart + subscriptionDuration;
    const isSubscriptionExpired = subscriptionExpiry < today;
    const subscriptionDaysLeft = Math.max(subscriptionExpiry - today, 0);
    const daysLeftForReturn = returnDate - today;

    let fine = 0;
    let returnStatus = returnDate;

    if (returnDate < today) {
      returnStatus = "Book is overdue";
      fine = isSubscriptionExpired ? 200 : 100;
    }
    const data = {
      ...user,
      subscriptionExpired: isSubscriptionExpired,
      subscriptionDaysLeft,
      dayLeftForExpiration: daysLeftForReturn,
      returnDate: returnStatus,
      fine,
    };
    res.status(200).json({ success: true, data });
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json({ success: false, message: "Internal server error", error });
  }
};
