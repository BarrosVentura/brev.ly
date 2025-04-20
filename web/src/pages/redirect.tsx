import { MainLayout } from "@/layout/main";
import { getLink } from "@/services/get-link";
import LogoIcon from "@assets/logo-icon.svg?react";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";

export function Redirect() {
  const { link } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, isError } = useQuery({
    queryFn: () => getLink(encodeURIComponent(link!)),
    queryKey: ["current-link", link],
  });

  useEffect(() => {
    if (!link || isError) {
      navigate("/404");
    }
  }, [link, isError]);

  useEffect(() => {
    if (data?.data.complete_url) {
      setTimeout(() => {
        window.open(data.data.complete_url, "_self");
      }, 2000);
    }
  }, [data]);

  return (
    <MainLayout className="h-full justify-center items-center">
      <div className=" col-span-full lg:col-span-6 lg:col-start-3 self-center-safe bg-white rounded-lg grid place-items-center gap-5 py-16 px-12">
        <LogoIcon />
        <h1 className="text-xl gray-600 text-center">Redirecionando...</h1>
        <div>
          <p className="text-md text-center text-gray-500">
            O link será aberto automaticamente em alguns instantes.
          </p>
          <div className="p-0 m-0 flex justify-center items-center gap-1">
            {!isLoading && (
              <p className="inline text-gray-500 text-md">
                Não foi redirecionado?
              </p>
            )}
            <a
              href={data?.data.complete_url}
              className="text-blue-base text-md"
            >
              Acesse aqui
            </a>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
