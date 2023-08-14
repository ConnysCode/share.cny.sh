import axios from "axios";
import { ICnyShRedirect, ICnyShResponse } from "../../interfaces/cny-sh";

const createCnyShRedirect = async (url: string) => {
  const res = await axios.post<ICnyShResponse<ICnyShRedirect>>(
    "https://cny.sh/api/create/",
    { url }
  );
  if (!res.data.success) throw new Error(res.data.message);
  return res.data.content;
};

export default createCnyShRedirect;
