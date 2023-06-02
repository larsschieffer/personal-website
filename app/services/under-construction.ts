import type { Id } from "react-toastify";
import { toast } from "react-toastify";

import { IoIosConstruct } from "@react-icons/all-files/io/IoIosConstruct";

export function notImplementedYet(): Id {
  return toast("The feature is under construction.", { icon: IoIosConstruct });
}
