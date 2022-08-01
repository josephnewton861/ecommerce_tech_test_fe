<template>
    <ion-page>
        <folder-page></folder-page>
        <ion-item-group>
            <ion-item-divider>
                <ion-label>Login</ion-label>
            </ion-item-divider>
            <ion-note>* Use either a username or email for login</ion-note>
            <ion-item>
                <ion-label>Email</ion-label>
                <ion-input 
                    type="text"
                    v-model="email"
                />
            </ion-item>
            <ion-item>
                <ion-label>Username</ion-label>
                <ion-input 
                    type="text"
                    v-model="username"
                />
            </ion-item>

            <ion-item>
                <ion-label>Password</ion-label>
                <ion-input 
                    type="password"
                    v-model="password"
                />
                <ion-note>Password must have a capital letter and needs to be 8 characters with special character</ion-note>
            </ion-item>
        </ion-item-group>
         <ion-button v-if="!isButtonActive" :class="{disable_button: !isButtonActive}">Submit</ion-button>
        <ion-button v-else-if="isButtonActive" @click="checkUserInformation()">Submit</ion-button>
    </ion-page>
</template>

<script>
import { IonPage, IonLabel, IonInput, IonItem, IonNote, IonButton } from '@ionic/vue';
import axios from 'axios'

export default {
    name: 'LoginUser',
    components: {
        IonPage,
        IonLabel,
        IonInput,
        IonItem,
        IonNote,
        IonButton
    },
    data() {
        return {
            email: '',
            username: '',
            password: '',
        }
    },
    methods: {
        checkUserInformation() {
            console.log(this.password, this.email, this.username)
            axios.get("https://ecommerce-application-joen.herokuapp.com/api/customer/", {
                username: this.username,
                email: this.email,
                password: this.password,
            }).then((res) => {
                this.successMsg = res.data.msg;
            }).catch((err) => {
                console.log(err)
                this.errMsg = 'Failed to register user please look at your inputted details'
            })
        }
    },
    computed: {
        isButtonActive() {
            if ((this.username || this.email ) && this.password) {
                return true
            }
            return false;
        }
    },
}
</script>

<style scoped>

.page_container {
  margin-top: 6rem;
  padding: 0.5rem;
}
ion-page {
    display: block;
}
ion-header {
    color: black;
}
ion-item-divider {
    background-color: #a00606
}
.form_submittion {
    background-color: #a00606
}
.disable_button {
    opacity: 0.5;
    cursor: none;
}
ion-note {
    font-size: 0.7rem;
    width: 50%;
}
ion-item-group {
    margin-top: 5rem;
}
.err_msg {
    color: red;
}
.success_msg {
    color: green;
}
</style>

