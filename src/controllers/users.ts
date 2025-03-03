import { Request, Response } from 'express';
import { Calendar, User } from '../schemas/User';
import axios from 'axios';
import { HolidayResponse } from '../types/types';

const BASE_URL_COUNTRIES = process.env.BASE_URL_COUNTRIES!;

const fetchHolidays = async (year: number, countryCode: string): Promise<string[]> => {
  const holidays = await axios.get(`${BASE_URL_COUNTRIES}/PublicHolidays/${year}/${countryCode}`);
  console.log(`${BASE_URL_COUNTRIES}/${year}/${countryCode}`);

  return (holidays.data as HolidayResponse[]).map((x) => x.name);
};

export const postUsersCalendar = async (req: Request, res: Response): Promise<void> => {
  const id = parseInt(req.params.id);
  const calendar: Calendar = req.body; // did not have time to validate

  if (isNaN(id)) {
    res.sendStatus(400);
    return;
  }

  // if user didn't specify any holidays then fetch them for the user
  if (!(calendar.holidays && calendar.holidays.length > 0)) {
    try {
      calendar.holidays = await fetchHolidays(calendar.year, calendar.countryCode);
    } catch (e) {
      res.sendStatus(503);
      return;
    }
  }

  let user;

  try {
    user = await User.findOne({ id });
  } catch (e) {
    console.log(e);
    res.status(503).json({ msg: "Db doesn't respond" });
    return;
  }

  if (!user) {
    const newUser: User = {
      id,
      calendars: [calendar]
    };

    try {
      await User.create(newUser);
    } catch (e) {
      console.log(e);
      res.status(503).json({ msg: "Db doesn't respond" });
    }

    res.status(201).json(newUser);
    return;
  }

  const calendars = user.calendars;

  // check if user has the calendar with the same country code and year
  const calendarIndex = calendars.findIndex((x) => x.countryCode == calendar.countryCode && x.year == calendar.year);

  // if yes then add holidays to the existing calendar, if no create a new one
  if (calendarIndex > -1) {
    const newHolidays = calendar.holidays;
    calendars[calendarIndex].holidays!.push(...newHolidays);
  } else {
    calendars.push(calendar);
  }

  try {
    await User.updateOne({ id }, { $set: { calendars } });
  } catch (e) {
    res.status(503).json({ msg: "Db doesn't respond" });
    return;
  }

  res.sendStatus(201);
};
