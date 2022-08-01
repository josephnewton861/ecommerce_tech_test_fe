
import axios from 'axios';
import credentials from '../auth';
export default {
    methods: {
        async checkUserInformation() {
            const result = await axios.post("https://ecommerce-application-joen.herokuapp.com/api/customer/10", {
                email: credentials.email,
                password: credentials.password
            }).then((res) => {
                return res.data.customer
            }).catch((err) => {
                return err.msg;
            })
            return result;
        }
    }
};