import { Massage, User } from '../models';

// Helper functions
export const findMassage = async id => {
  try {
    const massage = await Massage.findOne({
      where: {
        id,
      },
    });

    return massage || undefined;
  } catch (err) {
    return err;
  }
};

// Route functions

export const getMassage = async (req, res, next) => {
  const massageId = req.params.massageId;
  const massage = await findMassage(massageId);

  if (!massage) {
    return next(new Error('massage not found'));
  }

  res.status(200).json(massage);
};

export const createMassage = async (req, res, next) => {
  const { name, link, userId } = req.body;

  try {
    const user = await User.findOne({
      where: { id: userId },
    });

    if (!user) {
      return next(new Error('user does not exist'));
    }

    const newMassage = Massage.build({
      name,
      link,
      UserId: user.id,
    });

    const savedMassage = await newMassage.save();

    res.status(201).json(savedMassage);
  } catch (err) {
    next(err);
  }
};

export const updateMassage = async (req, res, next) => {
  const massageId = req.params.massageId;

  const massage = await findMassage(massageId);

  if (!massage) {
    return next(new Error('massage not found'));
  }

  try {
    const updatedMassage = await Massage.update(
      {
        ...req.body,
      },
      {
        where: {
          id: massage.id,
        },
        returning: true,
        plain: true,
      }
    );

    res.status(200).json(updatedMassage[1].dataValues);
  } catch (err) {
    next(err);
  }
};

export const deleteMassage = async (req, res, next) => {
  const massageId = req.params.massageId;
  const massage = await findMassage(massageId);

  if (!massage) {
    return next(new Error('massage not found'));
  }

  try {
    Massage.destroy({
      where: {
        id: massage.id,
      },
    });

    res.status(200).json({});
  } catch (err) {
    next(err);
  }
};
