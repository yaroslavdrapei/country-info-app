import { Request, Response } from 'express';
import { CountryObject } from '../types/types';

const BASE_URL = process.env.BASE_URL_COUNTRIES;

export const getAllCountries = async (req: Request, res: Response): Promise<void> => {
  const response = await fetch(`${BASE_URL}/AvailableCountries`);

  if (!response.ok) {
    res.sendStatus(503);
    return;
  }

  const data: CountryObject[] = await response.json();

  const countries = data.map((x) => x.name.toLowerCase());

  res.status(200).json(countries);
};
