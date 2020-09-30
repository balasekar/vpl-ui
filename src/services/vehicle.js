import { send } from './api';

async function saveVehicle (data) {
  return send('vehicles', {
    method: 'POST',
    json: data
  });
}

async function upsertVehicle (data) {
  if (data.id) {
    return send(`vehicles/${data.id}`, {
      method: 'PUT',
      json: data
    });
  } else {
    return send('vehicles', {
      method: 'POST',
      json: data
    });
  }
}

async function getVehicles () {
  return send('vehicles', {
    method: 'GET'
  });
}

async function getVehiclesById (vehicleId) {
  return send(`vehicles/${vehicleId}`, {
    method: 'GET'
  });
}

async function deleteVehiclesById (vehicleId) {
  return send(`vehicles/${vehicleId}`, {
    method: 'DELETE'
  });
}

async function getVehicleOptions () {
  return send('options', {
    method: 'GET'
  });
}

export default {
  saveVehicle,
  upsertVehicle,
  getVehicles,
  getVehiclesById,
  deleteVehiclesById,
  getVehicleOptions
};
