import {
  Database,
  Boxes,
} from "lucide-react";

import {
  SiC,
  SiCplusplus,
  SiPython,
  SiJavascript,
} from "react-icons/si";

import { FaJava } from "react-icons/fa";

export const languageUI = {
    "C Language": {
      icon: SiC,
      color: "#7C3AED",
    },

    cpp: {
      icon: SiCplusplus,
      color: "#00599C",
    },

    Python: {
      icon: SiPython,
      color: "#3776AB",
    },

    javascript: {
      icon: SiJavascript,
      color: "#F7DF1E",
    },

    java: {
      icon: FaJava,
      color: "#F89820",
    },

    sql: {
      icon: Database,
      color: "#3B82F6",
    },

    "data-structures": {
      icon: Boxes,
      color: "#22C55E",
    },
  };