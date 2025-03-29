export const formatDate = (dateString) => {
  if (!dateString) return "";
  try {
    const [day, month, year] = dateString.split(".");
    return `${year}-${month}-${day}`;
  } catch {
    return "";
  }
};

export const formatPhone = (phone) => {
  if (!phone) return "";

  const digits = phone.replace(/\D/g, "");
  if (!digits) return "";

  const truncatedDigits = digits.substring(0, 11);
  let formattedValue = "";

  if (truncatedDigits.length > 0) {
    formattedValue = "+7";

    if (truncatedDigits.length > 1) {
      formattedValue += ` (${truncatedDigits.substring(1, 4)}`;
    }

    if (truncatedDigits.length > 4) {
      formattedValue += `) ${truncatedDigits.substring(4, 7)}`;
    }

    if (truncatedDigits.length > 7) {
      formattedValue += `-${truncatedDigits.substring(7, 9)}`;
    }

    if (truncatedDigits.length > 9) {
      formattedValue += `-${truncatedDigits.substring(9, 11)}`;
    }
  }

  return formattedValue;
};
