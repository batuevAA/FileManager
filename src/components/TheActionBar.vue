<template>
    <div class="down-panel">
        <button class="copy-button" @click="copy()">Копировать</button>
        <button class="cut-button" @click="move()">Переместить</button>
        <button class="delete-button" @click="del()">Удалить</button>
        <MadalWindow ref="modal" :errMessage = "errMessage" :errCode = "errCode"/>
        
    </div> 
</template>

<script>
    import MadalWindow from './ModalWindow'

    export default {
        name: 'TheActionBar',
        components: {
            MadalWindow
        },
        data() {
            return {
                errMessage: String,
                errCode: String
            }
        },
        methods: {
            async copy() {
                let src;
                let dst;

                if (this.$parent.$options.activeWindow == this.$parent.$refs.left) {
                    src = this.$parent.$refs.left.activeFolder;
                    dst = this.$parent.$refs.right.pathCurrent;
                } else {
                    src = this.$parent.$refs.right.activeFolder;
                    dst = this.$parent.$refs.left.pathCurrent;
                }

                const result = await window.api.copy(src, dst);

                if (result.errorCode != null) {
                    this.errCode = result.errorCode;
                    this.errMessage = result.errorText;
                    this.$refs.modal.show = true;
                }

                this.refreshCatalog();
            },

            async move() {
                let src;
                let dst;

                if (this.$parent.$options.activeWindow == this.$parent.$refs.left) {
                    src = this.$parent.$refs.left.activeFolder;
                    dst = this.$parent.$refs.right.pathCurrent;
                } else {
                    src = this.$parent.$refs.right.activeFolder;
                    dst = this.$parent.$refs.left.pathCurrent;
                }

                const result = await window.api.move(src, dst);

                if (result.errorCode != null) {
                    this.errCode = result.errorCode;
                    this.errMessage = result.errorText;
                    this.$refs.modal.show = true;
                }
                this.refreshCatalog();
            },

            async del() {
                let src;
                if (this.$parent.$options.activeWindow == this.$parent.$refs.left) {
                    src = this.$parent.$refs.left.activeFolder;
                } else {
                    src = this.$parent.$refs.right.activeFolder;
                }

                const result = await window.api.delete(src);

                if (result.errorCode != null) {
                    this.errCode = result.errorCode;
                    this.errMessage = result.errorText;
                    this.$refs.modal.show = true;
                }
                await this.refreshCatalog();
            },
            
            async refreshCatalog() {
                await this.$parent.$refs.left.changeDirect(this.$parent.$refs.left.pathCurrent);
                await this.$parent.$refs.right.changeDirect(this.$parent.$refs.right.pathCurrent);
            }
        }
    }
</script>

<style scoped>
.down-panel{
    display: flex;  
    justify-content: center; 
    align-content: center;
    width: 82%; 
    height: 5%; 
    border: 4px; 
    margin-top: -2%;
    border-style: solid; 
    border-width: 2px; 
    border-radius: 5px; 
    background-color: #f0edff; 
    border-color: #9e9cad;
    font-family: Droid Sans Mono,Ubuntu Mono,Consolas;
}

.copy-button{
    display: flex; 
    justify-content: center; 
    align-self: center;
    cursor: pointer;
    flex-basis: 25%; 
    margin-right: 10px;
}

.cut-button{
    display: flex; 
    justify-content: center; 
    align-self: center;
    cursor: pointer;
    flex-basis: 25%; 
    margin-right: 10px;
}

.delete-button{
    display: flex; 
    justify-content: center; 
    align-self: center;
    cursor: pointer;
    flex-basis: 25%; 
}
</style>>