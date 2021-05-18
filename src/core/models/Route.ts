import { SvgIconTypeMap } from "@material-ui/core";
import { OverridableComponent } from "@material-ui/core/OverridableComponent";

export interface Route {
  name: string;
  path: string;
  Icon?: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
}

