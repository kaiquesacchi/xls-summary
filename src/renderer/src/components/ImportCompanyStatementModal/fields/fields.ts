import { type Fields } from "react-spreadsheet-import";
import { matchers } from "./matchers";

export type FieldKeys =
  | "commissionPercentage"
  | "externalPolicyId"
  | "externalPolicyNumber"
  | "insuranceConsultantEmail"
  | "insuranceConsultantName"
  | "paymentInstallment"
  | "paymentTimestamp"
  | "paymentTotalAmount"
  | "paymentTotalCommission"
  | "policyHolderCpf"
  | "policyHolderName"
  | "product"
  | "proposalId"
  | "transactionType";

export const fields = [
  {
    key: "commissionPercentage",
    label: "Percentual da Comissão",
    alternateMatches: matchers.commissionPercentage,
    fieldType: {
      type: "input",
    },
    example: "0.05",
  },
  {
    key: "externalPolicyId",
    label: "ID da Apólice",
    alternateMatches: matchers.externalPolicyId,
    fieldType: {
      type: "input",
    },
    example: "12345678910123456789",
  },
  {
    key: "externalPolicyNumber",
    label: "Número da Apólice",
    alternateMatches: matchers.externalPolicyNumber,
    fieldType: {
      type: "input",
    },
    example: "12345678910123456789",
  },
  {
    key: "insuranceConsultantEmail",
    label: "E-mail do Consultor de Seguros",
    alternateMatches: matchers.insuranceConsultantEmail,
    fieldType: {
      type: "input",
    },
    example: "exemplo@email.com",
  },
  {
    key: "insuranceConsultantName",
    label: "Nome do Consultor de Seguros",
    alternateMatches: matchers.insuranceConsultantName,
    fieldType: {
      type: "input",
    },
    example: "Felipe Silva",
  },
  {
    key: "paymentInstallment",
    label: "Parcela",
    alternateMatches: matchers.paymentInstallment,
    fieldType: {
      type: "input",
    },
    example: "1",
  },
  {
    key: "paymentTimestamp",
    label: "Data do pagamento",
    alternateMatches: matchers.paymentTimestamp,
    fieldType: {
      type: "input",
    },
    example: "01/01/2025",
  },
  {
    key: "paymentTotalAmount",
    label: "Valor da fatura",
    alternateMatches: matchers.paymentTotalAmount,
    fieldType: {
      type: "input",
    },
    example: "R$1.000,00",
  },
  {
    key: "paymentTotalCommission",
    label: "Valor da comissão",
    alternateMatches: matchers.paymentTotalCommission,
    fieldType: {
      type: "input",
    },
    example: "R$100,00",
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
    key: "product",
    label: "Produtos",
    alternateMatches: matchers.product,
    fieldType: {
      type: "input",
    },
    example: "Seguro de Vida, Cirurgias etc.",
  },
  {
    key: "proposalId",
    label: "Número da Proposta",
    alternateMatches: matchers.proposalId,
    fieldType: {
      type: "input",
    },
    example: "849456184",
  },
  {
    key: "transactionType",
    label: "Tipo de Transação",
    alternateMatches: matchers.transactionType,
    fieldType: {
      type: "select",
      options: [
        { label: "Bônus de Agenciamento", value: "brokerageBonus" },
        {
          label: "Estorno do Bônus de Agenciamento",
          value: "brokerageBonusRefund",
        },
        {
          label: "Comissão de Corretagem",
          value: "brokerageCommission",
        },
        {
          label: "Outros créditos",
          value: "genericCredit",
        },
        {
          label: "Outros débitos",
          value: "genericDebit",
        },
      ],
    },
    example: "Tipo de transação",
  },
] as const satisfies Fields<FieldKeys>;
