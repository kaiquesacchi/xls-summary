import { Code } from "../Code/Code";
import { useImportPanelController } from "./hooks/useImportPanelController";

export function ImportSalesforceDataPanel() {
  const controller = useImportPanelController();

  return (
    <div>
      <h3>Importar planilha do Salesforce</h3>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "200px",
          gap: "10px",
        }}
      >
        <button onClick={controller.openImportModal}>Importar planilha</button>
        <Code code={controller.importResult} />
      </div>
    </div>
  );
}
