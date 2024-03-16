<template>
    <div class="wrapper">
        <section class="header">
            <nav>
                <img src="../assets/scissLogo.png" alt="scissors branding logo" style="width: 5%; height: 5%;"/>
                <div class="nav-links" id="navLinks">
                    <i class="fa-solid fa-xmark" @click="hideMenu"></i>
                    
                   <ul>
                        <li><RouterLink to="/">Home</RouterLink></li>
                        <li><RouterLink to="/">Browse Snippets</RouterLink></li>
                        <li>About</li>
                        <li><RouterLink to="/login" class="login-button">Log in</RouterLink></li>
                        <li><RouterLink to="/register" class="sign-up-button">Sign Up</RouterLink></li>
                    </ul> 
                </div>
                
                
                <i class="fa-solid fa-bars" @click="showMenu"></i>
            </nav>
        
        
            <div class="text-box">
                
                    <h1>Welcome to my Snippets Site</h1>
                    <p>You can find all kinds of code snippets here. </p>
                    <a href="/snippets" class="hero-btn">Check them Out!</a>
                
                
            </div>
            
            
        </section>
        
        <section class="snippets">
            
            <h2>View Snippets by Language</h2>
            <div class="language-row">
                <ul class="grid-list">
                    <li> <button @click="getSnippetByLanguage" v-bind:name="css"><i class="fa-brands fa-css3 fa-xl"></i>CSS</button></li>
                    <li><button><i class="fa-brands fa-python fa-xl"></i>Python</button></li>
                    <li><button><i class="fa-brands fa-js fa-xl"></i>JavaScript</button></li>
                    <li><button><i class="fa-brands fa-java fa-xl"></i>Java</button></li>
                    <li><button @click="getSnippetByLanguage({language: 'html'})"><i class="fa-brands fa-html5 fa-xl"></i>HTML</button></li>
                    <li><button><i class="fa-solid fa-database fa-xl"></i>SQL</button></li>
                    <li><button><i class="fa-brands fa-sass fa-xl"></i>Sass</button></li>
                    <li><RouterLink to="/snippets" class="view-all">View All <i class="fa-solid fa-arrow-right"></i></RouterLink></li>

                </ul>       
                
            </div>
            
        </section>
<section class="latest-snippets">
    <h1>Latest Snippets</h1>
    <p>Here are our most recent snippets</p>

    <div class="row">
        <div class="snippet-col" v-for="(snip, i) in latestSnippets" :key="i">
            <img src="https://api.dicebear.com/7.x/thumbs/svg?seed=Christine" alt="profile-pic">
            <div>

                <h2>{{ snip.title }}</h2>
                <p>{{ snip.code_snippet }}</p>
                <p>{{ snip.programming_language }}</p>
                
                <!-- <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum iusto necessitatibus dolor quam laudantium? Ad animi id minima ducimus velit!</p> -->
                <h3>Christine Robinson</h3>
            </div>
        </div>
        <!-- <div class="snippet-col">
            <img src="https://api.dicebear.com/7.x/thumbs/svg?seed=David" alt="">
            <div>
                <ul>
                   <li v-for="snip in snippet.snippets"> -->
                        <!-- <p>{{ snip[0].title }}</p> -->
                    <!-- </li> 
                </ul> -->
                
                <!-- <h2>{{ snippet[1].title }}</h2>
                <p>{{ snippet[1].code_snippet }}</p>
                <p>{{ snippet[1].programming_language }}</p>
                <h3>{{ snippet[1].user_id }}</h3> -->
            <!-- </div>
        </div> -->
    </div>
</section>
    
        <footer>

        </footer>
        
    </div>
</template>

<script>
import { RouterLink } from 'vue-router';
import axios from 'axios';

export default {
    data() {
        return {
            language: '',
            snippet: [],
            user: {}
        }
    },
    mounted() {
        let navLinks = this.$refs.navLinks;
    },
    async created() {
        try {
            const response = await axios.get("http://localhost:8080/snippets");
            this.snippet = response.data;
            //console.log(response.data[0]);
        }catch(error) {
            console.log(error);
        }
    },
    methods: {
        goToLogin() {
            this.$router.push('./login');
        },
        async getSnippetByLanguage() {
            try {
                const { language } = this.$route.query;
                const response = await axios.get(`http://localhost:8080/snippets?language=${language}`);
                // console.log(response.data);
                
                this.$router.push({
                    name: "snippet",
                    query: {language: 'css'}
                })
                console.log(language);
            } catch(error) {
                console.log(error);
            }
        },
        async viewAllSnippets() {
            
        },
        showMenu() {
            navLinks.style.right= "0";

        },
        hideMenu() {
            navLinks.style.right= "-200px";
        }
    },
    computed: {
        latestSnippets() {
            const latest = [];
            for(let i = 0; i < 2; i++) {
                latest.push(this.snippet[i])
            }
            return latest;
        }
    },
    components: { RouterLink }
}
</script>

<style scoped>

.header {
    min-height: 80vh;
    width: 100%;
    height: 90%;
    background: url("../assets/pBannerGrey.jpg") no-repeat center/85%;
    background-position-y: bottom;;
    /* position: relative; */
    background-color: #f8f8f8;
    
}
.header nav {
    display: flex;
    padding:  2% 2%;
    /* justify-content: space-between; */
    align-items: center;
    
}
nav img {
    width: 150px;
}

.nav-links {
    flex: 1;
    display: flex;
    text-align: right;
    justify-content: center;
}
.nav-links  ul li{
    list-style: none;
    display: inline-block;
    padding: 8px 3rem;
    position: relative;
    color: var(--dark-grey); 
    text-decoration: none;
    font-size: 1rem;
    align-items: center;
}

.nav-links ul li:hover::after {
    width: 100%;
}
.nav-links ul li a {
    color: var(--dark-grey);
    font-weight: 400;
}
.sign-up-button {
    color: #f6f6f6;
    background-color: var(--light-green);
    border: solid 1px var(--light-green);
    border-radius: 3px;
    padding: 6px;
    /* border: 1px solid #4f46e5; */
    width: 100px;
    height: 25px;
    font-size: 16px;
    text-align: center;
    
}

.sign-up-button:hover {
    color: var(--light-green);
    background-color: var(--creme);
    border: solid 1px var(--creme);
    transition-delay: 0.1s;
}
.login-button {
    border-radius: 3px;
    padding: 10px;
   color: var(--dark-grey);
   font-weight: 400;
   font-size: 1rem;
   padding-right: 1.87rem;
}

.login-button:hover {
    
}

.text-box {
    width: 30%;
    position: absolute;
    top: 35%;
    left: 13%;
    /* transform: translate(0%, 20%); */
    text-align: center;
    /* margin-left: 130px; */
}
.text-box h1 {
    font-size: 3.75rem;
    color: #000000;
}
.text-box p {
    margin: 10px 0 40px;
    font-size: 18px;
}
.hero-btn {
    display: inline-block;
    text-decoration: none;
    color: var(--white);
    width: 40%;
    /* border: 1px solid #0e9f9a; */
    padding: 12px 34px;
    border-radius: 15px;
    background: var(--light-green);
    font-size: 1.25rem;
}
.hero-btn:hover {
    /* border: 1px solid #0e9f9a;
    background: #0e9f9a;
    transition: 1s;
    color: #f6f6f6; */
}
nav .fa-solid {
    display: none;
}
@media(max-width: 700px) {
    .text-box h1 {
        font-size: 20px;
    }
    .nav-links ul li {
        display: block;
    }
    .nav-links {
        position: absolute;
        background: var(--light-orange);
        height: 100vh;
        width: 200px;
        top: 0;
        right: -200px;
        text-align: left;
        z-index: 2;
        transition: 1s;
    }
    nav .fa-solid {
        display: block;
        color: #f8f8f8;
        margin: 10px;
        font-size: 22px;
        cursor: pointer;
    }
    .login-button {
        display: none;
    }
    .sign-up-button {
        display: none;
    }
}

@media(max-width: 480px) {
    .sign-up-button {
        display: none;
    }
    .login-button {
        display: none;
    }
}
.grid-list {
    list-style: none;
    display: grid;
    gap: 57px;
    grid-template-columns: repeat(4, minmax(100px, 1fr));
    position: relative;
    /* margin: 20px 0 0; */
}
.grid-list  button {
    width: 257px;
    height: 75px;
    text-align: left;
    font-size: 24px;
    background-color: var(--creme);
}

.grid-list .fa-brands {
    padding-right: 12px;
    color: var(--light-green);
}

.grid-list .fa-solid {
    padding-right: 12px;
    color: var(--light-green);
}
.language-row {
    display: flex;
    align-items: center;
    flex-direction: column;
}

.snippets {
    /* margin: 30px 200px 30px 200px ;
    width: 100%; */
   /* background-color: lightblue; */
   width: 74.9375rem;
   margin: auto;
   text-align: left;
   padding: 54px 120px 10px 120px;
   /* display: flex; */
   
}
.snippets h2 {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 30px;
    /* 
    flex:1; */
}
.snippets .row {
    margin: 0 auto !important;
}
.row i {
    padding-left: -2px;
    padding-right: 10px;
    color: #4f46e5;
}
.row button {
    background-color: var(--gray);
    font-weight: 700;
    margin-bottom: 18px; 
    /* margin-right: 38px !important; */
    width: 172px;
    height: 55px;
   
}
.view-all {
    background-color: #f6f6f6 !important;
    color: var(--light-green);
    border: 2px solid #edecf4;
    /* width: 253px;
    height: 71px; */
    /* font-weight: 700; */
    display: flex;
    border-radius: 10px;
    font: 700 24px Poppins, sans-serif;
    justify-content: flex-start;
    padding: 23px 10px 20px 10px;
    
}
.latest-snippets {
    width: 80%;
    margin: auto;
    padding-top: 100px;
    text-align: center;
}
.snippet-col {
    flex-basis: 44%;
    border-radius: 10px;
    margin-bottom: 5%;
    text-align: left;
    background: #beebe9;
    padding: 25px;
    cursor: pointer;
    display: flex;
}

.row {
    margin-top: 5%;
    display: flex;
    justify-content: space-between;
}

.snippet-col img {
    height: 40px;
    margin-left: 5px;
    margin-right: 30px;
    border-radius: 50%;
}
</style>