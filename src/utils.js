const utils = {
    methods: {
        formatDate(date) {
            let time = new Date(date)
            let year = time.getFullYear()
            let month = (time.getMonth() >= 10 ? time.getMonth() + 1 : '0' + (time.getMonth() + 1))
            let day = time.getDate()
            return year + '-' + month + '-' + day
        }
    }
}

export default utils