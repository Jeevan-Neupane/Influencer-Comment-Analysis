import User from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

export const signup = async (req, res) => {
  try {
    const {password, username, youtubeChannelUrl} = req.body;
    console.log(password, username, youtubeChannelUrl);

    if (
      [password, username, youtubeChannelUrl].some(
        (field) => field?.trim() === ""
      )
    ) {
      throw new ApiError(400, "All fields are required");
    }

    const existedUser = await User.findOne({
      $or: [{username: username}, {youtubeChannelUrl: youtubeChannelUrl}],
    });

    console.log(existedUser);

    if (existedUser) {
      throw new ApiError(400, "User already exists");
    }

    const newUser = await User.create({
      password,
      username,
      youtubeChannelUrl,
    });

    const createdUser = await User.findById(newUser._id).select("-password");

    const accessToken = await createdUser.generateAccessToken();

    const options = {
      httpOnly: false,
      secure: true,
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    };

    if (!createdUser) {
      throw new ApiError(500, "Error while creating user");
    }

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .json(new ApiResponse(200, createdUser, "User created successfully"));
  } catch (error) {
    res.status(error.statusCode || 500).json({
      message: error || "Internal Server Error",
    });
  }
};

export const login = async (req, res) => {
  try {
    const {username, password} = req.body;
    console.log(username, password);

    if ([username, password].some((field) => field?.trim() === "")) {
      throw new ApiError(400, "All fields are required");
    }

    const existedUser = await User.findOne({
      username: username,
    });

    if (!existedUser) {
      throw new ApiError(404, "User not found");
    }

    const isPasswordCorrect = await existedUser.matchPasswords(password);
    if (!isPasswordCorrect) {
      throw new ApiError(400, "Invalid credentials");
    }

    const accessToken = await existedUser.generateAccessToken();

    const loggedUser = await User.findById(existedUser._id).select("-password");

    const options = {
      httpOnly: false,
      secure: true,
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    };

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .json(
        new ApiResponse(
          200,
          {loggedUser, accessToken},
          "Logged in successfully"
        )
      );
  } catch (error) {
    res.status(error.statusCode || 500).json({
      message: error || "Internal Server Error",
    });
  }
};

export const getUser = async (req, res) => {
  try {
    const user_id = req.user._id;

    if (!user_id) {
      throw new ApiError(401, "Unauthorized access");
    }

    const user = await User.findById(user_id).select("-password");

    return res
      .status(200)
      .json(new ApiResponse(200, user, "User fetched successfully"));
  } catch (error) {
    res.status(error.statusCode || 500).json({
      message: error || "Internal Server Error",
    });
  }
};

export const logout = (req, res) => {
  try {
    const options = {
      httpOnly: true,
      secure: true,
    };

    return res
      .status(200)
      .clearCookie("accessToken", options)

      .json(new ApiResponse(200, {}, "User logged Out"));
  } catch (error) {
    res.status(error.statusCode || 500).json({
      message: error || "Internal Server Error",
    });
  }
};
