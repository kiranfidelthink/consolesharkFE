export class Organization {
  company_name: string;
  addressLineOne: string;
  addressLineTwo: string;
  country: any;
  state: any;
  city: any;
  zipCode: any;
  billing_contact: {
    name: string;
    email: string;
    phone: string;
    cell: any;
    billing_address_line_one: string;
    billing_address_line_two: string
    billingCountry: any;
    billingState: any;
    billingCity: any;
    billingZipCode: any;
  };
}
