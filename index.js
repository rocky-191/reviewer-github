/* eslint-disable comma-spacing */
/**
 * Example problem with existing solution and passing test.
 * See problem 0 in the spec file for the assertion
 * @returns {string}
 */
exports.example = () => 'hello world';

exports.stripPrivateProperties = (arr,target) => {
  let result = [];
  if (Array.isArray(target)) {
    result = target.map((item) => {
      const res = {};
      // for (const key in item) {
      //   if (Array.isArray(arr) && !arr.includes(key)) {
      //     res[key] = item[key];
      //   }
      // }
      Object.keys(item).forEach((key) => {
        if (Array.isArray(arr) && !arr.includes(key)) {
          res[key] = item[key];
        }
      });
      return res;
    });
  }
  return result;
};
exports.excludeByProperty = (prop,arr) => {
  const result = [];
  if (Array.isArray(arr)) {
    arr.forEach((item) => {
      const res = {};

      Object.keys(item).forEach((key) => {
        if (!item[prop] && key !== prop) {
          res[key] = item[key];
        }
      });
      if (Object.keys(res).length) {
        result.push(res);
      }
    });
  }
  return result;
};
exports.sumDeep = (list) => {
  const sum = nums => nums.reduce((prev,cur) => prev + cur.val,0);
  const res = list.map((item) => {
    const obj = {};
    // for (const key in item) {
    //   if (item[key]) {
    //     obj[key] = sum(item[key]);
    //   }
    // }
    Object.keys(item).forEach((key) => {
      if (item[key]) {
        obj[key] = sum(item[key]);
      }
    });
    return obj;
  });
  return res;
};
exports.applyStatusColor = (obj,list) => {
  const result = [];
  list.forEach((item) => {
    const res = {};
    // for (const key in obj) {
    //   if (obj[key].includes(item.status)) {
    //     res.color = `${key}`;
    //     res.status = item.status;
    //   }
    // }
    Object.keys(obj).forEach((key) => {
      if (obj[key].includes(item.status)) {
        res.color = `${key}`;
        res.status = item.status;
      }
    });
    if (Object.keys(res).length) {
      result.push(res);
    }
  });
  return result;
};
exports.createGreeting = (fn,...args) => (..._args) => fn(...args,..._args);
exports.setDefaults = (obj) => {
  const keys = Object.keys(obj);

  const intersection = (a, b) => {
    const s = new Set(b);
    return [...new Set(a)].filter(x => s.has(x));
  };
  return (target) => {
    const targetKeys = Object.keys(target);
    const flag = intersection(targetKeys,keys).length > 0;
    if (!flag) {
      return {
        ...target,
        ...obj,
      };
    }
    return target;
  };
};
exports.fetchUserByNameAndUsersCompany = async (name,services) => {
  const res = {};
  const users = await services.fetchUsers();
  const targetUser = users.find(user => user.name === name);
  if (targetUser) {
    res.user = targetUser;
    const company = await services.fetchCompanyById(targetUser.companyId);
    if (company) {
      res.company = company;
      res.status = await services.fetchStatus();
    }
  }
  return Promise.resolve(res);
};
