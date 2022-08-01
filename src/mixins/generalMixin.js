
export default {
    methods: {
        removeDoubleQuotes(imgUrl) {
            return imgUrl.replace(/['"]+/g, '');
        },
        formatDate(date) {
        let newDate = new Date(date);
            let options = {
            month: "short",
            day: "numeric",
            year: "numeric",
            };
        let formattedDate = newDate.toLocaleDateString("en", options)

            return formattedDate
        },
    }
};