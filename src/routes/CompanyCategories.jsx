import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import useGetCompanyCategories from "../hooks/settings/useGetCompanyCategories";
import DataLoader from "../ui/loaders/DataLoader";
import EmptyData from "../ui/EmptyData";

export default function CompanyCategories() {
  const { t } = useTranslation();
  const { data: categories, isLoading: categoriesLoading } =
    useGetCompanyCategories();

  if (categoriesLoading) return <DataLoader />;

  if (!categories || categories.length === 0) {
    return <EmptyData>{t("noCategoriesAvailable")}</EmptyData>;
  }
  return (
    <section className="categories-page">
      <div className="sections">
        <div className="container">
          <div className="mb-4">
            <h2 className="company-category-head">{t("companySec")}</h2>
          </div>
          <div className="parent">
            {categories.map((category) => (
              <Link key={category.id} to={`/companies?category=${category.id}`}>
                <div className="category-card">
                  <img
                    src={category.image}
                    alt={category.name}
                    loading="lazy"
                  />
                  <h2>{category.name}</h2>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
