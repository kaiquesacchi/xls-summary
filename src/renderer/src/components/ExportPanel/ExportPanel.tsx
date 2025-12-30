import { useExportAll } from "./hooks/useExportAll";

export function ExportPanel() {
  const exportAll = useExportAll();

  return (
    <div>
      <h3>Exportar dados</h3>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "200px",
          gap: "10px",
        }}
      >
        <button
          onClick={() => {
            exportAll.mutate();
          }}
        >
          Exportar planilha
        </button>
        {exportAll.isPending && <span>Exportando...</span>}
      </div>
    </div>
  );
}
