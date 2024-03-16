<template>
    <h1>Here are our snippets</h1>
    <ul>
        <li v-for="snip in snippet">
        <!-- <p>{{ snip.title }}</p>
            <p>{{ snip.programming_language }}</p> -->
            <!-- <p>{{ $route.query.language }}</p> -->
        </li>
    </ul>
    <ul>
        <li v-for="snippet in snippet">
        {{ snippet.title }}</li>
        <!-- {{ filterSnippets }} -->
    </ul>
    

</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            filteredSnippets: [],
            languageQuery: true,
            snippet: {}
        }
    },
    async created() {
        const language = this.$route.query.language;
        // console.log(language);

        if (language) {
           this.snippet = this.filterSnippets;
        } 
        try {
            const response = await axios.get("http://localhost:8080/snippets");      
            
            this.snippet = response.data;
        
            console.log(response.data);
            
        }catch(error) {
            console.log(error);
        }
    },
    computed: {
        async filterSnippets() {
            const language = this.$route.query.language;
           let tempSnippets = this.snippet;
           let filter = {};
           
           try {
            const response = await axios.get(`http://localhost:8080/snippets?language=${language}`)
            // this.snippet = response.data;
            console.log(response.data)
           } catch (error) {
            console.log(error);
           }          
        }
    }
}
</script>

<style scoped>

</style>