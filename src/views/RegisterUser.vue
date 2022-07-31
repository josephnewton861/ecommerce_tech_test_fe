<template>
    <ion-page>
        <folder-page></folder-page>
        <ion-item-group class="page_container">
            <ion-item-divider>
                <ion-label>Credentials</ion-label>
            </ion-item-divider>
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
                <ion-note>Username needs to be unique</ion-note>
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
        <ion-item-group>
            <ion-item-divider>
                <ion-label>Delivery information</ion-label>
            </ion-item-divider>

            <ion-item>
            <ion-label>Address</ion-label>
                <ion-input 
                    type="text"
                    v-model="address"
                />
            </ion-item>
            <ion-item>
                <ion-label>Postcode</ion-label>
                <ion-input 
                    type="text"
                    v-model="postcode"
                />
            </ion-item>
        </ion-item-group>
        <ion-text class="err_msg" v-if="errMsg">
            <p>{{errMsg}}</p>
        </ion-text>
        <ion-text class="success_msg" v-if="successMsg">
            <p>{{successMsg}}</p>
        </ion-text>
        <ion-button v-if="!isButtonActive" :class="{disable_button: !isButtonActive}">Submit</ion-button>
        <ion-button v-else-if="isButtonActive" @click="addUserInformation()">Submit</ion-button>
        <ion-router v-if="successMsg">
            <ion-route-redirect from="/register" to="/basket"></ion-route-redirect>
        </ion-router>
    </ion-page>
</template>

<script>
import { IonPage, IonLabel, IonInput, IonItem, IonNote } from '@ionic/vue';
import axios from 'axios'

export default {
    name: 'RegisterUser',
    components: {
        IonPage,
        IonLabel,
        IonInput,
        IonItem,
        IonNote,
    },
    data() {
        return {
            email: '',
            username: '',
            password: '',
            address: '',
            postcode: '',
            successMsg: '',
            errMsg: ''
        }
    },
    methods: {
        addUserInformation() {
            axios.post("https://ecommerce-application-joen.herokuapp.com/api/customer/", {
                username: this.username,
                password: this.password,
                address: this.address,
                email: this.email,
                postcode: this.postcode
            }).then((res) => {
                this.successMsg = res.data.msg;
                console.log(window.location)
            }).catch((err) => {
                console.log(err)
                this.errMsg = 'Failed to register user please look at your inputted details'
            })
        }
    },
    computed: {
        isButtonActive() {
            if (this.username && this.password && this.email && this.postcode && this.address) {
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
  margin-bottom: 2rem;
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
.err_msg {
    color: red;
}
.success_msg {
    color: green;
}
</style>

