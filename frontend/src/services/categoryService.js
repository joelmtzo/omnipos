import dataService from "./dataService";

function getAll() {
  return dataService.get("categories");
}

function getById(id) {
  return dataService.getById("categories", id);
}

function create(category) {
  return dataService.post("categories", category);
}

function deleteById(id) {
  return dataService.deleteById("categories", id);
}

export default { getAll, getById, create, deleteById };
