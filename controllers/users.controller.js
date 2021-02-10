import { User } from '../models';
// Helper functions
const findUser = async cognitoId => {
  try {
    const user = await User.findOne({
      where: {
        cognitoId,
      },
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

  res.status(200).json({ sucess: true, data: user });
};

export const createUser = async (req, res, next) => {
  const { cognitoId, username, email } = req.body;

  if (await findUser(cognitoId)) {
    return next(new Error('user already exists'));
  }

  try {
    const newUser = User.build({
      cognitoId,
      username,
      email,
    });

    const savedUser = await newUser.save();

    res.status(201).json({ sucess: true, data: savedUser });
  } catch (err) {
    next(err);
  }
};

export const updateUser = async (req, res, next) => {
  const { cognitoId, username, email } = req.body;

  const user = await findUser(cognitoId);

  if (!user) {
    return next(new Error('user not found'));
  }

  try {
    await User.update(
      {
        username,
        email,
      },
      {
        where: {
          id: user.id,
        },
      }
    );

    res.status(200).json({ success: true, data: await findUser(cognitoId) });
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

    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    next(err);
  }
};
