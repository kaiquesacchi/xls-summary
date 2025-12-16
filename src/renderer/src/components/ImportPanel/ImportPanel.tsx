import { trpc } from "@renderer/utils/trpc/trpc.client";
import { openImportCompanyStatementModal } from "../ImportCompanyStatementModal";
import React from "react";

export function ImportPanel() {
  const insuranceCompanies = trpc.insuranceCompanies.list.useQuery();
  const insuranceCompaniesSelectRef = React.useRef<HTMLSelectElement>(null);
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
          {insuranceCompanies.data?.map((company) => (
            <option key={company.id} value={company.id}>
              {company.name}
            </option>
          ))}
        </select>

        <button
          onClick={() => {
            openImportCompanyStatementModal({
              insuranceCompanyId: Number(
                insuranceCompaniesSelectRef.current?.value,
              ),
            });
          }}
        >
          Importar planilha
        </button>
      </div>
    </div>
  );
}
