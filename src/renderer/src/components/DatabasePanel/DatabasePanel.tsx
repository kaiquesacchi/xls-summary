import { trpc } from "@renderer/utils/trpc/trpc.client";
import { Code } from "../Code/Code";

export function DatabasePanel() {
  const dbEntries = trpc.database.countDbEntries.useQuery();

  return (
    <div>
      <h3>Banco de dados</h3>
      <Code code={dbEntries.data} />
      <button
        onClick={() => {
          void dbEntries.refetch();
        }}
      >
        Atualizar contagem
      </button>
    </div>
  );
}
