import { appConfig } from "@/lib/config";

import type { CatalogRepository } from "./catalog-repository";
import { ApiCatalogRepository } from "./api-catalog-repository";
import { LocalCatalogRepository } from "./local-catalog-repository";

export function createCatalogRepository(): CatalogRepository {
  if (appConfig.useMocks) {
    return new LocalCatalogRepository(appConfig.lineUrl);
  }

  return new ApiCatalogRepository(appConfig.apiBaseUrl);
}
