// import { useEffect, useState } from "react";
// import { useTranslation } from "react-i18next";
// import { Link, useSearchParams } from "react-router-dom";
// import useGetCountries from "../../hooks/settings/useGetCountries";

// export default function AskCountry() {
//   const { t } = useTranslation();
//   const [searchParams] = useSearchParams();
//   const [selectedCountry, setSelectedCountry] = useState("");
//   const { data: countries } = useGetCountries();

//   useEffect(() => {
//     if (countries?.length > 0 && searchParams.get("country")) {
//       setSelectedCountry(
//         countries?.filter((c) => c?.id === +searchParams.get("country"))[0]
//       );
//     }
//   }, [countries, searchParams]);

//   return (
//     <>
//       {/* {selectedCountry ? (
//         <Link
//           aria-label="Country asks"
//           to={`/asks?country-id=${selectedCountry?.id}`}
//           className={`askCustomCountry ${
//             selectedCountry?.id === Number(searchParams.get("country")) &&
//             Number(searchParams.get("ask"))
//               ? "active"
//               : ""
//           }`}
//         >
//           <div className="img">
//             <i className="fa-regular fa-comment-plus"></i>
//           </div>
//           <h6 className="selectedName">{`${t("ask")} ${
//             selectedCountry?.name
//           }`}</h6>

//           <div className="shapes">
//             <span></span>
//             <span></span>
//             <span></span>
//           </div>
//         </Link>
//       ) : (
//         <button
//           aria-label="Ask a question"
//           className="askCustomCountry skeleton"
//         >
//           <h6></h6>
//           <div className="shapes">
//             <span></span>
//             <span></span>
//             <span></span>
//           </div>
//         </button>
//       )} */}
//     </>
//   );
// }
