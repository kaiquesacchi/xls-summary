import { type Fields } from "react-spreadsheet-import";

export const fields: Fields = [
  {
    key: "policyHolderName",
    validations: [
      { rule: "required", errorMessage: "Campo obrigatório", level: "error" },
    ],
    label: "Nome do Segurado",
    alternateMatches: ["Nome do Segurado", "Cliente"],
    fieldType: {
      type: "input",
    },
    example: "João Silva",
  },
  {
    key: "policyHolderCpf",
    validations: [
      { rule: "required", errorMessage: "Campo obrigatório", level: "error" },
    ],
    label: "CPF do Segurado",
    alternateMatches: ["CPF do Segurado", "CPF"],
    fieldType: {
      type: "input",
    },
    example: "123.456.789-00",
  },
  {
    key: "externalPolicyId",
    label: "ID da Apólice",
    alternateMatches: ["ID da Apólice", "Apólice"],
    fieldType: {
      type: "input",
    },
    example: "12345678910123456789",
  },
  {
    key: "externalPolicyNumber",
    label: "Número da Apólice",
    alternateMatches: ["Nº da Apólice"],
    fieldType: {
      type: "input",
    },
    example: "12345678910123456789",
  },
  {
    key: "product",
    label: "Produtos",
    alternateMatches: ["Coberturas", "Produto"],
    fieldType: {
      type: "input",
    },
    example: "Seguro de Vida, Cirurgias etc.",
  },
  {
    key: "paymentInstallment",
    label: "Parcela",
    alternateMatches: ["Parcela"],
    fieldType: {
      type: "input",
    },
    example: "1",
  },
  {
    key: "paymentTimestamp",
    label: "Data do pagamento",
    alternateMatches: ["Pagamento Segurado", "Vencimento"],
    fieldType: {
      type: "input",
    },
    example: "01/01/2025",
  },
  {
    key: "paymentTotalAmount",
    label: "Valor da fatura",
    alternateMatches: ["Valor da fatura"],
    fieldType: {
      type: "input",
    },
    example: "R$1.000,00",
  },
  {
    key: "paymentTotalCommission",
    label: "Valor da comissão",
    alternateMatches: ["Comissão Bruta", "Comissão"],
    fieldType: {
      type: "input",
    },
    example: "R$100,00",
  },
  {
    key: "insuranceConsultantEmail",
    label: "E-mail do Consultor de Seguros",
    alternateMatches: ["Responsável pela Venda"],
    fieldType: {
      type: "input",
    },
    example: "R$100,00",
  },
  {
    key: "proposalId",
    label: "Número da Proposta",
    alternateMatches: ["Nº da Proposta de Endosso", "Proposta"],
    fieldType: {
      type: "input",
    },
    example: "R$100,00",
  },
];
