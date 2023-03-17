import express, { Request, Response } from 'express';
import ActivityController from '../controllers/activity.controller';
import UserController from '../controllers/user.controller';
import { CustomError } from '../errors/custom.error';
const router = express.Router();

router.get('/activity', async (req: Request, res: Response) => {
  const controller = new ActivityController();
  try {
    const activity = await controller.getActivity();
    return res.status(200).json(activity);
  } catch(err) {
    return handleError(res, err);
  }
});

router.post('/user', async (req: Request, res:Response) => {
  const controller = new UserController();
  try{
    await controller.postUser(req.body);
    return res.status(204).send();
  } catch(err) {
    return handleError(res, err);
  }
});

function handleError(res: Response, err: unknown) {
  if(err instanceof CustomError) {
    return res.status(err.statusCode).json({error: err.message});
  }
  return res.status(500).json({message: "Encountered unexpected error! Please contact your admin."});
}

export default router;