import CompanyCard from "../../ui/cards/CompanyCard";

export default function company() {
  return (
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
  )
}
