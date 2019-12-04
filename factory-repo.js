const Firestore = require('@google-cloud/firestore');

const db = new Firestore({
  projectId: process.env.PROJECT_ID,
  keyFilename: process.env.GCP_JSON_KEY_PATH,
});
const factoriesCollection = db.collection('factories');

const parseDocument = docs => docs.map(
    doc => ({id: doc.id, ...doc.data()}));

exports.initializeDBChangeListener = sendToAll => {
  // use google's firestore events to update all connected nodes when there is a
  // change to the DB
  factoriesCollection.onSnapshot(
      (snapshot) => sendToAll(parseDocument(snapshot.docs)));
};

exports.getAll = async () => {
  const snapshot = await factoriesCollection.get();
  return parseDocument(snapshot.docs);
};

exports.deleteFactoryById = async (id) => factoriesCollection.doc(id).delete();

exports.addFactory = async (factory) => factoriesCollection.add(factory);

exports.updateFactory = async (factory) => factoriesCollection.doc(factory.id).set(factory);