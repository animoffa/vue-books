<template>
    <div class="flipcard h" v-bind:class="{deleteSide: isDeleteClicked}">
        <div class="card front">
            <p class="title">{{card.title}}</p>
            <p class="subtitle">{{card.author}}</p>
            <div class="actions">
                <Stars v-bind:mark="card.mark" @change-mark="changeMark"/>
                <div class="more-img-container">
                    <img src="../assets/img/more.svg" alt="actions" v-on:click="openMore"/>
                </div>
            </div>
            <div class="quotes">
                <ul>
                    <li>{{card.quotes?firstLetterToUppercase(card.quotes[0]):"Пока нет цитат"}}</li>
                </ul>
            </div>
            <div v-on:click="isDeleteClicked=!isDeleteClicked" class="delete-button">
                ╳
            </div>
        </div>
        <div class="back">
            <h2>Удалить?</h2>
            <div class="button-container">
                <div class="button-delete button" v-on:click="deleteBook">Да</div>
                <div class=" button" v-on:click="isDeleteClicked=!isDeleteClicked">Нет</div>
            </div>
        </div>
    </div>
</template>

<script>
    import Stars from "@/components/stars"

    export default {
        data() {
            return {
                isDeleteClicked: false,
            }
        },
        components: {
            Stars
        },
        props: ["card"],
        methods: {
            changeMark(newMark) {
                this.$emit('change-mark', newMark, this.card._id);
            },
            deleteBook() {
                this.isDeleteClicked = !this.isDeleteClicked
                this.$emit('delete-card', this.card._id);
            },
            openMore() {
                this.$emit('open-more', this.card._id);
            },
            firstLetterToUppercase(str){
                return str[0].toUpperCase() + str.slice(1)
            }
        },

    }
</script>

<style lang="less">

    .card {
        background: #f9f9f9e6;
        box-shadow: 10px 9px 18px 10px rgba(207, 207, 207, 27%);
        -webkit-box-shadow: 10px 9px 18px 10px rgba(207, 207, 207, 27%);
        -moz-box-shadow: 10px 9px 18px 10px rgba(207, 207, 207, 27%);
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        border-radius: 2rem;
        align-items: flex-start;
        padding: 4.5rem 3rem 4rem;

        .score {
            cursor: default;
            opacity: 0.8;

            .star {
                cursor: default;
            }

        }

        .actions {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .title {
            text-align: left;
            font-size: 2.2rem;
            font-weight: 600;
            color: #27382b;
            margin-bottom: 0.3rem;

            &:first-letter {
                text-transform: uppercase;
            }

            @media (max-width: 768px) {
                font-size: 2.3rem;
            }
        }

        .subtitle {
            text-align: left;
            @media (max-width: 768px) {
                font-size: 1.8rem;
            }
        }

        .quotes li {
            font-size: 1.4rem;
            color: #7d8075;
            margin-bottom: 1rem;
            overflow: hidden;
            line-clamp: 2;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            line-height: 2.2rem;
            text-align: initial;

            @media (max-width: 768px) {
                font-size: 1.6rem;
            }
        }

        .delete-button {
            visibility: hidden;
            opacity: 0;
            align-self: flex-end;
            color: white;
            border-radius: 50%;
            background-color: #ff00008a;
            cursor: pointer;
            position: absolute;
            top: 1.3rem;
            left: 89%;
            font-size: 1rem;
            transition: 1s all cubic-bezier(0.39, 0.575, 0.565, 1);
            width: 2.5rem;
            height: 2.5rem;
            line-height: 2.4rem;
        }

        .delete-button:hover {
            background-color: rgba(211, 14, 14, 0.85);
        }

        .subtitle {
            color: #818479;
            font-size: 1.5rem;
            margin-bottom: 2.2rem;
            text-align: left;
        }

        .more-img-container {
            width: 6%;

            img {
                cursor: pointer;
                width: 100%;
            }
        }


    }

    .button-container {
        display: flex;
        width: 100%;
        justify-content: space-between;
        padding: 1.5rem 3rem;
        height: 7rem;
    }

    .button {
        border-radius: 1rem;
        border: 1px solid #272727;
        height: 100%;
        box-shadow: 10px 9px 18px 10px rgba(207, 207, 207, 27%);
        -webkit-box-shadow: 10px 9px 18px 10px rgba(207, 207, 207, 27%);
        -moz-box-shadow: 10px 9px 18px 10px rgba(207, 207, 207, 27%);
        width: 40%;
        display: flex;
        cursor: pointer;
        justify-content: center;
        align-items: center;
    }

    .button:hover {
        background: rgba(62, 62, 62, 0.1);
    }

    .button-delete {
        background: #ff4141;
    }

    .button-delete:hover {
        background: #d73939;
    }

    .flipcard {
        position: relative;
        perspective: 500px;
        width: 100%;
        transition: 1.3s all cubic-bezier(0.39, 0.575, 0.565, 1);
        height: 32rem;
    }

    .deleteSide .front {
        transform: rotateY(180deg);
    }

    .flipcard.h .back {
        transform: rotateY(-180deg);
    }

    .deleteSide.h .back {
        transform: rotateY(0deg);
    }

    .flipcard .front, .flipcard .back {
        position: absolute;
        box-sizing: border-box;
        transition: all 0.5s ease-in;
        backface-visibility: hidden;
        padding: 3.7rem 3rem 4.7rem;
        z-index: 1;
    }

    .flipcard .back {
        height: 32rem;
        width: 100%;
        display: flex;
        box-shadow: 10px 9px 18px 10px rgba(207, 207, 207, 27%);
        -webkit-box-shadow: 10px 9px 18px 10px rgba(207, 207, 207, 27%);
        -moz-box-shadow: 10px 9px 18px 10px rgba(207, 207, 207, 27%);
        justify-content: center;
        flex-direction: column;
        background: #f9f9f9e6;
        border-radius: 2rem;
        align-items: center;
    }

    .card:hover .delete-button {
        visibility: visible;
        opacity: 1;
    }


</style>