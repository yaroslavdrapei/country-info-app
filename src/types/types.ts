export type CountryObject = {
  countryCode: string;
  name: string;
};

export type FlagDataResponse = {
  data: {
    flag: string;
  };
};

export type NeighborsDataResponce = {
  borders: string[];
};
