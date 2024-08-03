import dataService from "./dataService";

function getAll() {
  return dataService.get("tables");
}

export default { getAll };