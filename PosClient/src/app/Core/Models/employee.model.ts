import { Designation } from "../Enums/designation.enum";

export class Employee {
  public id:number;
  public name:string;
  public phone: string;
  public mobile: number;
  public email:string;
  public designation: Designation;
  public profilePicture: string;
}