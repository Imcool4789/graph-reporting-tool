import HelperFunctions from "../HelperFunctions";
import GADataMapping from "./GADataMapping";
export default class ProgramGAMapping{
    #courseCode;
    #GADataMapping=[];
    #color;
    constructor(courseCode){
        this.#courseCode=courseCode;
        this.#color=HelperFunctions.getRandomColor();
    }
    getCourseCode(){
        return this.#courseCode;
    }
    getColor(){
        return this.#color;
    }
    addlabels(label,ga,num){
        let found=false;
        for(let i=0;i<this.#GADataMapping.length;i++){
            if(this.#GADataMapping[i].getGA()===ga&&!found){
                found=true;
                this.#GADataMapping[i].addGAScore(label,num);
            }
        }
        if(!found){
            this.#GADataMapping.push(new GADataMapping(ga,label,num));

        }
    }
    getData(){
        return this.data;
    }
    setData(data){
        this.data=data;
    }
}