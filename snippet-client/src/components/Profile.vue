<template>
    <div class="wrapper">
        <div class="profile">
            <h1 style="text-align: center;">Profile</h1>
            <div style="text-align: center;">
                <img v-bind:src="pic" class="profile-pic" alt="profile pic"/>
            </div>
            <div>
                <h2 style="text-align: center; text-transform: capitalize;">{{ user.username }}</h2>
                <p>Years Experience: {{ user.years_experience }}</p>
                
            </div>
            <div>
                <h3>Programming Languages</h3>
                <ul>
                    <li v-for="languages in user.programming_languages">
                    {{ languages }}</li>
                </ul>
            </div>

            <div>
                <h3>Snippets</h3>
                <ul>
                    <li v-for="snippet in user.snippets">

                       <p>Title: {{ snippet.title }}</p> 
                       <p>{{ snippet.code_snippet }}</p>
                       <p>Created: {{ snippet.created }}</p>
                        
                    </li>
                </ul>
                <h3>Bookmarks</h3>
                <p>{{ bookmarksReturn }} </p>

                <h3>Add a New Snippet</h3>
                <form>
                    <div class="snippet-form">
                        <label for="" class="title-label">Title:</label>
                        <input 
                            v-model="snippet.title"
                            type="text" 
                            class="title-input" 
                            placeholder="Title of snippet"
                        />

                        <label for="" class="code-label">Code Snippet:</label>
                        <input 
                            v-model="snippet.code_snippet"
                            type="text" 
                            class="code-input" 
                            placeholder="Snippet Code Here"
                        />

                        <label for="" class="language-label">Language:</label>
                        <input 
                            v-model="snippet.programming_language"
                            type="text" 
                            class="language-input" 
                            placeholder="Language of Snippet"
                        />

                    </div>
                </form>
                
                <button @click="addSnippet" class="snippet-button">+ Add Snippet</button>
            </div>

        </div>
        
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            user: {},
            snippet: {
                title: '',
                code_snippet: '',
                programming_language: '',
                user_id: ''
            },
            pic: ''
        };
    },
    async created() {
        const { id } = this.$route.params;

        try {
            const response = await axios.get(`http://localhost:8080/users/${id}?snippets=true&bookmarks=true`);

            this.user = response.data;
            this.pic = `https://api.dicebear.com/7.x/thumbs/svg?seed=${this.user.username}`;
        } catch (error) {
            console.log(error);
        }
    },
    methods: {
        async addSnippet() {
           // const token = localStorage.getItem('authToken');
           // console.log(token);
           try {
            const snippet = this.snippet;
            snippet.user_id = this.user.id;
            const response = axios.post('http://localhost:8080/snippets', snippet)
            console.log(response);
           } catch (error) {
            console.log(error);
           }
        },
        
    },
    computed: {
        bookmarksReturn() {
            // return this.user.bookmarks === undefined ? `bookmark count ${bookmarks.length}` : 'no bookmarks found';
            
            try {
                if (this.user.bookmarks.length > 0) {
                    return `bookmark count ${this.bookmarks.length}`
                } else {
                    return 'no bookmarks found';
                }
            } catch (error) {
                 return error.toString();
            }
            
            }
        }
    
}
</script>

<style scoped>
.profile {
    position: absolute;
    /* width: 50%; */
    /* margin: auto; */
    top: 5%;
    left: 40%;
    
}
.profile-pic {
    width: 50%;
    border-radius: 84px;
    text-align: center;
}
ul {
    list-style: none;
    display: flex;
    justify-content: space-evenly;
}

.snippet-button {
    background-color: #4f46e5;
    color: #fff;
    width: 421px;
}
.snippet-button:hover {
    background-color:#fff;
    color: #4f46e5;
    border: 1px solid #4f46e5;
}
</style>