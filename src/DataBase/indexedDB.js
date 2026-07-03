const DB_NAME = "todo-db";
const DB_VERSION = 1;

export const initDB = () => {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onupgradeneeded = () => {
            const db = request.result;

            if (!db.objectStoreNames.contains("projects")) {
                db.createObjectStore("projects");
            }

            if (!db.objectStoreNames.contains("tasks")) {
                db.createObjectStore("tasks");
            }
        };

        request.onsuccess = () => {
            resolve(request.result);
        };

        request.onerror = () => {
            reject(request.error);
        };
    });
};

export const saveData = async (storeName, data) => {
    const db = await initDB();

    const transaction = db.transaction(storeName, "readwrite");
    const store = transaction.objectStore(storeName);

    store.put(data, "data");

    return new Promise((resolve) => {
        transaction.oncomplete = () => resolve();
    });
};

export const loadData = async (storeName) => {
    const db = await initDB();

    const transaction = db.transaction(storeName, "readonly");
    const store = transaction.objectStore(storeName);

    const request = store.get("data");

    return new Promise((resolve) => {
        request.onsuccess = () => {
            resolve(request.result);
        };

        request.onerror = () => {
            resolve(null);
        };
    });
};