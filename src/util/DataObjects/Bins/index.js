export default class Bins{
    constructor(stream,bin){
        this.stream=stream;
        this.bin=bin;
    }
    getStream(){
        return this.stream;
    }
    setStream(stream){
        this.stream=stream;
    }
    getBin(){
        return this.bin;
    }
    setBin(bin){
        this.bin=bin;
    }
}