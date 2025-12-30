import { trpc } from "@renderer/utils/trpc/trpc.client";

export function useExportAll() {
  const exportAll = trpc.exports.exportAll.useMutation();

  return {
    mutate: exportAll.mutate,
    isPending: exportAll.isPending,
  };
}
