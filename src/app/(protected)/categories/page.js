import { getCategories } from "@/lib/data-service";
import CategoriesClient from "@/components/categories/CategoriesClient"; // client komponenta

export default async function CategoriesPage() {
  const categories = await getCategories(); // server fetch

  return <CategoriesClient categories={categories} />; // prosleđujemo client komponenti
}
