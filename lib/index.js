const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

class VkIoSessionLowDb {
    constructor(params = {}) {
        this.defaults = {
            storage: 'vkontakte_db.json'
        };
        this.serviceKeys = ['__wrapped__', '__actions__', '__chain__', '__index__', '__values__', '$forceUpdate'];
        this.adapter = new FileSync(params.storage || this.defaults.storage);
        this.store = low(this.adapter);
        // console.log('VkIoSessionLowDb STARTED');
    }

    async has(key) {
        // console.log('VK SES LOW. ESSION HAS ' + key);
        return this.store.has(key);
    }
    async get(key) {
        // console.log('SESSION GET ' + key);
        let value = this.store.get(key) || null;
        // let primitive = {};
        // for (let k in value[key]) {
        //     if (value[key].hasOwnProperty(k)/* && this.serviceKeys.indexOf(k) === -1*/) {
        //         primitive[k] = value[key][k];
        //         console.log('OWN PROPERTY KEY ' + k + ' VALUE ', value[key][k]);
        //     }
        // }
        // console.log('SESSION GET ' + key + ' VALUE ',  value.__wrapped__[key]);
        // console.log('SESSION GET ' + key + ' VALUE ',  primitive);
        return value.__wrapped__[key];
        // return primitive;
    }
    async set(key, value) {
        let primitive = {};
        // console.log('VK SES LOW. SESSION SET KEY ' + key + ', VALUE ', value);
        for (let k in value) {
            if (value.hasOwnProperty(k) && this.serviceKeys.indexOf(k) === -1) {
                primitive[k] = value[k];
                // console.log('OWN PROPERTY KEY ' + k + ' VALUE ', value[k]);
            }
        }
        // console.log('OWN PROPERTY KEY ' + key + ' FINAL VALUE ', primitive);
        this.store.set(key, primitive).write();
        // console.log('VK SES LOW. SESSION SET KEY ' + key /*+ ', ALL ', this.store*/);
        return true;
    }
    async delete(key) {
        return this.store.delete(key);
    }

}

module.exports = VkIoSessionLowDb;
module.exports.default = VkIoSessionLowDb;