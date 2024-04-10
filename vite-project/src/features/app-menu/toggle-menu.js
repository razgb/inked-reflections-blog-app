import { menuActions } from "../../entities/menu/menu-slice";

export function toggleMenu() {
  return function toggleMenu(dispatch) {
    dispatch(menuActions.toggleMenu());
  };
}
