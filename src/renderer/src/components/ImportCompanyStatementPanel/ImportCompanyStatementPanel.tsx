import { Code } from "../Code/Code";
import { useImportPanelController } from "./hooks/useImportPanelController";

export function ImportCompanyStatementPanel() {
  const { insuranceCompaniesSelectRef, transactionTypesRef, ...controller } =
    useImportPanelController();

  return (
    <div>
      <h3>Importar planilha de seguradora</h3>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "200px",
          gap: "10px",
        }}
      >
        <select name="Seguradora" ref={insuranceCompaniesSelectRef}>
          {controller.insuranceCompanies.data?.map((company) => (
            <option key={company.id} value={company.id}>
              {company.name}
            </option>
          ))}
        </select>
        <select name="Tipo de transação" ref={transactionTypesRef}>
          {controller.transactionTypes.map((type) => (
            <option key={type.key} value={type.key}>
              {type.label}
            </option>
          ))}
        </select>
        <button onClick={controller.insuranceCompanies.refetch}>
          Recarregar lista de empresas
        </button>
        <button onClick={controller.openImportModal}>Importar planilha</button>
        <Code code={controller.importResult} />
      </div>
    </div>
  );
}
