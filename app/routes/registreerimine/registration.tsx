import { Form, useLoaderData } from "react-router";
import React, {
  ForwardedRef,
  forwardRef,
  JSX,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";

import { InfoBanner, WarningBanner } from "~/components/banners";

import {
  AddendumInput,
  CityInput,
  CountryInput,
  CountyInput,
  DOBInput,
  IDCodeInput,
  NameInput,
  ParentBackupPhoneInput,
  ParentEmailInput,
  ParentNameInput,
  ParentPhoneInput,
  RoadInput,
  SeniorityInput,
  SexInput,
  ShiftInput,
  ShirtInput,
  TermsAcknowledgeInput,
  UseIDCodeInput,
} from "~/routes/registreerimine/inputs";
import { loader } from "~/routes/registreerimine/route";
import { getShiftDateSpans, ShiftDateSpans } from "~/utils/shift-dates";
import { REG_MAX_COUNT, UNLOCK_TIME } from "~/hcdb";
import type {
  ChildFormFieldError,
  FormErrorInfo,
  ParentFormFieldErrors,
} from "~/routes/registreerimine/action";

interface ChildFormEntryProps {
  entryId: number;
  required: boolean;
  errors: ChildFormFieldError | undefined;
}

interface FormChildBasicRowProps extends ChildFormEntryProps {
  useIDCode: boolean;
}

const FormChildBasicRow = ({
  entryId,
  required,
  useIDCode,
  errors,
}: FormChildBasicRowProps) => {
  return (
    <div className="column-row">
      <NameInput entryId={entryId} isRequired={required} error={errors?.name} />
      <IDCodeInput
        entryId={entryId}
        isRequired={required && useIDCode}
        isHidden={!useIDCode}
        error={errors?.idCode}
      />
      <SexInput
        entryId={entryId}
        isRequired={required && !useIDCode}
        isHidden={useIDCode}
        error={errors?.sex}
      />
      <DOBInput
        entryId={entryId}
        isRequired={required && !useIDCode}
        isHidden={useIDCode}
        error={errors?.dob}
      />
    </div>
  );
};

interface FormUseIDCodeRowProps {
  entryId: number;
  required: boolean;
  setUseIDCode: (useIDCode: boolean) => void;
}

const FormUseIDCodeRow = forwardRef(
  (
    { entryId, setUseIDCode }: FormUseIDCodeRowProps,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    return (
      <UseIDCodeInput entryId={entryId} setUseIDCode={setUseIDCode} ref={ref} />
    );
  }
);

interface FormShiftPickerRowProps extends ChildFormEntryProps {
  shiftDateSpans: ShiftDateSpans;
  onPMUpdate: (modifier: ChildPriceModifier) => void;
  errors: ChildFormFieldError | undefined;
}

const FormShiftPickerRow = ({
  entryId,
  required,
  shiftDateSpans,
  onPMUpdate,
  errors,
}: FormShiftPickerRowProps) => {
  const [selectedShift, setSelectedShift] = useState<number>(0);
  const [isNew, setIsNew] = useState<boolean | null>(null);

  // Use refs to get the selected values even after page refreshes.
  const selectedShiftRef = useRef<HTMLSelectElement>(null);
  const isOldRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (selectedShiftRef.current) {
      setSelectedShift(parseInt(selectedShiftRef.current.value, 10) || 0);
    }
    if (isOldRef.current) {
      setIsNew(!isOldRef.current.checked);
    }
  }, []);

  useEffect(() => {
    // Do not run for the default values.
    if (selectedShift === 0 && isNew === null) return;

    const modifier: ChildPriceModifier = {
      childIndex: entryId,
      shiftNr: selectedShift,
      isNew: isNew,
      isActive: required,
    };
    onPMUpdate(modifier);
  }, [selectedShift, isNew]);

  return (
    <>
      <div className="column-row">
        <ShiftInput
          entryId={entryId}
          isRequired={required}
          shiftDateSpans={shiftDateSpans}
          onChange={setSelectedShift}
          ref={selectedShiftRef}
          error={errors?.shift}
        />
        <ShirtInput
          entryId={entryId}
          isRequired={required}
          error={errors?.shirtSize}
        />
      </div>
      <SeniorityInput
        entryId={entryId}
        isRequired={required}
        onChange={setIsNew}
        ref={isOldRef}
        error={errors?.newcomer}
      />
    </>
  );
};

const FormAddressRow = ({ entryId, required, errors }: ChildFormEntryProps) => {
  return (
    <div className="row-group">
      <p>Elukoht:</p>
      <div className="column-row">
        <RoadInput
          entryId={entryId}
          isRequired={required}
          error={errors?.road}
        />
        <CityInput
          entryId={entryId}
          isRequired={required}
          error={errors?.city}
        />
      </div>
      <div className="column-row">
        <CountyInput
          entryId={entryId}
          isRequired={required}
          error={errors?.county}
        />
        <CountryInput
          entryId={entryId}
          isRequired={required}
          error={errors?.country}
        />
      </div>
    </div>
  );
};

const FormAddendumRow = ({ entryId, errors }: ChildFormEntryProps) => {
  return (
    <div className="column-row">
      <AddendumInput entryId={entryId} error={errors?.addendum} />
    </div>
  );
};

interface RemoveChildButtonProps {
  entryId: number;
  isVisible: boolean;
  onRemoveChild: (childIndex: number) => void;
}

const RemoveChildButton = ({
  entryId,
  isVisible,
  onRemoveChild,
}: RemoveChildButtonProps): null | JSX.Element => {
  if (!isVisible) return null;
  return (
    <div
      className="registration-form__close"
      onClick={() => onRemoveChild(entryId)}
    ></div>
  );
};

interface ChildFormProps {
  entryId: number;
  childCount: number;
  shiftDateSpans: ShiftDateSpans;
  onRemoveChild: (childIndex: number) => void;
  onPMUpdate: (modifier: ChildPriceModifier) => void;
  errors: ChildFormFieldError | undefined;
}

const ChildFormEntry = ({
  entryId,
  childCount,
  shiftDateSpans,
  onRemoveChild,
  onPMUpdate,
  errors,
}: ChildFormProps) => {
  const [useIDCode, setUseIDCode] = useState<boolean>(true);

  // Use refs to get the selected values even after page refreshes.
  const idCodeCheckboxRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (idCodeCheckboxRef.current)
      setUseIDCode(!idCodeCheckboxRef.current.checked);
  }, []);

  const isVisible: boolean = entryId < childCount;

  return (
    <div
      className={"registration-form__card" + (isVisible ? "" : " is-hidden")}
    >
      <RemoveChildButton
        entryId={entryId}
        isVisible={entryId === childCount - 1 && childCount !== 1}
        onRemoveChild={onRemoveChild}
      />
      <div className="card-column">
        <FormChildBasicRow
          entryId={entryId}
          required={isVisible}
          useIDCode={useIDCode}
          errors={errors}
        />
        <FormUseIDCodeRow
          entryId={entryId}
          required={isVisible}
          setUseIDCode={setUseIDCode}
          ref={idCodeCheckboxRef}
        />
        <FormAddressRow
          entryId={entryId}
          required={isVisible}
          errors={errors}
        />
      </div>
      <div className="card-column">
        <FormShiftPickerRow
          entryId={entryId}
          required={isVisible}
          shiftDateSpans={shiftDateSpans}
          onPMUpdate={onPMUpdate}
          errors={errors}
        />
        <FormAddendumRow
          entryId={entryId}
          required={isVisible}
          errors={errors}
        />
      </div>
    </div>
  );
};

const ParentFormEntry = ({
  errors,
}: {
  errors: ParentFormFieldErrors | undefined;
}) => {
  return (
    <div className="registration-form__card">
      <div className="card-column">
        <ParentNameInput error={errors?.contactName} />
        <ParentEmailInput error={errors?.contactEmail} />
      </div>
      <div className="card-column">
        <ParentPhoneInput error={errors?.contactNumber} />
        <ParentBackupPhoneInput error={errors?.backupTel} />
      </div>
      <div className="row fill">
        <TermsAcknowledgeInput />
      </div>
    </div>
  );
};

interface AddChildButtonProps {
  isActive: boolean;
  onAddChild: () => void;
}

const AddChildButton = ({
  isActive,
  onAddChild,
}: AddChildButtonProps): null | JSX.Element => {
  if (!isActive) return null;
  return (
    <div className="registration-form__card registration-form__card--mt0">
      <div id="addChild">
        <div className="contents">
          <p>Lisa laps</p>
          <div className="u-plus" onClick={onAddChild}></div>
        </div>
      </div>
    </div>
  );
};

type RegistrationSubmitButtonProps = {
  currentTime: number;
};

const RegistrationSubmitButton = ({
  currentTime,
}: RegistrationSubmitButtonProps) => {
  const [isDisabled, setIsDisabled] = useState<boolean>(
    currentTime < UNLOCK_TIME
  );

  if (isDisabled) {
    const eta = UNLOCK_TIME - currentTime;
    console.log(`Unlock ETA: ${eta} ms`);
    const timer = setTimeout(() => {
      setIsDisabled(false);
      clearInterval(timer);
    }, eta);
  }

  return (
    <button
      type="submit"
      name="submit"
      value="submit"
      className="c-btn"
      id="submitBtn"
      disabled={isDisabled}
    >
      Registreerin
    </button>
  );
};

export type ChildPriceModifier = {
  childIndex: number;
  shiftNr: number;
  isNew: boolean | null;
  isActive: boolean;
};

type Action =
  | {
      type: "changed";
      modifier: ChildPriceModifier;
    }
  | {
      type: "removed" | "added";
      childIndex: number;
    };

const priceReducer = (modifiers: ChildPriceModifier[], action: Action) => {
  switch (action.type) {
    case "added":
      return modifiers.map((m) => {
        if (m.childIndex !== action.childIndex) return m;
        m.isActive = true;
        return m;
      });
    // How the reducer should work without the prefilled list approach.
    /*return [
      ...modifiers,
      {
        childIndex: action.childIndex,
        shiftNr: 0,
        isNew: null,
      },
    ];*/
    case "changed":
      return modifiers.map((m) => {
        if (m.childIndex === action.modifier.childIndex) return action.modifier;
        return m;
      });
    case "removed":
      return modifiers.map((m) => {
        if (m.childIndex !== action.childIndex) return m;
        m.isActive = false;
        return m;
      });
    // How the reducer should work without the prefilled list approach.
    /*return modifiers.filter((m) => m.childIndex !== action.childIndex);*/
  }
};

const RegistrationForm = ({
  errors,
}: {
  errors: FormErrorInfo | undefined;
}) => {
  const { shifts, currentTime } = useLoaderData<typeof loader>();

  const shiftDateSpans = getShiftDateSpans(shifts);

  const maxChildCount = REG_MAX_COUNT;
  const upfrontRegistrationFee = 100;
  const shiftFullPrice = 360;
  const seniorityDiscount = 20;

  const specialPrices = [
    {
      shiftNr: 1,
      fullPrice: 290,
      discount: 10,
    },
  ];

  // Always set up price modifiers for all potential children, even if less
  // children are registered at once. This is a lazy way to enable keeping the
  // price state consistent even across page refreshes.
  // TODO: find a more elegant approach.
  const [priceModifiers, dispatch] = useReducer(
    priceReducer,
    Array.from(Array(maxChildCount).entries(), ([i, _]) => {
      return {
        childIndex: i,
        shiftNr: 0,
        isNew: null,
        isActive: i === 0,
      };
    })
  );

  /*
  const [priceModifiers, dispatch] = useReducer(priceReducer, [
    {
      childIndex: 0,
      shiftNr: 0,
      isNew: null,
    },
  ]);*/

  const handleAddChild = () => {
    const resultingChildCount = childCount + 1;
    if (resultingChildCount > maxChildCount) return;
    if (resultingChildCount === maxChildCount) setCanAddMoreChildren(false);

    dispatch({
      type: "added",
      childIndex: childCount,
    });
    setChildCount(resultingChildCount);
  };

  const handleEditModifier = (modifier: ChildPriceModifier) => {
    dispatch({
      type: "changed",
      modifier,
    });
  };

  const handleRemoveChild = (childIndex: number) => {
    const resultingChildCount: number = childCount - 1;
    if (resultingChildCount < 1) return;
    if (resultingChildCount < maxChildCount) setCanAddMoreChildren(true);
    setChildCount(resultingChildCount);

    dispatch({
      type: "removed",
      childIndex: childIndex,
    });
  };

  const [childCount, setChildCount] = useState<number>(1);
  const [canAddMoreChildren, setCanAddMoreChildren] = useState<boolean>(true);

  const getUpdatedPrice = (): number => {
    let totalShiftPrice = 0;
    for (let i = 0; i < childCount; i++) {
      let fullPrice = shiftFullPrice;
      let discount = seniorityDiscount;
      const specialPrice = specialPrices.find(
        (e) => e.shiftNr === priceModifiers[i].shiftNr
      );
      if (specialPrice) {
        fullPrice = specialPrice.fullPrice;
        discount = specialPrice.discount;
      }
      totalShiftPrice += fullPrice;
      // Do not apply the discount if the status is unknown (null).
      if (priceModifiers[i].isNew === false) totalShiftPrice -= discount;
    }
    return totalShiftPrice;
  };

  const registrationFee: number = childCount * upfrontRegistrationFee;
  const fullPrice: number = getUpdatedPrice();

  return (
    <Form method="post" className="registration-form" id="regform">
      <b className="u-italic u-regular">
        <span className="u-required"></span>
        Tärniga märgitud väljad on kohustuslikud.
      </b>
      <h4>Laagrilaps</h4>
      {Array.from({ length: maxChildCount }, (_, i) => (
        <ChildFormEntry
          key={i}
          entryId={i}
          childCount={childCount}
          shiftDateSpans={shiftDateSpans}
          onRemoveChild={handleRemoveChild}
          onPMUpdate={handleEditModifier}
          errors={errors ? errors[i] : undefined}
        />
      ))}
      <AddChildButton
        isActive={canAddMoreChildren}
        onAddChild={handleAddChild}
      />
      <h4>Kontaktisik</h4>
      <ParentFormEntry errors={errors} />
      <input
        type="number"
        name="childCount"
        value={childCount}
        id="childCount"
        hidden
        readOnly
        required
      />
      <RegistrationSubmitButton currentTime={currentTime} />
      <p className="u-inline-block u-ml-15">
        Broneerimistasu: <span id="pre-total">{registrationFee}</span>€ |
        Kogusumma: <span id="payment-total">{fullPrice}</span>€
      </p>
      {errors?.error ? <WarningBanner>{errors.error}</WarningBanner> : null}
      {errors?.json ? (
        <WarningBanner>
          Server tuvastas vea:
          <br />
          {JSON.stringify(errors.json)}
          <br />
          Kui viga on arusaamatu või vigane, saatke meil aadressile:
          taaniel@merelaager.ee
        </WarningBanner>
      ) : null}
    </Form>
  );
};

export const RegistrationSection = ({
  errors,
}: {
  errors: FormErrorInfo | undefined;
}) => {
  return (
    <section className="c-section">
      <div className="o-container">
        <h3 className="c-section-heading">Registreerimine</h3>
        <InfoBanner>
          Registreerimine algab 01. jaanuaril 2026 kell 14.00.
        </InfoBanner>
        <InfoBanner>
          Vabade kohtade puudumisel saate registreeruda reservnimekirja selle
          sama vormi abil.
        </InfoBanner>
        <RegistrationForm errors={errors} />
      </div>
    </section>
  );
};
