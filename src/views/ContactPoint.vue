<template>
    <ion-page>
        <folder-page></folder-page>
        <ion-item-group class="page_container">
            <ion-item-divider>
                <ion-label>Contact Information</ion-label>
            </ion-item-divider>
            <ion-note>* Use either a username or email for login</ion-note>
            <ion-item>
                <ion-text>
                    <p>Contact Number: </p>
                    <a href="#">0774562746</a>
                </ion-text>
            </ion-item>
            <ion-item>
                <ion-text>
                    <p>Contact email:</p>
                    <a href="#">goldenshoe@email.com</a>
                </ion-text>
            </ion-item>
        </ion-item-group>
    </ion-page>
</template>  

<script>
 
import {
    IonPage, 
    IonItemGroup, 
    IonItem, 
    IonItemDivider
} from '@ionic/vue';

    export default {
        name: 'ContactPoint',
        components: {
            IonPage, 
            IonItemGroup, 
            IonItem, 
            IonItemDivider
        }
    }
</script>

<style scoped>
    ion-page {
        display: block;
    }
    .page_container {
        margin-top: 5rem;
    }
    ion-item-divider {
        background-color: #a00606;
        color: white;
    }
</style>