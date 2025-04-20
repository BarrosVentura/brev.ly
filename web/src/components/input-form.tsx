import { queryClient } from "@/main";
import { createNewLink } from "@/services/create-new-link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Input from "./input";
import { Button } from "./button";
import { toast } from "react-toastify";

const newLinkSchema = z.object({
  originalLink: z.string().url("URL inválida"),
  shortLink: z.string().min(1, "Campo obrigatório"),
});

type NewLink = z.infer<typeof newLinkSchema>;

export function InputForm() {
  const {
    handleSubmit,
    formState: { errors, disabled },
    register,
  } = useForm({
    resolver: zodResolver(newLinkSchema),
  });

  const currentQueryClient = useQueryClient(queryClient);

  function notify() {
    toast("Link já existe", {
      type: "error",
    });
  }

  const createLinkMutation = useMutation({
    mutationFn: createNewLink,
    mutationKey: ["createLink"],
    onSuccess: () => {
      currentQueryClient.invalidateQueries({ queryKey: ["links"] });
    },
    onError() {
      notify();
    },
  });

  function handleFormSubmit(data: NewLink) {
    const shortLink = data.shortLink.includes("brev.ly/")
      ? data.shortLink
      : `brev.ly/${data.shortLink}`;
    const content = {
      originalLink: data.originalLink,
      shortLink,
    };
    createLinkMutation.mutate(content);
  }

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="lg:col-span-4 bg-white p-8 flex flex-col gap-4 rounded-lg"
    >
      <h1 className="text-lg pb-2">Novo Link</h1>
      <Input
        label="Link original"
        placeholder="www.exemplo.com.br"
        error={errors.originalLink?.message}
        {...register("originalLink")}
      />
      <Input
        label="Link encurtado"
        pre="brev.ly/"
        error={errors.shortLink?.message}
        {...register("shortLink")}
      />
      <Button
        label="Salvar link"
        type="primary"
        className="mt-2"
        isLoading={createLinkMutation.isPending}
        disabled={disabled}
      />
    </form>
  );
}
