// API GATEWAY
import {environment} from "../../../environments/environment";

export const API_URL = environment.apiUrl;


//PATTERN
export const EMAIL_VALID =
  /^([\w._-]+@([\w-]+\.)+[\w-]{2,5})(;{1}([\w._-]+@([\w-]+\.)+[\w-]{2,5}))*$/; //NOSONAR
export const NUMS_VAL = /^\d+$/;
export const DECIMAL_WITH_SYMBOL = /^Q\s?\d{1,3}(,\d{3})*(\.\d{2})?$/;
