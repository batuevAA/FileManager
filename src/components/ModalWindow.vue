<template>
    <div v-if="show" class="modal-shadow" @click.self="closeModal">
        <div class="modal">
            <div class="modal-close" @click="closeModal">&#10006;</div>
            <slot name="title">
                <h3 class="modal-title">File Manager</h3>
            </slot>
            <slot name="body">
                <div class="modal-content">
                    Код ошибки 
                    {{errCode}}
                    <br>
                    {{errMessage}}
                </div>
            </slot>
            <slot name="footer">
                <div class="modal-footer">
                    <button class="modal-button" @click="closeModal">
                        Ок
                    </button>
                </div>
            </slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'MadalWindow',
    props: {
        errMessage: String,
        errCode: String
    },
    data: function() {
        return{
            show: false
        }
    },
    methods: {
        closeModal: function () {
            this.show = false;
        }
    }
}
</script>

<style scoped>
.modal-shadow {
    position: absolute;
    top: 0;
    left: 0;
    min-height: 100%;
    width: 100%;
    background: rgba(0, 0, 0, 0.39);
}

.modal {
    background: #fff;
    border-radius: 8px;
    padding: 15px;
    min-width: 420px;
    max-width: 480px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-family: Droid Sans Mono,Ubuntu Mono,Consolas;
}

.modal-close {
    border-radius: 50%;
    color: #000;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 7px;
    right: 7px;
    width: 10px;
    height: 10px;
    cursor: pointer;
}

.modal-title {
    color: #333;
}

.modal-content {
    margin-bottom: 20px;
    color: #333;
}

.modal-footer {
    background-color: #0971c7;
    text-align: center;
    padding: 2px;
    border-radius: 8px;
    width: 50px;
    margin-left: 85%;
}

.modal-button {
    color: #fff;
    background-color: #0971c7;
    border: none;
    text-align: center;
    padding: 8px;
    font-size: 17px;
    font-weight: 500;
}
</style>