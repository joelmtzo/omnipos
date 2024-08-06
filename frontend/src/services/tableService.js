import dataService from "./dataService";

function getAll() {
  return dataService.get("ktables");
}

export default { getAll };