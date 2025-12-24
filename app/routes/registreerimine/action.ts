import "dotenv/config";
import { data } from "react-router";
import { prisma } from "~/db.server";
import { REG_MAX_COUNT, UNLOCK_TIME } from "~/hcdb";
import { JSendResponse, RegistrationAPIRequest } from "~/utils/api.types";
import { StatusCodes } from "http-status-codes";

// Send registration emails except when disabled for development purposes.
const SEND_EMAIL = !(
  process.env.NODE_ENV === "development" &&
  process.env.SEND_REG_EMAIL === "false"
);

export type ChildFormBasicFields = {
  name?: string;
  idCode?: string;
  sex?: string;
  dob?: string;
};

export type ChildFormFieldError = ChildFormBasicFields & {
  shift?: string;
  shirtSize?: string;
  road?: string;
  city?: string;
  county?: string;
  country?: string;
  addendum?: string;
  newcomer?: string;
};

export type ParentFormFieldErrors = {
  contactName?: string;
  contactNumber?: string;
  contactEmail?: string;
  backupTel?: string;
};

export type FormErrorInfo = {
  error?: string;
  json?: {
    [key: string]: any;
  } | null;
  [key: number]: ChildFormFieldError;
} & ParentFormFieldErrors;

type MandatoryFields = {
  name: string;
  road: string;
  city: string;
  county: string;
  country: string;
  shirtSize: string;
};

const STRING_MAX = 255;

const getStringError = <T>(
  fieldValue: string,
  fieldName: keyof T,
  eeName: string,
  maxLength: number
): Partial<T> => {
  if (!fieldValue || fieldValue === "null" || fieldValue === "undefined") {
    return { [fieldName]: `${eeName} on puudu` } as Partial<T>;
  }
  if (fieldValue.length > maxLength) {
    return {
      [fieldName]: `${eeName} ei tohi olla pikem kui ${maxLength} tähemärki`
    } as Partial<T>;
  }
  return {};
};

const validateChildMandatory = (fields: MandatoryFields) => {
  const fieldErrors: ChildFormFieldError = {};

  // TODO: loop instead of unroll
  Object.assign(
    fieldErrors,
    getStringError<ChildFormFieldError>(
      fields.name,
      "name",
      "Nimi",
      STRING_MAX
    ),
    getStringError<ChildFormFieldError>(
      fields.road,
      "road",
      "Tänav",
      STRING_MAX
    ),
    getStringError<ChildFormFieldError>(
      fields.city,
      "city",
      "Asula",
      STRING_MAX
    ),
    getStringError<ChildFormFieldError>(
      fields.county,
      "county",
      "Maakond",
      STRING_MAX
    ),
    getStringError<ChildFormFieldError>(
      fields.country,
      "country",
      "Riik",
      STRING_MAX
    ),
    getStringError<ChildFormFieldError>(
      fields.shirtSize,
      "shirtSize",
      "Särgi suurus",
      10
    )
  );

  return fieldErrors;
};

export const formAction = async (form: FormData) => {
  const errors: FormErrorInfo = {};

  const childCountFromForm = form.get("childCount");
  if (!childCountFromForm || typeof childCountFromForm !== "string") {
    errors.error = "Vormiga on mässatud! Palun värskendage lehte.";
    return data(
      { errors, registrationId: null },
      { status: StatusCodes.BAD_REQUEST }
    );
  }

  const childCount = parseInt(childCountFromForm, 10);
  if (isNaN(childCount)) {
    errors.error = "Vormiga on mässatud! Palun värskendage lehte.";
    return data(
      { errors, registrationId: null },
      { status: StatusCodes.BAD_REQUEST }
    );
  } else if (childCount > REG_MAX_COUNT) {
    errors.error = `Korraga saab registreerida kuni ${REG_MAX_COUNT} last!`;
    return data(
      { errors, registrationId: null },
      { status: StatusCodes.BAD_REQUEST }
    );
  }

  const names = form.getAll("name");
  const idCodes = form.getAll("idCode");
  const sexes = form.getAll("sex");
  const dobs = form.getAll("dob");

  const shifts = form.getAll("shiftNr");
  const shirtSizes = form.getAll("tsSize");

  const roads = form.getAll("road");
  const cities = form.getAll("city");
  const counties = form.getAll("county");
  const countries = form.getAll("country");
  const addendums = form.getAll("addendum");

  const contactName = String(form.get("contactName")).trim();
  const contactEmail = String(form.get("contactEmail")).trim();
  const contactNumber = String(form.get("contactNumber")).trim();
  let backupTel: string | null = String(form.get(`backupTel`)).trim();

  Object.assign(
    errors,
    getStringError<FormErrorInfo>(
      contactName,
      "contactName",
      "Nimi",
      STRING_MAX
    ),
    getStringError<FormErrorInfo>(
      contactEmail,
      "contactEmail",
      "E-post",
      STRING_MAX
    ),
    getStringError<FormErrorInfo>(
      contactNumber,
      "contactNumber",
      "Telefon",
      20
    )
  );

  if (backupTel !== "null") {
    getStringError<FormErrorInfo>(backupTel, "backupTel", "Varutelefon", 20);
  } else backupTel = null;

  const regData: RegistrationAPIRequest[] = [];

  const existingShifts = (
    await prisma.shiftInfo.findMany({
      select: { id: true }
    })
  ).map((entry) => entry.id);

  for (let i = 0; i < childCount; ++i) {
    const name = String(names[i]).trim();
    const road = String(roads[i]).trim();
    const city = String(cities[i]).trim();
    const county = String(counties[i]).trim();
    const country = String(countries[i]).trim();
    const shirtSize = String(shirtSizes[i]).trim();

    const fieldErrors = validateChildMandatory({
      name,
      road,
      city,
      county,
      country,
      shirtSize
    });

    if (!fieldErrors.hasOwnProperty("name") && name.indexOf(" ") === -1) {
      fieldErrors.name = "Nimi peab koosnema vähemalt kahest osast";
    }

    const shift = parseInt(String(shifts[i]), 10) || 0;
    if (!shift || !existingShifts.includes(shift)) {
      fieldErrors.shift = "Valige vahetus nimekirjast";
    }

    const addendum = String(addendums[i]).trim();
    if (addendum !== "") {
      Object.assign(
        fieldErrors,
        getStringError<ChildFormFieldError>(
          addendum,
          "addendum",
          "Lisa",
          STRING_MAX
        )
      );
    }

    const entry = form.get(`newcomer-${i}`);
    if (entry === null) {
      fieldErrors.newcomer = "Väli on kohustuslik";
    }
    const isNewcomer = String(entry) === "true";

    const childRegistrationData: RegistrationAPIRequest = {
      name: name,
      shiftNr: shift,
      shirtSize: shirtSize,
      road: road,
      city: city,
      county: county,
      country: country,
      isNew: isNewcomer,
      contactName: contactName,
      contactEmail: contactEmail,
      contactNumber: contactNumber,
      sendEmail: SEND_EMAIL
    };

    if (addendum !== "") childRegistrationData.addendum = addendum;
    if (backupTel) childRegistrationData.backupTel = backupTel;

    // Basic ID code checks. The api server performs more elaborate checks.
    if (form.get(`useIdCode-${i}`) === null) {
      const idCode = String(idCodes[i]).trim();
      if (idCode.length !== 11 || !/^\d+$/.test(idCode)) {
        fieldErrors.idCode = "Isikukood peab olema 11-kohaline numbriline kood";
      } else if (idCode[0] !== "5" && idCode[0] !== "6") {
        fieldErrors.idCode = "Lapse isikukood peab algama numbriga '5' või '6'";
      } else {
        childRegistrationData.idCode = idCode;
      }
    } else {
      if (!dobs[i]) {
        fieldErrors.dob = "Sünnipäev on puudu";
      } else {
        const dobString = String(dobs[i]);
        const dob = new Date(dobString);
        if (isNaN(dob.valueOf())) {
          fieldErrors.dob = "Sünnipäev peab olema kehtiv kuupäev";
        } else {
          childRegistrationData.dob = dob;
        }
      }
      const sex = String(sexes[i]).trim();
      if (!sexes[i]) {
        fieldErrors.sex = "Sugu on puudu";
      } else if (sex !== "M" && sex !== "F") {
        fieldErrors.sex = "Valige sugu nimekirjast";
      } else {
        childRegistrationData.sex = sex;
      }
    }

    if (Object.keys(fieldErrors).length > 0) {
      errors[i] = fieldErrors;
      continue;
    }

    regData.push(childRegistrationData);
  }

  if (Object.keys(errors).length > 0) {
    errors.error = "Mõni kohustuslik väli on vigane või puudu";
    return data(
      { errors, registrationId: null },
      { status: StatusCodes.BAD_REQUEST }
    );
  }

  // Check for the unlock date last, so that parents get form error feedback,
  // if necessary.
  const unlockTime = UNLOCK_TIME;
  const now = Date.now();

  if (now < unlockTime) {
    const deltaMS = unlockTime.valueOf() - now.valueOf();
    errors.error = `Registreerimine ei ole veel avatud. Jäänud on ${
      deltaMS / 1000
    } s.`;
    return data(
      { errors, registrationId: null },
      { status: StatusCodes.FORBIDDEN }
    );
  }

  const regUrl: string = process.env.REGISTRATION_URL ?? "";
  let response: Response;
  try {
    response = await fetch(regUrl, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json"
      },
      redirect: "follow",
      body: JSON.stringify(regData)
    });
  } catch (err) {
    console.error(err);
    errors.error = "Serveriga ei õnnestunud ühendust saada";
    return data(
      { errors, registrationId: null },
      { status: StatusCodes.INTERNAL_SERVER_ERROR }
    );
  }

  const body = await response.text();
  if (!response.ok) {
    console.log(body);
    console.log(form);
  }
  let jsonBody: JSendResponse | null = null;
  try {
    jsonBody = JSON.parse(body);
    if (jsonBody !== null) {
      const status = jsonBody.status;

      if (status === "success") {
        return data(
          { errors, registrationId: jsonBody.data?.registrationId },
          { status: StatusCodes.OK }
        );
      }

      if (status === "error") errors.error = jsonBody.message;
      else errors.json = jsonBody.data;
    } else {
      errors.error = body;
    }
  } catch {
    errors.error = body;
  }
  return data({ errors, registrationId: null }, { status: response.status });
};
