import { renderToString } from "react-dom/server";
import { Dropdown } from "./components/ui/dropdown";
import * as React from "react";

console.log(renderToString(<Dropdown label="All Offices" options={["London"]} />));
