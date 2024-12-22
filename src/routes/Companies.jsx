import FilterBox from "../components/filter/FilterBox";

export default function Companies() {
  return (
    <>
      <FilterBox showAsk={false} className="companies_filter" />
      <section className="companies_section"></section>
    </>
  );
}
