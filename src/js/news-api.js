import axios from "axios";
import { endImg } from "../index";
import { noImg } from "../index";


export default class ApiServise {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
        this.totalImg = 0;
    }

    axiosArticles() {
        return axios(`https://pixabay.com/api/?key=27671423-c69978df0ba28126a1f72b97e&q=${this.searchQuery}&page=${this.page}&image_type=photo&safesearch=true&orientation=horizontal&per_page=40`).then((res) => {
            
            return res.data;

        }).then((data) => {
            this.totalImg += data.hits.length
            if (this.totalImg <= data.totalHits) {
                this.page += 1;
                return data
            } else {
                endImg()
            }
            
        }).finally(() => { });
    }

    resetPage() {
        this.page = 1;
    }
    get query() {
        return this.searchQuery;
    }
    set query(newQuery) {
        this.searchQuery = newQuery;
    }
}