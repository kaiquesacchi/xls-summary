import { DatabasePanel } from "./components/DatabasePanel/DatabasePanel";
import { ExportPanel } from "./components/ExportPanel/ExportPanel";
import { ImportCompanyStatementPanel } from "./components/ImportCompanyStatementPanel/ImportCompanyStatementPanel";
import { ImportSalesforceDataPanel } from "./components/ImportSalesforceDataPanel/ImportSalesforceDataPanel";
import { trpc } from "./utils/trpc/trpc.client";

function App() {
  const health = trpc.health.ok.useQuery();

  return (
    <>
      <pre>
        Conexão com o processo main: {JSON.stringify(health.data, null, 2)}
      </pre>
      <DatabasePanel />
      <ImportCompanyStatementPanel />
      <ImportSalesforceDataPanel />
      <ExportPanel />
    </>
  );
}

export default App;
