export class Organization {
  company_name: string;
  company_address: string;
  country: any;
  state: any;
  city: any;
  zipCode: any;
  billing_contact: {
    billingCountry: any;
    billingState: any;
    billingCity: any;
    billingZipCode: any;
    name: string;
    email: string;
    phone: string;
  };
}
