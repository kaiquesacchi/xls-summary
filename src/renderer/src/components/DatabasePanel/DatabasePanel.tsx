import { trpc } from "@renderer/utils/trpc/trpc.client";

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
      <pre>Registros: {JSON.stringify(dbEntries.data, null, 2)}</pre>
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
