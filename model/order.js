const fs = require("fs");
const path = require("path");

const fileData = path.join(process.cwd(), "data", "orders.json");

const readData = () => {
  return new Promise((resolve, reject) => {
    fs.readFile(fileData, (err, data) => {
      if (err) {
        // Agar file exist nahi karti to empty array return karo
        if (err.code === "ENOENT") {
          resolve([]);
        } else {
          reject(err);
        }
      } else {
        resolve(JSON.parse(data.toString() || "[]"));
      }
    });
  });
};

const writeData = (data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(fileData, JSON.stringify(data, null, 2), (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

exports.createOrder = async (orderData) => {
  const orders = await readData();

  const newOrder = {
    id: Date.now().toString(),
    ...orderData,
    status: "Pending",
    createdAt: new Date().toISOString(),
  };

  await writeData([...orders, newOrder]);

  return newOrder;
};

exports.getOrders = async () => {
  const orders = await readData();
  return orders;
};

exports.getOrderById = async (id) => {
  const orders = await readData();
  return orders.find((order) => order.id === id);
};