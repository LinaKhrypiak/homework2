import callApi from '../helpers/apiHelper';


class FighterService {
    #endpoint = 'fighters.json';

    async getFighters() {
        try {
            const apiResult = await callApi(this.#endpoint);
            console.log("apiResult : ", apiResult);
            return apiResult;
        } catch (error) {
            throw error;
        }
    }

    async getFighterDetails(id) {
        try {
            const endpoint = `details/fighter/${id}.json`;
            const apiResult = await callApi(endpoint);
            console.log("apiResult2: ", apiResult);
            return apiResult;
        } catch (error) {
            throw error;
        }
    }
}

const fighterService = new FighterService();

export default fighterService;
