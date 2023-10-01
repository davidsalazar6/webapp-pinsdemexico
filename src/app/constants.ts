import { environment } from "./environments/environment";

console.log(environment)
export class Constants {
  public static apiEndpoint: string = environment.url;
}
