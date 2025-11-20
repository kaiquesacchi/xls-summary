import { DatabasePanel } from "./components/DatabasePanel/DatabasePanel";
import { openImportCompanyStatementModal } from "./components/ImportCompanyStatementModal";
import { trpc } from "./utils/trpc/trpc.client";

function App() {
  const health = trpc.health.ok.useQuery();

  return (
    <>
      <button
        onClick={() => {
          openImportCompanyStatementModal();
        }}
      >
        Importar planilha
      </button>
      <pre>
        Conexão com o processo main: {JSON.stringify(health.data, null, 2)}
      </pre>
      <DatabasePanel />
    </>
  );
}

export default App;
