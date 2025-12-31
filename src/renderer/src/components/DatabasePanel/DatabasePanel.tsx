import { trpc } from "@renderer/utils/trpc/trpc.client";
import { Code } from "../Code/Code";

export function DatabasePanel() {
  const dbEntries = trpc.database.countDbEntries.useQuery();
  const seed = trpc.database.seed.useMutation({
    async onSuccess() {
      await trpc.useUtils().database.countDbEntries.refetch();
    },
  });

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
      <button
        onClick={() => {
          seed.mutate();
        }}
      >
        Seed do DB
      </button>
    </div>
  );
}
