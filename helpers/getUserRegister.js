import { APIS, END_POINTS } from "../util/constants";

export default async function getUserRegister(params = "") {
  params = params && new URLSearchParams(params);
  const url = `${APIS.MOCKAPI_POSTS}${END_POINTS.USER_REGISTRATION}`;
  //https://643c5bc8f0ec48ce9042d8f2.mockapi.io/user-registration/?username=Cardozo
  const query = params ? `${url}?${params}` : url;
  try {
    ////console.log(query);
    const response = await fetch(query);
    //const postsArray = await response.json();
    //return postsArray;

    const responseBody = await response.json();
    const statusText = response.status;

    return { data: responseBody, statusText };
  } catch (error) {
    //console.log(error);
  }
}
