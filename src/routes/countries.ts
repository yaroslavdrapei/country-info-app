import { Router } from 'express';
import { getAllCountries } from '../controllers/countries';

const countriesRouter = Router();

countriesRouter.get('/', getAllCountries);

export { countriesRouter };
