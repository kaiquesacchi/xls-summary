import { DatabasePanel } from "./components/DatabasePanel/DatabasePanel";
import { ImportPanel } from "./components/ImportPanel/ImportPanel";
import { trpc } from "./utils/trpc/trpc.client";

function App() {
  const health = trpc.health.ok.useQuery();

  return (
    <>
      <pre>
        Conexão com o processo main: {JSON.stringify(health.data, null, 2)}
      </pre>
      <DatabasePanel />
      <ImportPanel />
    </>
  );
}

export default App;
