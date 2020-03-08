// src/plugins/vuetify.js
import 'material-design-icons-iconfont/dist/material-design-icons.css' // Ensure you are using css-loader
import Vue from 'vue'
import Vuetify, { VBottomNavigation, VBtn, VIcon, VBtnToggle } from 'vuetify/lib'




Vue.use(Vuetify, {
    components: { VBottomNavigation, VBtn, VIcon, VBtnToggle }
})

const opts = {
    icons: {
        iconfont: 'md',
    },
}

export default new Vuetify(opts)