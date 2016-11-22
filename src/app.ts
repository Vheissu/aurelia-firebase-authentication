declare var firebase;

export class App {
    constructor(
        private userLoggedIn = false,
        private authToken = null,
        private user = null
    ) {
        firebase.auth().onAuthStateChanged(user => {
            this.userLoggedIn = user ? true : false;
            this.user = user;
        });
    }

    login() {
        let provider = new firebase.auth.GoogleAuthProvider();

        firebase.auth().signInWithPopup(provider).then((result: any) => {
            this.authToken = result.credential.accessToken;
            this.user = result.user;
            this.userLoggedIn = true;
        }).catch(error => {
            let errorCode = error.code;
            let errorMessage = error.message;
            let email = error.email;
            let credential = error.credential;
        });
    }

    logout() {
        firebase.auth().signOut().then(() => {
            this.userLoggedIn = false;
        }).catch(error => {
            throw new Error(error);
        });
    }
}
