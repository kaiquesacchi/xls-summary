// cSpell:words Parc Pagto
import { FieldKeys } from "./fields";

type Matchers = Record<FieldKeys, string | null>;

const azos: Matchers = {
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
};

const icatu: Matchers = {
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
};

const mag: Matchers = {
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
};

const omint: Matchers = {
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
};

const prudential: Matchers = {
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
};

const unimed: Matchers = {
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
};

const matchersArray = [azos, icatu, mag, omint, prudential, unimed] as const;

export const matchers = matchersArray.reduce<Record<FieldKeys, string[]>>(
  (acc, obj) => {
    Object.entries(obj).forEach(([key, value]) => {
      if (!value) return;
      acc[key as keyof typeof acc].push(value);
    });

    return acc;
  },
  {
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
  },
);
