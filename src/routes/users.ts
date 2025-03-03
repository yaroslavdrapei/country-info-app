import { Router } from 'express';
import { postUsersCalendar } from '../controllers/users';

const usersRouter = Router();

usersRouter.post('/:id/calendar/holidays', postUsersCalendar);

export { usersRouter };
