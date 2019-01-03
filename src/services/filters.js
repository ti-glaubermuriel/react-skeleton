import {getProfile} from "../services/auth";
import {FormatPeriodDB} from "../Utils";

export const FILTERS = "@axreg-Filters";


export const getFilters = () => {
  return JSON.parse(localStorage.getItem(FILTERS));
}

export const getRequestFilters = () => {
  let objStorage = JSON.parse(localStorage.getItem(FILTERS));
  let p_institution = (objStorage.institution) ? {id: parseInt(objStorage.institution)} : null;
  let p_period = FormatPeriodDB(objStorage.period);
  let objRequest = {
    institution: p_institution,
    period: p_period,
    user: getProfile()
  }

  return objRequest;
}

export const setFilters = (objState) => {
  localStorage.setItem(FILTERS, JSON.stringify(objState));
};
