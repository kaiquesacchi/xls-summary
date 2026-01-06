import { type Fields } from "react-spreadsheet-import";
import { matchers } from "./matchers";

export type FieldKeys =
  | "externalPolicyNumber"
  | "insuranceCompanyName"
  | "insuranceConsultantEmail"
  | "insuranceConsultantName"
  | "investmentConsultantEmail"
  | "investmentConsultantName"
  | "policyHolderCpf"
  | "policyHolderName";

export const fields = [
  {
    key: "externalPolicyNumber",
    validations: [
      { rule: "required", errorMessage: "Campo obrigatório", level: "error" },
    ],
    label: "Número da Apólice",
    alternateMatches: matchers.externalPolicyNumber,
    fieldType: {
      type: "input",
    },
    example: "12345678910123456789",
  },
  {
    key: "insuranceConsultantEmail",
    validations: [
      { rule: "required", errorMessage: "Campo obrigatório", level: "error" },
    ],
    label: "E-mail do Consultor de Seguros",
    alternateMatches: matchers.insuranceConsultantEmail,
    fieldType: {
      type: "input",
    },
    example: "exemplo@email.com",
  },
  {
    key: "insuranceConsultantName",
    validations: [
      { rule: "required", errorMessage: "Campo obrigatório", level: "error" },
    ],
    label: "Nome do Consultor de Seguros",
    alternateMatches: matchers.insuranceConsultantName,
    fieldType: {
      type: "input",
    },
    example: "Felipe Silva",
  },
  {
    key: "investmentConsultantEmail",
    validations: [
      { rule: "required", errorMessage: "Campo obrigatório", level: "error" },
    ],
    label: "E-mail do Consultor de Investimentos",
    alternateMatches: matchers.investmentConsultantEmail,
    fieldType: {
      type: "input",
    },
    example: "exemplo@email.com",
  },
  {
    key: "investmentConsultantName",
    validations: [
      { rule: "required", errorMessage: "Campo obrigatório", level: "error" },
    ],
    label: "Nome do Consultor de Investimentos",
    alternateMatches: matchers.investmentConsultantName,
    fieldType: {
      type: "input",
    },
    example: "Felipe Silva",
  },
  {
    key: "policyHolderCpf",
    validations: [
      { rule: "required", errorMessage: "Campo obrigatório", level: "error" },
    ],
    label: "CPF do Segurado",
    alternateMatches: matchers.policyHolderCpf,
    fieldType: {
      type: "input",
    },
    example: "123.456.789-00",
  },
  {
    key: "policyHolderName",
    validations: [
      { rule: "required", errorMessage: "Campo obrigatório", level: "error" },
    ],
    label: "Nome do Segurado",
    alternateMatches: matchers.policyHolderName,
    fieldType: {
      type: "input",
    },
    example: "João Silva",
  },
  {
    key: "insuranceCompanyName",
    validations: [
      { rule: "required", errorMessage: "Campo obrigatório", level: "error" },
    ],
    label: "Tipo de Transação",
    alternateMatches: matchers.insuranceCompanyName,
    fieldType: {
      type: "select",
      options: [
        { label: "Azos", value: "Azos" },
        { label: "Icatu", value: "Icatu" },
        { label: "Mag", value: "Mag" },
        { label: "Omint", value: "Omint" },
        { label: "Prudential", value: "Prudential" },
        { label: "Unimed", value: "Unimed" },
      ],
    },
    example: "Tipo de transação",
  },
] as const satisfies Fields<FieldKeys>;
