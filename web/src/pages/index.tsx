import { BrevlyLink } from "@/components/brevly-link";
import { Button } from "@/components/button";
import { EmptyState } from "@/components/empty-state";
import Input from "@/components/input";
import { LoadingState } from "@/components/loading-state";
import { MainLayout } from "@/layout/main";
import { queryClient } from "@/main";
import { createNewLink } from "@/services/create-new-link";
import { getLinks } from "@/services/get-links";
import Logo from "@assets/logo.svg?react";
import { zodResolver } from "@hookform/resolvers/zod";
import { DownloadSimple } from "@phosphor-icons/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";

const newLinkSchema = z.object({
  originalLink: z.string().url("URL inválida"),
  shortLink: z.string().min(1, "Campo obrigatório"),
});

type NewLink = z.infer<typeof newLinkSchema>;

export function Home() {
  const {
    handleSubmit,
    formState: { errors, disabled },
    register,
  } = useForm({
    resolver: zodResolver(newLinkSchema),
  });

  const currentQueryClient = useQueryClient(queryClient);

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryFn: getLinks,
    queryKey: ["links"],
  });

  const createLinkMutation = useMutation({
    mutationFn: createNewLink,
    mutationKey: ["createLink"],
    onSuccess: () => {
      currentQueryClient.invalidateQueries({ queryKey: ["links"] });
    },
  });

  const myLinks = data?.data.links;

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

  console.log({ isSuccess, data, isLoading, isError });

  return (
    <MainLayout className="pt-20">
      <header className="grid place-items-center lg:place-items-start lg:col-span-10 pb-8">
        <Logo />
      </header>
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
      <aside className="flex flex-col lg:col-span-6 bg-white p-8 rounded-lg max-h-[1000px]">
        <div className="border-b border-gray-200 pb-5 flex justify-between">
          <h2 className="text-lg">Meus links</h2>
          <Button
            label="Baixar CSV"
            onClick={() => console.log("opa")}
            type="secondary"
            icon={<DownloadSimple />}
          />
        </div>

        {isLoading && <LoadingState />}

        {!isLoading && !isError && myLinks?.length === 0 && <EmptyState />}

        {isSuccess && myLinks && myLinks?.length > 0 && (
          <ul className="overflow-y-scroll">
            {myLinks?.map((link) => (
              <BrevlyLink
                key={link.id}
                id={link.id}
                access={link.total_clicks}
                shortUrl={link.short_url}
                longUrl={link.complete_url}
              />
            ))}
          </ul>
        )}
      </aside>
    </MainLayout>
  );
}
