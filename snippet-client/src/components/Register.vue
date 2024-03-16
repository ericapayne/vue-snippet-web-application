<template>
    <section>
    <div class="register-container">
        <!-- <div class="header">
            <h1>Register Here</h1>
        </div> -->

        
            <!-- <div class="column">
                <div style="background: #4f46e5; height: 100%;">
                    
                    <p>image here</p>
                </div>
            </div> -->
            
                <header class="header">
                    Create an Account
                    <p>Register Here!</p>
                </header>
                <form>
                    <div class="form-layout">
                    
                        
                        <!-- <label class="username-label" for="username">Username</label> -->
                        <input
                            v-model="user.username"
                            placeholder="Enter username"
                            type="text"
                            class="username-input"
                        />
                        
                        
                        <!-- <label class="password-label" for="password">Password</label> -->
                        <input
                            v-model="user.password"
                            placeholder="Enter password"
                            type="text"
                            class="password-input"
                        />
                    
                    
                        <!-- <label for="years">Years Experience</label> -->
                        <input
                            v-model="user.years_experience"
                            placeholder="years experience"
                            type="text"
                            class="years-input"
                        />

                        <!-- <label for="languages">Programming Languages</label> -->
                        <input
                            v-model="user.programming_languages"
                            placeholder="(comma separated)"
                            type="text"
                            class="languages-input"
                        >
                        <p class="error">{{ error }}</p>
                        <button @click="register" type="button" class="register">
                            Register
                        </button>
                        
                    
                </div>
                <p class="login">Already Registered?
                            <RouterLink class="login-link" to="/login">
                                Login
                            </RouterLink>
                        </p>
            </form>
        
            
            
        
        
    </div>
    </section>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            user: {
                username: '',
                password: '',
                years_experience: '',
                programming_languages: ''
            },
            error: null
        };
    },
    methods: {
        async register() {
            try {
                const user = this.user;
                user.programming_languages = this.user.programming_languages.split(',');
                
                const response = await axios.post('http://localhost:8080/users/register', user);

                console.log(response.data);
                this.$router.push('./login');
            } catch (error) {
                this.error = 'username already exists';
                console.log(error);
            }
        }
    }
}
</script>

<style scoped>
section {
    background: linear-gradient(90deg, rgba(79,70,229,1) 0%, rgba(81,81,182,1) 62%, rgba(0,212,255,1) 100%);
    height: 100vh;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}
.register-container {
    background-color: #f6f6f6;
    /* width: 50%;
    height: 80%;
    position: absolute;
    top:50%;
    left: 50%; */
    /* margin: auto;
    transform: translate(-50%, -50%);
    padding: 10px; */
    text-align: center;
    box-shadow: 0 10px 30px -15px rgba(2,12,27,.7);
}
/* .register-row {
    display: flex;
    align-items: center;
    justify-content: center;
} */

.column { 
    /* float: left; */
    /* width: 50%; */
    /* padding: 90px 15px 5px 120px; */
    /* height: 864px;
    justify-content: center;
    background-color: #f6f6f6; */
    
}
.account-side {
    /* height: 100%; */
}
form {
    align-items: center;
    height: 400px;
    position: relative;
    margin: 30px 138px 137px;
}
.form {
    padding-left: 100px;
    /* text-align: center; */
}
.form-layout {
    display: flex;
    flex-direction: column;
    flex:1;
    margin: auto;
    align-items: center;
    justify-content: center;
    text-align: start !important;
}

label {
    display: flex;
    /* text-align: start !important; */
    align-items: left;
    justify-content: flex-start;
}

.username-input {
    background-image: url(../assets/icons/user.svg);
    background-position-y: center;
    background-size: 20px 20px;
    background-repeat: no-repeat;
    background-position: 20px;
    text-indent: 40px;
    margin-top: 7px;
    width: 330px;
}

input {
    color:#333;
    margin-bottom: 15px;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #cfd7db;
    width: 100%;
    height: 100%;
}
.password-input {
    width: 330px;
    background-image: url(../assets/icons/lock.svg);
    background-position-y: center;
    background-size: 20px 20px;
    background-repeat: no-repeat;
    background-position: 20px;
    text-indent: 40px;
    margin-top: 10px;
}
.years-input {
    width: 330px;
    background-image: url(../assets/icons/calendar-days-solid.svg);
    background-position-y: center;
    background-size: 20px 20px;
    background-repeat: no-repeat;
    background-position: 20px;
    text-indent: 40px;
    margin-top: 10px;
}
.languages-input {
    width: 330px;
    background-image: url(../assets/icons/code-solid.svg);
    background-position-y: center;
    background-size: 20px 20px;
    background-repeat: no-repeat;
    background-position: 20px;
    text-indent: 40px;
    margin-top: 10px;
}
.register {
    background-color: #4f46e5;
    color: #fff;
    width: 330px;
}
.register:hover {
    background-color:#fff;
    color: #4f46e5;
    border: 1px solid #4f46e5;
}
</style>