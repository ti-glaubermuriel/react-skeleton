



export const LetterAvatar = str => {
  let initials = "";

  let strSplit = String(str)
    .toUpperCase()
    .split(" ");

  if (strSplit.length == 1) {
    initials = strSplit[0] ? strSplit[0].charAt(0) : "?";
  } else {
    initials = strSplit[0].charAt(0) + strSplit[1].charAt(0);
  }

  return initials;
};
