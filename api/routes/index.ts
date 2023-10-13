import express from 'express';
import payments from './payments';
import webhooks from './webhooks';
import {authenticate} from "$api/middlewares/auth";

const router = express.Router();

router.use('/payments', payments);
router.use('/wh', webhooks);


// 2. GET /healthcheck endpoint
const healthcheck = (req: express.Request, res: express.Response) => {
  res.status(200).send('OK');
};
router.get('/healthcheck', healthcheck);


// 2. GET /users/me endpoint
const me = (req: express.Request, res: express.Response) => {
  // @ts-ignore
  const user = req.user;
  console.log('I am in me, here is user: ', user);

  const {id, email, membership_status} = user;
  res.status(200).send({id, email, membership_status});
};
router.get('/users/me', authenticate(), me);


export default router;
