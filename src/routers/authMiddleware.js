import moment from 'moment';

export default (to, from, next) => {
    let dateNow = moment().format('YYYY-MM-DD hh:mm:ss');
    let token = localStorage.getItem('token');
    let expiredAt = localStorage.getItem('expiredAt');

    if (to.path != '/login') {
        if (dateNow >= expiredAt && token != null) {
            next({ name: 'login' });
        } else {
            next();
        }
    } else if (to.path == '/login') {
        if (dateNow <= expiredAt && token != null) {
            next({ name: 'dashboard' });
        } else {
            next();
        }
    } else {
        next();
    }
}