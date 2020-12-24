<template>
    <div>
        <template  v-if="isLoading">
           <Preloader/>
        </template>
        <template v-else>
        <div class="mapping-buttons">
            <button v-on:click="isCardMapping=true" v-bind:class="{activeButton:isCardMapping}">Cards</button>
            <button v-on:click="isCardMapping=false" v-bind:class="{activeButton:!isCardMapping}">Table</button>
        </div>
        <div class="menu">
            <div class="user">
                <div class="img">
                    <img src="../assets/img/user.png"/>
                </div>
                <p class="des un">{{user.fullName}}</p>
            </div>
            <div v-on:click="exit">
                <router-link class="route exit" to="/login"><img src="../assets/img/exit.png" class="exit-ico"/>
                </router-link>
            </div>
        </div>
        <div class="container">
            <h1>Мy books </h1>
            <img src="../assets/img/line.png" class="line"/>

            <p class="des">Designed by animoffa </p>

            <div class="filtration">
                <input type="text" v-model.trim="search" class="search-input">
                <div class="h-line"></div>
                <select v-model="sortParam">
                    <option value="" hidden disabled selected>Сортировать..</option>
                    <option value="title">по названию</option>
                    <option value="author">по автору</option>
                    <option value="mark">по оценкам</option>
                    <option value="titleLowFirst">по названию ↑</option>
                    <option value="authorLowFirst">по автору ↑</option>
                    <option value="markLowFirst">по оценкам ↑</option>
                </select>
                <div class="select-arrow"><img src="../assets/img/arrow_custom.svg"/></div>
            </div>
            <hr class="m-hr" v-show="isCardMapping"/>
            <CardList v-bind:cards="sortedList" v-bind:isCardMapping="isCardMapping"></CardList>
        </div>
        </template>
    </div>
</template>
<script>
    import CardList from "@/components/card-list"
    import ResourceAPI, {APIServiceResource} from "@/services/APIServiceResource.js"
    import AuthAPI from "@/services/APIServiceAuth.js"
import Preloader from "@/components/preloader"
    export default {
        data() {
            return {
                cards: [],
                search: '',
                sortParam: '',
                isCardMapping: true,
                user: '',
                isLoading: false,
                resourceFetchStatus: {},
                accountInfoFetchStatus: {}
            }
        },
        components: {
            CardList,
            Preloader
        },
        async mounted() {
            if (!localStorage.getItem("token")) {
                this.redirectToLogin();
                return;
            }
            this.fetchResource();
            this.fetchAccountInfo();

        },
        methods: {
            exit() {
                localStorage.removeItem("token");
            },
            async fetchResource() {
                this.isLoading = true;
                const response = await ResourceAPI.getResources(APIServiceResource.ResourceType.books);
                this.cards = await response.json();
                this.isLoading = false;
            },
            async fetchAccountInfo() {
                this.isLoading = true;
                const responseAuth = await AuthAPI.getAuth();
                this.user = await responseAuth.json();
                this.isLoading = false;
            },
            async redirectToLogin() {
                try {
                    await this.$router.push('/login');
                } catch (e) {
                    console.error("Error while fetching: " + e.toString());
                }
            }
        },
        computed: {
            filtredCards() {
                const searchByTitle = (item) => item.title.toUpperCase().indexOf(this.search.toUpperCase()) !== -1;
                const searchByAuthor = (item) => item.author.toUpperCase().indexOf(this.search.toUpperCase()) !== -1;
                return this.cards.filter(item => searchByTitle(item) || searchByAuthor(item));
            },
            sortedList() {
                const sortByTitle = (d1, d2) => {
                    return (d1.title.toLowerCase() > d2.title.toLowerCase()) ? 1 : -1;
                };
                const sortByAuthor = (d1, d2) => {
                    return (d1.author.toLowerCase() > d2.author.toLowerCase()) ? 1 : -1;
                };
                const sortByMark = (d1, d2) => {
                    return (d1.mark < d2.mark) ? 1 : -1;
                };
                switch (this.sortParam) {
                    case 'title':
                        return [...this.filtredCards].sort(sortByTitle);
                    case 'author':
                        return [...this.filtredCards].sort(sortByAuthor);
                    case 'mark':
                        return [...this.filtredCards].sort(sortByMark);
                    case 'titleLowFirst':
                        return [...this.filtredCards].sort(sortByTitle).reverse();
                    case 'authorLowFirst':
                        return [...this.filtredCards].sort(sortByAuthor).reverse();
                    case 'markLowFirst':
                        return [...this.filtredCards].sort(sortByMark).reverse();
                    default:
                        return this.filtredCards;
                }
            }
        },
    }
</script>

<style lang="less">
    .user {
        font-size: 1.8rem;
        margin-right: 1rem;
        width: 8rem;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .img {
        width: 2.5rem;
        height: 3rem;
        @media (max-width: 768px) {
            width: 4.5rem;
            height: 4.5rem;
        }
    }

    .un {
        font-size: 1.3rem;
        overflow: hidden;
        line-clamp: 1;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        @media (max-width: 768px) {
            font-size: 1.8rem;
        }

    }
</style>