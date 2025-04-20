import { MainLayout } from "@/layout/main";
import { Button } from "./button";

import LogoIcon from "@assets/logo-icon.svg?react";

export function FallbackRender({
  error,
  resetErrorBoundary,
}: {
  error: Error;
  resetErrorBoundary: VoidFunction;
}) {
  return (
    <MainLayout className="h-full justify-center items-center">
      <div className=" col-span-full lg:col-span-6 lg:col-start-3 self-center-safe bg-white rounded-lg grid place-items-center gap-5 py-16 px-12">
        <LogoIcon />
        <h1 className="text-xl gray-600 text-center">Algo deu errado :(</h1>
        <div>
          <code>{error.message}</code>
          <div className="mt-5 flex justify-center items-center gap-1">
            <Button
              onClick={resetErrorBoundary}
              label="Recarregar"
              type="primary"
            />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
