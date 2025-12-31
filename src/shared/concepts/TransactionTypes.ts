const list = [
  { label: "Bônus de Agenciamento", key: "brokerageBonus" },
  {
    label: "Estorno do Bônus de Agenciamento",
    key: "brokerageBonusRefund",
  },
  {
    label: "Comissão de Corretagem",
    key: "brokerageCommission",
  },
  {
    label: "Outros créditos",
    key: "genericCredit",
  },
  {
    label: "Outros débitos",
    key: "genericDebit",
  },
] as const;

export const TransactionTypes = { list };

export type TransactionType = (typeof list)[number]["key"];
