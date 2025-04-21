import { queryClient } from "@/main";
import { deleteLink } from "@/services/delete-link";
import { Copy, Trash } from "@phosphor-icons/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router";
import { IconButton } from "./icon-button";
import { toast } from "react-toastify";

export function BrevlyLink({
  shortUrl,
  longUrl,
  access,
  id,
}: {
  shortUrl: string;
  longUrl: string;
  access: number;
  id: string;
}) {
  const currentQueryClient = useQueryClient(queryClient);

  const { mutate } = useMutation({
    mutationFn: deleteLink,
    mutationKey: ["deleteLink"],
    onSuccess: () => {
      currentQueryClient.invalidateQueries({ queryKey: ["links"] });
    },
  });

  function notify() {
    toast("Link copiado!");
  }

  return (
    <li className="flex justify-between py-5 not-last:border-b not-last:border-gray-200">
      <div>
        <Link to={`/${encodeURIComponent(shortUrl)}`}>
          <h3 className="text-md text-blue-base font-bold">{shortUrl}</h3>
        </Link>
        <span className="text-sm text-gray-500">{longUrl}</span>
      </div>
      <div className="flex justify-center items-center gap-5">
        <span className="text-sm text-gray-500">{access} acessos</span>
        <div className="flex gap-1">
          <IconButton
            icon={<Copy size={16} />}
            alt="copiar"
            onClick={() => {
              notify();
              navigator.clipboard.writeText(shortUrl);
            }}
          />
          <IconButton
            icon={<Trash size={16} />}
            alt="excluir"
            onClick={() => mutate(id)}
          />
        </div>
      </div>
    </li>
  );
}
