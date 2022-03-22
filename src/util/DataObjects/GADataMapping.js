export default class GADataMapping{
    #ga;
    #data=new Map();
    constructor(ga,label,num){
        this.#ga=ga;
        this.addGAScore(label,num);
    }
    getGA(){
        return this.#ga;
    }
    addGAScore(label,num){
        if(Array.from(this.#data.keys()).includes(label)){
            let arr=this.#data.get(label);
            arr[num-1]++;
            this.#data.set(label,arr);
        }else{
            let arr=[0,0,0,0];
            arr[num-1]++;
            this.#data.set(label,arr);
        }
    }
    getLabels(){
        return this.#data.keys();
    }
    getData(){
        return this.#data;
    }
}