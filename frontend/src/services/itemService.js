import dataService from './dataService';

function getAll() {
  return dataService.get("items");
}

function getAllByCategory(categoryId) {
  return dataService.get("items/category/" + categoryId);
}

function getById(id) {
  return dataService.getById("items", id);
}

function create(item) {
  return dataService.post("items", item);
}

function deleteById(id) {
  return dataService.deleteById("items", id);
}

export default { getAll, getById, create, deleteById, getAllByCategory };