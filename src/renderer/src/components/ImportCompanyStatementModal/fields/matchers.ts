// cSpell:words parc pagto perc
import { FieldKeys } from "./fields";

type Matchers = Record<FieldKeys, string | null>;

const azos: Matchers = {
  commissionPercentage: null,
  externalPolicyId: "ID da Apólice",
  externalPolicyNumber: "Nº da Apólice",
  insuranceConsultantEmail: "Responsável pela Venda",
  insuranceConsultantName: null,
  paymentInstallment: "Parcela",
  paymentTimestamp: "Pagamento Comissão",
  paymentTotalAmount: "Valor da Fatura",
  paymentTotalCommission: "Comissão Bruta",
  policyHolderCpf: "CPF do Segurado",
  policyHolderName: "Nome do Segurado",
  product: "Coberturas",
  proposalId: "Nº da Proposta de Endosso",
  transactionType: null,
};

const azosBonus: Matchers = {
  commissionPercentage: "multiplicador",
  externalPolicyId: null,
  externalPolicyNumber: "número da apólice",
  insuranceConsultantEmail: "Email_vendedor",
  insuranceConsultantName: null,
  paymentInstallment: null,
  paymentTimestamp: "mes_pagamento",
  paymentTotalAmount: "prêmio",
  paymentTotalCommission: "Bônus Total",
  policyHolderCpf: "CPF",
  policyHolderName: "insured_name",
  product: null,
  proposalId: null,
  transactionType: null,
};

const azosBonusRefund: Matchers = {
  commissionPercentage: "perc_estorno",
  externalPolicyId: null,
  externalPolicyNumber: null,
  insuranceConsultantEmail: "broker_email",
  insuranceConsultantName: null,
  paymentInstallment: null,
  paymentTimestamp: "mes_estorno",
  paymentTotalAmount: "premium",
  paymentTotalCommission: "valor_estorno",
  policyHolderCpf: null,
  policyHolderName: "insured_name",
  product: null,
  proposalId: null,
  transactionType: null,
};

const icatu: Matchers = {
  commissionPercentage: "%",
  externalPolicyId: null,
  externalPolicyNumber: null,
  insuranceConsultantEmail: null,
  insuranceConsultantName: null,
  paymentInstallment: "Parcela",
  paymentTimestamp: "Vencimento",
  paymentTotalAmount: null,
  paymentTotalCommission: "Comissão",
  policyHolderCpf: "CPF",
  policyHolderName: "Cliente",
  product: "Produto",
  proposalId: "Proposta",
  transactionType: "Lançamento",
};

const mag: Matchers = {
  commissionPercentage: "% Com",
  externalPolicyId: "Id. Externo",
  externalPolicyNumber: null,
  insuranceConsultantEmail: null,
  insuranceConsultantName: null,
  paymentInstallment: "Parc. Arrecadação",
  paymentTimestamp: "Pagto",
  paymentTotalAmount: "$ Base",
  paymentTotalCommission: "$ COM",
  policyHolderCpf: "CPF Cliente",
  policyHolderName: "Cliente",
  product: "DG",
  proposalId: "Prop / Cont",
  transactionType: "Provisão",
};

const omint: Matchers = {
  commissionPercentage: "% de Comissão",
  externalPolicyId: null,
  externalPolicyNumber: "Apólice",
  insuranceConsultantEmail: null,
  insuranceConsultantName: null,
  paymentInstallment: "N° Parcela",
  paymentTimestamp: "Dt. Comissão",
  paymentTotalAmount: "Premio Líquido",
  paymentTotalCommission: "Vl. a Receber",
  policyHolderCpf: null,
  policyHolderName: "Segurado / Estipulante",
  product: "Produto",
  proposalId: null,
  transactionType: "Tipo de Comissão",
};

const prudential: Matchers = {
  commissionPercentage: "% Comissão",
  externalPolicyId: null,
  externalPolicyNumber: "Apólice",
  insuranceConsultantEmail: null,
  insuranceConsultantName: "Assessor",
  paymentInstallment: null,
  paymentTimestamp: "Data Geração Comissão Direta",
  paymentTotalAmount: "Prêmio Líquido",
  paymentTotalCommission: "Comissão Total",
  policyHolderCpf: "CPF do Cliente",
  policyHolderName: "Nome do Cliente",
  product: "Produto",
  proposalId: "Proposta",
  transactionType: null,
};

const unimed: Matchers = {
  commissionPercentage: null,
  externalPolicyId: null,
  externalPolicyNumber: null,
  insuranceConsultantEmail: null,
  insuranceConsultantName: null,
  paymentInstallment: null,
  paymentTimestamp: null,
  paymentTotalAmount: null,
  paymentTotalCommission: null,
  policyHolderCpf: null,
  policyHolderName: null,
  product: null,
  proposalId: null,
  transactionType: null,
};

const matchersArray = [
  azos,
  azosBonus,
  azosBonusRefund,
  icatu,
  mag,
  omint,
  prudential,
  unimed,
] as const;

export const matchers = matchersArray.reduce<Record<FieldKeys, string[]>>(
  (acc, obj) => {
    Object.entries(obj).forEach(([key, value]) => {
      if (!value) return;
      acc[key as keyof typeof acc].push(value);
    });

    return acc;
  },
  {
    commissionPercentage: [],
    externalPolicyId: [],
    externalPolicyNumber: [],
    insuranceConsultantEmail: [],
    insuranceConsultantName: [],
    paymentInstallment: [],
    paymentTimestamp: [],
    paymentTotalAmount: [],
    paymentTotalCommission: [],
    policyHolderCpf: [],
    policyHolderName: [],
    product: [],
    proposalId: [],
    transactionType: [],
  },
);
