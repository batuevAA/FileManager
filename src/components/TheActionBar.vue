<template>
    <div class="down-panel">
        <button class="button copy" @click="copy()">Копировать</button>
        <button class="button cut" @click="move()">Переместить</button>
        <button class="button delete" @click="del()">Удалить</button>
    </div> 
</template>

<script>
    export default {
        name: 'TheActionBar',
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
                    this.sendError(result);
                } else {
                    this.refreshCatalog();
                }
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
                    this.sendError(result);
                } else {
                    this.refreshCatalog();
                }
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
                    this.sendError(result);
                } else {
                    this.refreshCatalog();
                }
            },
            
            async refreshCatalog() {
                await this.$parent.$refs.left.changeDirect(this.$parent.$refs.left.pathCurrent);
                await this.$parent.$refs.right.changeDirect(this.$parent.$refs.right.pathCurrent);
            },

            sendError(error) {
                this.$emit('error', { 
                    code: error.errorCode, 
                    message: error.errorText
                });
                this.$parent.$refs.modal.show = true;
            }
        }
    }
</script>

<style scoped>
.down-panel{
    display: flex;  
    justify-content: center; 
    width: 83%; 
    min-width: 875px;
    max-width: 1840px;
    height: 5%; 
    font-family: Droid Sans Mono,Ubuntu Mono,Consolas;
}

.button {
    display: flex; 
    justify-content: center; 
    align-items: center;
    align-self: center;
    cursor: pointer;
    flex-basis: 25%; 
    font-size: 0.9em;
    height: 90%;
    max-height: 30px;
}


.copy {
    margin-right: 10px;
}

.cut {
    margin-right: 10px;
}

.delete {
    flex-basis: 25%; 
}
</style>>