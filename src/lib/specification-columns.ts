import type { ProductVariant } from "../catalog";

const optionalColumns = [
  { field: "dimensions", label: "Dimensions" },
  { field: "weight", label: "Weight / gauge" },
  { field: "pack", label: "Pack reference" },
] as const;

export function getSpecificationColumns(variants: ProductVariant[]) {
  return optionalColumns.filter(column => variants.some(variant => variant[column.field]?.trim()));
}
