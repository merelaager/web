import React, { ChangeEvent, ForwardedRef, forwardRef } from "react";
import { Link } from "react-router";
import { ShiftDateSpans } from "~/utils/shift-dates";

type FormInputErrorProp = {
  error: string | undefined;
};

interface FormInputProps extends FormInputErrorProp {
  entryId: number;
  isRequired?: boolean;
  isHidden?: boolean;
}

const counties: string[] = [
  "Harjumaa",
  "Tartumaa",
  "Ida-Virumaa",
  "Pärnumaa",
  "Lääne-Virumaa",
  "Viljandimaa",
  "Raplamaa",
  "Võrumaa",
  "Saaremaa",
  "Jõgevamaa",
  "Järvamaa",
  "Valgamaa",
  "Põlvamaa",
  "Läänemaa",
  "Hiiumaa",
];

const STRING_MAX = 255;

export const NameInput = ({ entryId, isRequired, error }: FormInputProps) => {
  return (
    <div className="registration-form__field">
      <label htmlFor={`name-${entryId}`} className="u-required">
        Nimi
      </label>
      <input
        type="text"
        name="name"
        id={`name-${entryId}`}
        className={error ? "is-invalid" : undefined}
        required={isRequired}
      />
      {error ? <em>{error}</em> : null}
    </div>
  );
};

export const IDCodeInput = ({
  entryId,
  isRequired,
  isHidden,
  error,
}: FormInputProps) => {
  return (
    <div
      className={"registration-form__field" + (isHidden ? " is-hidden" : "")}
    >
      <label htmlFor={`idCode-${entryId}`} className="u-required">
        Isikukood
      </label>
      <input
        type="text"
        name="idCode"
        id={`idCode-${entryId}`}
        className={error ? "is-invalid" : undefined}
        pattern="[0-9]{11}"
        required={isRequired}
      />
      {error ? <em>{error}</em> : null}
    </div>
  );
};

export const SexInput = ({
  entryId,
  isRequired,
  isHidden,
  error,
}: FormInputProps) => {
  return (
    <div
      className={"registration-form__field" + (isHidden ? " is-hidden" : "")}
    >
      <p className="u-required">Sugu:</p>
      <label htmlFor={`sex-m-${entryId}`}>Poiss</label>
      <input
        type="radio"
        name="sex"
        id={`sex-m-${entryId}`}
        value="M"
        className={error ? "is-invalid" : undefined}
        required={isRequired}
      />
      <label htmlFor={`sex-f-${entryId}`}>Tüdruk</label>
      <input
        type="radio"
        name="sex"
        id={`sex-f-${entryId}`}
        value="F"
        required={isRequired}
      />
      {error ? <em>{error}</em> : null}
    </div>
  );
};

export const DOBInput = ({
  entryId,
  isRequired,
  isHidden,
  error,
}: FormInputProps) => {
  return (
    <div
      className={"registration-form__field" + (isHidden ? " is-hidden" : "")}
    >
      <label htmlFor={`dob-${entryId}`} className="u-required">
        Sünnipäev
      </label>
      <input
        type="date"
        name="dob"
        id={`dob-${entryId}`}
        className={error ? "is-invalid" : undefined}
        required={isRequired}
      />
      {error ? <em>{error}</em> : null}
    </div>
  );
};

interface UseIDCodeInputProps {
  entryId: number;
  setUseIDCode: (useIDCode: boolean) => void;
}

export const UseIDCodeInput = forwardRef(
  (
    { entryId, setUseIDCode }: UseIDCodeInputProps,
    ref: ForwardedRef<HTMLInputElement>,
  ) => {
    const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
      setUseIDCode(!target.checked);
    };

    return (
      <div className="column-row">
        <label htmlFor={`useIdCode-${entryId}`}>Pole Eesti isikukoodi</label>
        <input
          type="checkbox"
          name={`useIdCode-${entryId}`}
          id={`useIdCode-${entryId}`}
          className="useIdCode"
          value={entryId}
          onChange={handleChange}
          ref={ref}
        />
      </div>
    );
  },
);

interface ShiftInputProps extends FormInputProps {
  shiftDateSpans: ShiftDateSpans;
  onChange: (newShift: number) => void;
}

export const ShiftInput = forwardRef(
  (
    { entryId, isRequired, shiftDateSpans, onChange, error }: ShiftInputProps,
    ref: ForwardedRef<HTMLSelectElement>,
  ) => {
    const handleSelection = ({ target }: ChangeEvent<HTMLSelectElement>) => {
      const value = parseInt(target.value, 10);
      if (isNaN(value)) return; // someone is messing around
      onChange(value);
    };

    const options = [];
    for (const [i, span] of shiftDateSpans.entries()) {
      const id = i + 1;
      options.push(
        <option value={id} key={id}>
          {id}. vahetus ({span})
        </option>,
      );
    }

    return (
      <div className="registration-form__field">
        <label htmlFor={`vahetus-${entryId}`} className="u-required">
          Laagrivahetus
        </label>
        <select
          ref={ref}
          id={`vahetus-${entryId}`}
          className={error ? "is-invalid" : undefined}
          name="shiftNr"
          required={isRequired}
          onChange={handleSelection}
        >
          <option value="">--Valige vahetus--</option>
          {options.map((option) => option)}
        </select>
        {error ? <em>{error}</em> : null}
      </div>
    );
  },
);

export const ShirtInput = ({ entryId, isRequired, error }: FormInputProps) => {
  return (
    <div className="registration-form__field">
      <label htmlFor={`shirtSize-${entryId}`} className="u-required">
        T-särgi suurus
      </label>
      <select
        id={`shirtSize-${entryId}`}
        className={error ? "is-invalid" : undefined}
        name="tsSize"
        required={isRequired}
      >
        <option value="">--Valige suurus--</option>
        <option value="118/128">118/128</option>
        <option value="130/140">130/140</option>
        <option value="142/152">142/152</option>
        <option value="152/164">152/164</option>
        <option value="M">M</option>
        <option value="L">L</option>
        <option value="XL">XL</option>
      </select>
      {error ? <em>{error}</em> : null}
    </div>
  );
};

interface SeniorityInputProps extends FormInputProps {
  onChange: (isNew: boolean) => void;
}

export const SeniorityInput = forwardRef(
  (
    { entryId, isRequired, onChange, error }: SeniorityInputProps,
    ref: ForwardedRef<HTMLInputElement>,
  ) => {
    const handleToggle = ({ target }: ChangeEvent<HTMLInputElement>) => {
      const value: string = target.value;
      if (value !== "true" && value !== "false") return; // someone is messing around
      onChange(value === "true");
    };

    return (
      <div className="column-row">
        <p className="u-required">Esimest korda merelaagris?</p>
        <div className="nowrap">
          <div>
            <label htmlFor={`newcomer-${entryId}-y`}>Jah</label>
            <input
              type="radio"
              defaultChecked={false}
              id={`newcomer-${entryId}-y`}
              name={`newcomer-${entryId}`}
              value="true"
              className="newField-y nf"
              onChange={handleToggle}
              required={isRequired}
            />
          </div>
          <div>
            <label htmlFor={`newcomer-${entryId}-n`}>Ei</label>
            <input
              type="radio"
              ref={ref}
              defaultChecked={false}
              id={`newcomer-${entryId}-n`}
              name={`newcomer-${entryId}`}
              value="false"
              className="newField-n nf"
              onChange={handleToggle}
              required={isRequired}
            />
          </div>
        </div>
        {error ? <em>{error}</em> : null}
      </div>
    );
  },
);

export const RoadInput = ({ entryId, isRequired, error }: FormInputProps) => {
  return (
    <div className="registration-form__field">
      <label htmlFor={`road-${entryId}`} className="u-required">
        Tänav
      </label>
      <input
        type="text"
        name="road"
        id={`road-${entryId}`}
        className={error ? "is-invalid" : undefined}
        required={isRequired}
        maxLength={STRING_MAX}
      />
      {error ? <em>{error}</em> : null}
    </div>
  );
};

export const CityInput = ({ entryId, isRequired, error }: FormInputProps) => {
  return (
    <div className="registration-form__field">
      <label htmlFor={`city-${entryId}`} className="u-required">
        Linn / Küla / Vald
      </label>
      <input
        type="text"
        name="city"
        id={`city-${entryId}`}
        className={error ? "is-invalid" : undefined}
        required={isRequired}
        maxLength={STRING_MAX}
      />
      {error ? <em>{error}</em> : null}
    </div>
  );
};

export const CountyInput = ({ entryId, isRequired, error }: FormInputProps) => {
  return (
    <div className="registration-form__field">
      <label htmlFor={`county-${entryId}`} className="u-required">
        Maakond
      </label>
      <input
        list="counties"
        id={`county-${entryId}`}
        name="county"
        className={error ? "is-invalid" : undefined}
        required={isRequired}
        maxLength={STRING_MAX}
      />
      <datalist id="counties">
        {counties.map((county: string) => (
          <option key={county}>{county}</option>
        ))}
      </datalist>
      {error ? <em>{error}</em> : null}
    </div>
  );
};

export const CountryInput = ({
  entryId,
  isRequired,
  error,
}: FormInputProps) => {
  return (
    <div className="registration-form__field">
      <label htmlFor={`country-${entryId}`} className="u-required">
        Riik
      </label>
      <input
        type="text"
        name="country"
        id={`country-${entryId}`}
        defaultValue="Eesti"
        className={error ? "is-invalid" : undefined}
        required={isRequired}
        maxLength={STRING_MAX}
      />
      {error ? <em>{error}</em> : null}
    </div>
  );
};

export const AddendumInput = ({ entryId, error }: FormInputProps) => {
  const maxLength: number = STRING_MAX;
  return (
    <div className="registration-form__field">
      <label htmlFor={`addendum-${entryId}`}>
        Muu info (allergiad, erivajadused jms):
      </label>
      <div>
        <textarea
          name="addendum"
          id={`addendum-${entryId}`}
          className={error ? "is-invalid full-width" : "full-width"}
          placeholder={`Võib tühjaks jääda (maksimum ${maxLength} tähemärki).`}
          maxLength={maxLength}
        ></textarea>
      </div>
      {error ? <em>{error}</em> : null}
    </div>
  );
};

export const ParentNameInput = ({ error }: FormInputErrorProp) => {
  return (
    <div className="registration-form__field">
      <label htmlFor="guardian_name" className="u-required">
        Nimi
      </label>
      <input
        type="text"
        name="contactName"
        id="guardian_name"
        required
        maxLength={STRING_MAX}
        className={error ? "is-invalid" : undefined}
      />
      {error ? <em>{error}</em> : null}
    </div>
  );
};

export const ParentPhoneInput = ({ error }: FormInputErrorProp) => {
  return (
    <div className="registration-form__field">
      <label htmlFor="guardian_phone" className="u-required">
        Telefon
      </label>
      <input
        type="tel"
        name="contactNumber"
        id="guardian_phone"
        required
        maxLength={20}
        className={error ? "is-invalid" : undefined}
      />
      {error ? <em>{error}</em> : null}
    </div>
  );
};

export const ParentEmailInput = ({ error }: FormInputErrorProp) => {
  return (
    <div className="registration-form__field">
      <label htmlFor="guardian_email" className="u-required">
        E-post
      </label>
      <input
        type="email"
        name="contactEmail"
        id="guardian_email"
        required
        maxLength={STRING_MAX}
        className={error ? "is-invalid" : undefined}
      />
      {error ? <em>{error}</em> : null}
    </div>
  );
};

export const ParentBackupPhoneInput = ({ error }: FormInputErrorProp) => {
  return (
    <div className="registration-form__field">
      <label htmlFor="alt_phone">Varutelefon</label>
      <input
        type="tel"
        name="backupTel"
        id="alt_phone"
        maxLength={20}
        className={error ? "is-invalid" : undefined}
      />
      {error ? <em>{error}</em> : null}
    </div>
  );
};

export const TermsAcknowledgeInput = () => {
  return (
    <>
      <label htmlFor="disclaimer" className="u-required">
        Nõustun laagri{" "}
        <Link to="/info/laagrist/#kodukord" className="t-visible">
          kodukorraga
        </Link>
        .
      </label>
      <input type="checkbox" id="disclaimer" required autoComplete="off" />
    </>
  );
};
