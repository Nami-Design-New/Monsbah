import FilterBox from "../components/filter/FilterBox";
import CompanyCard from "../ui/cards/CompanyCard";

export default function Companies() {
  return (
    <>
      <FilterBox showAsk={false} className="companies_filter" />
      <section className="companies_section">
        <div className="container p-1">
          <div className="row">
            {Array.from({ length: 9 }).map((_, index) => (
              <div className="col-lg-4 col-md-6 col-12 p-2" key={index}>
                <CompanyCard />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
