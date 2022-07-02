// Helps modifying state for with deeply nested structures
//https://github.com/kolodny/immutability-helper
import update from "immutability-helper";
import { $localStorage } from "../../utils/storage";

const initialState = {
  columns: [],
};

function cellReducer(state = initialState, action) {
  switch (action.type) {
    case "INITIALIZE_STATE":
      return {
          columns: action.payload,
      };

    case "CREATE_COLUMN":
      return $localStorage.returnAfterSave({
        ...state,
        columns: [...state.columns, action.payload],
      });

    case "EDIT_COLUMN_TITLE":
      return $localStorage.returnAfterSave(update(state, {
          columns: (columns) =>
              update(columns || [], {
                  [action.payload.id]: (column) =>
                      update(column || {}, {
                          title: { $set: action.payload.title },
                      }),
              }),
      }));

    case "ADD_ROWS":
      return $localStorage.returnAfterSave(update(state, {
        columns: (columns) =>
            update(columns || [], {
              [action.payload.id]: (column) =>
                  update(column || {}, {
                    items: (items) =>
                        update(items || [], { $push: Array(10).fill("") }),
                  }),
            }),
      }));

    case "UPDATE_CELL_VALUE":
      return $localStorage.returnAfterSave(update(state, {
          columns: (columns) =>
              update(columns || [], {
                  [action.payload.id]: (column) =>
                      update(column || {}, {
                          items: (items) =>
                              update(items || [], {
                                  [action.payload.index]: { $set: action.payload.content },
                              }),
                      }),
              }),
      }));
    //  break;
    default:
      return state;
  }
}

export default cellReducer;

