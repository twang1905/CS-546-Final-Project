import {
  buildingData,
  userData,
  roomData,
  containerData,
  itemData,
} from "./data/index.js";
import {
  users,
  buildings,
  rooms,
  containers,
} from "./config/mongoCollections.js";
import { closeConnection } from "./config/mongoConnection.js";
import { ObjectId } from "mongodb";

let usersCollection = await users();
let buildingsCollection = await buildings();
let roomsCollection = await rooms();
let containersCollection = await containers();
try {
  await usersCollection.drop();
  console.log("Users collection dropped.");
} catch (e) {
  console.log("No users collection found.");
}

try {
  await buildingsCollection.drop();
  console.log("Buildings collection dropped.");
} catch (e) {
  console.log("No buildings collection found.");
}

try {
  await roomsCollection.drop();
  console.log("Rooms collection dropped.");
} catch (e) {
  console.log("No rooms collection found.");
}

try {
  await containersCollection.drop();
  console.log("Containers collection dropped.");
} catch (e) {
  console.log("No containers collection found.");
}

let testObjId = new ObjectId().toString();

let user = await userData.create(
  "xxmistacruzxx",
  "ABCD1234",
  "dacruz04@optonline.net",
  "David",
  "Cruz"
);

let building = await buildingData.create(
  user._id,
  "Lodge",
  "Alpha Xi of Chi Psi",
  "804 Castle Point Terrace",
  "Hoboken",
  "NJ",
  "07030",
  false
);

let room = await roomData.create(
  building._id,
  "Dining Room",
  "Connected to foyer and dish room."
);

let container = await containerData.create(
  room._id,
  "Amazon Delivery Box",
  "Box to hold amazon packages."
);

let item = await itemData.create(
  container._id,
  "container",
  "Nerf Gun Package",
  "Nerf Blaster 2000",
  3,
  20.0
);

await roomData.addContainerOrItem(room._id, testObjId, "container");
await roomData.removeContainerOrItem(room._id, testObjId, "container");
await roomData.updateRoomProperty(room._id, {
  name: "Foyer",
  description: "Leads to dining room, tube, and gpr.",
});

await itemData.updateItemProperties(item._id, { name: "Nerf Gun Box", description: "Nerf Blaster 3000" });
await itemData.setValue(item._id, 17.5)
await itemData.setCount(item._id, 5)

// await userData.remove(user._id);
// await buildingData.remove(building._id);
// await roomData.remove(room._id);
// await itemData.remove(item._id);

try {
  user = await userData.get(user._id);
  console.log(user);
} catch (e) {
  console.log(`dataTest User: ${e}`);
}

try {
  building = await buildingData.get(building._id);
  console.log(building);
} catch (e) {
  console.log(`dataTest Building: ${e}`);
}

try {
  room = await roomData.get(room._id);
  console.log(room);
} catch (e) {
  console.log(`dataTest Room: ${e}`);
}

try {
  container = await containerData.get(container._id);
  console.log(container);
} catch (e) {
  console.log(`dataTest Container: ${e}`);
}

try {
  item = await itemData.get(item._id);
  console.log(item);
} catch (e) {
  console.log(`dataTest Item: ${e}`);
}

closeConnection();