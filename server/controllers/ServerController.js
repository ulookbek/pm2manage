import ServerModel from '../models/Server.js';

export const getAll = async (req, res) => {
  try {
    const servers = await ServerModel.find().exec();
    res.json(servers);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось получить сервера',
    });
  }
};

export const getOne = async (req, res) => {
  try {
    const serverId = req.params.id;

    ServerModel.findOneAndUpdate(
      {
        _id: serverId,
      },
      {
        $inc: { viewsCount: 1 },
      },
      {
        returnDocument: 'after',
      },
      (err, doc) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            message: 'Не удалось вернуть сервер',
          });
        }

        if (!doc) {
          return res.status(404).json({
            message: 'Сервер не найден',
          });
        }

        res.json(doc);
      },
    )
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось получить сервера',
    });
  }
};

export const remove = async (req, res) => {
  try {
    const serverId = req.params.id;

    ServerModel.findOneAndDelete(
      {
        _id: serverId,
      },
      (err, doc) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            message: 'Не удалось удалить статью',
          });
        }

        if (!doc) {
          return res.status(404).json({
            message: 'Статья не найдена',
          });
        }

        res.json({
          success: true,
        });
      },
    );
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось получить сервера',
    });
  }
};

export const create = async (req, res) => {
  try {
    const doc = new ServerModel({
      name: req.body.name,
      ip: req.body.ip,
      port: req.body.port,
    });

    const post = await doc.save();

    res.json(post);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось создать сервер',
    });
  }
};

export const update = async (req, res) => {
  try {
    const serverId = req.params.id;

    await ServerModel.updateOne(
      {
        _id: serverId,
      },
        {
          name: req.body.name,
          ip: req.body.ip,
          port: req.body.port,
        },
    );

    res.json({
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось обновить сервер',
    });
  }
};
