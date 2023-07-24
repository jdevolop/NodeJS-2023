'use strict';

const socket = new WebSocket('ws://127.0.0.1:8001/');

const scaffold = (url, structure) => {
  const api = {};
  const services = Object.keys(structure);
  for (const serviceName of services) {
    api[serviceName] = {};
    const service = structure[serviceName];
    const methods = Object.keys(service);
    for (const methodName of methods) {
      api[serviceName][methodName] = (...args) => new Promise((resolve) => {
        let endpointPath = `${serviceName}/${methodName}`;
        fetch(url + endpointPath, {
          method: "POST",
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(args),
        }).then((res) => {
          const { status } = res;
          if (status !== 200) {
            reject(new Error(`Status Code: ${status}`));
            return;
          }
          resolve(res.json());
        });
      });
    }
  }
  return api;
};

const api = scaffold('http://127.0.0.1:8001/', {
  user: {
    create: ['record'],
    read: ['id'],
    update: ['id', 'record'],
    delete: ['id'],
    find: ['mask'],
  },
  country: {
    read: ['id'],
    delete: ['id'],
    find: ['mask'],
  },
});

socket.addEventListener('open', async () => {
  const data = await api.user.read(3);
  console.dir({ data });
});
