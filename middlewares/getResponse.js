export default async function getResponse(res, callback, next) {
  try {
    const { data, status = 200 } = await callback();
    res.status(status).send(data);
  } catch (error) {
    next(error);
  }
}
