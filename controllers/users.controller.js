import { User } from '../models';
// Helper functions
export const findUser = async cognitoId => {
  try {
    const user = await User.findOne({
      where: {
        cognitoId,
      },
      include: [{ all: true }],
    });

    return user ? user : undefined;
  } catch (err) {
    return err;
  }
};

// Route functions

export const getUser = async (req, res, next) => {
  const cognitoId = req.params.cognitoId;
  const user = await findUser(cognitoId);

  if (!user) {
    return next(new Error('user not found'));
  }

  res.status(200).json(user);
};

export const createUser = async (req, res, next) => {
  const { cognitoId, username, email } = req.body;

  try {
    const newUser = User.build({
      cognitoId,
      username,
      email,
    });

    const savedUser = await newUser.save();

    res.status(201).json(savedUser);
  } catch (err) {
    next(err);
  }
};

export const updateUser = async (req, res, next) => {
  const cognitoId = req.params.cognitoId;

  const user = await findUser(cognitoId);

  if (!user) {
    return next(new Error('user not found'));
  }

  try {
    const updatedUser = await User.update(
      {
        ...req.body,
      },
      {
        where: {
          id: user.id,
        },
        returning: true,
        plain: true,
      }
    );

    res.status(200).json(updatedUser[1].dataValues);
  } catch (err) {
    next(err);
  }
};

export const deleteUser = async (req, res, next) => {
  const cognitoId = req.params.cognitoId;
  const user = await findUser(cognitoId);

  if (!user) {
    return next(new Error('user not found'));
  }

  try {
    User.destroy({
      where: {
        id: user.id,
      },
    });

    res.status(200).json({});
  } catch (err) {
    next(err);
  }
};
