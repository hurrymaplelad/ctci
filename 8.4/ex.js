/*
 Design a parking lot.
*/

class ParkingLot() {
  constructor(spaceCount) {
    /** @private */
    this.spaceCount = spaceCount;
    /** @private */
    this.parkedVehicles = new Map();
  }

  park(vehicle) {
    if(this.occupiedSpaceCount == this.spaceCount) {
      return false;
    }
    this.parkedVehicles.set(vehicle.id, true);
    return true;
  }

  exit(vehicle) {
    if(!this.parkedVehicles.has(vehicle.id)) {
      return false;
    }
    this.parkedVehicles.delete(vehicle.id);
    return true;
  }

  getFreeSpaceCount() {
    return this.spaceCount - this.occupiedSpaceCount;
  }

  get occupiedSpaceCount() {
    return this.parkedVehicles.size;
  }
}
