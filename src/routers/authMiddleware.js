import moment from 'moment';
import VueRouter from 'vue-router'

export default (to, from, next) => {
    let dateNow = moment().format('YYYY-MM-DD hh:mm:ss');
    let token = localStorage.getItem('token');
    let expiredAt = localStorage.getItem('expiredAt');

    if (to.path != '/login') {
        if (dateNow >= expiredAt && token != null) {
            next({ name: 'login' }).catch(() => {});
        } else {
            next();
        }
    } else if (to.path == '/login') {
        if (dateNow <= expiredAt && token != null) {
            next({ name: 'dashboard' }).catch(() => {});
        } else {
            next();
        }
    } else {
        next();
    }
}