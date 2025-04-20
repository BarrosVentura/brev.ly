import { BrevlyLink } from "@/components/brevly-link";
import { Button } from "@/components/button";
import { EmptyState } from "@/components/empty-state";
import { InputForm } from "@/components/input-form";
import { LoadingState } from "@/components/loading-state";
import { MainLayout } from "@/layout/main";
import { getLinks } from "@/services/get-links";
import Logo from "@assets/logo.svg?react";
import { DownloadSimple } from "@phosphor-icons/react";
import { useQuery } from "@tanstack/react-query";

export function Home() {
  const { data, isLoading, isError, isSuccess } = useQuery({
    queryFn: getLinks,
    queryKey: ["links"],
  });

  const myLinks = data?.data.links;

  return (
    <MainLayout className="pt-20">
      <header className="grid place-items-center lg:place-items-start lg:col-span-10 pb-8">
        <Logo />
      </header>
      <InputForm />
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
