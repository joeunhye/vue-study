<template>
    <div class="header">
        <ul class="header-button-left">
            <li>Cancel</li>
        </ul>
        <ul class="header-button-right">
            <li v-if="step === 1" @click="step++">Next</li>
            <li v-if="step === 2" @click="publish">발행</li>
        </ul>
        <img src="./assets/logo.png" class="logo" />
    </div>
    <h5>안녕😁🖐 {{ $store.state.name }} ({{ $store.state.age }})</h5>
    <button @click="$store.commit('changeName')">Change Name</button>
    <button @click="$store.commit('changeAge', 10)">Change Age</button>

    <container :selectFilter="selectFilter" :posts="Posts" :step="step" :imgUrl="imgUrl" @write="writeContent = $event" />
    <button @click="more" class="more">더보기</button>

    <div class="footer">
        <ul class="footer-button-plus">
            <input @change="upload" type="file" id="file" class="inputfile" />
            <label for="file" class="input-plus">+</label>
        </ul>
    </div>
    <!-- 
    <div v-if="step === 0">내용1</div>
    <div v-if="step === 1">내용2</div>
    <div v-if="step === 2">내용3</div>

    <button @click="step = 0">버튼1</button>
    <button @click="step = 1">버튼2</button>
    <button @click="step = 2">버튼3</button> -->
</template>

<script>
import Container from "./components/Container.vue";
import posts from "./assets/posting.js";
import axios from "axios";

export default {
    name: "App",
    data() {
        return {
            Posts: posts,
            moreNum: 0,
            step: 0,
            imgUrl: "",
            writeContent: "",
            selectFilter: "",
        };
    },
    mounted() {
        this.emitter.on("filter", (data) => {
            this.selectFilter = data;
        });
    },
    methods: {
        more() {
            axios.get(`https://codingapple1.github.io/vue/more${this.moreNum}.json`).then((result) => {
                this.Posts.push(result.data);
                this.moreNum++;
            });
        },
        upload(e) {
            let file = e.target.files[0];
            this.step++;
            let url = URL.createObjectURL(file);
            this.imgUrl = url;
        },
        publish() {
            let data = {
                name: "Kim Hyun",
                userImage: "https://picsum.photos/100?random=3",
                postImage: this.imgUrl,
                likes: 36,
                date: "May 15",
                liked: false,
                content: this.writeContent,
                filter: "perpetua",
            };
            this.Posts.unshift(data);
            this.step = 0;
        },
    },
    components: {
        Container,
    },
};
</script>

<style>
body {
    margin: 0;
}
ul {
    padding: 5px;
    list-style-type: none;
}
.logo {
    width: 22px;
    margin: auto;
    display: block;
    position: absolute;
    left: 0;
    right: 0;
    top: 13px;
}
.header {
    width: 100%;
    height: 40px;
    background-color: white;
    padding-bottom: 8px;
    position: sticky;
    top: 0;
}
.header-button-left {
    color: skyblue;
    float: left;
    width: 50px;
    padding-left: 20px;
    cursor: pointer;
    margin-top: 10px;
}
.header-button-right {
    color: skyblue;
    float: right;
    width: 50px;
    cursor: pointer;
    margin-top: 10px;
}
.footer {
    width: 100%;
    position: sticky;
    bottom: 0;
    padding-bottom: 10px;
    background-color: white;
}
.footer-button-plus {
    width: 80px;
    margin: auto;
    text-align: center;
    cursor: pointer;
    font-size: 24px;
    padding-top: 12px;
}
.sample-box {
    width: 100%;
    height: 600px;
    background-color: bisque;
}
.inputfile {
    display: none;
}
.input-plus {
    cursor: pointer;
}
.more {
    border: none;
    width: 100%;
    height: 45px;
    font-size: 16px;
    font-weight: 500;
    background: #ddd;
}
#app {
    box-sizing: border-box;
    font-family: "consolas";
    margin-top: 60px;
    width: 100%;
    max-width: 460px;
    margin: auto;
    position: relative;
    border-right: 1px solid #eee;
    border-left: 1px solid #eee;
}
</style>
