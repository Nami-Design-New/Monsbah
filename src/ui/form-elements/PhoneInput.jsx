import { useEffect, useRef, useState } from "react";
import { Form } from "react-bootstrap";
import useGetCountries from "../../hooks/settings/useGetCountries";

export default function PhoneInput({
  label,
  onSelect,
  countryCode,
  disableSelect,

  ...props
}) {
  const dropdownRef = useRef(null);
  const [slectedCountry, setSlectedCountry] = useState("");
  const [showDropDownMenu, setShowDropDownMenu] = useState(false);
  const { data: countries } = useGetCountries();

  useEffect(() => {
    setSlectedCountry(
      countries?.find((country) => country.country_code === countryCode)
    );
  }, [countries, countryCode]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropDownMenu(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div className="phone_field">
      <div className="input-field">
        <label htmlFor={props?.id}>{label}</label>
        <Form.Control className="form-control" {...props} />
      </div>

      <div className="dropdown">
        <button
          disabled={disableSelect}
          onClick={(e) => {
            e.preventDefault();
            setShowDropDownMenu(!showDropDownMenu);
          }}
        >
          {slectedCountry && (
            <>
              <span>+{slectedCountry.country_code}</span>
              <img
                src={slectedCountry?.image}
                alt={slectedCountry.name}
                loading="lazy"
              />
            </>
          )}
        </button>

        <div
          ref={dropdownRef}
          className={`countriesMenu ${showDropDownMenu ? "active" : ""}`}
        >
          {countries?.map((country) => {
            return (
              <div
                key={country.id}
                className="country"
                onClick={() =>
                  onSelect(country.country_code, setShowDropDownMenu)
                }
              >
                <div className="text">
                  <img src={country?.image} alt={country.name} loading="lazy" />
                  <h6>{country.name}</h6>
                </div>
                <p>+{country.country_code}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
