<template>
    <div class="score" v-bind:data-total-value="mark">
        <div class="star" data-item-value="5" v-on:click="setNewMark(5)">★
        </div>
        <div class="star" data-item-value="4" v-on:click="setNewMark(4)">★
        </div>
        <div class="star" data-item-value="3" v-on:click="setNewMark(3)">★
        </div>
        <div class="star" data-item-value="2" v-on:click="setNewMark(2)">★
        </div>
        <div class="star" data-item-value="1" v-on:click="setNewMark(1)">★
        </div>
    </div>
</template>

<script>
    export default {

        props: ["mark"],
        methods: {
            setNewMark(newMark) {
                this.$emit('change-mark', newMark);
            }
        },

    }
</script>

<style lang="less">
    .score {
        display: inline-flex;
        margin-bottom: 1.5rem;
        justify-content: center;
        flex-direction: row-reverse;
        align-items: center;

        .star {
            color: #dcdcdc;
            cursor: pointer;
            font-size: 3.5rem;
            transition: .2s;
        }

        .star:hover, .star:hover ~ .star {
            color: #989898;
        }
    }

    .score[data-total-value="1"] .star:nth-child(n+5),
    .score[data-total-value="2"] .star:nth-child(n+4),
    .score[data-total-value="3"] .star:nth-child(n+3),
    .score[data-total-value="4"] .star:nth-child(n+2),
    .score[data-total-value="5"] .star:nth-child(n+1) {
        color: #272727;
    }

</style>