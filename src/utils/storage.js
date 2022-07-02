const localSpreadsheet = "localSpreadsheet";

export const $localStorage = {
  get: localStorage.getItem(localSpreadsheet),

  set: (val) => localStorage.setItem(localSpreadsheet, JSON.stringify(val)),

  toJson: JSON.parse(localStorage.getItem(localSpreadsheet)),
  
  returnAfterSave: (values) => {
    localStorage.setItem(localSpreadsheet, JSON.stringify(values));
    return values;
  },
};
