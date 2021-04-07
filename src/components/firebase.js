import app from 'firebase/app'
import 'firebase/auth'
import 'firebase/firebase-firestore'
import 'firebase/storage'

const config = {
    apiKey: "AIzaSyBt4od9EVTpQErLWYRq8Z7dihbpyQFVVoc",
    authDomain: "evote-3eb91.firebaseapp.com",
    databaseURL: "https://evote-3eb91.firebaseio.com",
    projectId: "evote-3eb91",
    storageBucket: "evote-3eb91.appspot.com",
    messagingSenderId: "101778515866",
    appId: "1:101778515866:web:8b0c6cc411063259d13c23"
};

class Firebase {
	constructor() {
		app.initializeApp(config)
		this.auth = app.auth()
		this.db = app.firestore()
		this.upload = app.storage()
		this.admin = this.db.collection('admin');
	}

	getUpload() {
		const storage = app.storage();
		return storage
	}

	async login(email, password) {
		await this.auth.signInWithEmailAndPassword(email, password)
		if (!this.auth.currentUser) {
			const status = await this.db.doc(`status/${this.auth.currentUser.uid}`).get()
			if (!status) {
				return status.get('status')
			}
			return null
		}
		const admin = await this.admin.doc(this.auth.currentUser.uid).get();
		const AdminRole = {
			id: admin.id,
			...admin.data()
		};
		await localStorage.setItem('AdminRole', JSON.stringify(AdminRole));
		return {
			status: 'success'
		};
	}

	async logout() {
		await localStorage.setItem('AdminRole', JSON.stringify({}));
		return this.auth.signOut()
	}

	async register(nama, email, password) {
		await this.auth.createUserWithEmailAndPassword(email, password)
		return this.auth.currentUser.updateProfile({
			displayName: nama,
		})
	}

	addCalon(nama, nim, prodi, angkatan, nourut, detail2, visi, misi, foto, hasil) {
		if(!this.auth.currentUser) {
			return alert('Not authorized')
		}

		return this.db.collection(`calon`).add({
			nama, nim, prodi, angkatan, nourut, detail2, visi, misi, foto, hasil
		})
	}

	getCalon = async () => {
		const role = JSON.parse(localStorage.getItem('AdminRole'));
		if(!this.auth.currentUser && !role.bpm) {
			return alert('You not have permission')
		}

		let calons = [];
		const snapshot = await await this.db.collection('calon').get();
		if(snapshot.empty) {
			return calons;
		}
		snapshot.forEach(snap => {
			calons.push({
				id: snap.id,
				...snap.data()
			})
		});

		return calons;
	}

	editCalon = async (id) => {
		const role = JSON.parse(localStorage.getItem('AdminRole'));
		if(!this.auth.currentUser && !role.bpm) {
			return alert('You not have permission')
		}

		const calon = await this.db.collection('calon').doc(id).get();
		if(!calon.exists) {
			return alert('Data calon tidak ada')
		}
		const data = {
			id: calon.id,
			...calon.data()
		};
		return data;
	}

	updateCalon = async (id, nama, nim, prodi, angkatan, nourut, detail2, visi, misi, foto, hasil) => {
		const role = JSON.parse(localStorage.getItem('AdminRole'));
		if(!this.auth.currentUser && !role.bpm) {
			return alert('You not have permission')
		}

		const update = await this.db.collection(`calon`)
		.doc(id).update({
			nama,
			nim,
			prodi,
			angkatan,
			nourut,
			detail2,
			visi,
			misi,
			foto,
			hasil
		});
		if(update) {
			const calon = await this.db.collection('calon').doc(id).get();
			if(!calon.exists) {
				return alert('Data calon tidak ada')
			}
			const data = {
				id: calon.id,
				...calon.data()
			};
			return data;
		}
	}

	removeCalon = async (id) => {
		const role = JSON.parse(localStorage.getItem('AdminRole'));
		if(!this.auth.currentUser && !role.bpm) {
			return alert('You not have permission')
		}
		const remove = await this.db.collection('calon').doc(id).delete();

		return remove;
	}

	addUser(nama, nim, prodi, email) {
		if(!this.auth.currentUser) {
			return alert('Not authorized')
		}

		return this.db.doc(`users/${this.auth.currentUser.uid}`).set({
			nama, nim, prodi, email
		})
	}

// list calon awal
  getUser = async () => {
		const role = JSON.parse(localStorage.getItem('AdminRole'));
		if(!this.auth.currentUser && !role.bpm) {
			return alert('You not have permission')
		}

		let users = [];
		const snapshot = await await this.db.collection('users').get();
		if(snapshot.empty) {
			return users;
		}
		snapshot.forEach(snap => {
			users.push({
				id: snap.id,
				...snap.data()
			})
		});

		return users;
	}

  editUser = async (id) => {
    const role = JSON.parse(localStorage.getItem('AdminRole'));
    if(!this.auth.currentUser && !role.bpm) {
      return alert('You not have permission')
    }

    const user = await this.db.collection('users').doc(id).get();
    if(!user.exists) {
      return alert('Data user tidak ada')
    }
    const data = {
      id: user.id,
      ...user.data()
    };
    return data;
  }

  updateUser = async (id, nama, nim, prodi) => {
    const role = JSON.parse(localStorage.getItem('AdminRole'));
    if(!this.auth.currentUser && !role.bpm) {
      return alert('You not have permission')
    }

    const update = await this.db.collection(`users`)
    .doc(id).update({
      nama,
      nim,
      prodi
    });
    if(update) {
      const user = await this.db.collection('users').doc(id).get();
      if(!user.exists) {
        return alert('Data user tidak ada')
      }
      const data = {
        id: user.id,
        ...user.data()
      };
      return data;
    }
  }

  removeUser = async (id) => {
    const role = JSON.parse(localStorage.getItem('AdminRole'));
    if(!this.auth.currentUser && !role.bpm) {
      return alert('You not have permission')
    }
    const remove = await this.db.collection('users').doc(id).delete();

    return remove;
  }
// list calon akhir

	isInitialized() {
		return new Promise(resolve => {
			this.auth.onAuthStateChanged(resolve)
		})
	}

	getCurrentUsername() {
		return this.auth.currentUser && this.auth.currentUser.displayName
	}

	async getCurrentAdmin() {
		if(this.auth.currentUser) {
			const status = await this.db.doc(`status/${this.auth.currentUser.uid}`).get()
			return status.get('status')

		}
	}
}

export default new Firebase()
