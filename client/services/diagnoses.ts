import axios from "axios";
import { type Diagnosis } from "../../shared/types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Diagnosis[]>(`${apiBaseUrl}/diagnoses`);

  return data;
};

export default {
  getAll,
};
