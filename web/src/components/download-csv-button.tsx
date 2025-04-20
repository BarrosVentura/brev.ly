import { CircleDashed, DownloadSimple } from "@phosphor-icons/react";
import { Button } from "./button";
import { useQuery } from "@tanstack/react-query";
import { downloadCsv } from "@/services/download-csv";
import { useEffect } from "react";
import { toast } from "react-toastify";

export function DownloadCSVButton() {
  const { data, isLoading, isError, refetch } = useQuery({
    queryFn: downloadCsv,
    queryKey: ["download-csv"],
    enabled: false,
  });

  useEffect(() => {
    if (data?.data.exportUrl) {
      window.open(data.data.exportUrl, "_blank");
    }
  }, [data?.data.exportUrl]);

  useEffect(() => {
    if (isError) {
      toast("Não conseguimos gerar o CSV", {
        type: "error",
      });
    }
  }, [isError]);

  function handleClick() {
    refetch();
  }

  return (
    <Button
      label="Baixar CSV"
      onClick={() => handleClick()}
      type="secondary"
      disabled={isLoading}
      icon={
        isLoading ? (
          <CircleDashed className="animate-spin" />
        ) : (
          <DownloadSimple />
        )
      }
    />
  );
}
