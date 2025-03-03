import { Request, Response } from 'express';
import { CountryObject, FlagDataResponse, NeighborsDataResponce } from '../types/types';
import axios from 'axios';

const BASE_URL_COUNTRIES = process.env.BASE_URL_COUNTRIES;
const BASE_URL_DATA = process.env.BASE_URL_DATA;

const fetchCountriesObjects = async (): Promise<CountryObject[]> => {
  const response = await axios.get(`${BASE_URL_COUNTRIES}/AvailableCountries`);

  if (response.statusText != 'OK') {
    throw new Error('Fetch failed');
  }

  return response.data as CountryObject[];
};

export const getAllCountries = async (req: Request, res: Response): Promise<void> => {
  try {
    const data = await fetchCountriesObjects();
    const countries = data.map((x) => x.name.toLowerCase());

    res.status(200).json(countries);
  } catch (e) {
    console.log(e);
    res.sendStatus(503);
  }
};

export const getInfoByCountryName = async (req: Request, res: Response): Promise<void> => {
  const countryName = req.params.name;

  let data: CountryObject[];

  try {
    data = await fetchCountriesObjects();
  } catch (e) {
    console.log(e);
    res.sendStatus(503);
    return;
  }

  const countryCode = data.find((x) => x.name.toLowerCase() == countryName)?.countryCode;

  if (!countryCode) {
    res.status(400).json({ msg: `No data about ${countryName}` });
    return;
  }

  const urls = {
    neighbors: `${BASE_URL_COUNTRIES}/CountryInfo/${countryCode}`,
    flag: `${BASE_URL_DATA}/countries/flag/images`,
    population: `${BASE_URL_DATA}/countries/population`
  };

  try {
    const [neighbors, population, flag] = await Promise.all([
      axios.get(urls.neighbors),
      axios.post(urls.population, {
        country: countryName
      }),
      axios.post(urls.flag, {
        iso2: countryCode
      })
    ]);

    const response = {
      flagUrl: (flag.data as FlagDataResponse).data.flag,
      neighbors: (neighbors.data as NeighborsDataResponce).borders,
      population: population.data
    };

    res.status(200).json(response);
  } catch (e) {
    console.log(e);
    res.sendStatus(503);
    return;
  }
};
