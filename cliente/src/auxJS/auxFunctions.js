import firebase from 'firebase'

let userDB = [];

function loadUsers(users) {
    userDB = [];
    for (let key in users) {
        userDB.push({
            user: users[key].user,
            email: users[key].email,
            password: users[key].password,
            rol: users[key].rol,
            idUniq: users[key].idUniq
        })
    }
}

export function auth() {
    let localKey = localStorage.getItem('sesion_activa');
    if (localKey) {
        firebase.database().ref('users/').on('value', snapshots => loadUsers(snapshots.val()));
        for (let i = 0; i <= userDB.length; i++) {
            if (localKey === userDB[i].idUniq) {
                return userDB[i].rol;
            }
        }
        return false
    }
}

export function user() {
    let localKey = localStorage.getItem('sesion_activa');
    if (localKey) {
        firebase.database().ref('users/').on('value', snapshots => loadUsers(snapshots.val()));
        for (let i = 0; i <= userDB.length; i++) {
            if (localKey === userDB[i].idUniq) {
                return userDB[i].user;
            }
        }
        return false
    }
}
