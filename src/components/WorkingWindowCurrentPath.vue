<template>
    <div class="current-path">
        <p class="path-name">{{pathCurrent}}</p>
        <button class="back-button" @click="backHome()">Назад</button>
    </div>
</template>

<script>
    export default {
        name: 'WorkingWindowCurrentPath',
        props: {
            pathCurrent: String, //текущий путь
            pastWay: Array //пройденый путь
        },
        methods: {
            backHome: function() {
                if (this.pastWay.length >= 2) { //путь должен содержать хотя бы 2 элемента
                    this.pastWay.pop();
                    const lastItemArr = this.pastWay.length - 1; //последний элемент массива
                    const previousPath = this.pastWay[lastItemArr]; //Предыдущий путь
                    this.$emit('changeDirrect', previousPath);
                }
            }
        }
    }
</script>

<style scoped>
.current-path{
    display: flex; 
    align-items: center; 
    justify-content: flex-start; 
    width: 100%;
    height: 6%;
    max-height: 29px;
}
.path-name{
    display: flex; 
    flex-flow: wrap; 
    justify-content: flex-start; 
    font-family: COMIC SANS MS; 
    font-size: 10pt;
}
p {
    display: flex; 
    flex-basis: 100%;  
    flex-flow: wrap; 
    justify-content: center; 
    font-family: COMIC SANS MS; 
    font-size: 18pt;
}
</style>