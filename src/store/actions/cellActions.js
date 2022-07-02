//Action types could be stored in variables in a separate folder as well

export const initializeState = (payload) => {
  return { type: "INITIALIZE_STATE", payload };
}

export function createColumn(payload) {
  return { type: "CREATE_COLUMN", payload };
}

export function addRows(payload) {
  return { type: "ADD_ROWS", payload };
}

export function updateCellValue(payload) {
  return { type: "UPDATE_CELL_VALUE", payload };
}

export function editColumnTitle(payload) {
  return { type: "EDIT_COLUMN_TITLE", payload };
}
