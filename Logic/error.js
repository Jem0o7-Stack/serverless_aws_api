const Errorlog = require('../Model/errorlog');

module.exports = {
    async createErrorlog(error) {
        //console.log(error)
        let result = await Errorlog.create(error);
        // if (result) {
        //     return {
        //         data: result,
        //         message: "Error Log successfully created!"
        //     };
        // }
        return "Creating Error Log"
    }
}