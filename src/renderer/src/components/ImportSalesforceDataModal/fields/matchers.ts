// cSpell:words parc pagto perc
import { FieldKeys } from "./fields";

type Matchers = Record<FieldKeys, [string]>;

export const matchers: Matchers = {
  externalPolicyNumber: ["PolicyNumber__c"],
  insuranceConsultantEmail: ["Owner.Email"],
  insuranceConsultantName: ["Owner.Name"],
  investmentConsultantEmail: ["Account.Owner.Email"],
  investmentConsultantName: ["Account.Owner.Name"],
  policyHolderCpf: ["Account.CPF__c"],
  policyHolderName: ["Account.Name"],
  insuranceCompanyName: ["Insurer__c"],
};
