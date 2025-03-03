import { Router } from 'express';
import { getAllCountries, getInfoByCountryName } from '../controllers/countries';

const countriesRouter = Router();

countriesRouter.get('/', getAllCountries);
countriesRouter.get('/:name', getInfoByCountryName);

export { countriesRouter };
