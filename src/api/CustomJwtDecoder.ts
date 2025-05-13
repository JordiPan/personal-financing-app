import { jwtDecode } from "jwt-decode";
import { CustomJwtPayload } from "./interfaces/auth/CustomJwtPayload";

//cant grab token here with useauth because hook not in componentl
export const customjwtDecoder = (token: string) : CustomJwtPayload => {
  try {
    let decoded = jwtDecode(token) as CustomJwtPayload;
    return decoded;
  } 
  catch (error) {
    console.log(error);
    return {sub: 0, role: '', exp: 0} as CustomJwtPayload;
  }
};
