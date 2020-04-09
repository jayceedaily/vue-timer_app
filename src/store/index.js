import Vue from 'vue';

export const store = Vue.observable({
    timers: []
})

export const mutations = {
    prepend: (item) => {

        store.timers.unshift(item)
        localStorage.data = JSON.stringify(store.timers)
    },
    
    load: (items) => {
        store.timers = items;
    },

    moveToTop: (item) => {
        let index = store.timers.findIndex((_item) => _item.id == item.id);
        
        store.timers.splice(index, 1);

        mutations.prepend(item);
    }
}